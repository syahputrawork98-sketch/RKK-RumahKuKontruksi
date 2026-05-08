import express from 'express';
import * as ProjectStageController from './project-stages.controller.js';

const router = express.Router();

router.get('/project/:projectId', ProjectStageController.getStagesByProject);
router.get('/:id', ProjectStageController.getStageById);
router.post('/project/:projectId', ProjectStageController.createStage);
router.patch('/:id', ProjectStageController.updateStage);
router.delete('/:id', ProjectStageController.deleteStage);

export default router;
