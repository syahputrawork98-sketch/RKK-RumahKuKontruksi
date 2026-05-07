import express from 'express';
import * as SupervisorReportController from './supervisor-weekly-reports.controller.js';

const router = express.Router();

// GET routes
router.get('/', SupervisorReportController.getReports);
router.get('/context', SupervisorReportController.getReportContext);
router.get('/:id', SupervisorReportController.getReportById);

// POST/PATCH routes
router.post('/', SupervisorReportController.createReport);
router.patch('/:id', SupervisorReportController.updateReport);

// Action routes
router.post('/:id/submit', SupervisorReportController.submitReport);
router.post('/:id/review', SupervisorReportController.reviewReport);
router.post('/:id/publish', SupervisorReportController.publishReport);

export default router;
