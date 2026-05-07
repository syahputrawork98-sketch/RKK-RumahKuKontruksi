import express from 'express';
import * as ProjectController from './projects.controller.js';

const router = express.Router();

router.get('/', ProjectController.getProjects);
router.post('/', ProjectController.createProject);
router.get('/:id/stages', ProjectController.getProjectStages);
router.get('/:id/rab', ProjectController.getProjectRab);
router.patch('/:id/verify-progress', ProjectController.verifyProjectProgress);
router.get('/:id/progress-history', ProjectController.getProjectProgressHistory);
router.get('/:id', ProjectController.getProjectById);
router.patch('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;
