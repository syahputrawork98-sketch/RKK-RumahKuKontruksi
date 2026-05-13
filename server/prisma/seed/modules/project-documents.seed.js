/**
 * Project Documents Seed Module
 * Handles creation of ProjectDocument entities.
 */

export const seedProjectDocuments = async (prisma, ctx) => {
  console.log('Seeding Scenario 8: Project Documents...');

  const { activeProject1, activeProject2 } = ctx.projects;
  const { supervisor1, supervisor2 } = ctx.supervisors;
  const { admin1, admin2 } = ctx.admins;
  const { stageActive1_1, stageActive2_1, stageActive2_2, stageActive2_3 } = ctx.stages;

  const doc1 = await prisma.projectDocument.create({
    data: {
      projectId: activeProject1.id,
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
      stageId: stageActive1_1.id
    }
  });

  const doc2 = await prisma.projectDocument.create({
    data: {
      projectId: activeProject1.id,
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

  // --- Project Documents for Active Project 2 (Rumah Tipe 36 Depok) ---
  const docTipe36Rab = await prisma.projectDocument.create({
    data: {
      projectId: activeProject2.id,
      title: 'RAB Rumah Tipe 36 Approved',
      description: 'Dokumen RAB approved untuk Pembangunan Rumah Tipe 36 Depok dengan nilai Rp139.985.000.',
      category: 'rab',
      fileName: 'rab-rumah-tipe-36-approved.pdf',
      fileUrl: '/uploads/demo/rumah-tipe-36/rab-rumah-tipe-36-approved.pdf',
      mimeType: 'application/pdf',
      size: 1536000,
      visibility: 'customer_visible',
      status: 'active',
      uploadedByRole: 'admin',
      uploadedById: admin2.id
    }
  });

  const docTipe36Gambar = await prisma.projectDocument.create({
    data: {
      projectId: activeProject2.id,
      title: 'Gambar Kerja Rumah Tipe 36',
      description: 'Gambar kerja lokal untuk koordinasi pekerjaan struktur, dinding, atap, MEP ringan, dan finishing Rumah Tipe 36.',
      category: 'gambar_kerja',
      fileName: 'gambar-kerja-rumah-tipe-36.pdf',
      fileUrl: '/uploads/demo/rumah-tipe-36/gambar-kerja-rumah-tipe-36.pdf',
      mimeType: 'application/pdf',
      size: 2457600,
      visibility: 'internal',
      status: 'active',
      uploadedByRole: 'pengawas',
      uploadedById: supervisor2.id
    }
  });

  const docTipe36Jadwal = await prisma.projectDocument.create({
    data: {
      projectId: activeProject2.id,
      title: 'Jadwal Kerja Rumah Tipe 36',
      description: 'Jadwal kerja bertahap dari persiapan, pondasi, struktur, dinding, atap, MEP, hingga finishing.',
      category: 'jadwal',
      fileName: 'jadwal-kerja-rumah-tipe-36.xlsx',
      fileUrl: '/uploads/demo/rumah-tipe-36/jadwal-kerja-rumah-tipe-36.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 768000,
      visibility: 'internal',
      status: 'active',
      uploadedByRole: 'admin',
      uploadedById: admin2.id
    }
  });

  const docTipe36FotoPondasi = await prisma.projectDocument.create({
    data: {
      projectId: activeProject2.id,
      title: 'Foto Progress Pondasi Rumah Tipe 36',
      description: 'Dokumentasi pekerjaan tanah dan pondasi yang sudah selesai diverifikasi.',
      category: 'lapangan',
      fileName: 'foto-progress-pondasi-rumah-tipe-36.jpg',
      fileUrl: '/uploads/demo/rumah-tipe-36/foto-progress-pondasi-rumah-tipe-36.jpg',
      mimeType: 'image/jpeg',
      size: 1843200,
      visibility: 'customer_visible',
      status: 'active',
      uploadedByRole: 'pengawas',
      uploadedById: supervisor2.id,
      stageId: stageActive2_2.id
    }
  });

  const docTipe36FotoStruktur = await prisma.projectDocument.create({
    data: {
      projectId: activeProject2.id,
      title: 'Foto Progress Struktur Beton Rumah Tipe 36',
      description: 'Dokumentasi pembesian tambahan dan bekisting struktur yang sedang berjalan.',
      category: 'lapangan',
      fileName: 'foto-progress-struktur-rumah-tipe-36.jpg',
      fileUrl: '/uploads/demo/rumah-tipe-36/foto-progress-struktur-rumah-tipe-36.jpg',
      mimeType: 'image/jpeg',
      size: 1966080,
      visibility: 'customer_visible',
      status: 'active',
      uploadedByRole: 'pengawas',
      uploadedById: supervisor2.id,
      stageId: stageActive2_3.id
    }
  });

  ctx.projectDocuments = { doc1, doc2, docTipe36Rab, docTipe36Gambar, docTipe36Jadwal, docTipe36FotoPondasi, docTipe36FotoStruktur };
  console.log('Project Documents seeded successfully.');
};
