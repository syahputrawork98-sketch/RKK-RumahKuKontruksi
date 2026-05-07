import express from 'express';
import * as ArchitectController from './architects.controller.js';

const router = express.Router();

// Architect routes
router.get('/', ArchitectController.getArchitects);
router.get('/:id', ArchitectController.getArchitectById);
router.post('/', ArchitectController.createArchitect);
router.patch('/:id', ArchitectController.updateArchitect);
router.delete('/:id', ArchitectController.deleteArchitect);

// Certificates routes
router.get('/:id/certificates', ArchitectController.getCertificates);
router.post('/:id/certificates', ArchitectController.createCertificate);
router.patch('/certificates/:certificateId', ArchitectController.updateCertificate);
router.delete('/certificates/:certificateId', ArchitectController.deleteCertificate);

// Experiences routes
router.get('/:id/experiences', ArchitectController.getExperiences);
router.post('/:id/experiences', ArchitectController.createExperience);
router.patch('/experiences/:experienceId', ArchitectController.updateExperience);
router.delete('/experiences/:experienceId', ArchitectController.deleteExperience);

export default router;
