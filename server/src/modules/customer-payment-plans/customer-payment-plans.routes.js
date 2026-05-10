import express from 'express';
import * as PaymentController from './customer-payment-plans.controller.js';

const router = express.Router();

router.get('/:projectId', PaymentController.getPaymentPlan);
router.get('/:projectId/init', PaymentController.getInitializationData);
router.post('/setup', PaymentController.setupPaymentPlan);
router.patch('/milestones/:milestoneId/status', PaymentController.updateMilestone);

export default router;
