import express from 'express';
import * as ProjectController from './projects.controller.js';

const router = express.Router();

router.get('/', ProjectController.getProjects);
router.get('/:id', ProjectController.getProjectById);
router.get('/:id/stages', ProjectController.getProjectStages);
router.get('/:id/rab', ProjectController.getProjectRab);

export default router;
