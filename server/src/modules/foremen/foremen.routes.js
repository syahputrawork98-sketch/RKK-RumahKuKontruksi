import express from 'express';
import * as ForemanController from './foremen.controller.js';

const router = express.Router();

// Foreman Profile
router.get('/', ForemanController.getForemen);
router.get('/:id', ForemanController.getForemanById);
router.post('/', ForemanController.createForeman);
router.patch('/:id', ForemanController.updateForeman);
router.delete('/:id', ForemanController.deleteForeman);

// Certificates
router.get('/:id/certificates', ForemanController.getCertificates);
router.post('/:id/certificates', ForemanController.createCertificate);
router.patch('/certificates/:certificateId', ForemanController.updateCertificate);
router.delete('/certificates/:certificateId', ForemanController.deleteCertificate);

// Experiences
router.get('/:id/experiences', ForemanController.getExperiences);
router.post('/:id/experiences', ForemanController.createExperience);
router.patch('/experiences/:experienceId', ForemanController.updateExperience);
router.delete('/experiences/:experienceId', ForemanController.deleteExperience);

// Projects
router.get('/:id/projects', ForemanController.getForemanProjects);

export default router;
