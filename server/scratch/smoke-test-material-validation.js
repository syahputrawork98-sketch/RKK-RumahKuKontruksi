import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function runTest() {
  console.log('--- Testing Material Request Approval & RAB Validation ---');

  try {
    // 1. Setup Test Data
    const project = await prisma.project.findFirst({
      where: { status: 'Berjalan' },
      include: { 
        rabPlans: { include: { items: true } },
        foreman: true,
        supervisor: true,
        admin: true
      }
    });

    if (!project || !project.rabPlans[0] || !project.rabPlans[0].items[0]) {
      console.log('SKIPPING: No active project with RAB found. Please run seed or activate a project first.');
      return;
    }

    const rabItem = project.rabPlans[0].items[0];
    const foremanId = project.foremanId;
    const supervisorId = project.supervisorId;
    const adminId = project.adminId;

    console.log(`Using Project: ${project.name} (${project.status})`);
    console.log(`Target RAB Item: ${rabItem.description}, Volume: ${rabItem.volume}`);

    // 2. Create a Valid Request
    console.log('\nScenario 1: Valid Approval (Quantity within limit)');
    const validQty = 1; // Small enough
    
    // Manual creation to bypass logic if needed, but we use createRequest logic normally
    // For simplicity in scratch script, we can mock the request creation
    const reqCode = `TEST-REQ-${Date.now()}`;
    let stage = await prisma.projectStage.findFirst({ where: { projectId: project.id } });
    if (!stage) {
      console.log('No stage found. Creating temporary stage...');
      stage = await prisma.projectStage.create({
        data: {
          projectId: project.id,
          code: 'TEST-STAGE',
          title: 'Test Stage',
          status: 'planned'
        }
      });
    }

    const validReq = await prisma.materialRequest.create({
      data: {
        requestCode: reqCode,
        projectId: project.id,
        stageId: stage.id,
        foremanId,
        supervisorId,
        status: 'submitted',
        items: {
          create: {
            materialName: 'Test Material',
            requestedQty: validQty,
            unit: 'm3',
            rabItemId: rabItem.id
          }
        }
      }
    });
    console.log(`Created Valid Request: ${validReq.requestCode}`);

    // Try to approve via service-like logic (we call the controller/service logic directly or simulate it)
    // We'll use the service logic if possible.
    const { updateRequestStatus } = await import('../src/modules/material-requests/material-requests.service.js');
    
    try {
      const approved = await updateRequestStatus(validReq.id, {
        status: 'approved_by_admin',
        actorId: adminId,
        actorRole: 'admin',
        note: 'Approving within limit'
      });
      console.log('SUCCESS: Request approved within limit.');
    } catch (e) {
      console.log(`FAILURE: Expected success but got error: ${e.message}`);
    }

    // 3. Create an Invalid Request (Over Limit)
    console.log('\nScenario 2: Rejection (Quantity exceeds limit)');
    const overQty = parseFloat(rabItem.volume) + 100;
    const overReqCode = `TEST-REQ-OVER-${Date.now()}`;
    const overReq = await prisma.materialRequest.create({
      data: {
        requestCode: overReqCode,
        projectId: project.id,
        stageId: validReq.stageId,
        foremanId,
        supervisorId,
        status: 'submitted',
        items: {
          create: {
            materialName: 'Test Over Material',
            requestedQty: overQty,
            unit: 'm3',
            rabItemId: rabItem.id
          }
        }
      }
    });

    try {
      await updateRequestStatus(overReq.id, {
        status: 'approved_by_admin',
        actorId: adminId,
        actorRole: 'admin',
        note: 'Approving over limit'
      });
      console.log('FAILURE: Expected rejection but request was approved!');
    } catch (e) {
      console.log(`EXPECTED ERROR: ${e.message}`);
    }

    // 4. Test Inactive Project
    console.log('\nScenario 3: Rejection (Inactive Project)');
    // Temporarily set project to planning
    await prisma.project.update({ where: { id: project.id }, data: { status: 'planning' } });
    
    const inactiveReqCode = `TEST-REQ-INACTIVE-${Date.now()}`;
    const inactiveReq = await prisma.materialRequest.create({
      data: {
        requestCode: inactiveReqCode,
        projectId: project.id,
        stageId: validReq.stageId,
        foremanId,
        supervisorId,
        status: 'submitted',
        items: {
          create: {
            materialName: 'Test Inactive Material',
            requestedQty: 1,
            unit: 'm3',
            rabItemId: rabItem.id
          }
        }
      }
    });

    try {
      await updateRequestStatus(inactiveReq.id, {
        status: 'approved_by_admin',
        actorId: adminId,
        actorRole: 'admin',
        note: 'Approving inactive project'
      });
      console.log('FAILURE: Expected rejection due to inactive project but request was approved!');
    } catch (e) {
      console.log(`EXPECTED ERROR: ${e.message}`);
    }

    // Cleanup: Set project back to Berjalan
    await prisma.project.update({ where: { id: project.id }, data: { status: 'Berjalan' } });

  } catch (err) {
    console.error('Test script error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
