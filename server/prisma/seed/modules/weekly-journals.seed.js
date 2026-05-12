/**
 * Weekly Journal Seed Module
 * Handles creation of WeeklyJournal, WeeklyJournalActivity, and WeeklyJournalPhoto.
 */

export const seedWeeklyJournals = async (prisma, ctx) => {
  console.log('Seeding Weekly Journals...');

  const { activeProject1: activeProject } = ctx.projects;
  const { foreman1 } = ctx.foremen;
  const { supervisor1 } = ctx.supervisors;
  const { stageActive1_1: stage1, stageActive1_2: stage2 } = ctx.stages;
  const { itemSemen1: item1 } = ctx.rabItems;

  const journal1 = await prisma.weeklyJournal.create({
    data: {
      id: 'journal-active-001',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      weekStartDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      weekEndDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      status: 'approved',
      submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      reviewedById: supervisor1.id,
      activities: {
        create: [
          {
            projectStageId: stage1.id,
            rabItemId: item1.id,
            workTitle: 'Pembersihan Lahan',
            description: 'Pembersihan lahan dan mobilisasi alat berat.',
            progressClaim: 100
          }
        ]
      }
    }
  });

  const journal2 = await prisma.weeklyJournal.create({
    data: {
      id: 'journal-active-002',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      weekStartDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      weekEndDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'submitted',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      activities: {
        create: [
          {
            projectStageId: stage2.id,
            workTitle: 'Galian Pondasi',
            description: 'Galian pondasi dan pemasangan bouwplank.',
            progressClaim: 40
          }
        ]
      }
    }
  });

  ctx.weeklyJournals = { journal1, journal2 };
  console.log('Weekly Journals seeded successfully.');
};
