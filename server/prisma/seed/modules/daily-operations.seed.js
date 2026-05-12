/**
 * Daily Operations Seed Module
 * Handles creation of DailyTask and DailyReport entities.
 */

export const seedDailyOperations = async (prisma, ctx) => {
  console.log('Seeding Scenario 7: Daily Tasks & Reports...');

  const { activeProject1: activeProject } = ctx.projects;
  const { foreman1 } = ctx.foremen;
  const { stageActive1_2: stage2 } = ctx.stages;
  const { itemBesi1: item2 } = ctx.rabItems;

  const dailyTask1 = await prisma.dailyTask.create({
    data: {
      id: 'task-active-001',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      stageId: stage2.id,
      rabItemId: item2.id,
      title: 'Persiapan Bekisting Pondasi',
      description: 'Menyiapkan bekisting untuk pengecoran pondasi blok A',
      targetDate: new Date(),
      status: 'completed',
      priority: 'high'
    }
  });

  const dailyTask2 = await prisma.dailyTask.create({
    data: {
      id: 'task-active-002',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      stageId: stage2.id,
      title: 'Pembersihan Area',
      targetDate: new Date(),
      status: 'todo',
      priority: 'medium'
    }
  });

  const dailyReport1 = await prisma.dailyReport.create({
    data: {
      id: 'report-active-001',
      reportCode: 'DR-2024-001',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      date: new Date(),
      status: 'draft',
      weatherSummary: 'Cerah di pagi hari, hujan ringan di sore',
      workerCount: 5,
      activitySummary: 'Telah menyelesaikan persiapan bekisting pondasi. Sempat terhenti sore karena hujan.',
      blockerSummary: 'Hujan rintik di sore hari memperlambat pekerjaan.',
      taskId: dailyTask1.id
    }
  });

  ctx.dailyTasks = { dailyTask1, dailyTask2 };
  ctx.dailyReports = { dailyReport1 };
  console.log('Daily Operations seeded successfully.');
};
