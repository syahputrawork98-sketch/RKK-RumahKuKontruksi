/**
 * Field Issues Seed Module
 * Handles creation of FieldIssue entities.
 */

export const seedFieldIssues = async (prisma, ctx) => {
  console.log('Seeding Scenario 6: Field Issues...');

  const { activeProject1, activeProject2 } = ctx.projects;
  const { foreman1, foreman2 } = ctx.foremen;
  const { supervisor1, supervisor2 } = ctx.supervisors;
  const { admin2 } = ctx.admins;
  const {
    stageActive1_2,
    stageActive2_3,
    stageActive2_4,
    stageActive2_9
  } = ctx.stages;

  const issue1 = await prisma.fieldIssue.create({
    data: {
      id: 'issue-active-001',
      issueCode: 'ISSUE-24-0001',
      projectId: activeProject1.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      title: 'Material Semen Telat',
      description: 'Pengiriman semen dari pusat logistik belum sampai, pekerjaan pengecoran tertunda.',
      category: 'Logistik',
      priority: 'high',
      status: 'open',
      stageId: stageActive1_2.id
    }
  });

  const issue2 = await prisma.fieldIssue.create({
    data: {
      id: 'issue-active-002',
      issueCode: 'ISSUE-24-0002',
      projectId: activeProject1.id,
      foremanId: foreman1.id,
      title: 'Cuaca Hujan Lebat',
      description: 'Pekerjaan outdoor dihentikan sementara karena hujan deras.',
      category: 'Alam',
      priority: 'medium',
      status: 'in_review'
    }
  });

  // --- Field Issues for Active Project 2 (Hasan Basri - Rumah Tipe 36) ---
  const issueTipe36_1 = await prisma.fieldIssue.create({
    data: {
      id: 'issue-tipe36-001',
      issueCode: 'ISSUE-24-0201',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      title: 'Keterlambatan Pengiriman Besi Tambahan',
      description: 'Sebagian besi tambahan untuk kolom praktis dan ring balok belum diterima penuh sehingga pekerjaan struktur area belakang perlu dijadwalkan ulang.',
      category: 'Logistik',
      priority: 'high',
      status: 'open',
      stageId: stageActive2_3.id,
      rabItemId: 'item-002-03-04'
    }
  });

  const issueTipe36_2 = await prisma.fieldIssue.create({
    data: {
      id: 'issue-tipe36-002',
      issueCode: 'ISSUE-24-0202',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      adminId: admin2.id,
      title: 'Akses Material Sempit di Lokasi',
      description: 'Akses gang menuju lokasi proyek cukup sempit sehingga bongkar muat bata ringan dan pasir perlu dilakukan bertahap.',
      category: 'Akses Lokasi',
      priority: 'medium',
      status: 'in_review',
      stageId: stageActive2_4.id,
      rabItemId: 'item-002-04-01'
    }
  });

  const issueTipe36_Closed = await prisma.fieldIssue.create({
    data: {
      id: 'issue-tipe36-004',
      issueCode: 'ISSUE-24-0204',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      adminId: admin2.id,
      title: 'Keterlambatan Pipa PVC (Selesai)',
      description: 'Pipa PVC untuk jalur air kotor sempat tertahan pengirimannya karena stok di gudang utama kosong.',
      category: 'Logistik',
      priority: 'medium',
      status: 'closed',
      stageId: stageActive2_9.id,
      resolutionNote: 'Sudah diselesaikan dengan pengadaan dari vendor lokal alternatif. Administrasi ditutup.',
      resolvedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  });

  ctx.fieldIssues = { issue1, issue2, issueTipe36_1, issueTipe36_2, issueTipe36_3, issueTipe36_Closed };
  console.log('Field Issues seeded successfully.');
};
