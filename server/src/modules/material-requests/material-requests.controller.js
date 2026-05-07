import * as materialRequestService from './material-requests.service.js';

export const getAllRequests = async (req, res, next) => {
  try {
    const filters = {
      projectId: req.query.projectId,
      foremanId: req.query.foremanId,
      supervisorId: req.query.supervisorId,
      status: req.query.status,
    };
    const requests = await materialRequestService.getAllRequests(filters);
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const getRequestById = async (req, res, next) => {
  try {
    const request = await materialRequestService.getRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Material request not found' });
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
    
    const request = await materialRequestService.updateRequestStatus(id, {
      status,
      actorId,
      actorRole,
      note,
      adminId,
      ...otherData
    });
    
    res.json(request);
  } catch (error) {
    next(error);
  }
};
