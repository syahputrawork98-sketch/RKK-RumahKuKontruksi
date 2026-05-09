import * as materialRequestService from './material-requests.service.js';

export const getAllRequests = async (req, res, next) => {
  try {
    const filters = {
      projectId: req.query.projectId,
      foremanId: req.query.foremanId,
      supervisorId: req.query.supervisorId,
      status: req.query.status,
      adminId: req.query.adminId,
    };
    const requests = await materialRequestService.getAllRequests(filters);
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const getRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminId } = req.query;

    const request = await materialRequestService.getRequestById(id);
    if (!request) {
      return res.status(404).json({ message: 'Material request not found' });
    }

    // Ownership check for admin
    if (adminId && request.project.adminId !== adminId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses ke permintaan material ini.'
      });
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const request = await materialRequestService.createRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, actorId, actorRole, note, adminId, ...otherData } = req.body;
    
    const request = await materialRequestService.getRequestById(id);
    if (!request) {
      return res.status(404).json({ message: 'Material request not found' });
    }

    // Ownership check for admin
    const isAdmin = actorRole?.toLowerCase() === 'admin';
    if (isAdmin && adminId && request.project.adminId !== adminId) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk mengubah status permintaan ini.'
      });
    }

    const updated = await materialRequestService.updateRequestStatus(id, {
      status,
      actorId,
      actorRole,
      note,
      adminId,
      ...otherData
    });
    
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getRabUsage = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const usage = await materialRequestService.getRabUsageByProject(projectId);
    res.json(usage);
  } catch (error) {
    next(error);
  }
};
