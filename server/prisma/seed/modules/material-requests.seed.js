/**
 * Material Request Seed Module
 * Handles creation of MaterialRequest and MaterialRequestItem entities.
 */

export const seedMaterialRequests = async (prisma, ctx) => {
  console.log('Seeding Material Requests...');

  const { activeProject1: activeProject } = ctx.projects;
  const { foreman1 } = ctx.foremen;
  const { supervisor1 } = ctx.supervisors;
  const { admin1 } = ctx.admins;
  const { stageActive1_2: stage2 } = ctx.stages;
  const { itemSemen1: item1, itemBesi1: item2 } = ctx.rabItems;

  const mrPending1 = await prisma.materialRequest.create({
    data: {
      id: 'mr-pending-001',
      requestCode: 'MR-24-0001',
      projectId: activeProject.id,
      stageId: stage2.id,
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
            rabItemId: item1.id
          }
        ]
      }
    }
  });

  const mrApproved1 = await prisma.materialRequest.create({
    data: {
      id: 'mr-approved-001',
      requestCode: 'MR-24-0002',
      projectId: activeProject.id,
      stageId: stage2.id,
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
            rabItemId: item2.id
          }
        ]
      }
    }
  });

  ctx.materialRequests = { mrPending1, mrApproved1 };
  console.log('Material Requests seeded successfully.');
};
