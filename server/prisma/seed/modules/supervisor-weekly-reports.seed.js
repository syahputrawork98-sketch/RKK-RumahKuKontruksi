/**
 * Supervisor Weekly Report Seed Module
 * Handles creation of SupervisorWeeklyReport, SupervisorWeeklyReportJournal, and SupervisorWeeklyReportNote.
 */

export const seedSupervisorWeeklyReports = async (prisma, ctx) => {
  console.log('Seeding Supervisor Weekly Reports...');

  const { activeProject1: activeProject } = ctx.projects;
  const { supervisor1 } = ctx.supervisors;
  const { admin1 } = ctx.admins;
  const { journal1 } = ctx.weeklyJournals;
  const { stageActive1_1: stage1 } = ctx.stages;

  const report1 = await prisma.supervisorWeeklyReport.create({
    data: {
      id: 'swr-active-001',
      projectId: activeProject.id,
      supervisorId: supervisor1.id,
      weekStartDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      weekEndDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      status: 'approved',
      submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
      reviewedByAdminId: admin1.id,
      isVisibleToCustomer: true,
      summary: 'Pekerjaan minggu pertama berjalan lancar. Persiapan lahan selesai 100%.',
      journals: {
        create: [
          { weeklyJournalId: journal1.id }
        ]
      },
      notes: {
        create: [
          {
            stage: { connect: { id: stage1.id } },
            type: 'PROGRESS',
            content: 'Verifikasi progres persiapan lahan.',
            progress: 100
          }
        ]
      }
    }
  });

  ctx.supervisorWeeklyReports = { report1 };
  console.log('Supervisor Weekly Reports seeded successfully.');
};
