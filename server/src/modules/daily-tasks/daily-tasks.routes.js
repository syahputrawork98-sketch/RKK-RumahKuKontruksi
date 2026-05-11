import express from 'express';
import * as taskController from './daily-tasks.controller.js';

const router = express.Router();

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.patch('/:id/status', taskController.updateTaskStatus);

export default router;
