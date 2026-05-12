import express from 'express';
import * as documentController from './project-documents.controller.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', documentController.getDocuments);
router.get('/:id', documentController.getDocumentById);
router.post('/', documentController.createDocument);
router.post('/upload', upload.single('file'), documentController.uploadDocument);
router.patch('/:id/status', documentController.updateDocumentStatus);
router.delete('/:id', documentController.deleteDocument);


export default router;
