import * as SupervisorReportRepository from './supervisor-weekly-reports.repository.js';
import * as ProjectRepository from '../projects/projects.repository.js';
import * as WeeklyJournalRepository from '../weekly-journals/weekly-journals.repository.js';
import prisma from '../../config/prisma.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';

export const getReports = async (req, res, next) => {
  try {
    const { projectId, supervisorId, status, weekStartDate, weekEndDate, actorRole, actorId } = req.query;

    const filters = { projectId, supervisorId, status, weekStartDate, weekEndDate };

    // Basic RBAC for local development
    if (actorRole === 'pengawas') {
      filters.supervisorId = actorId;
    } else if (actorRole === 'admin') {
      filters.adminId = actorId;
    } else if (actorRole === 'customer') {
      filters.isVisibleToCustomer = true;
    } else if (actorRole !== 'admin' && actorRole !== 'superadmin') {
      if (actorRole) {
        return res.status(403).json({
          success: false,
          message: 'Access denied for this role.'
        });
      }
    }

    const reports = await SupervisorReportRepository.findReports(filters);
    res.json({
      success: true,
      data: serializeDecimal(reports),
    });
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId } = req.query;

    const report = await SupervisorReportRepository.findReportById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Supervisor weekly report not found',
      });
    }

    // Basic RBAC for local development
    if (actorRole === 'pengawas' && report.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own reports.'
      });
    }

    if (actorRole === 'admin' && report.project.adminId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses ke laporan ini.'
      });
    }
    
    if (actorRole === 'customer' && !report.isVisibleToCustomer) {
      return res.status(403).json({
        success: false,
        message: 'Laporan ini belum dipublikasikan untuk Konsumen.'
      });
    }

    res.json({
      success: true,
      data: serializeDecimal(report),
    });
  } catch (error) {
    next(error);
  }
};

export const getReportContext = async (req, res, next) => {
  try {
    const { projectId, weekStartDate, weekEndDate, actorRole, actorId } = req.query;

    if (actorRole !== 'pengawas') {
      return res.status(403).json({
        success: false,
        message: 'Only supervisors can access report context.'
      });
    }

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'projectId is required.'
      });
    }

    const project = await SupervisorReportRepository.findProjectForContext(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Supervisor is not assigned to this project'
      });
    }

    const approvedJournals = await SupervisorReportRepository.findApprovedJournalsForContext({
      projectId,
      supervisorId: actorId,
      weekStartDate,
      weekEndDate
    });

    // Fetch RAB Items for context
    const rabPlan = await prisma.rabPlan.findFirst({
      where: { projectId, status: 'approved' },
      include: {
        categories: {
          include: { items: true }
        }
      }
    });

    const rabItems = [];
    if (rabPlan) {
      rabPlan.categories.forEach(cat => {
        cat.items.forEach(item => {
          rabItems.push({
            ...item,
            categoryName: cat.name,
            categoryCode: cat.code
          });
        });
      });
    }

    res.json({
      success: true,
      data: serializeDecimal({
        project,
        verifiedProgressSnapshot: project.verifiedProgress,
        verifiedProgressUpdatedAt: project.verifiedProgressUpdatedAt,
        approvedJournals,
        rabItems
      })
    });
  } catch (error) {
    next(error);
  }
};

export const createReport = async (req, res, next) => {
  try {
    const { 
      actorRole, actorId, projectId, weekStartDate, weekEndDate, 
      summary, qualityNotes, safetyNotes, blockerNotes, recommendation, 
      customerSummaryDraft, journalIds, notes 
    } = req.body;

    // Validation
    if (actorRole !== 'pengawas') {
      return res.status(403).json({
        success: false,
        message: 'Only supervisors can create weekly reports.'
      });
    }

    if (!projectId || !weekStartDate || !weekEndDate) {
      return res.status(400).json({
        success: false,
        message: 'projectId, weekStartDate, and weekEndDate are required.'
      });
    }

    if (new Date(weekStartDate) > new Date(weekEndDate)) {
      return res.status(400).json({
        success: false,
        message: 'weekStartDate cannot be after weekEndDate.'
      });
    }

    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Supervisor is not assigned to this project'
      });
    }

    // Check duplicate period
    const existing = await SupervisorReportRepository.findByPeriod(projectId, actorId, weekStartDate, weekEndDate);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Supervisor weekly report already exists for this period'
      });
    }

    // Journal validation
    if (journalIds && Array.isArray(journalIds)) {
      for (const jid of journalIds) {
        const journal = await WeeklyJournalRepository.findWeeklyJournalById(jid);
        if (!journal) {
          return res.status(400).json({ success: false, message: `Weekly journal ${jid} not found` });
        }
        if (journal.projectId !== projectId) {
          return res.status(400).json({ success: false, message: 'Only journals from the same project can be attached' });
        }
        if (journal.status !== 'approved') {
          return res.status(400).json({ success: false, message: 'Only approved journals can be attached' });
        }
      }
    }

    // Note validation
    if (notes && Array.isArray(notes)) {
      for (const note of notes) {
        if (!note.type || !note.content) {
          return res.status(400).json({
            success: false,
            message: 'Each note must have a type and content.'
          });
        }
        if (note.severity && !['low', 'medium', 'high', 'critical'].includes(note.severity)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid severity level.'
          });
        }
      }
    }

    const newReport = await SupervisorReportRepository.createReport({
      projectId,
      supervisorId: actorId,
      weekStartDate: new Date(weekStartDate),
      weekEndDate: new Date(weekEndDate),
      status: 'draft',
      verifiedProgressSnapshot: project.verifiedProgress,
      summary,
      qualityNotes,
      safetyNotes,
      blockerNotes,
      recommendation,
      customerSummaryDraft,
      journalIds,
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Draft laporan mingguan Pengawas berhasil dibuat.',
      data: serializeDecimal(newReport),
    });
  } catch (error) {
    next(error);
  }
};

