import * as AuditLogRepository from './audit-logs.repository.js';

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLogRepository.findAll(req.query);
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
};

export const createAuditLog = async (req, res, next) => {
  try {
    const log = await AuditLogRepository.create(req.body);
    res.status(201).json({
      success: true,
      data: log
    });
  } catch (error) {
    next(error);
  }
};
