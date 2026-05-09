import * as WeeklyJournalRepository from './weekly-journals.repository.js';
import * as ProjectRepository from '../projects/projects.repository.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';
import prisma from '../../config/prisma.js';

export const getWeeklyJournals = async (req, res, next) => {
  try {
    const { projectId, foremanId, supervisorId, status, weekStartDate, weekEndDate, actorRole, actorId } = req.query;

    const filters = { projectId, foremanId, supervisorId, status, weekStartDate, weekEndDate };

    // Basic RBAC for local development
    if (actorRole === 'mandor') {
      filters.foremanId = actorId;
    } else if (actorRole === 'pengawas') {
      filters.supervisorId = actorId;
    } else if (actorRole !== 'admin' && actorRole !== 'superadmin') {
      // Forbidden for others for now
      if (actorRole) {
        return res.status(403).json({
          success: false,
          message: 'Access denied for this role.'
        });
      }
    }

    const journals = await WeeklyJournalRepository.findWeeklyJournals(filters);
    res.json({
      success: true,
      data: serializeDecimal(journals),
    });
  } catch (error) {
    next(error);
  }
};

export const getWeeklyJournalById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId } = req.query;

    const journal = await WeeklyJournalRepository.findWeeklyJournalById(id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Weekly journal not found',
      });
    }

    // Basic RBAC for local development
    if (actorRole === 'mandor' && journal.foremanId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own journals.'
      });
    }

    if (actorRole === 'pengawas' && journal.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'You can only view journals for projects you supervise.'
      });
    }

    res.json({
      success: true,
      data: serializeDecimal(journal),
    });
  } catch (error) {
    next(error);
  }
};

export const createWeeklyJournal = async (req, res, next) => {
  try {
    const { actorRole, actorId, projectId, weekStartDate, weekEndDate, summary, claimedProgress, blockerNote, activities, photos } = req.body;

    // Validation
    if (actorRole !== 'mandor') {
      return res.status(403).json({
        success: false,
        message: 'Only foremen can create weekly journals.'
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

    if (claimedProgress !== undefined && (claimedProgress < 0 || claimedProgress > 100)) {
      return res.status(400).json({
        success: false,
        message: 'claimedProgress must be between 0 and 100.'
      });
    }

    // Check project and assignment
    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.foremanId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Foreman is not assigned to this project'
      });
    }

    // Check duplicate period
    const existing = await WeeklyJournalRepository.findByPeriod(projectId, actorId, weekStartDate, weekEndDate);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Weekly journal already exists for this period'
      });
    }

    // Activity validation
    if (activities && Array.isArray(activities)) {
      for (const act of activities) {
        if (!act.workTitle || !act.description) {
          return res.status(400).json({
            success: false,
            message: 'Each activity must have a workTitle and description.'
          });
        }
        if (act.progressClaim !== undefined && (act.progressClaim < 0 || act.progressClaim > 100)) {
          return res.status(400).json({
            success: false,
            message: 'activity progressClaim must be between 0 and 100.'
          });
        }

        // Optional Context Validation
        if (act.projectStageId) {
          const stage = await prisma.projectStage.findUnique({ where: { id: act.projectStageId } });
          if (!stage || stage.projectId !== projectId) {
            return res.status(400).json({
              success: false,
              message: `Project stage ${act.projectStageId} is invalid or does not belong to this project.`
            });
          }
        }

        if (act.rabItemId) {
          const rabItem = await prisma.rabItem.findUnique({ where: { id: act.rabItemId } });
          if (!rabItem || rabItem.projectId !== projectId) {
            return res.status(400).json({
              success: false,
              message: `RAB item ${act.rabItemId} is invalid or does not belong to this project.`
            });
          }
        }
      }
    }

    // Photo validation
    if (photos && Array.isArray(photos)) {
      for (const photo of photos) {
        if (!photo.photoUrl) {
          return res.status(400).json({
            success: false,
            message: 'Each photo must have a photoUrl.'
          });
        }
      }
    }

    const newJournal = await WeeklyJournalRepository.createWeeklyJournal({
      projectId,
      foremanId: actorId,
      supervisorId: project.supervisorId, // Auto-assign current project supervisor
      weekStartDate: new Date(weekStartDate),
      weekEndDate: new Date(weekEndDate),
      status: 'draft',
      summary,
      claimedProgress,
      blockerNote,
      verifiedProgressSnapshot: project.verifiedProgress,
      activities,
      photos
    });

    res.status(201).json({
      success: true,
      message: 'Draft jurnal mingguan berhasil dibuat.',
      data: serializeDecimal(newJournal),
    });
  } catch (error) {
    next(error);
  }
};

