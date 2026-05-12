import express from 'express';
import * as Controller from './notifications.controller.js';

const router = express.Router();

router.get('/', Controller.list);
router.get('/unread-count', Controller.unreadCount);
router.patch('/:id/read', Controller.markRead);
router.patch('/read-all', Controller.markAllRead);

export default router;
