/**
 * Database Cleanup Module
 * Handles the deletion of existing data before seeding.
 * Order is critical to avoid foreign key constraint violations.
 */

export const cleanupDatabase = async (prisma) => {
  console.log('--- STARTING CURATED SEED DATA CLEANUP ---');
  console.log('Cleaning up existing data...');

  await prisma.paymentRecord.deleteMany({});
  await prisma.administrativeHelperDocument.deleteMany({});
  await prisma.appNotification.deleteMany({});
  await prisma.projectDocument.deleteMany({});
  await prisma.dailyReport.deleteMany({});
  await prisma.dailyTask.deleteMany({});
  await prisma.fieldIssue.deleteMany({});
  await prisma.materialRequestHistory.deleteMany({});
  await prisma.materialRequestItem.deleteMany({});
  await prisma.materialRequest.deleteMany({});
  await prisma.weeklyJournalReviewLog.deleteMany({});
  await prisma.weeklyJournalPhoto.deleteMany({});
  await prisma.weeklyJournalActivity.deleteMany({});
  await prisma.supervisorWeeklyReportJournal.deleteMany({});
  await prisma.supervisorWeeklyReportNote.deleteMany({});
  await prisma.supervisorWeeklyReportReviewLog.deleteMany({});
  await prisma.supervisorWeeklyReport.deleteMany({});
  await prisma.weeklyJournal.deleteMany({});
  await prisma.progressVerificationLog.deleteMany({});
  await prisma.projectStagePublicComment.deleteMany({});
  await prisma.projectStage.deleteMany({});
  await prisma.rabItem.deleteMany({});
  await prisma.rabCategory.deleteMany({});
  await prisma.rabPlan.deleteMany({});
  
  await prisma.designTenderBid.deleteMany({});
  await prisma.designTender.deleteMany({});
  await prisma.designRequest.deleteMany({});
  await prisma.project.deleteMany({});

  await prisma.architectCertificate.deleteMany({});
  await prisma.architectExperience.deleteMany({});
  await prisma.architect.deleteMany({});
  
  await prisma.foremanCertificate.deleteMany({});
  await prisma.foremanExperience.deleteMany({});
  await prisma.foreman.deleteMany({});

  await prisma.supervisorCertificate.deleteMany({});
  await prisma.supervisorExperience.deleteMany({});
  await prisma.supervisor.deleteMany({});

  await prisma.customer.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.superadmin.deleteMany({});
};