export const updateWeeklyJournal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId, summary, claimedProgress, blockerNote, activities, photos } = req.body;

    const journal = await WeeklyJournalRepository.findWeeklyJournalById(id);
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Weekly journal not found'
      });
    }

    // Validation
    if (actorRole !== 'mandor' || journal.foremanId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Only the foreman who created this journal can edit it.'
      });
    }

    if (journal.status !== 'draft' && journal.status !== 'revision_requested') {
      return res.status(400).json({
        success: false,
        message: 'Journal status does not allow this action'
      });
    }

    if (claimedProgress !== undefined && (claimedProgress < 0 || claimedProgress > 100)) {
      return res.status(400).json({
        success: false,
        message: 'claimedProgress must be between 0 and 100.'
      });
    }

    // Activity validation
    if (activities && Array.isArray(activities)) {
      for (const act of activities) {
        if (!act.workTitle || !act.description) {
          return res.status(400).json({
            success: false,
            message: 'Each activity must have a workTitle and description.'
          });
        }

        // Optional Context Validation
        if (act.projectStageId) {
          const stage = await prisma.projectStage.findUnique({ where: { id: act.projectStageId } });
          if (!stage || stage.projectId !== journal.projectId) {
            return res.status(400).json({
              success: false,
              message: `Project stage ${act.projectStageId} is invalid or does not belong to this project.`
            });
          }
        }

        if (act.rabItemId) {
          const rabItem = await prisma.rabItem.findUnique({ where: { id: act.rabItemId } });
          if (!rabItem || rabItem.projectId !== journal.projectId) {
            return res.status(400).json({
              success: false,
              message: `RAB item ${act.rabItemId} is invalid or does not belong to this project.`
            });
          }
        }
      }
    }

    const updated = await WeeklyJournalRepository.updateWeeklyJournal(id, {
      summary,
      claimedProgress,
      blockerNote,
      activities,
      photos
    });

    res.json({
      success: true,
      message: 'Jurnal mingguan berhasil diperbarui.',
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};

export const submitWeeklyJournal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId } = req.body;

    const journal = await WeeklyJournalRepository.findWeeklyJournalById(id);
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Weekly journal not found'
      });
    }

    if (actorRole !== 'mandor' || journal.foremanId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Only the foreman owner can submit this journal.'
      });
    }

    if (journal.status !== 'draft' && journal.status !== 'revision_requested') {
      return res.status(400).json({
        success: false,
        message: 'Journal status does not allow this action'
      });
    }

    // Requirement: Minimal summary or minimal one activity
    if (!journal.summary && journal.activities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Journal must contain summary or activity before submit'
      });
    }

    const updated = await WeeklyJournalRepository.updateStatus(id, 'submitted', {
      actorRole,
      actorId,
      action: 'submit',
      oldStatus: journal.status,
      newStatus: 'submitted'
    });

    res.json({
      success: true,
      message: 'Jurnal mingguan berhasil dikirim.',
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};

export const reviewWeeklyJournal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId, action, note } = req.body;

    const journal = await WeeklyJournalRepository.findWeeklyJournalById(id);
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Weekly journal not found'
      });
    }

    if (actorRole !== 'pengawas') {
      return res.status(403).json({
        success: false,
        message: 'Only supervisors can review weekly journals.'
      });
    }

    if (journal.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Supervisor is not assigned to this project'
      });
    }

    if (journal.status !== 'submitted' && journal.status !== 'under_review') {
      return res.status(400).json({
        success: false,
        message: 'Journal status does not allow this action'
      });
    }

    let newStatus;
    switch (action) {
      case 'start_review':
        newStatus = 'under_review';
        break;
      case 'approve':
        newStatus = 'approved';
        break;
      case 'request_revision':
        if (!note) return res.status(400).json({ success: false, message: 'Review note is required' });
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

    const updated = await WeeklyJournalRepository.updateStatus(id, newStatus, {
      actorRole,
      actorId,
      action,
      oldStatus: journal.status,
      newStatus,
      note
    });

    res.json({
      success: true,
      message: `Status jurnal diperbarui menjadi ${newStatus}.`,
      data: serializeDecimal(updated),
    });
  } catch (error) {
    next(error);
  }
};
