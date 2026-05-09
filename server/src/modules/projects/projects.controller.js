import * as ProjectRepository from './projects.repository.js';
import * as CustomerRepository from '../customers/customers.repository.js';
import * as AdminRepository from '../admins/admins.repository.js';
import prisma from '../../config/prisma.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';

export const getProjects = async (req, res, next) => {
  try {
    const { supervisorId, foremanId, adminId, customerId } = req.query;
    const projects = await ProjectRepository.findAll({ supervisorId, foremanId, adminId, customerId });
    res.json({
      success: true,
      data: serializeDecimal(projects),
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await ProjectRepository.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: serializeDecimal(project),
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectStages = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const stages = await ProjectRepository.findStagesByProjectId(id);
    res.json({
      success: true,
      data: serializeDecimal(stages),
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectRab = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const rab = await ProjectRepository.findRabByProjectId(id);

    if (!rab) {
      return res.status(404).json({
        success: false,
        message: 'Active/Approved RAB plan not found for this project',
      });
    }

    res.json({
      success: true,
      data: serializeDecimal(rab),
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { projectCode, name, customerId, adminId, startDate, estimatedEndDate, ...rest } = req.body;

    // Validation
    if (!projectCode || !name || !customerId) {
      return res.status(400).json({
        success: false,
        message: 'projectCode, name, and customerId are required',
      });
    }

    // Check customer
    const customer = await CustomerRepository.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Check admin capacity if assigned
    if (adminId) {
      const activeProjectsCount = await AdminRepository.countActiveProjects(adminId);
      if (activeProjectsCount >= 3) {
        return res.status(400).json({
          success: false,
          message: 'Admin ini sudah menangani maksimal 3 proyek aktif.'
        });
      }
    }

    // Check duplicate code
    const existing = await ProjectRepository.findByCode(projectCode);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Project code already exists',
      });
    }

    // Additional validations
    const { progress, budgetTotal, paidAmount, remainingAmount } = rest;
    if (progress !== undefined && (typeof progress !== 'number' || progress < 0 || progress > 100)) {
      return res.status(400).json({ success: false, message: 'progress must be a number between 0 and 100' });
    }
    if (budgetTotal !== undefined && (typeof budgetTotal !== 'number' || budgetTotal < 0)) {
      return res.status(400).json({ success: false, message: 'budgetTotal must be a non-negative number' });
    }
    if (paidAmount !== undefined && (typeof paidAmount !== 'number' || paidAmount < 0)) {
      return res.status(400).json({ success: false, message: 'paidAmount must be a non-negative number' });
    }
    if (remainingAmount !== undefined && (typeof remainingAmount !== 'number' || remainingAmount < 0)) {
      return res.status(400).json({ success: false, message: 'remainingAmount must be a non-negative number' });
    }

    // Date validation
    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ success: false, message: 'Invalid startDate format' });
    }
    if (estimatedEndDate && isNaN(Date.parse(estimatedEndDate))) {
      return res.status(400).json({ success: false, message: 'Invalid estimatedEndDate format' });
    }

    const newProject = await ProjectRepository.create({
      projectCode,
      name,
      customerId,
      adminId: adminId || null,
      type: rest.type || 'Pembangunan',
      status: rest.status || 'planning',
      startDate: startDate ? new Date(startDate) : null,
      estimatedEndDate: estimatedEndDate ? new Date(estimatedEndDate) : null,
      ...rest,
    });

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projectCode, customerId, adminId, startDate, estimatedEndDate, ...data } = req.body;

    // Check project existence
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check customer if changing
    if (customerId && customerId !== project.customerId) {
      const customer = await CustomerRepository.findById(customerId);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      data.customerId = customerId;
    }

    // Check admin capacity if changing or assigning for the first time
    if (adminId && adminId !== project.adminId) {
      const activeProjectsCount = await AdminRepository.countActiveProjects(adminId);
      if (activeProjectsCount >= 3) {
        return res.status(400).json({
          success: false,
          message: 'Admin ini sudah menangani maksimal 3 proyek aktif.'
        });
      }
      data.adminId = adminId;
    } else if (adminId === null) {
      data.adminId = null;
    }

    // Check duplicate code if changing
    if (projectCode && projectCode !== project.projectCode) {
      const existing = await ProjectRepository.findByCode(projectCode);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Project code already exists',
        });
      }
      data.projectCode = projectCode;
    }

    // Additional validations
    const { progress, budgetTotal, paidAmount, remainingAmount } = data;
    if (progress !== undefined && (typeof progress !== 'number' || progress < 0 || progress > 100)) {
      return res.status(400).json({ success: false, message: 'progress must be a number between 0 and 100' });
    }
    if (budgetTotal !== undefined && (typeof budgetTotal !== 'number' || budgetTotal < 0)) {
      return res.status(400).json({ success: false, message: 'budgetTotal must be a non-negative number' });
    }
    if (paidAmount !== undefined && (typeof paidAmount !== 'number' || paidAmount < 0)) {
      return res.status(400).json({ success: false, message: 'paidAmount must be a non-negative number' });
    }
    if (remainingAmount !== undefined && (typeof remainingAmount !== 'number' || remainingAmount < 0)) {
      return res.status(400).json({ success: false, message: 'remainingAmount must be a non-negative number' });
    }

    // Date validation
    if (startDate !== undefined && startDate !== null && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ success: false, message: 'Invalid startDate format' });
    }
    if (estimatedEndDate !== undefined && estimatedEndDate !== null && isNaN(Date.parse(estimatedEndDate))) {
      return res.status(400).json({ success: false, message: 'Invalid estimatedEndDate format' });
    }

    // Handle dates
    if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
    if (estimatedEndDate !== undefined) data.estimatedEndDate = estimatedEndDate ? new Date(estimatedEndDate) : null;

    const updated = await ProjectRepository.update(id, data);

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check project existence and counts
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project._count.stages > 0 || project._count.rabPlans > 0) {
      return res.status(409).json({
        success: false,
        message: 'Project cannot be deleted because it still has stages or RAB plans',
      });
    }

    await ProjectRepository.remove(id);

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyProjectProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { actorRole, actorId, verifiedProgress, notes, stageId } = req.body;

    // 1. Basic Validations
    if (actorRole !== 'pengawas') {
      return res.status(403).json({
        success: false,
        message: 'Hanya Pengawas yang dapat memverifikasi progress proyek.'
      });
    }

    if (!actorId) {
      return res.status(400).json({
        success: false,
        message: 'actorId (Supervisor ID) wajib disertakan.'
      });
    }

    if (verifiedProgress === undefined || typeof verifiedProgress !== 'number' || verifiedProgress < 0 || verifiedProgress > 100) {
      return res.status(400).json({
        success: false,
        message: 'verifiedProgress wajib angka antara 0 dan 100.'
      });
    }

    if (!notes || notes.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Catatan verifikasi (notes) wajib diisi minimal 10 karakter.'
      });
    }

    // 2. Project Existence & Assignment Check
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project tidak ditemukan.'
      });
    }

    if (project.supervisorId !== actorId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak ditugaskan sebagai Pengawas pada proyek ini.'
      });
    }

    // 3. Progress Logic: Cannot decrease (Phase 1 rule)
    if (verifiedProgress < project.verifiedProgress) {
      return res.status(400).json({
        success: false,
        message: `Progress tidak boleh turun. Progress saat ini: ${project.verifiedProgress}%`
      });
    }
    
    // 3.5. Stage Validation if provided
    if (stageId) {
      const stage = await prisma.projectStage.findFirst({
        where: { id: stageId, projectId: id }
      });
      if (!stage) {
        return res.status(400).json({
          success: false,
          message: 'Tahapan (Stage) yang dipilih tidak valid atau tidak milik proyek ini.'
        });
      }
    }

    // 4. Execution
    const previousProgress = project.verifiedProgress;
    
    const updatedProject = await ProjectRepository.update(id, {
      verifiedProgress,
      verifiedProgressUpdatedAt: new Date(),
      verifiedProgressById: actorId,
      progress: Math.round(verifiedProgress) // Sync with existing int progress
    });

    const log = await ProjectRepository.createProgressLog({
      projectId: id,
      supervisorId: actorId,
      previousProgress,
      newProgress: verifiedProgress,
      notes,
      stageId: stageId || null
    });

    res.json({
      success: true,
      message: 'Progress proyek berhasil diverifikasi.',
      data: {
        project: serializeDecimal(updatedProject),
        log: serializeDecimal(log)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectProgressHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminId } = req.query;
    
    // Check project existence
    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project tidak ditemukan.'
      });
    }

    // Ownership check for admin
    if (adminId && project.adminId !== adminId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses ke riwayat progress proyek ini.'
      });
    }

    const history = await ProjectRepository.findProgressHistoryByProjectId(id);

    res.json({
      success: true,
      data: {
        currentProgress: project.verifiedProgress,
        history: serializeDecimal(history)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const activateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: 'adminId is required for activation',
      });
    }

    const project = await ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Ownership check
    if (project.adminId !== adminId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk mengaktifkan project ini.',
      });
    }

    // Already active check - Support multiple active status labels
    const activeStatuses = ['active', 'ongoing', 'Berjalan'];
    if (activeStatuses.includes(project.status)) {
      return res.status(400).json({
        success: false,
        message: 'Project sudah aktif.',
      });
    }

    // Readiness check
    const missing = [];
    if (!project.customerId) missing.push("Customer belum terhubung");
    if (!project.supervisorId) missing.push("Pengawas belum ditugaskan");
    if (!project.foremanId) missing.push("Mandor belum ditugaskan");
    if (project._count.stages === 0) missing.push("Tahapan pekerjaan (Stages) belum dibuat");
    if (project._count.rabPlans === 0) missing.push("RAB Plan belum dibuat");
    
    // Check if there is an approved or any RabPlan with totalAmount > 0
    const hasValidRab = project.rabPlans && project.rabPlans.length > 0 && parseFloat(project.rabPlans[0].totalAmount) > 0;
    if (!hasValidRab) missing.push("Total RAB harus lebih dari 0");
    
    if (!project.startDate) missing.push("Tanggal mulai belum tersedia");
    if (!project.estimatedEndDate) missing.push("Estimasi selesai belum tersedia");

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Project is not ready for activation. Missing requirements found.',
        missing
      });
    }

    // Update status to Berjalan (consistent with local seed and Material Request checks)
    const updatedProject = await ProjectRepository.update(id, {
      status: 'Berjalan'
    });

    res.json({
      success: true,
      message: 'Project berhasil diaktifkan menjadi status Berjalan.',
      data: serializeDecimal(updatedProject),
    });
  } catch (error) {
    next(error);
  }
};
