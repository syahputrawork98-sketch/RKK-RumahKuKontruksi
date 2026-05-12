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
      title: 'RAB Renovasi Rumah Tropis',
      type: 'Plan',
      status: 'approved',
      totalAmount: 620000000,
      version: '1.0',
      approvedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000)
    }
  });

  const catRenovasiBongkar1 = await prisma.rabCategory.create({
    data: {
      id: 'cat-renovasi-bongkar-001',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '01',
      name: 'Bongkaran & Persiapan Renovasi',
      subtotal: 70000000,
      order: 1
    }
  });

  const catRenovasiFinishing1 = await prisma.rabCategory.create({
    data: {
      id: 'cat-renovasi-finishing-001',
      rabPlanId: rabActive2.id,
      projectId: activeProject2.id,
      code: '02',
      name: 'Finishing Interior Tropis',
      subtotal: 230000000,
      order: 2
    }
  });

  const itemBongkarDapur1 = await prisma.rabItem.create({
    data: {
      id: 'item-bongkar-dapur-001',
      rabPlanId: rabActive2.id,
      categoryId: catRenovasiBongkar1.id,
      projectId: activeProject2.id,
      description: 'Bongkar area dapur lama dan pembersihan puing',
      volume: 1,
      unit: 'LS',
      unitPrice: 35000000,
      total: 35000000,
      status: 'completed',
      progress: 100,
      completedValue: 35000000
    }
  });

  const itemKitchenSet1 = await prisma.rabItem.create({
    data: {
      id: 'item-kitchen-set-001',
      rabPlanId: rabActive2.id,
      categoryId: catRenovasiFinishing1.id,
      projectId: activeProject2.id,
      description: 'Pembuatan kitchen set plywood HPL',
      volume: 12,
      unit: 'm1',
      unitPrice: 4500000,
      total: 54000000,
      status: 'in_progress',
      progress: 55,
      completedValue: 29700000
    }
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

  // Store in context
  ctx.rabPlans = { rabActive1, rabActive2, rabFinished1 };
  ctx.rabCategories = { catPersiapan1, catStruktur1, catRenovasiBongkar1, catRenovasiFinishing1, catFinished1 };
  ctx.rabItems = { itemSemen1, itemBesi1, itemBongkarDapur1, itemKitchenSet1, itemFinished1 };

  console.log('RAB seeded successfully.');
};
