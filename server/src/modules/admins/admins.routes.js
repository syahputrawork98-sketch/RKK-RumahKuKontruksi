import express from 'express';
import * as AdminController from './admins.controller.js';

const router = express.Router();

router.get('/', AdminController.getAdmins);
router.get('/dashboard-stats', AdminController.getDashboardStats);
router.get('/:id', AdminController.getAdminById);
router.post('/', AdminController.createAdmin);
router.patch('/:id', AdminController.updateAdmin);
router.delete('/:id', AdminController.deleteAdmin);

export default router;
