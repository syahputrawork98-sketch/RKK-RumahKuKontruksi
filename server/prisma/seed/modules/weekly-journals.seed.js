/**
 * Weekly Journal Seed Module
 * Handles creation of WeeklyJournal and WeeklyJournalActivity entities.
 */

export const seedWeeklyJournals = async (prisma, ctx) => {
  console.log('Seeding Weekly Journals...');

  const { activeProject1, activeProject2 } = ctx.projects;
  const { foreman1, foreman2 } = ctx.foremen;
  const { supervisor1, supervisor2 } = ctx.supervisors;
  const { stageActive1_2, stageActive2_3, stageActive2_4 } = ctx.stages;

  const today = new Date();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - today.getDay() - 6);
  const lastWeekEnd = new Date(lastWeekStart);
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6);

  // Journal 1: Submitted by Foreman 1
  const journal1 = await prisma.weeklyJournal.create({
    data: {
      id: 'journal-active-001',
      projectId: activeProject1.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      weekStartDate: lastWeekStart,
      weekEndDate: lastWeekEnd,
      status: 'submitted',
      claimedProgress: 5.5,
      summary: 'Minggu ini fokus pada pembesian pondasi blok A dan pembersihan area.',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      activities: {
        create: [
          {
            workTitle: 'Pemasangan besi pondasi',
            description: 'Pemasangan besi tulangan untuk 4 titik pondasi utama.',
            projectStageId: stageActive1_2.id,
            progressClaim: 4.0,
            workerCount: 4
          },
          {
            workTitle: 'Mobilisasi material pasir',
            description: 'Bongkar muat 2 rit pasir untuk kebutuhan pasang dinding.',
            projectStageId: stageActive1_2.id,
            progressClaim: 1.5,
            workerCount: 2
          }
        ]
      }
    }
  });

  // Journal 2: Reviewed by Supervisor for Foreman 2
  const journal2 = await prisma.weeklyJournal.create({
    data: {
      id: 'journal-tipe36-001',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      weekStartDate: lastWeekStart,
      weekEndDate: lastWeekEnd,
      status: 'reviewed',
      claimedProgress: 8.0,
      verifiedProgressSnapshot: 58.0,
      summary: 'Pekerjaan struktur kolom praktis dan mulai pasangan bata ringan.',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      activities: {
        create: [
          {
            workTitle: 'Pasangan bata merah kamar mandi',
            description: 'Selesai pasangan bata merah setinggi 1.5m.',
            projectStageId: stageActive2_4.id,
            progressClaim: 5.0,
            workerCount: 3
          },
          {
            workTitle: 'Pengecoran kolom praktis P1-P4',
            description: 'Pengecoran 4 titik kolom praktis area ruang tamu.',
            projectStageId: stageActive2_3.id,
            progressClaim: 3.0,
            workerCount: 3
          }
        ]
      }
    }
  });

  ctx.weeklyJournals = { journal1, journal2 };
  console.log('Weekly Journals seeded successfully.');
};
