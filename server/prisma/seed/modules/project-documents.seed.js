/**
 * Project Documents Seed Module
 * Handles creation of ProjectDocument entities.
 */

export const seedProjectDocuments = async (prisma, ctx) => {
  console.log('Seeding Scenario 8: Project Documents...');

  const { activeProject1: activeProject } = ctx.projects;
  const { supervisor1 } = ctx.supervisors;
  const { admin1 } = ctx.admins;
  const { stageActive1_1: stage1 } = ctx.stages;

  const doc1 = await prisma.projectDocument.create({
    data: {
      projectId: activeProject.id,
      title: 'Foto Lahan Sebelum Konstruksi',
      description: 'Dokumentasi kondisi lahan sebelum proses perataan',
      category: 'lapangan',
      fileName: 'lahan-sebelum-konstruksi.jpg',
      fileUrl: '/uploads/demo/lahan-sebelum-konstruksi.jpg',
      mimeType: 'image/jpeg',
      size: 2048000, // 2MB
      visibility: 'customer_visible',
      status: 'active',
      uploadedByRole: 'pengawas',
      uploadedById: supervisor1.id,
      stageId: stage1.id
    }
  });

  const doc2 = await prisma.projectDocument.create({
    data: {
      projectId: activeProject.id,
      title: 'Surat Izin Mendirikan Bangunan',
      description: 'IMB Proyek RKK-001',
      category: 'legal',
      fileName: 'imb-rkk-001.pdf',
      fileUrl: '/uploads/demo/imb-rkk-001.pdf',
      mimeType: 'application/pdf',
      size: 1024000, // 1MB
      visibility: 'internal',
      status: 'active',
      uploadedByRole: 'admin',
      uploadedById: admin1.id
    }
  });

  ctx.projectDocuments = { doc1, doc2 };
  console.log('Project Documents seeded successfully.');
};
