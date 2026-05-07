import express from 'express';
import * as WeeklyJournalController from './weekly-journals.controller.js';

const router = express.Router();

router.get('/', WeeklyJournalController.getWeeklyJournals);
router.get('/:id', WeeklyJournalController.getWeeklyJournalById);
router.post('/', WeeklyJournalController.createWeeklyJournal);
router.patch('/:id', WeeklyJournalController.updateWeeklyJournal);
router.post('/:id/submit', WeeklyJournalController.submitWeeklyJournal);
router.post('/:id/review', WeeklyJournalController.reviewWeeklyJournal);

export default router;