export const updateReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      actorRole, actorId, summary, qualityNotes, safetyNotes, 
      blockerNotes, recommendation, customerSummaryDraft, journalIds, notes 
    } = req.body;

    const report = await SupervisorReportRepository.findReportById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Supervisor weekly report not found'
      });
    }

    // Validation
    if (actorRole !== 'pengawas' || report.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Only the supervisor who created this report can edit it.'
      });
    }

    if (report.status !== 'draft' && report.status !== 'revision_requested') {
      return res.status(400).json({
        success: false,
        message: 'Report status does not allow this action'
      });
    }

    // Journal validation
    if (journalIds && Array.isArray(journalIds)) {
      for (const jid of journalIds) {
        const journal = await WeeklyJournalRepository.findWeeklyJournalById(jid);
        if (!journal || journal.projectId !== report.projectId || journal.status !== 'approved') {
          return res.status(400).json({ success: false, message: 'Invalid journals attached' });
        }
      }
    }

    const updated = await SupervisorReportRepository.updateReport(id, {
      summary,
      qualityNotes,
      safetyNotes,
      blockerNotes,
      recommendation,
      customerSummaryDraft,
      journalIds,
      notes
    });

    res.json({
      success: true,
      message: 'Laporan mingguan berhasil diperbarui.',
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};

export const submitReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId } = req.body;

    const report = await SupervisorReportRepository.findReportById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Supervisor weekly report not found'
      });
    }

    if (actorRole !== 'pengawas' || report.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Only the supervisor owner can submit this report.'
      });
    }

    if (report.status !== 'draft' && report.status !== 'revision_requested') {
      return res.status(400).json({
        success: false,
        message: 'Report status does not allow this action'
      });
    }

    // Requirement: Minimal summary or minimal one note
    if (!report.summary && report.notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Report must contain summary or note before submit'
      });
    }

    const updated = await SupervisorReportRepository.updateReportStatus(id, {
      actorRole,
      actorId,
      action: 'submit',
      oldStatus: report.status,
      status: 'submitted'
    });

    res.json({
      success: true,
      message: 'Laporan mingguan berhasil dikirim.',
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};

export const reviewReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId, action, note } = req.body;

    const report = await SupervisorReportRepository.findReportById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Supervisor weekly report not found'
      });
    }

    if (actorRole !== 'admin' && actorRole !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can review supervisor reports.'
      });
    }

    if (actorRole === 'admin' && report.project.adminId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk mereview laporan ini.'
      });
    }

    if (report.status !== 'submitted' && report.status !== 'under_admin_review') {
      return res.status(400).json({
        success: false,
        message: 'Report status does not allow this action'
      });
    }

    let newStatus;
    switch (action) {
      case 'start_admin_review':
        newStatus = 'under_admin_review';
        break;
      case 'approve':
      case 'reviewed':
        newStatus = 'approved';
        break;
      case 'request_revision':
        if (!note && !req.body.adminNote) return res.status(400).json({ success: false, message: 'Review note is required' });
        newStatus = 'revision_requested';
        break;
      case 'reject':
        if (!note) return res.status(400).json({ success: false, message: 'Review note is required' });
        newStatus = 'rejected';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    const updated = await SupervisorReportRepository.updateReportStatus(id, {
      actorRole,
      actorId,
      action,
      oldStatus: report.status,
      status: newStatus,
      note: note || req.body.adminNote,
      adminNote: req.body.adminNote,
      customerSummaryDraft: req.body.customerSummaryDraft
    });

    res.json({
      success: true,
      message: `Status laporan diperbarui menjadi ${newStatus}.`,
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};
export const publishReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId } = req.body;

    const report = await SupervisorReportRepository.findReportById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    if (actorRole !== 'admin' && actorRole !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Only admins can publish reports.' });
    }

    if (actorRole === 'admin' && report.project.adminId !== actorId) {
      return res.status(403).json({ success: false, message: 'Anda tidak memiliki akses untuk mempublish laporan ini.' });
    }

    if (report.status !== 'reviewed' && report.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Only reviewed reports can be published.' });
    }

    if (!report.customerSummaryDraft) {
      return res.status(400).json({ success: false, message: 'Customer summary draft must be prepared before publishing.' });
    }

    const updated = await SupervisorReportRepository.updateReportStatus(id, {
      actorRole,
      actorId,
      action: 'publish',
      oldStatus: report.status,
      status: 'published'
    });

    res.json({
      success: true,
      message: 'Laporan berhasil dipublikasikan ke Konsumen.',
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};
