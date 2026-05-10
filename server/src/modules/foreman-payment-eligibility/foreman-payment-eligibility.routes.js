import express from 'express';
import controller from './foreman-payment-eligibility.controller.js';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/initialize', controller.initializeFromJournal);
router.patch('/:id/status', controller.updateStatus);
router.patch('/items/:itemId/status', controller.updateItemStatus);

export default router;
