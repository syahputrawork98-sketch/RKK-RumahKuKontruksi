import * as DesignRequestRepository from './design-requests.repository.js';
import prisma from '../../config/prisma.js';

export const getDesignRequests = async (req, res, next) => {
  try {
    const filters = {
      customerId: req.query.customerId,
      architectId: req.query.architectId,
      status: req.query.status
    };
    const data = await DesignRequestRepository.findAll(filters);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getDesignRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DesignRequestRepository.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Design request not found' });
    }
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createDesignRequest = async (req, res, next) => {
  try {
    const { title, description, buildingType, location, estimatedBudget, customerId } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const data = await DesignRequestRepository.create({
      title,
      description,
      buildingType,
      location,
      estimatedBudget,
      customerId,
      status: 'submitted'
    });
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateDesignRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DesignRequestRepository.update(id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteDesignRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    await DesignRequestRepository.softDelete(id);
    res.json({ success: true, message: 'Design request deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const assignArchitect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { architectId } = req.body;
    
    if (!architectId) {
      return res.status(400).json({ success: false, message: 'Architect ID is required' });
    }

    const data = await DesignRequestRepository.assignArchitect(id, architectId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const convertToProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    // 0. Hard Guard: Admin ID Check
    if (!adminId) {
      return res.status(400).json({ success: false, message: 'Admin ID diperlukan untuk inisialisasi project draft.' });
    }

    const request = await DesignRequestRepository.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Design request not found' });
    }

    // 1. Eligibility Check: Status
    if (request.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Pengajuan desain harus dalam status Approved.' });
    }

    // 2. Eligibility Check: Customer
    if (!request.customerId) {
      return res.status(400).json({ success: false, message: 'Pengajuan desain tidak memiliki data Konsumen yang valid.' });
    }

    // 3. Eligibility Check: Existing Project Link (DesignRequest side)
    if (request.projectId) {
      return res.status(400).json({ success: false, message: 'Project draft sudah pernah dibuat untuk pengajuan ini (DesignRequest link exists).' });
    }

    // 4. Eligibility Check: History Decision (Customer Intent)
    const history = request.history || [];
    const latestDecision = history.find(h => h.action === 'customer_post_design_decision');
    if (!latestDecision || latestDecision.metadata?.decision !== 'continue_to_construction_preparation') {
      return res.status(400).json({ success: false, message: 'Konsumen belum memilih alur Lanjut Konstruksi.' });
    }

    // 5. Eligibility Check: History Review (Admin Governance)
    const hasFinalReview = history.some(h => h.action === 'admin_construction_transition_review');
    if (!hasFinalReview) {
      return res.status(400).json({ success: false, message: 'Review transisi final dari Admin belum dilakukan.' });
    }

    // 6. Hard Guard: Duplicate Project (Project side via sourceDesignRequestId)
    const existingProject = await prisma.project.findFirst({
      where: { sourceDesignRequestId: id }
    });
    if (existingProject) {
      return res.status(400).json({ success: false, message: `Project draft sudah ada di sistem (ID: ${existingProject.projectCode}).` });
    }

    const projectData = {
      projectCode: `PRJ-${Date.now().toString().slice(-6)}`,
      name: request.title,
      customerId: request.customerId,
      location: request.location,
      budgetTotal: request.estimatedBudget || 0,
      adminId: adminId,
      type: 'Pembangunan',
      status: 'planning' // Strictly draft/planning
    };

    const result = await DesignRequestRepository.convertToProject(id, projectData);
    
    res.json({ 
      success: true, 
      message: 'Draft project created successfully', 
      data: result 
    });
  } catch (error) {
    next(error);
  }
};

export const addHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action, actorRole, actorId, actorName, note, metadata } = req.body;

    const data = await DesignRequestRepository.createHistory({
      designRequestId: id,
      action,
      actorRole,
      actorId,
      actorName,
      note,
      metadata
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const requestRevision = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { revisionType, note, actorRole, actorId, actorName } = req.body;

    if (!['major', 'minor'].includes(revisionType)) {
      return res.status(400).json({ success: false, message: 'Revision type must be major or minor' });
    }

    const request = await DesignRequestRepository.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Design request not found' });
    }

    // Revision Limit Checks
    if (revisionType === 'major' && request.majorRevisionCount >= 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'Batas revisi besar (3x) telah tercapai. Perubahan berikutnya perlu keputusan Admin.',
        isLimitReached: true
      });
    }

    if (revisionType === 'minor' && request.minorRevisionCount >= 5) {
      return res.status(400).json({ 
        success: false, 
        message: 'Batas revisi kecil (5x) telah tercapai. Perubahan berikutnya perlu keputusan Admin.',
        isLimitReached: true
      });
    }

    // 1. Update Revision Count and Status
    await DesignRequestRepository.updateRevisionCount(id, revisionType);
    await DesignRequestRepository.update(id, { status: 'revision_requested' });

    // 2. Add History
    const history = await DesignRequestRepository.createHistory({
      designRequestId: id,
      action: `revision_${revisionType}`,
      actorRole,
      actorId,
      actorName,
      note: `Permintaan Revisi (${revisionType}): ${note}`,
      metadata: { revisionType }
    });

    res.json({ 
      success: true, 
      message: `Revisi ${revisionType} berhasil diajukan.`,
      data: history 
    });
  } catch (error) {
    next(error);
  }
};
