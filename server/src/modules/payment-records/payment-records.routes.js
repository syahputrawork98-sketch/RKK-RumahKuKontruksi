import express from 'express';
import * as paymentController from './payment-records.controller.js';

const router = express.Router();

router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.post('/', paymentController.createPayment);
router.patch('/:id/status', paymentController.updateStatus);

export default router;
