import express from 'express';
import * as materialRequestController from './material-requests.controller.js';

const router = express.Router();

router.get('/', materialRequestController.getAllRequests);
router.get('/:id', materialRequestController.getRequestById);
router.post('/', materialRequestController.createRequest);
router.patch('/:id/status', materialRequestController.updateStatus);

export default router;
