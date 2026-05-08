import express from 'express';
import * as SupervisorController from './supervisors.controller.js';

const router = express.Router();

// Supervisor Profile
router.get('/', SupervisorController.getSupervisors);
router.get('/:id', SupervisorController.getSupervisorById);
router.post('/', SupervisorController.createSupervisor);
router.patch('/:id', SupervisorController.updateSupervisor);
router.delete('/:id', SupervisorController.deleteSupervisor);
router.get('/:id/stats', SupervisorController.getSupervisorStats);

// Certificates
router.get('/:id/certificates', SupervisorController.getCertificates);
router.post('/:id/certificates', SupervisorController.createCertificate);
router.patch('/certificates/:certificateId', SupervisorController.updateCertificate);
router.delete('/certificates/:certificateId', SupervisorController.deleteCertificate);

// Experiences
router.get('/:id/experiences', SupervisorController.getExperiences);
router.post('/:id/experiences', SupervisorController.createExperience);
router.patch('/experiences/:experienceId', SupervisorController.updateExperience);
router.delete('/experiences/:experienceId', SupervisorController.deleteExperience);

export default router;
