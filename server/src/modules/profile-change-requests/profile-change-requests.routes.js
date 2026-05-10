import express from 'express';
import * as Controller from './profile-change-requests.controller.js';

const router = express.Router();

router.get('/', Controller.getRequests);
router.post('/', Controller.createRequest);
router.patch('/:id/review', Controller.reviewRequest);

export default router;
