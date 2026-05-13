import express from 'express';
import * as Controller from './administrative-helper-documents.controller.js';

const router = express.Router();

router.get('/', Controller.list);
router.get('/:id', Controller.detail);
router.post('/', Controller.create);
router.patch('/:id', Controller.update);
router.patch('/:id/status', Controller.updateStatus);

export default router;
