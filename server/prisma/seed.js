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

  // Destructure variables needed for downstream feature seeds
  const { activeProject1: activeProject, activeProject2, finishedProject1: finishedProject } = context.projects;
  const { itemSemen1: item1, itemBesi1: item2 } = context.rabItems;
  const { stageActive1_1: stage1, stageActive1_2: stage2, stageFinished1: finishedStage } = context.stages;


  console.log('Seeding Scenario 8: Project Documents...');

  await prisma.projectDocument.create({
    data: {
      projectId: activeProject.id,
      title: 'Foto Lahan Sebelum Konstruksi',
      description: 'Dokumentasi kondisi lahan sebelum proses perataan',
      category: 'lapangan',
      fileName: 'lahan-sebelum-konstruksi.jpg',
      fileUrl: '/uploads/demo/lahan-sebelum-konstruksi.jpg',
      mimeType: 'image/jpeg',
      size: 2048000, // 2MB
      visibility: 'customer_visible',
      status: 'active',
      uploadedByRole: 'pengawas',
      uploadedById: supervisor1.id,
      stageId: stage1.id
    }
  });

  await prisma.projectDocument.create({
    data: {
      projectId: activeProject.id,
      title: 'Surat Izin Mendirikan Bangunan',
      description: 'IMB Proyek RKK-001',
      category: 'legal',
      fileName: 'imb-rkk-001.pdf',
      fileUrl: '/uploads/demo/imb-rkk-001.pdf',
      mimeType: 'application/pdf',
      size: 1024000, // 1MB
      visibility: 'internal',
      status: 'active',
      uploadedByRole: 'admin',
      uploadedById: admin1.id
    }
  });

  // 14. PAYMENT RECORDS
  console.log('Seeding Payment Records...');
  await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0001',
      projectId: 'project-active-001',
      customerId: 'customer-002',
      type: 'CUSTOMER_PAYMENT',
      amount: 250000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-001',
      note: 'DP 1 / Termin 1 Pembangunan BSD Mewah'
    }
  });

  await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0002',
      projectId: 'project-active-001',
      customerId: 'customer-002',
      type: 'CUSTOMER_PAYMENT',
      amount: 250000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-001',
      note: 'Termin 2 Pembangunan BSD Mewah'
    }
  });

  await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-2024-0003',
      projectId: 'project-active-001',
      customerId: 'customer-002',
      type: 'CUSTOMER_PAYMENT',
      amount: 500000000,
      status: 'pending',
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      note: 'Termin 3 - Menunggu progres 50%'
    }
  });

  await prisma.paymentRecord.create({
    data: {
      paymentCode: 'PAY-FRM-0001',
      projectId: 'project-active-001',
      foremanId: 'foreman-001',
      type: 'FOREMAN_PAYMENT',
      amount: 15000000,
      status: 'verified',
      dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      paidAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      verifiedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
      verifiedByRole: 'admin',
      verifiedById: 'admin-001',
      note: 'Pembayaran Mingguan Mandor - Minggu 1'
    }
  });


  // ===== ADMINISTRATIVE HELPER DOCUMENTS =====

  console.log('Seeding Administrative Helper Documents...');
  await prisma.administrativeHelperDocument.createMany({
    data: [
      {
        documentCode: 'INV-DRAFT-001',
        projectId: 'project-active-001',
        customerId: 'customer-002',
        type: 'INVOICE',
        title: 'Draft Invoice Progres 25%',
        status: 'draft',
        summaryData: 'Invoice penagihan progres pekerjaan 25% sesuai milestone.',
        contentJson: {
          items: [
            { desc: 'Pekerjaan Struktur', amount: 50000000 },
            { desc: 'Pekerjaan Dinding', amount: 25000000 }
          ],
          total: 75000000,
          bankInfo: 'BCA 1234567890 a/n RumahKu Konstruksi'
        },
        createdByRole: 'admin',
        createdById: 'admin-001'
      },
      {
        documentCode: 'BAST-DRAFT-001',
        projectId: 'project-active-001',
        customerId: 'customer-002',
        type: 'BAST',
        title: 'Draft BAST-1 (Serah Terima Tahap 1)',
        status: 'reviewed',
        summaryData: 'Draft berita acara serah terima pekerjaan tahap awal.',
        contentJson: {
          scope: 'Pondasi dan Struktur Utama',
          condition: 'Baik',
          notes: 'Beberapa catra kecil perlu finishing'
        },
        createdByRole: 'admin',
        createdById: 'admin-001'
      },
      {
        documentCode: 'LEGAL-HELP-001',
        projectId: 'project-active-001',
        customerId: 'customer-002',
        type: 'LEGAL_HELPER',
        title: 'Draft Addendum Perubahan Spesifikasi Keramik',
        status: 'released',
        summaryData: 'Dokumen pembantu untuk perubahan material dari keramik standar ke granit.',
        contentJson: {
          originalItem: 'Keramik 40x40 Putih',
          newItem: 'Granit 60x60 Cream',
          additionalCost: 15000000
        },
        createdByRole: 'admin',
        createdById: 'admin-001',
        releasedAt: new Date()
      }
    ]
  });

  // ===== APP NOTIFICATIONS =====
  console.log('Seeding App Notifications...');
  await prisma.appNotification.createMany({
    data: [
      {
        recipientRole: 'admin',
        recipientId: 'admin-001',
        actorRole: 'foreman',
        actorId: 'foreman-001',
        eventType: 'FIELD_ISSUE_CREATED',
        entityType: 'FieldIssue',
        title: 'Kendala Lapangan Baru',
        message: 'Mandor Mulyadi melaporkan kendala cuaca ekstrem di proyek BSD.',
        linkPath: '/admin/monitoring/kendala',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        recipientRole: 'supervisor',
        recipientId: 'supervisor-001',
        actorRole: 'foreman',
        actorId: 'foreman-001',
        eventType: 'FIELD_ISSUE_CREATED',
        entityType: 'FieldIssue',
        title: 'Kendala Baru Perlu Verifikasi',
        message: 'Ada laporan kendala teknis dari Mandor Mulyadi.',
        linkPath: '/pengawas/kendala',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        recipientRole: 'customer',
        recipientId: 'customer-002',
        actorRole: 'admin',
        actorId: 'admin-001',
        eventType: 'DOCUMENT_RELEASED',
        entityType: 'AdministrativeHelperDocument',
        title: 'Dokumen Baru Dirilis',
        message: 'Admin telah merilis draft BAST untuk Anda tinjau.',
        linkPath: '/konsumen/dokumen',
        createdAt: new Date(Date.now() - 30 * 60 * 1000)
      }
    ]
  });



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
