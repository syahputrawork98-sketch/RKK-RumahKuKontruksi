import { PrismaClient } from '@prisma/client';
import { cleanupDatabase } from './seed/cleanup.js';
import { createSeedContext } from './seed/context.js';
import { seedPersonas } from './seed/modules/personas.seed.js';
import { seedCustomers } from './seed/modules/customers.seed.js';
import { seedProjects } from './seed/modules/projects.seed.js';
import { seedRab } from './seed/modules/rab.seed.js';
import { seedStagesAndProgress } from './seed/modules/stages-progress.seed.js';
import { seedMaterialRequests } from './seed/modules/material-requests.seed.js';
import { seedFieldIssues } from './seed/modules/field-issues.seed.js';
import { seedDailyOperations } from './seed/modules/daily-operations.seed.js';
import { seedProjectDocuments } from './seed/modules/project-documents.seed.js';
import { seedPayments } from './seed/modules/payments.seed.js';
import { seedHelperDocuments } from './seed/modules/helper-documents.seed.js';
import { seedNotifications } from './seed/modules/notifications.seed.js';


const prisma = new PrismaClient();

async function main() {
  // 0. CLEANUP & CONTEXT INITIALIZATION
  await cleanupDatabase(prisma);
  const context = createSeedContext();

  // 1. MASTER ROLES
  await seedPersonas(prisma, context);
  const { admin1, admin2 } = context.admins;
  const { arch1, arch2, arch3, arch4 } = context.architects;
  const { foreman1, foreman2, foreman3 } = context.foremen;
  const { supervisor1, supervisor2, supervisor3 } = context.supervisors;

  // 2. CUSTOMERS
  await seedCustomers(prisma, context);
  const { customer1, customer2, customer3, customer4, customer5 } = context.customers;

  // 3. SCENARIO 1: DESIGN FLOW

  console.log('Seeding Scenario 1: Design Flow...');
  
  // DR 1: Submitted (New)
  await prisma.designRequest.create({
    data: {
      id: 'dr-submitted-001',
      customerId: customer1.id,
      title: 'Desain Paviliun Modern Minimalis',
      description: 'Ingin membangun paviliun di belakang rumah utama dengan 1 kamar tidur dan pantry.',
      buildingType: 'Paviliun',
      location: 'Jakarta Selatan',
      estimatedBudget: 150000000,
      status: 'submitted'
    }
  });

  // DR 2: Tender Open
  const drTenderOpen = await prisma.designRequest.create({
    data: {
      id: 'dr-tender-open-001',
      customerId: customer2.id,
      title: 'Renovasi Cafe Vintage BSD',
      description: 'Konsep cafe industrial vintage untuk area seluas 80m2.',
      buildingType: 'Cafe',
      location: 'BSD, Tangerang',
      estimatedBudget: 250000000,
      status: 'submitted'
    }
  });

  const tenderOpen = await prisma.designTender.create({
    data: {
      id: 'tender-open-001',
      designRequestId: drTenderOpen.id,
      title: drTenderOpen.title,
      description: drTenderOpen.description,
      status: 'open',
      baseDesignFee: 15000000,
      platformFeeAmount: 4500000,
      drafterBudgetAmount: 10500000,
      publishedAt: new Date()
    }
  });

  await prisma.designTenderBid.create({
    data: {
      id: 'bid-001',
      designTenderId: tenderOpen.id,
      architectId: arch1.id,
      bidAmount: 10000000,
      message: 'Saya berpengalaman dalam desain interior cafe komersial.',
      estimatedDurationDays: 14,
      status: 'submitted'
    }
  });

  await prisma.designTenderBid.create({
    data: {
      id: 'bid-002',
      designTenderId: tenderOpen.id,
      architectId: arch2.id,
      bidAmount: 9500000,
      message: 'Penawaran harga bersaing dengan kualitas detail tinggi.',
      estimatedDurationDays: 10,
      status: 'submitted'
    }
  });

  // DR 3: Awarded / Approved
  const drApproved = await prisma.designRequest.create({
    data: {
      id: 'dr-approved-001',
      customerId: customer3.id,
      architectId: arch3.id,
      title: 'Desain Kantor Cabang Sudirman',
      description: 'Interior kantor modern untuk 50 karyawan.',
      buildingType: 'Office',
      location: 'Sudirman, Jakarta',
      estimatedBudget: 1200000000,
      status: 'approved'
    }
  });

  const tenderAwarded = await prisma.designTender.create({
    data: {
      id: 'tender-awarded-001',
      designRequestId: drApproved.id,
      title: drApproved.title,
      status: 'awarded',
      baseDesignFee: 50000000,
      platformFeeAmount: 15000000,
      drafterBudgetAmount: 35000000,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      awardedAt: new Date(),
      selectedBidId: 'bid-awarded-001'
    }
  });

  await prisma.designTenderBid.create({
    data: {
      id: 'bid-awarded-001',
      designTenderId: tenderAwarded.id,
      architectId: arch3.id,
      bidAmount: 35000000,
      message: 'Siap mengerjakan sesuai timeline ketat.',
      estimatedDurationDays: 21,
      status: 'selected'
    }
  });

  // DR 4: Cancelled tender scenario
  const drCancelled = await prisma.designRequest.create({
    data: {
      id: 'dr-cancelled-001',
      customerId: customer4.id,
      architectId: arch4.id,
      title: 'Desain Renovasi Dapur Tropis Depok',
      description: 'Renovasi dapur dan area makan dengan bukaan alami serta storage tambahan.',
      buildingType: 'Residential Renovation',
      location: 'Depok',
      estimatedBudget: 180000000,
      status: 'cancelled',
      notes: 'Dibatalkan oleh konsumen karena revisi prioritas anggaran keluarga.'
    }
  });

  const tenderCancelled = await prisma.designTender.create({
    data: {
      id: 'tender-cancelled-001',
      designRequestId: drCancelled.id,
      title: drCancelled.title,
      description: drCancelled.description,
      status: 'cancelled',
      baseDesignFee: 12000000,
      platformFeeAmount: 3600000,
      drafterBudgetAmount: 8400000,
      publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      closedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.designTenderBid.create({
    data: {
      id: 'bid-cancelled-001',
      designTenderId: tenderCancelled.id,
      architectId: arch4.id,
      bidAmount: 8000000,
      message: 'Konsep dapur tropis dapat dibuat dalam dua pekan dengan opsi material lokal.',
      estimatedDurationDays: 12,
      status: 'withdrawn'
    }
  });

  // 3. PROJECTS, RAB, STAGES (Modularized)
  await seedProjects(prisma, context);
  await seedRab(prisma, context);
  await seedStagesAndProgress(prisma, context);

  // 30D-1: MATERIAL REQUESTS (Modularized)
  await seedMaterialRequests(prisma, context);

  // 30D-2: FIELD ISSUES & DAILY OPERATIONS (Modularized)
  await seedFieldIssues(prisma, context);
  await seedDailyOperations(prisma, context);

  // 30D-3: DOCUMENTS, PAYMENTS, HELPERS & NOTIFICATIONS (Modularized)
  await seedProjectDocuments(prisma, context);
  await seedPayments(prisma, context);
  await seedHelperDocuments(prisma, context);
  await seedNotifications(prisma, context);

  // Destructure variables needed for downstream feature seeds
  const { activeProject1: activeProject, activeProject2, finishedProject1: finishedProject } = context.projects;
  const { itemSemen1: item1, itemBesi1: item2 } = context.rabItems;
  const { stageActive1_1: stage1, stageActive1_2: stage2, stageFinished1: finishedStage } = context.stages;





  console.log('--- CURATED SEED DATA CLEANUP FINISHED ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
