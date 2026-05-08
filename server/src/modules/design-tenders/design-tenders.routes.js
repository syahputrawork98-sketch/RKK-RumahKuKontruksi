import { Router } from 'express';
import * as DesignTenderController from './design-tenders.controller.js';

const router = Router();

// Admin / Public Tenders
router.get('/', DesignTenderController.getTenders);
router.post('/publish', DesignTenderController.publishTender);

// Arsitek Specific
router.get('/open', DesignTenderController.getOpenTenders);

// Detail & Actions
router.get('/:id', DesignTenderController.getTenderById);
router.get('/:id/bids', DesignTenderController.getDesignTenderBids);
router.post('/:id/bids', DesignTenderController.submitBid);
router.post('/:id/award/:bidId', DesignTenderController.awardBid);
router.delete('/:id', DesignTenderController.deleteTender);

export default router;
