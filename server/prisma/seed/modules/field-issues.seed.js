/**
 * Field Issues Seed Module
 * Handles creation of FieldIssue entities.
 */

export const seedFieldIssues = async (prisma, ctx) => {
  console.log('Seeding Scenario 6: Field Issues...');

  const { activeProject1: activeProject } = ctx.projects;
  const { foreman1 } = ctx.foremen;
  const { supervisor1 } = ctx.supervisors;
  const { stageActive1_2: stage2 } = ctx.stages;

  const issue1 = await prisma.fieldIssue.create({
    data: {
      id: 'issue-active-001',
      issueCode: 'ISSUE-24-0001',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      title: 'Material Semen Telat',
      description: 'Pengiriman semen dari pusat logistik belum sampai, pekerjaan pengecoran tertunda.',
      category: 'Logistik',
      priority: 'high',
      status: 'open',
      stageId: stage2.id
    }
  });

  const issue2 = await prisma.fieldIssue.create({
    data: {
      id: 'issue-active-002',
      issueCode: 'ISSUE-24-0002',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      title: 'Cuaca Hujan Lebat',
      description: 'Pekerjaan outdoor dihentikan sementara karena hujan deras.',
      category: 'Alam',
      priority: 'medium',
      status: 'in_review'
    }
  });

  ctx.fieldIssues = { issue1, issue2 };
  console.log('Field Issues seeded successfully.');
};
