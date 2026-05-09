import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- STARTING CURATED SEED DATA CLEANUP ---');

  // 0. CLEANUP (Order matters for foreign keys)
  console.log('Cleaning up existing data...');
  await prisma.materialRequestHistory.deleteMany({});
  await prisma.materialRequestItem.deleteMany({});
  await prisma.materialRequest.deleteMany({});
  await prisma.weeklyJournalReviewLog.deleteMany({});
  await prisma.weeklyJournalPhoto.deleteMany({});
  await prisma.weeklyJournalActivity.deleteMany({});
  await prisma.supervisorWeeklyReportJournal.deleteMany({});
  await prisma.supervisorWeeklyReportNote.deleteMany({});
  await prisma.supervisorWeeklyReportReviewLog.deleteMany({});
  await prisma.supervisorWeeklyReport.deleteMany({});
  await prisma.weeklyJournal.deleteMany({});
  await prisma.progressVerificationLog.deleteMany({});
  await prisma.projectStage.deleteMany({});
  await prisma.rabItem.deleteMany({});
  await prisma.rabCategory.deleteMany({});
  await prisma.rabPlan.deleteMany({});
  
  await prisma.designTenderBid.deleteMany({});
  await prisma.designTender.deleteMany({});
  await prisma.designRequest.deleteMany({});
  await prisma.project.deleteMany({});

  await prisma.architectCertificate.deleteMany({});
  await prisma.architectExperience.deleteMany({});
  await prisma.architect.deleteMany({});
  
  await prisma.foremanCertificate.deleteMany({});
  await prisma.foremanExperience.deleteMany({});
  await prisma.foreman.deleteMany({});

  await prisma.supervisorCertificate.deleteMany({});
  await prisma.supervisorExperience.deleteMany({});
  await prisma.supervisor.deleteMany({});

  await prisma.customer.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.superadmin.deleteMany({});

  // 1. MASTER ROLES
  console.log('Seeding Master Roles (Admins, Architects, Foremen, Supervisors)...');
  
  const admin1 = await prisma.admin.create({
    data: {
      id: 'admin-001',
      name: 'Budi Santoso',
      email: 'budi.admin@rkk.local',
      phone: '081234567001',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=admin-001'
    }
  });

  const admin2 = await prisma.admin.create({
    data: {
      id: 'admin-002',
      name: 'Siti Rahma',
      email: 'siti.admin@rkk.local',
      phone: '081234567002',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=admin-002'
    }
  });

  await prisma.superadmin.create({
    data: {
      id: 'superadmin-001',
      name: 'Superadmin RKK',
      email: 'superadmin@rkk.local',
      phone: '081234567000',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=superadmin-001'
    }
  });

  const arch1 = await prisma.architect.create({
    data: {
      id: 'architect-001',
      name: 'Andika Pratama',
      email: 'andika.arch@rkk.local',
      phone: '081122334401',
      employmentType: 'fulltime',
      specialization: 'Modern Minimalist',
      experienceYears: 8,
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=architect-001'
    }
  });

  const arch2 = await prisma.architect.create({
    data: {
      id: 'architect-002',
      name: 'Nabila Putri',
      email: 'nabila.arch@rkk.local',
      phone: '081122334402',
      employmentType: 'freelance',
      specialization: 'Interior Design',
      experienceYears: 5,
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=architect-002'
    }
  });

  const arch3 = await prisma.architect.create({
    data: {
      id: 'architect-003',
      name: 'Raka Wicaksono',
      email: 'raka.arch@rkk.local',
      phone: '081122334403',
      employmentType: 'freelance',
      specialization: 'Industrial / Commercial',
      experienceYears: 12,
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=architect-003'
    }
  });

  const foreman1 = await prisma.foreman.create({
    data: {
      id: 'foreman-001',
      name: 'Mulyadi',
      email: 'mulyadi.foreman@rkk.local',
      phone: '081333444001',
      vendorType: 'individual',
      specialization: 'Struktur & Sipil',
      experienceYears: 15,
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=foreman-001'
    }
  });

  const foreman2 = await prisma.foreman.create({
    data: {
      id: 'foreman-002',
      name: 'Hasan Basri',
      email: 'hasan.foreman@rkk.local',
      phone: '081333444002',
      vendorType: 'company',
      companyName: 'CV Bangun Sejahtera',
      specialization: 'Generalist',
      experienceYears: 10,
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=foreman-002'
    }
  });

  const supervisor1 = await prisma.supervisor.create({
    data: {
      id: 'supervisor-001',
      name: 'Dimas Prakoso',
      email: 'dimas.spv@rkk.local',
      phone: '081444555001',
      specialization: 'Struktur & Sipil',
      city: 'Jakarta',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=supervisor-001'
    }
  });

  const supervisor2 = await prisma.supervisor.create({
    data: {
      id: 'supervisor-002',
      name: 'Ratna Dewi',
      email: 'ratna.spv@rkk.local',
      phone: '081444555002',
      specialization: 'Arsitektur',
      city: 'Bekasi',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=supervisor-002'
    }
  });

  // 2. CUSTOMERS
  console.log('Seeding Customers...');
  const customer1 = await prisma.customer.create({
    data: {
      id: 'customer-001',
      name: 'Iwan Setiawan',
      email: 'iwan@gmail.com',
      phone: '081222220001',
      customerType: 'individual',
      address: 'Jl. Melati No. 5, Jakarta Selatan',
      identityNumber: '3174010101800001',
      occupation: 'Karyawan Swasta',
      notes: 'Persona demo konsumen individu untuk alur desain baru dan proyek planning.',
      avatar: 'https://i.pravatar.cc/150?u=customer-001'
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      id: 'customer-002',
      name: 'Sari Kartika',
      email: 'sari@gmail.com',
      phone: '081222220002',
      customerType: 'individual',
      address: 'BSD City, Tangerang Selatan',
      identityNumber: '3674014502870002',
      occupation: 'Pemilik Usaha Kuliner',
      notes: 'Persona demo konsumen individu dengan proyek konstruksi aktif untuk monitoring timeline.',
      avatar: 'https://i.pravatar.cc/150?u=customer-002'
    }
  });

  const customer3 = await prisma.customer.create({
    data: {
      id: 'customer-003',
      name: 'PT Maju Jaya',
      email: 'admin@majujaya.co.id',
      phone: '021-55566677',
      customerType: 'company',
      companyName: 'PT Maju Jaya Properti',
      picName: 'Hendra',
      picPosition: 'Project Owner Representative',
      address: 'Kuningan, Jakarta Pusat',
      taxNumber: '01.234.567.8-901.000',
      businessField: 'Properti dan Manajemen Gedung',
      notes: 'Persona demo konsumen perusahaan untuk design-to-project bridge dan proyek draft.',
      avatar: 'https://i.pravatar.cc/150?u=customer-003'
    }
  });

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

  // 4. SCENARIO 2: PROJECT BRIDGE
  console.log('Seeding Scenario 2: Project Bridge (Planning)...');
  
  await prisma.project.create({
    data: {
      id: 'project-planning-001',
      projectCode: 'PRJ-PLAN-001',
      name: 'Project Kantor Sudirman (Draft)',
      type: 'Renovasi',
      status: 'planning',
      customerId: customer3.id,
      location: 'Sudirman, Jakarta',
      budgetTotal: 1200000000,
      sourceDesignRequestId: drApproved.id,
      adminId: admin1.id,
      progress: 0
    }
  });

  // 5. SCENARIO 3: ACTIVE CONSTRUCTION
  console.log('Seeding Scenario 3: Active Construction...');
  
  const activeProject = await prisma.project.create({
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
      estimatedEndDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000)
    }
  });

  const rabActive = await prisma.rabPlan.create({
    data: {
      id: 'rab-active-001',
      projectId: activeProject.id,
      title: 'RAB Pembangunan Tahap 1',
      type: 'Plan',
      status: 'approved',
      totalAmount: 1500000000,
      version: '1.0'
    }
  });

  const cat1 = await prisma.rabCategory.create({
    data: {
      id: 'cat-persiapan-001',
      rabPlanId: rabActive.id,
      projectId: activeProject.id,
      code: '01',
      name: 'Pekerjaan Persiapan',
      subtotal: 50000000,
      order: 1
    }
  });

  const cat2 = await prisma.rabCategory.create({
    data: {
      id: 'cat-struktur-001',
      rabPlanId: rabActive.id,
      projectId: activeProject.id,
      code: '02',
      name: 'Pekerjaan Tanah & Struktur',
      subtotal: 450000000,
      order: 2
    }
  });

  const item1 = await prisma.rabItem.create({
    data: {
      id: 'item-semen-001',
      rabPlanId: rabActive.id,
      categoryId: cat2.id,
      projectId: activeProject.id,
      description: 'Semen Portland (50kg)',
      volume: 200,
      unit: 'Zak',
      unitPrice: 65000,
      total: 13000000,
      status: 'pending',
      progress: 20
    }
  });

  const item2 = await prisma.rabItem.create({
    data: {
      id: 'item-besi-001',
      rabPlanId: rabActive.id,
      categoryId: cat2.id,
      projectId: activeProject.id,
      description: 'Besi Beton 12mm',
      volume: 150,
      unit: 'Batang',
      unitPrice: 110000,
      total: 16500000,
      status: 'pending',
      progress: 10
    }
  });

  const stage1 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-001',
      projectId: activeProject.id,
      rabPlanId: rabActive.id,
      categoryId: cat1.id,
      code: 'STG-01',
      title: 'Pembersihan Lahan',
      status: 'Selesai',
      progress: 100,
      week: 1,
      order: 1
    }
  });

  const stage2 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-002',
      projectId: activeProject.id,
      rabPlanId: rabActive.id,
      categoryId: cat2.id,
      code: 'STG-02',
      title: 'Galian Tanah & Pondasi',
      status: 'Berjalan',
      progress: 40,
      week: 2,
      order: 2
    }
  });

  // Material Requests
  await prisma.materialRequest.create({
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

  await prisma.materialRequest.create({
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

  // 6. SCENARIO 4: PLANNING PROJECT (NOT READY)
  console.log('Seeding Scenario 4: Planning Project (Not Ready)...');
  
  await prisma.project.create({
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
      progress: 0,
      // Incomplete: no supervisor, no foreman, no RAB yet
    }
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

