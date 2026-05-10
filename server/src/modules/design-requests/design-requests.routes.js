import { Router } from 'express';
import * as DesignRequestController from './design-requests.controller.js';

const router = Router();

router.get('/', DesignRequestController.getDesignRequests);
router.get('/:id', DesignRequestController.getDesignRequestById);
router.post('/', DesignRequestController.createDesignRequest);
router.patch('/:id', DesignRequestController.updateDesignRequest);
router.delete('/:id', DesignRequestController.deleteDesignRequest);
router.patch('/:id/assign', DesignRequestController.assignArchitect);
router.post('/:id/convert-to-project', DesignRequestController.convertToProject);
router.post('/:id/history', DesignRequestController.addHistory);
router.post('/:id/revision', DesignRequestController.requestRevision);

export default router;
