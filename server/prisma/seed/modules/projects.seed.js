/**
 * Projects Seed Module
 * Handles creation of Project entities across different scenarios (Planning, Active, Finished).
 */

export const seedProjects = async (prisma, ctx) => {
  console.log('Seeding Projects...');

  const { admin1, admin2 } = ctx.admins;
  const { customer1, customer2, customer3, customer4, customer5 } = ctx.customers;
  const { supervisor1, supervisor2, supervisor3 } = ctx.supervisors;
  const { foreman1, foreman2, foreman3 } = ctx.foremen;

  // Scenario 2: Project Bridge (Planning)
  const projectPlanning1 = await prisma.project.create({
    data: {
      id: 'project-planning-001',
      projectCode: 'PRJ-PLAN-001',
      name: 'Project Kantor Sudirman (Draft)',
      type: 'Renovasi',
      status: 'planning',
      customerId: customer3.id,
      location: 'Sudirman, Jakarta',
      budgetTotal: 1200000000,
      sourceDesignRequestId: 'dr-approved-001',
      adminId: admin1.id,
      progress: 0
    }
  });

  // Scenario 3: Active Construction
  const activeProject1 = await prisma.project.create({
    data: {
      id: 'project-active-001',
      projectCode: 'PRJ-2024-001',
      name: 'Pembangunan Rumah Mewah BSD',
      type: 'Pembangunan Baru',
      status: 'Berjalan',
      progress: 25,
      customerId: customer2.id,
      adminId: admin1.id,
      supervisorId: supervisor1.id,
      foremanId: foreman1.id,
      location: 'BSD City, Tangerang',
      budgetTotal: 1500000000,
      paidAmount: 500000000,
      remainingAmount: 1000000000,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      estimatedEndDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
      verifiedProgress: 32,
      verifiedProgressById: supervisor1.id,
      verifiedProgressUpdatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  });

  // Scenario 4: Second Active Project
  const activeProject2 = await prisma.project.create({
    data: {
      id: 'project-active-002',
      projectCode: 'PRJ-2024-002',
      name: 'Pembangunan Rumah Tipe 36 Depok',
      type: 'Pembangunan Baru',
      status: 'Berjalan',
      progress: 55,
      customerId: customer4.id,
      adminId: admin2.id,
      supervisorId: supervisor2.id,
      foremanId: foreman2.id,
      location: 'Depok, Jawa Barat',
      budgetTotal: 139985000,
      paidAmount: 50000000,
      remainingAmount: 89985000,
      startDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
      estimatedEndDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000),
      verifiedProgress: 58,
      verifiedProgressById: supervisor2.id,
      verifiedProgressUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  // Scenario 5: Finished Project
  const finishedProject1 = await prisma.project.create({
    data: {
      id: 'project-finished-001',
      projectCode: 'PRJ-2023-009',
      name: 'Renovasi Kos Margonda',
      type: 'Renovasi',
      status: 'Selesai',
      progress: 100,
      customerId: customer5.id,
      adminId: admin2.id,
      supervisorId: supervisor3.id,
      foremanId: foreman3.id,
      location: 'Margonda, Depok',
      budgetTotal: 480000000,
      paidAmount: 480000000,
      remainingAmount: 0,
      startDate: new Date('2023-08-01'),
      estimatedEndDate: new Date('2023-12-15'),
      verifiedProgress: 100,
      verifiedProgressById: supervisor3.id,
      verifiedProgressUpdatedAt: new Date('2023-12-12')
    }
  });

  // Scenario 6: Planning Project (Not Ready)
  const projectNotReady1 = await prisma.project.create({
    data: {
      id: 'project-not-ready-001',
      projectCode: 'PRJ-PLAN-002',
      name: 'Pembangunan Kolam Renang Ciledug',
      type: 'Pembangunan Baru',
      status: 'planning',
      customerId: customer1.id,
      location: 'Ciledug, Tangerang',
      budgetTotal: 85000000,
      adminId: admin2.id,
      progress: 0
    }
  });

  // Store in context for downstream use
  ctx.projects = {
    projectPlanning1,
    activeProject1,
    activeProject2,
    finishedProject1,
    projectNotReady1
  };

  console.log('Projects seeded successfully.');
};
