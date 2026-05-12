/**
 * Stages & Progress Seed Module
 * Handles creation of ProjectStage, ProgressVerificationLog, and ProjectStagePublicComment entities.
 */

export const seedStagesAndProgress = async (prisma, ctx) => {
  console.log('Seeding Stages and Progress (Logs, Comments)...');

  const { admin1, admin2 } = ctx.admins;
  const { customer2, customer4 } = ctx.customers;
  const { supervisor1, supervisor2, supervisor3 } = ctx.supervisors;
  const { activeProject1, activeProject2, finishedProject1 } = ctx.projects;
  const { rabActive1, rabActive2, rabFinished1 } = ctx.rabPlans;
  const { catPersiapan1, catStruktur1, catRenovasiBongkar1, catRenovasiFinishing1, catFinished1 } = ctx.rabCategories;

  // --- Stages for Active Project 1 ---
  const stageActive1_1 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-001',
      projectId: activeProject1.id,
      rabPlanId: rabActive1.id,
      categoryId: catPersiapan1.id,
      code: 'STG-01',
      title: 'Pembersihan Lahan',
      status: 'Selesai',
      progress: 100,
      week: 1,
      order: 1,
      isVerified: true,
      verifiedBy: supervisor1.id,
      verifiedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
    }
  });

  const stageActive1_2 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-002',
      projectId: activeProject1.id,
      rabPlanId: rabActive1.id,
      categoryId: catStruktur1.id,
      code: 'STG-02',
      title: 'Galian Tanah & Pondasi',
      status: 'Berjalan',
      progress: 40,
      week: 2,
      order: 2,
      isVerified: true,
      verifiedBy: supervisor1.id,
      verifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  });

  // --- Stages for Active Project 2 ---
  const stageActive2_1 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-002-001',
      projectId: activeProject2.id,
      rabPlanId: rabActive2.id,
      categoryId: catRenovasiBongkar1.id,
      code: 'REN-01',
      title: 'Bongkaran Area Dapur',
      description: 'Pembongkaran area dapur lama dan sortir material yang masih dapat digunakan.',
      status: 'Selesai',
      progress: 100,
      week: 1,
      order: 1,
      startDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000),
      durationDays: 12,
      isVerified: true,
      verifiedBy: supervisor2.id,
      verifiedAt: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000)
    }
  });

  const stageActive2_2 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-002-002',
      projectId: activeProject2.id,
      rabPlanId: rabActive2.id,
      categoryId: catRenovasiFinishing1.id,
      code: 'REN-02',
      title: 'Finishing Kitchen Set',
      description: 'Pemasangan kabinet bawah, top table, and finishing HPL area dapur.',
      status: 'Berjalan',
      progress: 55,
      week: 3,
      order: 2,
      startDate: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000),
      durationDays: 28,
      isVerified: true,
      verifiedBy: supervisor2.id,
      verifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  const stageActive2_3 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-002-003',
      projectId: activeProject2.id,
      rabPlanId: rabActive2.id,
      categoryId: catRenovasiFinishing1.id,
      code: 'REN-03',
      title: 'Pengecatan dan Styling Akhir',
      description: 'Pengecatan ulang area makan dan styling final setelah kitchen set selesai.',
      status: 'Belum Mulai',
      progress: 0,
      week: 6,
      order: 3,
      durationDays: 14
    }
  });

  // --- Stages for Finished Project ---
  const stageFinished1 = await prisma.projectStage.create({
    data: {
      id: 'stage-finished-001',
      projectId: finishedProject1.id,
      rabPlanId: rabFinished1.id,
      categoryId: catFinished1.id,
      code: 'FIN-01',
      title: 'Serah Terima Renovasi Kos',
      description: 'Pekerjaan renovasi kamar, koridor, dan pengecekan akhir telah selesai.',
      status: 'Selesai',
      progress: 100,
      week: 16,
      order: 1,
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-12-12'),
      durationDays: 133,
      isVerified: true,
      verifiedBy: supervisor3.id,
      verifiedAt: new Date('2023-12-12')
    }
  });

  // --- Progress Verification Logs ---
  await prisma.progressVerificationLog.createMany({
    data: [
      {
        id: 'progress-log-active-001',
        projectId: activeProject1.id,
        supervisorId: supervisor1.id,
        previousProgress: 0,
        newProgress: 18,
        stageId: stageActive1_1.id,
        notes: 'Pembersihan lahan dan persiapan area kerja selesai sesuai checklist awal.',
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-002',
        projectId: activeProject1.id,
        supervisorId: supervisor1.id,
        previousProgress: 18,
        newProgress: 32,
        stageId: stageActive1_2.id,
        notes: 'Galian dan pondasi berjalan; progress terverifikasi naik setelah pengecekan lapangan.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-002-001',
        projectId: activeProject2.id,
        supervisorId: supervisor2.id,
        previousProgress: 0,
        newProgress: 35,
        stageId: stageActive2_1.id,
        notes: 'Bongkaran selesai dan area kerja sudah bersih untuk pekerjaan finishing.',
        createdAt: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-002-002',
        projectId: activeProject2.id,
        supervisorId: supervisor2.id,
        previousProgress: 35,
        newProgress: 58,
        stageId: stageActive2_2.id,
        notes: 'Kitchen set mulai terpasang, top table masuk proses pengukuran final.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-finished-001',
        projectId: finishedProject1.id,
        supervisorId: supervisor3.id,
        previousProgress: 92,
        newProgress: 100,
        stageId: stageFinished1.id,
        notes: 'Final inspection selesai dan semua kamar sudah siap digunakan.',
        createdAt: new Date('2023-12-12')
      }
    ]
  });

  // --- Project Stage Public Comments ---
  const commentOfficial1 = await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-stage-001-official',
      projectId: activeProject1.id,
      stageId: stageActive1_1.id,
      authorRole: 'admin',
      authorId: admin1.id,
      authorName: admin1.name,
      message: 'Pembersihan lahan sudah selesai diverifikasi. Area kerja telah siap untuk tahapan pondasi.',
      isOfficial: true,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-stage-001-reply',
      projectId: activeProject1.id,
      stageId: stageActive1_1.id,
      authorRole: 'customer',
      authorId: customer2.id,
      authorName: customer2.name,
      message: 'Terima kasih atas update-nya. Mohon tetap diinformasikan jika ada perubahan jadwal berikutnya.',
      parentId: commentOfficial1.id,
      createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStagePublicComment.createMany({
    data: [
      {
        id: 'comment-stage-002-official-1',
        projectId: activeProject1.id,
        stageId: stageActive1_2.id,
        authorRole: 'admin',
        authorId: admin1.id,
        authorName: admin1.name,
        message: 'Tahap galian dan pondasi berjalan. Progress resmi terakhir diverifikasi Pengawas sebesar 32%.',
        isOfficial: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'comment-stage-002-official-2',
        projectId: activeProject1.id,
        stageId: stageActive1_2.id,
        authorRole: 'admin',
        authorId: admin1.id,
        authorName: admin1.name,
        message: 'Material besi dan semen untuk pekerjaan pondasi sudah masuk proses logistik. Tidak ada isu kritis yang perlu perhatian konsumen saat ini.',
        isOfficial: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]
  });

  const commentActive2Official = await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-active-002-official',
      projectId: activeProject2.id,
      stageId: stageActive2_2.id,
      authorRole: 'admin',
      authorId: admin2.id,
      authorName: admin2.name,
      message: 'Kitchen set sudah masuk tahap pemasangan modul bawah. Estimasi pemasangan top table mengikuti hasil ukur akhir pekan ini.',
      isOfficial: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-active-002-reply',
      projectId: activeProject2.id,
      stageId: stageActive2_2.id,
      authorRole: 'customer',
      authorId: customer4.id,
      authorName: customer4.name,
      message: 'Baik, mohon pastikan warna HPL sesuai sampel yang sudah disetujui.',
      parentId: commentActive2Official.id,
      createdAt: new Date()
    }
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-finished-001',
      projectId: finishedProject1.id,
      stageId: stageFinished1.id,
      authorRole: 'admin',
      authorId: admin2.id,
      authorName: admin2.name,
      message: 'Project renovasi kos Margonda telah selesai dan diserahterimakan sesuai checklist final.',
      isOfficial: true,
      createdAt: new Date('2023-12-12')
    }
  });

  // Store in context
  ctx.stages = { stageActive1_1, stageActive1_2, stageActive2_1, stageActive2_2, stageActive2_3, stageFinished1 };

  console.log('Stages and Progress seeded successfully.');
};
