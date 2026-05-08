import express from 'express';
import * as SuperadminController from './superadmins.controller.js';

const router = express.Router();

router.get('/', SuperadminController.getSuperadmins);
router.get('/stats/global', SuperadminController.getGlobalStats);
router.get('/:id', SuperadminController.getSuperadminById);
router.post('/', SuperadminController.createSuperadmin);
router.patch('/:id', SuperadminController.updateSuperadmin);
router.delete('/:id', SuperadminController.deleteSuperadmin);

export default router;
