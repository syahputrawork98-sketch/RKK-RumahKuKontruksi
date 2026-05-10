import * as Repository from './profile-change-requests.repository.js';
import * as AuditLogRepository from '../audit-logs/audit-logs.repository.js';
import * as CustomerRepository from '../customers/customers.repository.js';
import * as AdminRepository from '../admins/admins.repository.js';
import * as SupervisorRepository from '../supervisors/supervisors.repository.js';
import * as ForemanRepository from '../foremen/foremen.repository.js';
import * as ArchitectRepository from '../architects/architects.repository.js';

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
    
    // Get existing request
    const request = await Repository.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Request has already been processed' });
    }

    const updatedRequest = await Repository.update(id, {
      status,
      reviewedByRole,
      reviewedById,
      reviewedAt: new Date(),
      note
    });

    // If approved, apply the change to the target entity
    if (status === 'approved') {
      const { targetRole, targetId, fieldName, newValue } = request;
      const updateData = { [fieldName]: newValue };

      try {
        switch (targetRole.toLowerCase()) {
          case 'customer':
          case 'konsumen':
            await CustomerRepository.update(targetId, updateData);
            break;
          case 'admin':
            await AdminRepository.update(targetId, updateData);
            break;
          case 'pengawas':
          case 'supervisor':
            await SupervisorRepository.update(targetId, updateData);
            break;
          case 'mandor':
          case 'foreman':
            await ForemanRepository.update(targetId, updateData);
            break;
          case 'arsitek':
          case 'architect':
            await ArchitectRepository.update(targetId, updateData);
            break;
        }
        
        // Log the application of the change
        await AuditLogRepository.create({
          actorRole: reviewedByRole,
          actorId: reviewedById,
          action: 'APPLY_PROFILE_CHANGE',
          entityType: targetRole,
          entityId: targetId,
          summary: `Successfully applied approved change for ${fieldName} to ${newValue}`
        });
      } catch (updateError) {
        console.error("Failed to apply profile change:", updateError);
      }
    }

    // Log the review action
    await AuditLogRepository.create({
      actorRole: reviewedByRole,
      actorId: reviewedById,
      action: status === 'approved' ? 'APPROVE_PROFILE_CHANGE' : 'REJECT_PROFILE_CHANGE',
      entityType: 'ProfileChangeRequest',
      entityId: id,
      summary: `${status.toUpperCase()} profile change request for ${request.targetRole} (${request.targetId}). Field: ${request.fieldName}`
    });

    res.json({
      success: true,
      data: updatedRequest
    });
  } catch (error) {
    next(error);
  }
};
