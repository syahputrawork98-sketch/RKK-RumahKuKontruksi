/**
 * Daily Operations Seed Module
 * Handles creation of DailyTask and DailyReport entities.
 */

export const seedDailyOperations = async (prisma, ctx) => {
  console.log('Seeding Scenario 7: Daily Tasks & Reports...');

  const { activeProject1, activeProject2 } = ctx.projects;
  const { foreman1, foreman2 } = ctx.foremen;
  const { supervisor2 } = ctx.supervisors;
  const {
    stageActive1_2,
    stageActive2_3,
    stageActive2_4,
    stageActive2_5,
    stageActive2_9,
    stageActive2_10
  } = ctx.stages;
  const { itemBesi1 } = ctx.rabItems;

  const dailyTask1 = await prisma.dailyTask.create({
    data: {
      id: 'task-active-001',
      projectId: activeProject1.id,
      foremanId: foreman1.id,
      stageId: stageActive1_2.id,
      rabItemId: itemBesi1.id,
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
      projectId: activeProject1.id,
      foremanId: foreman1.id,
      stageId: stageActive1_2.id,
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
      projectId: activeProject1.id,
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

  // --- Daily Tasks for Active Project 2 (Hasan Basri - Rumah Tipe 36) ---
  const taskTipe36_1 = await prisma.dailyTask.create({
    data: {
      id: 'task-tipe36-001',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      stageId: stageActive2_3.id,
      rabItemId: 'item-002-02-05',
      title: 'Pengecekan sloof beton bertulang',
      description: 'Pengecekan hasil sloof beton bertulang dan area sambungan kolom praktis Rumah Tipe 36.',
      targetDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      status: 'completed',
      priority: 'high'
    }
  });

  const taskTipe36_2 = await prisma.dailyTask.create({
    data: {
      id: 'task-tipe36-002',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      stageId: stageActive2_3.id,
      rabItemId: 'item-002-03-04',
      title: 'Pembesian tambahan kolom praktis',
      description: 'Melanjutkan pembesian tambahan untuk kolom praktis dan area ring balok awal.',
      targetDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'completed',
      priority: 'high'
    }
  });

  const taskTipe36_3 = await prisma.dailyTask.create({
    data: {
      id: 'task-tipe36-003',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      stageId: stageActive2_3.id,
      rabItemId: 'item-002-03-05',
      title: 'Bekisting struktur area depan',
      description: 'Pemasangan bekisting struktur pada area depan dan sisi kamar utama.',
      targetDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: 'completed',
      priority: 'medium'
    }
  });

  const taskTipe36_4 = await prisma.dailyTask.create({
    data: {
      id: 'task-tipe36-004',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      stageId: stageActive2_4.id,
      rabItemId: 'item-002-04-01',
      title: 'Pasangan bata ringan awal',
      description: 'Mulai pasangan bata ringan pada area ruang tamu dan kamar depan.',
      targetDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'completed',
      priority: 'medium'
    }
  });

  const taskTipe36_5 = await prisma.dailyTask.create({
    data: {
      id: 'task-tipe36-005',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      stageId: stageActive2_9.id,
      rabItemId: 'item-002-09-01',
      title: 'Instalasi pipa air bersih awal',
      description: 'Penandaan jalur dan instalasi awal pipa air bersih sebelum dinding tertutup.',
      targetDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'in_progress',
      priority: 'medium'
    }
  });

  const taskTipe36_6 = await prisma.dailyTask.create({
    data: {
      id: 'task-tipe36-006',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      stageId: stageActive2_10.id,
      rabItemId: 'item-002-10-01',
      title: 'Marking titik lampu dan saklar',
      description: 'Marking titik lampu, saklar, dan jalur conduit listrik dasar.',
      targetDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'in_progress',
      priority: 'medium'
    }
  });

  const taskTipe36_7 = await prisma.dailyTask.create({
    data: {
      id: 'task-tipe36-007',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      stageId: stageActive2_5.id,
      rabItemId: 'item-002-05-01',
      title: 'Persiapan pengukuran rangka atap',
      description: 'Pengukuran ulang bentang atap sebelum material baja ringan dikirim penuh.',
      targetDate: new Date(),
      status: 'todo',
      priority: 'low'
    }
  });

  // --- Daily Reports for Active Project 2 (Hasan Basri - Rumah Tipe 36) ---
  const reportTipe36_1 = await prisma.dailyReport.create({
    data: {
      id: 'report-tipe36-001',
      reportCode: 'DR-2024-0201',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      stageId: stageActive2_3.id,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      status: 'submitted',
      weatherSummary: 'Cerah, pekerjaan berjalan normal',
      workerCount: 7,
      activitySummary: 'Pengecekan sloof beton bertulang selesai dan area sambungan kolom praktis sudah dibersihkan.',
      blockerSummary: 'Tidak ada kendala besar.',
      taskId: taskTipe36_1.id
    }
  });

  const reportTipe36_2 = await prisma.dailyReport.create({
    data: {
      id: 'report-tipe36-002',
      reportCode: 'DR-2024-0202',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      stageId: stageActive2_3.id,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'reviewed',
      weatherSummary: 'Berawan, aman untuk pekerjaan struktur',
      workerCount: 8,
      activitySummary: 'Pembesian tambahan kolom praktis selesai sebagian besar sesuai gambar kerja.',
      blockerSummary: 'Menunggu sisa pengiriman besi tambahan untuk area belakang.',
      taskId: taskTipe36_2.id
    }
  });

  const reportTipe36_3 = await prisma.dailyReport.create({
    data: {
      id: 'report-tipe36-003',
      reportCode: 'DR-2024-0203',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      stageId: stageActive2_3.id,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: 'submitted',
      weatherSummary: 'Cerah sampai sore',
      workerCount: 6,
      activitySummary: 'Bekisting struktur area depan terpasang dan dicek ulang sebelum pengecoran lanjutan.',
      blockerSummary: 'Akses material cukup sempit sehingga bongkar muat lebih lambat.',
      taskId: taskTipe36_3.id
    }
  });

  const reportTipe36_4 = await prisma.dailyReport.create({
    data: {
      id: 'report-tipe36-004',
      reportCode: 'DR-2024-0204',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      stageId: stageActive2_4.id,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'submitted',
      weatherSummary: 'Hujan ringan setelah pukul 15.00',
      workerCount: 7,
      activitySummary: 'Pasangan bata ringan awal mulai pada area ruang tamu dan kamar depan.',
      blockerSummary: 'Hujan ringan membuat pekerjaan dinding dihentikan lebih awal.',
      taskId: taskTipe36_4.id
    }
  });

  const reportTipe36_5 = await prisma.dailyReport.create({
    data: {
      id: 'report-tipe36-005',
      reportCode: 'DR-2024-0205',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      stageId: stageActive2_9.id,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'draft',
      weatherSummary: 'Cerah',
      workerCount: 5,
      activitySummary: 'Jalur pipa air bersih awal sudah ditandai dan sebagian pipa mulai dipasang.',
      blockerSummary: 'Menunggu konfirmasi posisi akhir kran dari pengawas.',
      taskId: taskTipe36_5.id
    }
  });

  const reportTipe36_6 = await prisma.dailyReport.create({
    data: {
      id: 'report-tipe36-006',
      reportCode: 'DR-2024-0206',
      projectId: activeProject2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      stageId: stageActive2_10.id,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'draft',
      weatherSummary: 'Berawan',
      workerCount: 4,
      activitySummary: 'Marking titik lampu, saklar, dan jalur conduit listrik dasar sudah dimulai.',
      blockerSummary: 'Tidak ada kendala besar.',
      taskId: taskTipe36_6.id
    }
  });

  // --- Daily Tasks for Active Project 3 (Villa Modern Jimbaran) ---
  const taskVilla_1 = await prisma.dailyTask.create({
    data: {
      id: 'task-villa-001',
      projectId: activeProject3.id,
      foremanId: foreman3.id,
      stageId: stageActive3_2.id,
      rabItemId: itemBesi3.id,
      title: 'Perakitan Pembesian Kolom Lt.1',
      description: 'Perakitan besi ulir D16 untuk kolom utama area living room.',
      targetDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'completed',
      priority: 'high'
    }
  });

  const taskVilla_2 = await prisma.dailyTask.create({
    data: {
      id: 'task-villa-002',
      projectId: activeProject3.id,
      foremanId: foreman3.id,
      stageId: stageActive3_2.id,
      rabItemId: itemSemen3.id,
      title: 'Pengecoran Balok Struktur',
      description: 'Pengecoran balok struktur lantai 1 menggunakan Ready Mix K-350.',
      targetDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'completed',
      priority: 'high'
    }
  });

  const taskVilla_3 = await prisma.dailyTask.create({
    data: {
      id: 'task-villa-003',
      projectId: activeProject3.id,
      foremanId: foreman3.id,
      stageId: stageActive3_2.id,
      title: 'Pelepasan Bekisting',
      description: 'Pelepasan bekisting kolom yang sudah mencapai umur beton.',
      targetDate: new Date(),
      status: 'in_progress',
      priority: 'medium'
    }
  });

  // --- Daily Reports for Active Project 3 (Villa Modern Jimbaran) ---
  await prisma.dailyReport.createMany({
    data: [
      {
        id: 'report-villa-001',
        reportCode: 'DR-VILLA-001',
        projectId: activeProject3.id,
        foremanId: foreman3.id,
        supervisorId: supervisor3.id,
        stageId: stageActive3_2.id,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'reviewed',
        weatherSummary: 'Cerah, Jimbaran panas terik',
        workerCount: 12,
        activitySummary: 'Perakitan besi kolom Lt.1 selesai. Hasil rakitan sesuai gambar kerja Bali Villa.',
        taskId: taskVilla_1.id
      },
      {
        id: 'report-villa-002',
        reportCode: 'DR-VILLA-002',
        projectId: activeProject3.id,
        foremanId: foreman3.id,
        supervisorId: supervisor3.id,
        stageId: stageActive3_2.id,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'submitted',
        weatherSummary: 'Berawan, hujan gerimis di sore hari',
        workerCount: 15,
        activitySummary: 'Pengecoran balok struktur Lt.1 selesai dilaksanakan. Menggunakan 3 truck mixer.',
        taskId: taskVilla_2.id
      }
    ]
  });

  ctx.dailyTasks = {
    dailyTask1,
    dailyTask2,
    taskTipe36_1,
    taskTipe36_2,
    taskTipe36_3,
    taskTipe36_4,
    taskTipe36_5,
    taskTipe36_6,
    taskTipe36_7,
    taskVilla_1,
    taskVilla_2,
    taskVilla_3
  };
  ctx.dailyReports = {
    dailyReport1,
    reportTipe36_1,
    reportTipe36_2,
    reportTipe36_3,
    reportTipe36_4,
    reportTipe36_5,
    reportTipe36_6
  };
  console.log('Daily Operations seeded successfully.');
};
