import express from 'express';
import * as controller from './project-stage-public-comments.controller.js';

const router = express.Router();

// Stage-specific routes
router.get('/stage/:stageId', controller.getStageComments);
router.post('/stage/:stageId', controller.createComment);

// Individual comment routes
router.patch('/:id', controller.updateComment);
router.delete('/:id', controller.deleteComment);

export default router;
