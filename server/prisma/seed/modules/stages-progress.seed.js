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
  const { 
    catPersiapan1, catStruktur1, catFinished1,
    catPersiapan2, catTanah2, catStruktur2, catDinding2, catAtap2, catPlafon2, catLantai2, catKusen2, catPlumbing2, catListrik2, catFinishing2, catLainLain2
  } = ctx.rabCategories;

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

  // --- Stages for Active Project 2 (Hasan Basri - Rumah Tipe 36) ---
  const stageActive2_1 = await prisma.projectStage.create({
    data: { id: 'stg-002-01', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catPersiapan2.id, code: 'STG-002-01', title: 'PEKERJAAN PERSIAPAN', status: 'Selesai', progress: 100, week: 1, order: 1, isVerified: true, verifiedBy: supervisor2.id, verifiedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000) }
  });

  const stageActive2_2 = await prisma.projectStage.create({
    data: { id: 'stg-002-02', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catTanah2.id, code: 'STG-002-02', title: 'PEKERJAAN TANAH DAN PONDASI', status: 'Selesai', progress: 100, week: 2, order: 2, isVerified: true, verifiedBy: supervisor2.id, verifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  });

  const stageActive2_3 = await prisma.projectStage.create({
    data: { id: 'stg-002-03', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catStruktur2.id, code: 'STG-002-03', title: 'PEKERJAAN STRUKTUR BETON', status: 'Berjalan', progress: 60, week: 4, order: 3, isVerified: true, verifiedBy: supervisor2.id, verifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }
  });

  const stageActive2_4 = await prisma.projectStage.create({
    data: { id: 'stg-002-04', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catDinding2.id, code: 'STG-002-04', title: 'PEKERJAAN DINDING', status: 'Berjalan', progress: 35, week: 6, order: 4 }
  });

  const stageActive2_5 = await prisma.projectStage.create({
    data: { id: 'stg-002-05', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catAtap2.id, code: 'STG-002-05', title: 'PEKERJAAN ATAP', status: 'Berjalan', progress: 10, week: 8, order: 5 }
  });

  const stageActive2_6 = await prisma.projectStage.create({
    data: { id: 'stg-002-06', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catPlafon2.id, code: 'STG-002-06', title: 'PEKERJAAN PLAFON', status: 'Belum Mulai', progress: 0, week: 9, order: 6 }
  });

  const stageActive2_7 = await prisma.projectStage.create({
    data: { id: 'stg-002-07', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catLantai2.id, code: 'STG-002-07', title: 'PEKERJAAN LANTAI', status: 'Belum Mulai', progress: 0, week: 10, order: 7 }
  });

  const stageActive2_8 = await prisma.projectStage.create({
    data: { id: 'stg-002-08', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catKusen2.id, code: 'STG-002-08', title: 'PEKERJAAN KUSEN, PINTU, DAN JENDELA', status: 'Belum Mulai', progress: 0, week: 11, order: 8 }
  });

  const stageActive2_9 = await prisma.projectStage.create({
    data: { id: 'stg-002-09', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, code: 'STG-002-09', title: 'PEKERJAAN PLUMBING DAN SANITASI', status: 'Berjalan', progress: 15, week: 12, order: 9 }
  });

  const stageActive2_10 = await prisma.projectStage.create({
    data: { id: 'stg-002-10', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catListrik2.id, code: 'STG-002-10', title: 'PEKERJAAN LISTRIK', status: 'Berjalan', progress: 10, week: 13, order: 10 }
  });

  const stageActive2_11 = await prisma.projectStage.create({
    data: { id: 'stg-002-11', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catFinishing2.id, code: 'STG-002-11', title: 'PEKERJAAN FINISHING', status: 'Belum Mulai', progress: 0, week: 14, order: 11 }
  });

  const stageActive2_12 = await prisma.projectStage.create({
    data: { id: 'stg-002-12', projectId: activeProject2.id, rabPlanId: rabActive2.id, categoryId: catLainLain2.id, code: 'STG-002-12', title: 'BIAYA LAIN-LAIN', status: 'Berjalan', progress: 20, week: 15, order: 12 }
  });

  // --- Stages for Active Project 3 (Villa Modern Jimbaran) ---
  const stageActive3_1 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-003-1',
      projectId: activeProject3.id,
      rabPlanId: rabActive3.id,
      categoryId: catPersiapan3.id,
      code: 'STG-03-01',
      title: 'Persiapan Lahan & Mobilisasi Bali',
      status: 'Selesai',
      progress: 100,
      week: 1,
      order: 1,
      isVerified: true,
      verifiedBy: supervisor3.id,
      verifiedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000)
    }
  });

  const stageActive3_2 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-003-2',
      projectId: activeProject3.id,
      rabPlanId: rabActive3.id,
      categoryId: catStruktur3.id,
      code: 'STG-03-02',
      title: 'Pekerjaan Struktur Utama (Lantai 1)',
      status: 'Berjalan',
      progress: 45,
      week: 8,
      order: 2,
      isVerified: true,
      verifiedBy: supervisor3.id,
      verifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
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
        newProgress: 10,
        stageId: stageActive2_1.id,
        notes: 'Pekerjaan persiapan lahan Rumah Tipe 36 selesai.',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-002-002',
        projectId: activeProject2.id,
        supervisorId: supervisor2.id,
        previousProgress: 10,
        newProgress: 25,
        stageId: stageActive2_2.id,
        notes: 'Pekerjaan tanah dan pondasi Rumah Tipe 36 selesai.',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-002-003',
        projectId: activeProject2.id,
        supervisorId: supervisor2.id,
        previousProgress: 25,
        newProgress: 58,
        stageId: stageActive2_3.id,
        notes: 'Struktur beton berjalan, pekerjaan dinding awal dan instalasi MEP awal mulai masuk area kerja.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-003-001',
        projectId: activeProject3.id,
        supervisorId: supervisor3.id,
        previousProgress: 0,
        newProgress: 15,
        stageId: stageActive3_1.id,
        notes: 'Mobilisasi tim dan alat berat di Jimbaran selesai.',
        createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-003-002',
        projectId: activeProject3.id,
        supervisorId: supervisor3.id,
        previousProgress: 15,
        newProgress: 45,
        stageId: stageActive3_2.id,
        notes: 'Cor lantai 1 selesai diverifikasi.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
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
      stageId: stageActive2_3.id,
      authorRole: 'admin',
      authorId: admin2.id,
      authorName: admin2.name,
      message: 'Pembangunan Rumah Tipe 36 berada pada tahap struktur beton. Penulangan kolom praktis dan persiapan bekisting sedang dilakukan.',
      isOfficial: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-active-002-reply',
      projectId: activeProject2.id,
      stageId: stageActive2_3.id,
      authorRole: 'customer',
      authorId: customer4.id,
      authorName: customer4.name,
      message: 'Baik, mohon pastikan kualitas beton dan pembesian sesuai spesifikasi RAB.',
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
  ctx.stages = { 
    stageActive1_1, stageActive1_2, 
    stageActive2_1, stageActive2_2, stageActive2_3, stageActive2_4, stageActive2_5, stageActive2_6, stageActive2_7, stageActive2_8, stageActive2_9, stageActive2_10, stageActive2_11, stageActive2_12,
    stageActive3_1, stageActive3_2,
    stageFinished1 
  };

  console.log('Stages and Progress seeded successfully.');
};
