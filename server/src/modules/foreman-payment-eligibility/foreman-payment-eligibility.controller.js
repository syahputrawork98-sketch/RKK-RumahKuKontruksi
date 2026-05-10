import repository from './foreman-payment-eligibility.repository.js';
import { findWeeklyJournalById } from '../weekly-journals/weekly-journals.repository.js';

class ForemanPaymentEligibilityController {
    async getAll(req, res) {
        try {
            const { projectId, foremanId, status } = req.query;
            const eligibilities = await repository.findAll({ projectId, foremanId, status });
            res.json({ success: true, data: eligibilities });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const eligibility = await repository.findById(id);
            if (!eligibility) {
                return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
            }
            res.json({ success: true, data: eligibility });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async initializeFromJournal(req, res) {
        try {
            const { journalId, actorRole } = req.body;
            
            if (actorRole !== 'admin' && actorRole !== 'superadmin') {
                return res.status(403).json({ success: false, message: "Hanya Admin yang dapat melakukan inisialisasi" });
            }

            // Check if already exists
            const existing = await repository.getByJournalId(journalId);
            if (existing) {
                return res.status(400).json({ success: false, message: "Eligibility untuk jurnal ini sudah ada", data: existing });
            }

            const journal = await findWeeklyJournalById(journalId);
            if (!journal) {
                return res.status(404).json({ success: false, message: "Jurnal tidak ditemukan" });
            }

            // Calculate estimated amount from RAB items
            const items = journal.activities.map(act => {
                const estAmount = act.rabItem ? (Number(act.rabItem.unitPrice) * Number(act.volume || 0)) : 0;
                return {
                    rabItemId: act.rabItemId,
                    projectStageId: act.projectStageId,
                    weeklyJournalActivityId: act.id,
                    description: act.workTitle || act.description,
                    estimatedAmount: estAmount,
                    status: 'pending'
                };
            });

            const totalEstimated = items.reduce((sum, item) => sum + item.estimatedAmount, 0);

            const eligibilityData = {
                projectId: journal.projectId,
                foremanId: journal.foremanId,
                weeklyJournalId: journal.id,
                weekNumber: journal.weekNumber || 1, // Fallback
                periodStart: journal.weekStartDate,
                periodEnd: journal.weekEndDate,
                status: 'pending_review',
                estimatedAmount: totalEstimated,
                items
            };

            const newEligibility = await repository.create(eligibilityData);
            res.status(201).json({ success: true, data: newEligibility });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status, adminNote, approvedAmount, actorRole, actorId } = req.body;

            if (actorRole !== 'admin' && actorRole !== 'superadmin') {
                return res.status(403).json({ success: false, message: "Hanya Admin yang dapat mengubah status" });
            }

            const updateData = {
                status,
                adminNote,
                approvedAmount,
                reviewedById: actorId,
                reviewedAt: new Date()
            };

            if (status === 'paid_simulated') {
                updateData.paidAt = new Date();
            }

            const updated = await repository.updateStatus(id, updateData);
            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateItemStatus(req, res) {
        try {
            const { itemId } = req.params;
            const { status, approvedAmount, note, actorRole } = req.body;

            if (actorRole !== 'admin' && actorRole !== 'superadmin') {
                return res.status(403).json({ success: false, message: "Hanya Admin yang dapat mengubah item" });
            }

            const updated = await repository.updateItemStatus(itemId, { status, approvedAmount, note });
            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new ForemanPaymentEligibilityController();
