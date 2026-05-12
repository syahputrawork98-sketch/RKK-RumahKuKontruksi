import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ForemanPaymentEligibilityRepository {
    async findAll(filters = {}) {
        const { projectId, foremanId, status } = filters;
        return await prisma.foremanWeeklyPaymentEligibility.findMany({
            where: {
                ...(projectId && { projectId }),
                ...(foremanId && { foremanId }),
                ...(status && { status })
            },
            include: {
                project: true,
                foreman: true,
                weeklyJournal: {
                    include: {
                        activities: {
                            include: {
                                rabItem: true,
                                stage: true
                            }
                        }
                    }
                },
                supervisorReport: true,
                items: {
                    include: {
                        rabItem: true,
                        weeklyJournalActivity: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async findById(id) {
        return await prisma.foremanWeeklyPaymentEligibility.findUnique({
            where: { id },
            include: {
                project: true,
                foreman: true,
                weeklyJournal: {
                    include: {
                        activities: {
                            include: {
                                rabItem: true,
                                stage: true
                            }
                        }
                    }
                },
                supervisorReport: true,
                items: {
                    include: {
                        rabItem: true,
                        weeklyJournalActivity: true
                    }
                }
            }
        });
    }

    async create(data) {
        const { items, ...eligibilityData } = data;
        return await prisma.foremanWeeklyPaymentEligibility.create({
            data: {
                ...eligibilityData,
                items: {
                    create: items
                }
            },
            include: {
                items: true
            }
        });
    }

    async updateStatus(id, updateData) {
        const { status, adminNote, reviewedById, reviewedAt, paidAt, approvedAmount } = updateData;
        
        return await prisma.$transaction(async (tx) => {
            const eligibility = await tx.foremanWeeklyPaymentEligibility.findUnique({
                where: { id }
            });

            const updated = await tx.foremanWeeklyPaymentEligibility.update({
                where: { id },
                data: {
                    ...(status && { status }),
                    ...(adminNote && { adminNote }),
                    ...(reviewedById && { reviewedById }),
                    ...(reviewedAt && { reviewedAt }),
                    ...(paidAt && { paidAt: status === 'paid_simulated' ? (paidAt || new Date()) : undefined }),
                    ...(approvedAmount !== undefined && { approvedAmount })
                }
            });

            // Create PaymentRecord foundation if status is paid_simulated
            if (status === 'paid_simulated' && eligibility) {
                const count = await tx.paymentRecord.count();
                const paymentCode = `PAY-FRM-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
                
                await tx.paymentRecord.create({
                    data: {
                        paymentCode,
                        projectId: eligibility.projectId,
                        foremanId: eligibility.foremanId,
                        type: 'FOREMAN_PAYMENT',
                        amount: approvedAmount || eligibility.approvedAmount || eligibility.estimatedAmount || 0,
                        status: 'paid', // Initial status is paid, waiting for admin verification
                        eligibilityId: eligibility.id,
                        note: `Simulated payment for Foreman weekly eligibility. Week: ${eligibility.weekNumber}`,
                        paidAt: updated.paidAt
                    }
                });
            }

            return updated;
        });
    }


    async updateItemStatus(itemId, updateData) {
        return await prisma.foremanWeeklyPaymentEligibilityItem.update({
            where: { id: itemId },
            data: updateData
        });
    }

    async getByJournalId(journalId) {
        return await prisma.foremanWeeklyPaymentEligibility.findFirst({
            where: { weeklyJournalId: journalId },
            include: {
                items: true
            }
        });
    }
}

export default new ForemanPaymentEligibilityRepository();
