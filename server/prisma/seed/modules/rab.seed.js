/**
 * RAB Seed Module
 * Handles creation of RabPlan, RabCategory, and RabItem entities.
 */

export const seedRab = async (prisma, ctx) => {
  console.log('Seeding RAB (Plans, Categories, Items)...');

  const { activeProject1, activeProject2, finishedProject1 } = ctx.projects;

  // --- RAB for Active Project 1 (Rumah Mewah BSD) ---
  const rabActive1 = await prisma.rabPlan.create({
    data: {
      id: 'rab-active-001',
      projectId: activeProject1.id,
      title: 'RAB Pembangunan Tahap 1',
      type: 'Plan',
      status: 'approved',
      totalAmount: 1500000000,
      version: '1.0'
    }
  });

  const catPersiapan1 = await prisma.rabCategory.create({
    data: {
      id: 'cat-persiapan-001',
      rabPlanId: rabActive1.id,
      projectId: activeProject1.id,
      code: '01',
      name: 'Pekerjaan Persiapan',
      subtotal: 50000000,
      order: 1
    }
  });

  const catStruktur1 = await prisma.rabCategory.create({
    data: {
      id: 'cat-struktur-001',
      rabPlanId: rabActive1.id,
      projectId: activeProject1.id,
      code: '02',
      name: 'Pekerjaan Tanah & Struktur',
      subtotal: 450000000,
      order: 2
    }
  });

  const itemSemen1 = await prisma.rabItem.create({
    data: {
      id: 'item-semen-001',
      rabPlanId: rabActive1.id,
      categoryId: catStruktur1.id,
      projectId: activeProject1.id,
      description: 'Semen Portland (50kg)',
      volume: 200,
      unit: 'Zak',
      unitPrice: 65000,
      total: 13000000,
      status: 'pending',
      progress: 20
    }
  });

  const itemBesi1 = await prisma.rabItem.create({
    data: {
      id: 'item-besi-001',
      rabPlanId: rabActive1.id,
      categoryId: catStruktur1.id,
      projectId: activeProject1.id,
      description: 'Besi Beton 12mm',
      volume: 150,
      unit: 'Batang',
      unitPrice: 110000,
      total: 16500000,
      status: 'pending',
      progress: 10
    }
  });

  // --- RAB for Active Project 2 (Renovasi Rumah Tropis Depok) ---
  const rabActive2 = await prisma.rabPlan.create({
    data: {
      id: 'rab-active-002',
      projectId: activeProject2.id,
      title: 'RAB Rumah Tipe 36',
      type: 'Plan',
      status: 'approved',
      totalAmount: 139985000,
      version: '1.0',
      approvedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000)
    }
  });

  // 1. PEKERJAAN PERSIAPAN
  const catPersiapan2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-persiapan-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '01',
      name: 'PEKERJAAN PERSIAPAN',
      subtotal: 2370000,
      order: 1
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-01-01', rabPlanId: rabActive2.id, categoryId: catPersiapan2.id, projectId: activeProject2.id, description: 'Pembersihan lahan', volume: 72, unit: 'm²', unitPrice: 10000, total: 720000, status: 'completed', progress: 100 },
      { id: 'item-002-01-02', rabPlanId: rabActive2.id, categoryId: catPersiapan2.id, projectId: activeProject2.id, description: 'Pengukuran dan bouwplank', volume: 36, unit: 'm¹', unitPrice: 25000, total: 900000, status: 'completed', progress: 100 },
      { id: 'item-002-01-03', rabPlanId: rabActive2.id, categoryId: catPersiapan2.id, projectId: activeProject2.id, description: 'Mobilisasi alat dan material', volume: 1, unit: 'ls', unitPrice: 750000, total: 750000, status: 'completed', progress: 100 },
    ]
  });

  // 2. PEKERJAAN TANAH DAN PONDASI
  const catTanah2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-tanah-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '02',
      name: 'PEKERJAAN TANAH DAN PONDASI',
      subtotal: 12780000,
      order: 2
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-02-01', rabPlanId: rabActive2.id, categoryId: catTanah2.id, projectId: activeProject2.id, description: 'Galian tanah pondasi', volume: 12, unit: 'm³', unitPrice: 90000, total: 1080000, status: 'completed', progress: 100 },
      { id: 'item-002-02-02', rabPlanId: rabActive2.id, categoryId: catTanah2.id, projectId: activeProject2.id, description: 'Urugan kembali tanah', volume: 6, unit: 'm³', unitPrice: 60000, total: 360000, status: 'completed', progress: 100 },
      { id: 'item-002-02-03', rabPlanId: rabActive2.id, categoryId: catTanah2.id, projectId: activeProject2.id, description: 'Urugan pasir bawah pondasi', volume: 3, unit: 'm³', unitPrice: 180000, total: 540000, status: 'completed', progress: 100 },
      { id: 'item-002-02-04', rabPlanId: rabActive2.id, categoryId: catTanah2.id, projectId: activeProject2.id, description: 'Pondasi batu kali', volume: 9, unit: 'm³', unitPrice: 850000, total: 7650000, status: 'completed', progress: 100 },
      { id: 'item-002-02-05', rabPlanId: rabActive2.id, categoryId: catTanah2.id, projectId: activeProject2.id, description: 'Sloof beton bertulang', volume: 2.1, unit: 'm³', unitPrice: 1500000, total: 3150000, status: 'completed', progress: 100 },
    ]
  });

  // 3. PEKERJAAN STRUKTUR BETON
  const catStruktur2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-struktur-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '03',
      name: 'PEKERJAAN STRUKTUR BETON',
      subtotal: 17945000,
      order: 3
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-03-01', rabPlanId: rabActive2.id, categoryId: catStruktur2.id, projectId: activeProject2.id, description: 'Kolom praktis beton', volume: 1.5, unit: 'm³', unitPrice: 1600000, total: 2400000, status: 'in_progress', progress: 60 },
      { id: 'item-002-03-02', rabPlanId: rabActive2.id, categoryId: catStruktur2.id, projectId: activeProject2.id, description: 'Ring balok beton', volume: 1.8, unit: 'm³', unitPrice: 1600000, total: 2880000, status: 'pending', progress: 0 },
      { id: 'item-002-03-03', rabPlanId: rabActive2.id, categoryId: catStruktur2.id, projectId: activeProject2.id, description: 'Lantai kerja / rabat beton', volume: 36, unit: 'm²', unitPrice: 90000, total: 3240000, status: 'pending', progress: 0 },
      { id: 'item-002-03-04', rabPlanId: rabActive2.id, categoryId: catStruktur2.id, projectId: activeProject2.id, description: 'Pembesian tambahan', volume: 350, unit: 'kg', unitPrice: 16000, total: 5600000, status: 'in_progress', progress: 40 },
      { id: 'item-002-03-05', rabPlanId: rabActive2.id, categoryId: catStruktur2.id, projectId: activeProject2.id, description: 'Bekisting struktur', volume: 45, unit: 'm²', unitPrice: 85000, total: 3825000, status: 'pending', progress: 0 },
    ]
  });

  // 4. PEKERJAAN DINDING
  const catDinding2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-dinding-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '04',
      name: 'PEKERJAAN DINDING',
      subtotal: 32200000,
      order: 4
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-04-01', rabPlanId: rabActive2.id, categoryId: catDinding2.id, projectId: activeProject2.id, description: 'Pasangan bata ringan / bata merah', volume: 115, unit: 'm²', unitPrice: 130000, total: 14950000, status: 'pending', progress: 0 },
      { id: 'item-002-04-02', rabPlanId: rabActive2.id, categoryId: catDinding2.id, projectId: activeProject2.id, description: 'Plesteran dinding', volume: 230, unit: 'm²', unitPrice: 45000, total: 10350000, status: 'pending', progress: 0 },
      { id: 'item-002-04-03', rabPlanId: rabActive2.id, categoryId: catDinding2.id, projectId: activeProject2.id, description: 'Acian dinding', volume: 230, unit: 'm²', unitPrice: 30000, total: 6900000, status: 'pending', progress: 0 },
    ]
  });

  // 5. PEKERJAAN ATAP
  const catAtap2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-atap-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '05',
      name: 'PEKERJAAN ATAP',
      subtotal: 16900000,
      order: 5
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-05-01', rabPlanId: rabActive2.id, categoryId: catAtap2.id, projectId: activeProject2.id, description: 'Rangka atap baja ringan', volume: 48, unit: 'm²', unitPrice: 175000, total: 8400000, status: 'pending', progress: 0 },
      { id: 'item-002-05-02', rabPlanId: rabActive2.id, categoryId: catAtap2.id, projectId: activeProject2.id, description: 'Penutup atap genteng metal / spandek', volume: 48, unit: 'm²', unitPrice: 125000, total: 6000000, status: 'pending', progress: 0 },
      { id: 'item-002-05-03', rabPlanId: rabActive2.id, categoryId: catAtap2.id, projectId: activeProject2.id, description: 'Nok / bubungan', volume: 8, unit: 'm¹', unitPrice: 85000, total: 680000, status: 'pending', progress: 0 },
      { id: 'item-002-05-04', rabPlanId: rabActive2.id, categoryId: catAtap2.id, projectId: activeProject2.id, description: 'Lisplang', volume: 28, unit: 'm¹', unitPrice: 65000, total: 1820000, status: 'pending', progress: 0 },
    ]
  });

  // 6. PEKERJAAN PLAFON
  const catPlafon2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-plafon-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '06',
      name: 'PEKERJAAN PLAFON',
      subtotal: 7680000,
      order: 6
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-06-01', rabPlanId: rabActive2.id, categoryId: catPlafon2.id, projectId: activeProject2.id, description: 'Rangka plafon hollow', volume: 36, unit: 'm²', unitPrice: 85000, total: 3060000, status: 'pending', progress: 0 },
      { id: 'item-002-06-02', rabPlanId: rabActive2.id, categoryId: catPlafon2.id, projectId: activeProject2.id, description: 'Plafon gypsum / GRC', volume: 36, unit: 'm²', unitPrice: 95000, total: 3420000, status: 'pending', progress: 0 },
      { id: 'item-002-06-03', rabPlanId: rabActive2.id, categoryId: catPlafon2.id, projectId: activeProject2.id, description: 'List plafon', volume: 48, unit: 'm¹', unitPrice: 25000, total: 1200000, status: 'pending', progress: 0 },
    ]
  });

  // 7. PEKERJAAN LANTAI
  const catLantai2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-lantai-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '07',
      name: 'PEKERJAAN LANTAI',
      subtotal: 7830000,
      order: 7
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-07-01', rabPlanId: rabActive2.id, categoryId: catLantai2.id, projectId: activeProject2.id, description: 'Urugan pasir bawah lantai', volume: 3, unit: 'm³', unitPrice: 180000, total: 540000, status: 'pending', progress: 0 },
      { id: 'item-002-07-02', rabPlanId: rabActive2.id, categoryId: catLantai2.id, projectId: activeProject2.id, description: 'Pasangan keramik lantai utama', volume: 30, unit: 'm²', unitPrice: 165000, total: 4950000, status: 'pending', progress: 0 },
      { id: 'item-002-07-03', rabPlanId: rabActive2.id, categoryId: catLantai2.id, projectId: activeProject2.id, description: 'Pasangan keramik kamar mandi', volume: 6, unit: 'm²', unitPrice: 180000, total: 1080000, status: 'pending', progress: 0 },
      { id: 'item-002-07-04', rabPlanId: rabActive2.id, categoryId: catLantai2.id, projectId: activeProject2.id, description: 'Plint keramik', volume: 42, unit: 'm¹', unitPrice: 30000, total: 1260000, status: 'pending', progress: 0 },
    ]
  });

  // 8. PEKERJAAN KUSEN, PINTU, DAN JENDELA
  const catKusen2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-kusen-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '08',
      name: 'PEKERJAAN KUSEN, PINTU, DAN JENDELA',
      subtotal: 9250000,
      order: 8
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-08-01', rabPlanId: rabActive2.id, categoryId: catKusen2.id, projectId: activeProject2.id, description: 'Kusen pintu dan jendela', volume: 8, unit: 'unit', unitPrice: 450000, total: 3600000, status: 'pending', progress: 0 },
      { id: 'item-002-08-02', rabPlanId: rabActive2.id, categoryId: catKusen2.id, projectId: activeProject2.id, description: 'Daun pintu utama', volume: 1, unit: 'unit', unitPrice: 900000, total: 900000, status: 'pending', progress: 0 },
      { id: 'item-002-08-03', rabPlanId: rabActive2.id, categoryId: catKusen2.id, projectId: activeProject2.id, description: 'Daun pintu kamar', volume: 2, unit: 'unit', unitPrice: 650000, total: 1300000, status: 'pending', progress: 0 },
      { id: 'item-002-08-04', rabPlanId: rabActive2.id, categoryId: catKusen2.id, projectId: activeProject2.id, description: 'Pintu kamar mandi PVC', volume: 1, unit: 'unit', unitPrice: 450000, total: 450000, status: 'pending', progress: 0 },
      { id: 'item-002-08-05', rabPlanId: rabActive2.id, categoryId: catKusen2.id, projectId: activeProject2.id, description: 'Daun jendela / kaca', volume: 4, unit: 'unit', unitPrice: 550000, total: 2200000, status: 'pending', progress: 0 },
      { id: 'item-002-08-06', rabPlanId: rabActive2.id, categoryId: catKusen2.id, projectId: activeProject2.id, description: 'Aksesoris pintu dan jendela', volume: 1, unit: 'ls', unitPrice: 800000, total: 800000, status: 'pending', progress: 0 },
    ]
  });

  // 9. PEKERJAAN PLUMBING DAN SANITASI
  const catPlumbing2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-plumbing-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '09',
      name: 'PEKERJAAN PLUMBING DAN SANITASI',
      subtotal: 8930000,
      order: 9
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-09-01', rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, projectId: activeProject2.id, description: 'Instalasi pipa air bersih', volume: 5, unit: 'titik', unitPrice: 300000, total: 1500000, status: 'pending', progress: 0 },
      { id: 'item-002-09-02', rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, projectId: activeProject2.id, description: 'Instalasi pipa air kotor', volume: 4, unit: 'titik', unitPrice: 350000, total: 1400000, status: 'pending', progress: 0 },
      { id: 'item-002-09-03', rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, projectId: activeProject2.id, description: 'Closet standar', volume: 1, unit: 'unit', unitPrice: 850000, total: 850000, status: 'pending', progress: 0 },
      { id: 'item-002-09-04', rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, projectId: activeProject2.id, description: 'Kran air', volume: 4, unit: 'unit', unitPrice: 75000, total: 300000, status: 'pending', progress: 0 },
      { id: 'item-002-09-05', rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, projectId: activeProject2.id, description: 'Floor drain', volume: 2, unit: 'unit', unitPrice: 65000, total: 130000, status: 'pending', progress: 0 },
      { id: 'item-002-09-06', rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, projectId: activeProject2.id, description: 'Septic tank sederhana', volume: 1, unit: 'unit', unitPrice: 3000000, total: 3000000, status: 'pending', progress: 0 },
      { id: 'item-002-09-07', rabPlanId: rabActive2.id, categoryId: catPlumbing2.id, projectId: activeProject2.id, description: 'Sumur resapan', volume: 1, unit: 'unit', unitPrice: 1750000, total: 1750000, status: 'pending', progress: 0 },
    ]
  });

  // 10. PEKERJAAN LISTRIK
  const catListrik2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-listrik-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '10',
      name: 'PEKERJAAN LISTRIK',
      subtotal: 5020000,
      order: 10
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-10-01', rabPlanId: rabActive2.id, categoryId: catListrik2.id, projectId: activeProject2.id, description: 'Instalasi titik lampu', volume: 8, unit: 'titik', unitPrice: 220000, total: 1760000, status: 'pending', progress: 0 },
      { id: 'item-002-10-02', rabPlanId: rabActive2.id, categoryId: catListrik2.id, projectId: activeProject2.id, description: 'Instalasi stop kontak', volume: 7, unit: 'titik', unitPrice: 20000, total: 1400000, status: 'pending', progress: 0 },
      { id: 'item-002-10-03', rabPlanId: rabActive2.id, categoryId: catListrik2.id, projectId: activeProject2.id, description: 'Saklar', volume: 6, unit: 'titik', unitPrice: 85000, total: 510000, status: 'pending', progress: 0 },
      { id: 'item-002-10-04', rabPlanId: rabActive2.id, categoryId: catListrik2.id, projectId: activeProject2.id, description: 'Panel MCB sederhana', volume: 1, unit: 'unit', unitPrice: 750000, total: 750000, status: 'pending', progress: 0 },
      { id: 'item-002-10-05', rabPlanId: rabActive2.id, categoryId: catListrik2.id, projectId: activeProject2.id, description: 'Lampu standar', volume: 8, unit: 'unit', unitPrice: 75000, total: 600000, status: 'pending', progress: 0 },
    ]
  });

  // 11. PEKERJAAN FINISHING
  const catFinishing2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-finishing-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '11',
      name: 'PEKERJAAN FINISHING',
      subtotal: 11580000,
      order: 11
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-11-01', rabPlanId: rabActive2.id, categoryId: catFinishing2.id, projectId: activeProject2.id, description: 'Cat dinding interior', volume: 160, unit: 'm²', unitPrice: 35000, total: 5600000, status: 'pending', progress: 0 },
      { id: 'item-002-11-02', rabPlanId: rabActive2.id, categoryId: catFinishing2.id, projectId: activeProject2.id, description: 'Cat dinding eksterior', volume: 70, unit: 'm²', unitPrice: 45000, total: 3150000, status: 'pending', progress: 0 },
      { id: 'item-002-11-03', rabPlanId: rabActive2.id, categoryId: catFinishing2.id, projectId: activeProject2.id, description: 'Cat plafon', volume: 36, unit: 'm²', unitPrice: 30000, total: 1080000, status: 'pending', progress: 0 },
      { id: 'item-002-11-04', rabPlanId: rabActive2.id, categoryId: catFinishing2.id, projectId: activeProject2.id, description: 'Cat pintu / kusen', volume: 20, unit: 'm²', unitPrice: 50000, total: 1000000, status: 'pending', progress: 0 },
      { id: 'item-002-11-05', rabPlanId: rabActive2.id, categoryId: catFinishing2.id, projectId: activeProject2.id, description: 'Pembersihan akhir', volume: 1, unit: 'ls', unitPrice: 750000, total: 750000, status: 'pending', progress: 0 },
    ]
  });

  // 12. BIAYA LAIN-LAIN
  const catLainLain2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-lain-lain-002',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '12',
      name: 'BIAYA LAIN-LAIN',
      subtotal: 7500000,
      order: 12
    }
  });

  await prisma.rabItem.createMany({
    data: [
      { id: 'item-002-12-01', rabPlanId: rabActive2.id, categoryId: catLainLain2.id, projectId: activeProject2.id, description: 'Transport material tambahan', volume: 1, unit: 'ls', unitPrice: 1500000, total: 1500000, status: 'pending', progress: 0 },
      { id: 'item-002-12-02', rabPlanId: rabActive2.id, categoryId: catLainLain2.id, projectId: activeProject2.id, description: 'Keamanan dan kebersihan proyek', volume: 1, unit: 'ls', unitPrice: 1000000, total: 1000000, status: 'pending', progress: 0 },
      { id: 'item-002-12-03', rabPlanId: rabActive2.id, categoryId: catLainLain2.id, projectId: activeProject2.id, description: 'Cadangan biaya tak terduga', volume: 1, unit: 'ls', unitPrice: 5000000, total: 5000000, status: 'pending', progress: 0 },
    ]
  });

  // --- RAB for Finished Project 1 (Renovasi Kos Margonda) ---
  const rabFinished1 = await prisma.rabPlan.create({
    data: {
      id: 'rab-finished-001',
      projectId: finishedProject1.id,
      title: 'RAB Final Renovasi Kos Margonda',
      type: 'Final',
      status: 'approved',
      totalAmount: 480000000,
      version: 'final',
      approvedAt: new Date('2023-08-05')
    }
  });

  const catFinished1 = await prisma.rabCategory.create({
    data: {
      id: 'cat-finished-001',
      rabPlanId: rabFinished1.id,
      projectId: finishedProject1.id,
      code: '01',
      name: 'Renovasi Kamar dan Koridor',
      subtotal: 480000000,
      order: 1
    }
  });

  const itemFinished1 = await prisma.rabItem.create({
    data: {
      id: 'item-finished-001',
      rabPlanId: rabFinished1.id,
      categoryId: catFinished1.id,
      projectId: finishedProject1.id,
      description: 'Renovasi 8 kamar kos dan koridor lantai satu',
      volume: 1,
      unit: 'LS',
      unitPrice: 480000000,
      total: 480000000,
      status: 'completed',
      progress: 100,
      completedValue: 480000000
    }
  });

  // --- RAB for Active Project 3 (Villa Modern Jimbaran) ---
  const rabActive3 = await prisma.rabPlan.create({
    data: {
      id: 'rab-active-003',
      projectId: activeProject3.id,
      title: 'RAB Konstruksi Tahap Utama',
      type: 'Plan',
      status: 'approved',
      totalAmount: 3500000000,
      version: '1.0',
      approvedAt: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000)
    }
  });

  const catPersiapan3 = await prisma.rabCategory.create({
    data: {
      id: 'cat-persiapan-003',
      rabPlanId: rabActive3.id,
      projectId: activeProject3.id,
      code: '01',
      name: 'PEKERJAAN PERSIAPAN & MOBILISASI',
      subtotal: 150000000,
      order: 1
    }
  });

  const catStruktur3 = await prisma.rabCategory.create({
    data: {
      id: 'cat-struktur-003',
      rabPlanId: rabActive3.id,
      projectId: activeProject3.id,
      code: '02',
      name: 'PEKERJAAN STRUKTUR & PONDASI',
      subtotal: 1850000000,
      order: 2
    }
  });

  const itemBesi3 = await prisma.rabItem.create({
    data: {
      id: 'item-besi-003',
      rabPlanId: rabActive3.id,
      categoryId: catStruktur3.id,
      projectId: activeProject3.id,
      description: 'Besi Beton Ulir D16 (Pondasi & Kolom)',
      volume: 850,
      unit: 'Batang',
      unitPrice: 185000,
      total: 157250000,
      status: 'in_progress',
      progress: 60
    }
  });

  const itemSemen3 = await prisma.rabItem.create({
    data: {
      id: 'item-semen-003',
      rabPlanId: rabActive3.id,
      categoryId: catStruktur3.id,
      projectId: activeProject3.id,
      description: 'Ready Mix Concrete K-350',
      volume: 120,
      unit: 'm3',
      unitPrice: 1250000,
      total: 150000000,
      status: 'in_progress',
      progress: 40
    }
  });

  // Store in context
  ctx.rabPlans = { rabActive1, rabActive2, rabActive3, rabFinished1 };
  ctx.rabCategories = { 
    catPersiapan1, catStruktur1, catFinished1,
    catPersiapan2, catTanah2, catStruktur2, catDinding2, catAtap2, catPlafon2, catLantai2, catKusen2, catPlumbing2, catListrik2, catFinishing2, catLainLain2,
    catPersiapan3, catStruktur3
  };
  ctx.rabItems = { itemSemen1, itemBesi1, itemFinished1, itemBesi3, itemSemen3 };

  console.log('RAB seeded successfully.');
};
