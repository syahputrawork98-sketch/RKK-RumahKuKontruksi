import express from 'express';
import * as fieldIssueController from './field-issues.controller.js';

const router = express.Router();

router.get('/', fieldIssueController.getAllIssues);
router.get('/:id', fieldIssueController.getIssueById);
router.post('/', fieldIssueController.createIssue);
router.patch('/:id/status', fieldIssueController.updateStatus);

export default router;
