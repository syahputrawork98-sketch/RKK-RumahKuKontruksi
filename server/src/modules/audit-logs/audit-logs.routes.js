import express from 'express';
import * as AuditLogController from './audit-logs.controller.js';

const router = express.Router();

router.get('/', AuditLogController.getAuditLogs);
router.post('/', AuditLogController.createAuditLog);

export default router;
