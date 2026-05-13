/**
 * Supervisor Weekly Report Seed Module
 * Handles creation of SupervisorWeeklyReport and related Note/Journal entities.
 */

export const seedSupervisorWeeklyReports = async (prisma, ctx) => {
  console.log('Seeding Supervisor Weekly Reports...');

  const { activeProject1, activeProject2 } = ctx.projects;
  const { supervisor1, supervisor2 } = ctx.supervisors;
  const { journal1, journal2 } = ctx.weeklyJournals;
  const { stageActive1_2, stageActive2_4 } = ctx.stages;

  const today = new Date();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - today.getDay() - 6);
  const lastWeekEnd = new Date(lastWeekStart);
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6);

  // Report 1: Submitted by Supervisor 1
  const report1 = await prisma.supervisorWeeklyReport.create({
    data: {
      id: 'report-weekly-001',
      projectId: activeProject1.id,
      supervisorId: supervisor1.id,
      weekStartDate: lastWeekStart,
      weekEndDate: lastWeekEnd,
      status: 'submitted',
      verifiedProgressSnapshot: 32.0,
      summary: 'Kualitas pekerjaan pembesian cukup baik. Ada kendala cuaca tapi bisa dimitigasi.',
      qualityNotes: 'Ikatan kawat bendrat perlu diperkuat pada bagian stek kolom.',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      journals: {
        create: [
          { weeklyJournalId: journal1.id, note: 'Data klaim mandor sesuai dengan observasi lapangan.' }
        ]
      },
      notes: {
        create: [
          {
            type: 'PROGRESS',
            content: 'Pekerjaan pondasi mencapai target mingguan.',
            projectStageId: stageActive1_2.id,
            progress: 32.0
          }
        ]
      }
    }
  });

  // Report 2: Approved by Admin for Supervisor 2
  const report2 = await prisma.supervisorWeeklyReport.create({
    data: {
      id: 'report-weekly-tipe36-001',
      projectId: activeProject2.id,
      supervisorId: supervisor2.id,
      weekStartDate: lastWeekStart,
      weekEndDate: lastWeekEnd,
      status: 'approved',
      verifiedProgressSnapshot: 58.0,
      summary: 'Progres sangat positif. Pasangan dinding berjalan lebih cepat dari jadwal.',
      qualityNotes: 'Campuran semen pasir untuk plesteran sudah sesuai takaran.',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      reviewedByAdminId: 'admin-001',
      journals: {
        create: [
          { weeklyJournalId: journal2.id, note: 'Laporan mandor sangat detail dan akurat.' }
        ]
      },
      notes: {
        create: [
          {
            type: 'QUALITY',
            content: 'Presisi pasangan bata ringan sangat baik.',
            projectStageId: stageActive2_4.id,
            severity: 'low'
          }
        ]
      }
    }
  });

  ctx.supervisorWeeklyReports = { report1, report2 };
  console.log('Supervisor Weekly Reports seeded successfully.');
};
