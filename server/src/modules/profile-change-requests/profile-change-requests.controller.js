import * as Repository from './profile-change-requests.repository.js';
import * as AuditLogRepository from '../audit-logs/audit-logs.repository.js';

export const getRequests = async (req, res, next) => {
  try {
    const requests = await Repository.findAll(req.query);
    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const request = await Repository.create(req.body);
    
    // Log the request creation
    await AuditLogRepository.create({
      actorRole: req.body.requestedByRole,
      actorId: req.body.requestedById,
      action: 'CREATE_PROFILE_CHANGE_REQUEST',
      entityType: 'ProfileChangeRequest',
      entityId: request.id,
      summary: `Request to change ${req.body.fieldName} for ${req.body.targetRole} (${req.body.targetId})`
    });

    res.status(201).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

export const reviewRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, reviewedByRole, reviewedById, note } = req.body;
    
    const request = await Repository.update(id, {
      status,
      reviewedByRole,
      reviewedById,
      reviewedAt: new Date(),
      note
    });

    // Log the review
    await AuditLogRepository.create({
      actorRole: reviewedByRole,
      actorId: reviewedById,
      action: status === 'approved' ? 'APPROVE_PROFILE_CHANGE' : 'REJECT_PROFILE_CHANGE',
      entityType: 'ProfileChangeRequest',
      entityId: id,
      summary: `${status.toUpperCase()} profile change request for ${request.targetRole}`
    });

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};
