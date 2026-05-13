/**
 * Material Request Seed Module
 * Handles creation of MaterialRequest and MaterialRequestItem entities.
 */

export const seedMaterialRequests = async (prisma, ctx) => {
  console.log('Seeding Material Requests...');

  const { activeProject1, activeProject2 } = ctx.projects;
  const { foreman1, foreman2 } = ctx.foremen;
  const { supervisor1, supervisor2 } = ctx.supervisors;
  const { admin1, admin2 } = ctx.admins;
  const {
    stageActive1_2,
    stageActive2_1,
    stageActive2_2,
    stageActive2_3,
    stageActive2_4,
    stageActive2_5,
    stageActive2_9
  } = ctx.stages;
  const { itemSemen1, itemBesi1 } = ctx.rabItems;

  const mrPending1 = await prisma.materialRequest.create({
    data: {
      id: 'mr-pending-001',
      requestCode: 'MR-24-0001',
      projectId: activeProject1.id,
      stageId: stageActive1_2.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      status: 'pending',
      priority: 'high',
      neededDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      reason: 'Untuk pengecoran pondasi sisi timur.',
      items: {
        create: [
          {
            materialName: 'Semen Portland (50kg)',
            requestedQty: 50,
            unit: 'Zak',
            rabItemId: itemSemen1.id
          }
        ]
      }
    }
  });

  const mrApproved1 = await prisma.materialRequest.create({
    data: {
      id: 'mr-approved-001',
      requestCode: 'MR-24-0002',
      projectId: activeProject1.id,
      stageId: stageActive1_2.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      adminId: admin1.id,
      status: 'approved',
      priority: 'medium',
      neededDate: new Date(),
      reason: 'Kebutuhan besi untuk kolom.',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      supervisorReviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      adminReviewedAt: new Date(),
      items: {
        create: [
          {
            materialName: 'Besi Beton 12mm',
            requestedQty: 20,
            approvedQty: 20,
            unit: 'Batang',
            rabItemId: itemBesi1.id
          }
        ]
      }
    }
  });

  // --- Material Requests for Active Project 2 (Hasan Basri - Rumah Tipe 36) ---
  const mrTipe36Persiapan = await prisma.materialRequest.create({
    data: {
      id: 'mr-tipe36-001',
      requestCode: 'MR-24-0201',
      projectId: activeProject2.id,
      stageId: stageActive2_1.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      adminId: admin2.id,
      status: 'completed',
      priority: 'medium',
      neededDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
      reason: 'Material awal untuk pembersihan lahan, bouwplank, dan mobilisasi Rumah Tipe 36.',
      submittedAt: new Date(Date.now() - 54 * 24 * 60 * 60 * 1000),
      supervisorReviewedAt: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000),
      adminReviewedAt: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000),
      processedAt: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000),
      deliveredAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
      receivedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          { materialName: 'Patok kayu dan benang bouwplank', requestedQty: 1, approvedQty: 1, receivedQty: 1, unit: 'paket', rabItemId: 'item-002-01-02', estimatedUnitPrice: 900000, finalUnitPrice: 880000 },
          { materialName: 'Peralatan pembersihan lahan', requestedQty: 1, approvedQty: 1, receivedQty: 1, unit: 'paket', rabItemId: 'item-002-01-01', estimatedUnitPrice: 720000, finalUnitPrice: 700000 }
        ]
      }
    }
  });

  const mrTipe36Pondasi = await prisma.materialRequest.create({
    data: {
      id: 'mr-tipe36-002',
      requestCode: 'MR-24-0202',
      projectId: activeProject2.id,
      stageId: stageActive2_2.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      adminId: admin2.id,
      status: 'received',
      priority: 'high',
      neededDate: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000),
      reason: 'Material pondasi batu kali, pasir, dan sloof beton bertulang.',
      submittedAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000),
      supervisorReviewedAt: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000),
      adminReviewedAt: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000),
      processedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      deliveredAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000),
      receivedAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          { materialName: 'Batu kali pondasi', requestedQty: 9, approvedQty: 9, receivedQty: 9, unit: 'm3', rabItemId: 'item-002-02-04', estimatedUnitPrice: 720000, finalUnitPrice: 705000 },
          { materialName: 'Pasir urug dan pasir pasang', requestedQty: 6, approvedQty: 6, receivedQty: 6, unit: 'm3', rabItemId: 'item-002-02-03', estimatedUnitPrice: 170000, finalUnitPrice: 168000 },
          { materialName: 'Semen pondasi dan sloof', requestedQty: 45, approvedQty: 45, receivedQty: 45, unit: 'zak', rabItemId: 'item-002-02-05', estimatedUnitPrice: 65000, finalUnitPrice: 64000 }
        ]
      }
    }
  });

  const mrTipe36Struktur = await prisma.materialRequest.create({
    data: {
      id: 'mr-tipe36-003',
      requestCode: 'MR-24-0203',
      projectId: activeProject2.id,
      stageId: stageActive2_3.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      adminId: admin2.id,
      status: 'delivered',
      priority: 'high',
      neededDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      reason: 'Kebutuhan struktur beton untuk kolom praktis, ring balok, dan pembesian tambahan.',
      submittedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      supervisorReviewedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      adminReviewedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      processedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      deliveredAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          { materialName: 'Besi beton campuran struktur', requestedQty: 350, approvedQty: 340, receivedQty: 300, unit: 'kg', rabItemId: 'item-002-03-04', estimatedUnitPrice: 14500, finalUnitPrice: 14300, note: 'Sebagian sudah dikirim, sisa masuk pengiriman berikutnya.' },
          { materialName: 'Papan bekisting struktur', requestedQty: 45, approvedQty: 42, receivedQty: 40, unit: 'm2', rabItemId: 'item-002-03-05', estimatedUnitPrice: 70000, finalUnitPrice: 69000 }
        ]
      }
    }
  });

  const mrTipe36Dinding = await prisma.materialRequest.create({
    data: {
      id: 'mr-tipe36-004',
      requestCode: 'MR-24-0204',
      projectId: activeProject2.id,
      stageId: stageActive2_4.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      adminId: admin2.id,
      status: 'approved',
      priority: 'medium',
      neededDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      reason: 'Persiapan pasangan bata ringan awal dan pekerjaan plester area depan.',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      supervisorReviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      adminReviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          { materialName: 'Bata ringan / bata merah', requestedQty: 115, approvedQty: 80, unit: 'm2', rabItemId: 'item-002-04-01', estimatedUnitPrice: 95000 },
          { materialName: 'Semen dan pasir plester awal', requestedQty: 1, approvedQty: 1, unit: 'paket', rabItemId: 'item-002-04-02', estimatedUnitPrice: 4800000 }
        ]
      }
    }
  });

  const mrTipe36Plumbing = await prisma.materialRequest.create({
    data: {
      id: 'mr-tipe36-005',
      requestCode: 'MR-24-0205',
      projectId: activeProject2.id,
      stageId: stageActive2_9.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      status: 'submitted',
      priority: 'medium',
      neededDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      reason: 'Instalasi awal pipa air bersih dan jalur air kotor sebelum pekerjaan dinding tertutup.',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          { materialName: 'Pipa air bersih dan fitting', requestedQty: 5, unit: 'titik', rabItemId: 'item-002-09-01', estimatedUnitPrice: 250000 },
          { materialName: 'Pipa air kotor dan aksesoris', requestedQty: 4, unit: 'titik', rabItemId: 'item-002-09-02', estimatedUnitPrice: 280000 }
        ]
      }
    }
  });

  const mrTipe36Atap = await prisma.materialRequest.create({
    data: {
      id: 'mr-tipe36-006',
      requestCode: 'MR-24-0206',
      projectId: activeProject2.id,
      stageId: stageActive2_5.id,
      foremanId: foreman2.id,
      supervisorId: supervisor2.id,
      status: 'draft',
      priority: 'medium',
      neededDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      reason: 'Draft kebutuhan rangka atap baja ringan dan penutup atap setelah ring balok siap.',
      items: {
        create: [
          { materialName: 'Rangka atap baja ringan', requestedQty: 48, unit: 'm2', rabItemId: 'item-002-05-01', estimatedUnitPrice: 140000 },
          { materialName: 'Genteng metal / spandek', requestedQty: 48, unit: 'm2', rabItemId: 'item-002-05-02', estimatedUnitPrice: 98000 }
        ]
      }
    }
  });

  ctx.materialRequests = {
    mrPending1,
    mrApproved1,
    mrTipe36Persiapan,
    mrTipe36Pondasi,
    mrTipe36Struktur,
    mrTipe36Dinding,
    mrTipe36Plumbing,
    mrTipe36Atap
  };
  console.log('Material Requests seeded successfully.');
};
