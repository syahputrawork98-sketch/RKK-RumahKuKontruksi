import express from 'express';
import * as reportController from './daily-reports.controller.js';

const router = express.Router();

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);
router.put('/:id', reportController.updateReport);
router.patch('/:id/submit', reportController.submitReport);
router.patch('/:id/review', reportController.reviewReport);

export default router;
