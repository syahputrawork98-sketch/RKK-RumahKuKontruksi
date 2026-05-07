import express from 'express';
import * as RabController from './rab.controller.js';

const router = express.Router();

// Plans
router.get('/project/:projectId', RabController.getRabByProject);
router.post('/project/:projectId/plans', RabController.createRabPlan);
router.patch('/plans/:rabPlanId', RabController.updateRabPlan);

// Categories
router.post('/plans/:rabPlanId/categories', RabController.createRabCategory);
router.patch('/categories/:categoryId', RabController.updateRabCategory);
router.delete('/categories/:categoryId', RabController.deleteRabCategory);

// Items
router.post('/categories/:categoryId/items', RabController.createRabItem);
router.patch('/items/:itemId', RabController.updateRabItem);
router.delete('/items/:itemId', RabController.deleteRabItem);

export default router;
