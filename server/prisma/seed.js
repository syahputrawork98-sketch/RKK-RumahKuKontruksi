import { PrismaClient } from '@prisma/client';
import { cleanupDatabase } from './seed/cleanup.js';
import { createSeedContext } from './seed/context.js';

const prisma = new PrismaClient();

async function main() {
  // 0. CLEANUP & CONTEXT INITIALIZATION
  await cleanupDatabase(prisma);
  const context = createSeedContext();

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

  await prisma.admin.create({
    data: {
      id: 'admin-003',
      name: 'Agus Pranoto',
      email: 'agus.admin@rkk.local',
      phone: '081234567003',
      status: 'inactive',
      avatar: 'https://i.pravatar.cc/150?u=admin-003'
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

  await prisma.superadmin.createMany({
    data: [
      {
        id: 'superadmin-002',
        name: 'Maya Kusumawardani',
        email: 'maya.superadmin@rkk.local',
        phone: '081234567011',
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?u=superadmin-002'
      },
      {
        id: 'superadmin-003',
        name: 'Rizal Audit',
        email: 'rizal.audit@rkk.local',
        phone: '081234567012',
        status: 'inactive',
        avatar: 'https://i.pravatar.cc/150?u=superadmin-003'
      }
    ]
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

  const arch4 = await prisma.architect.create({
    data: {
      id: 'architect-004',
      name: 'Tania Larasati',
      email: 'tania.arch@rkk.local',
      phone: '081122334404',
      employmentType: 'fulltime',
      specialization: 'Tropical Residential',
      experienceYears: 7,
      skillTags: ['residential', 'tropical', 'renovation'],
      maxDesignCapacity: 3,
      status: 'active',
      joinedAt: new Date('2023-03-15'),
      notes: 'Arsitek internal untuk desain rumah tropis dan renovasi hunian.',
      avatar: 'https://i.pravatar.cc/150?u=architect-004'
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

  const foreman3 = await prisma.foreman.create({
    data: {
      id: 'foreman-003',
      name: 'Joko Lestari',
      email: 'joko.foreman@rkk.local',
      phone: '081333444003',
      vendorType: 'company',
      companyName: 'CV Pilar Nusantara',
      address: 'Jl. Raya Bogor KM 29, Depok',
      specialization: 'Finishing & Renovasi',
      experienceYears: 8,
      skillTags: ['finishing', 'renovasi', 'interior'],
      teamSummary: { tukang: 10, helper: 6, kepalaTukang: 2 },
      maxProjectCapacity: 2,
      status: 'active',
      joinedAt: new Date('2022-09-10'),
      notes: 'Mandor cadangan untuk proyek renovasi dan finishing interior.',
      avatar: 'https://i.pravatar.cc/150?u=foreman-003'
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

  const customer4 = await prisma.customer.create({
    data: {
      id: 'customer-004',
      name: 'Reno Aditya',
      email: 'reno.aditya@gmail.com',
      phone: '081222220004',
      customerType: 'individual',
      address: 'Jl. Bunga Raya No. 12, Depok',
      identityNumber: '3276011201900004',
      occupation: 'Konsultan IT',
      notes: 'Persona demo konsumen dengan proyek renovasi aktif kedua untuk dashboard dan monitoring multi-project.',
      avatar: 'https://i.pravatar.cc/150?u=customer-004'
    }
  });

  const customer5 = await prisma.customer.create({
    data: {
      id: 'customer-005',
      name: 'CV Sinar Kosan',
      email: 'owner@sinarkosan.local',
      phone: '021-77889900',
      customerType: 'company',
      companyName: 'CV Sinar Kosan Mandiri',
      picName: 'Wulan Prameswari',
      picPosition: 'Owner',
      address: 'Margonda, Depok',
      taxNumber: '02.345.678.9-012.000',
      businessField: 'Properti Kos dan Kontrakan',
      notes: 'Persona demo perusahaan kecil untuk proyek selesai dan histori konstruksi.',
      avatar: 'https://i.pravatar.cc/150?u=customer-005'
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
      estimatedEndDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
      verifiedProgress: 32,
      verifiedProgressById: supervisor1.id,
      verifiedProgressUpdatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
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
      order: 1,
      isVerified: true,
      verifiedBy: supervisor1.id,
      verifiedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
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
      order: 2,
      isVerified: true,
      verifiedBy: supervisor1.id,
      verifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  });

  const supervisor3 = await prisma.supervisor.create({
    data: {
      id: 'supervisor-003',
      name: 'Yusuf Mahendra',
      email: 'yusuf.spv@rkk.local',
      phone: '081444555003',
      specialization: 'MEP & Finishing',
      bio: 'Pengawas lapangan dengan pengalaman renovasi rumah tinggal dan koordinasi MEP ringan.',
      city: 'Depok',
      maxProjectCapacity: 2,
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=supervisor-003'
    }
  });

  await prisma.supervisorCertificate.createMany({
    data: [
      {
        id: 'spv-cert-001',
        supervisorId: supervisor1.id,
        title: 'Ahli K3 Konstruksi Muda',
        issuer: 'Kemnaker RI',
        certificateNumber: 'K3-SPV-001',
        issuedAt: new Date('2021-02-01'),
        expiredAt: new Date('2027-02-01'),
        fileType: 'pdf',
        status: 'valid'
      },
      {
        id: 'spv-cert-002',
        supervisorId: supervisor2.id,
        title: 'Pengawas Bangunan Gedung',
        issuer: 'LPJK',
        certificateNumber: 'LPJK-SPV-002',
        issuedAt: new Date('2020-06-15'),
        expiredAt: new Date('2026-06-15'),
        fileType: 'pdf',
        status: 'valid'
      }
    ]
  });

  await prisma.supervisorExperience.createMany({
    data: [
      {
        id: 'spv-exp-001',
        supervisorId: supervisor1.id,
        projectName: 'Rumah Cluster Alam Sutera',
        companyName: 'RKK Internal',
        role: 'Site Supervisor',
        location: 'Tangerang Selatan',
        startYear: 2021,
        endYear: 2022,
        description: 'Mengawasi struktur rumah dua lantai dan koordinasi progress mingguan.'
      },
      {
        id: 'spv-exp-002',
        supervisorId: supervisor2.id,
        projectName: 'Renovasi Kantor Kemang',
        companyName: 'RKK Internal',
        role: 'Quality Supervisor',
        location: 'Jakarta Selatan',
        startYear: 2022,
        endYear: 2023,
        description: 'Kontrol mutu finishing dan verifikasi pekerjaan interior.'
      }
    ]
  });

  await prisma.foremanCertificate.createMany({
    data: [
      {
        id: 'foreman-cert-001',
        foremanId: foreman1.id,
        title: 'Sertifikat Tukang Struktur',
        issuer: 'LPJK',
        certificateNumber: 'FRM-STR-001',
        issuedAt: new Date('2019-04-20'),
        fileType: 'pdf',
        status: 'valid'
      },
      {
        id: 'foreman-cert-002',
        foremanId: foreman2.id,
        title: 'Sertifikat Mandor Bangunan Gedung',
        issuer: 'BNSP',
        certificateNumber: 'FRM-BDG-002',
        issuedAt: new Date('2020-08-12'),
        fileType: 'pdf',
        status: 'valid'
      }
    ]
  });

  await prisma.foremanExperience.createMany({
    data: [
      {
        id: 'foreman-exp-001',
        foremanId: foreman1.id,
        projectName: 'Pembangunan Rumah Pondok Indah',
        companyName: 'RKK Internal',
        role: 'Mandor Struktur',
        location: 'Jakarta Selatan',
        startYear: 2020,
        endYear: 2021,
        description: 'Mengelola tim struktur untuk pekerjaan pondasi, sloof, kolom, dan dak.'
      },
      {
        id: 'foreman-exp-002',
        foremanId: foreman2.id,
        projectName: 'Renovasi Ruko Serpong',
        companyName: 'CV Bangun Sejahtera',
        role: 'Mandor Utama',
        location: 'Serpong',
        startYear: 2021,
        endYear: 2022,
        description: 'Koordinasi renovasi fasad dan pekerjaan finishing komersial.'
      }
    ]
  });

  await prisma.architectCertificate.createMany({
    data: [
      {
        id: 'arch-cert-001',
        architectId: arch1.id,
        title: 'Sertifikat Keahlian Arsitek Madya',
        issuer: 'IAI',
        certificateNumber: 'IAI-ARCH-001',
        issuedAt: new Date('2018-05-05'),
        fileType: 'pdf',
        status: 'valid'
      },
      {
        id: 'arch-cert-002',
        architectId: arch4.id,
        title: 'Green Building Associate',
        issuer: 'GBC Indonesia',
        certificateNumber: 'GBC-ARCH-004',
        issuedAt: new Date('2022-11-11'),
        fileType: 'pdf',
        status: 'valid'
      }
    ]
  });

  await prisma.architectExperience.createMany({
    data: [
      {
        id: 'arch-exp-001',
        architectId: arch1.id,
        projectName: 'Rumah Compact Lebak Bulus',
        companyName: 'RKK Internal',
        role: 'Lead Architect',
        location: 'Jakarta Selatan',
        startYear: 2021,
        endYear: 2022,
        description: 'Desain rumah compact modern dengan optimasi cahaya alami.'
      },
      {
        id: 'arch-exp-002',
        architectId: arch4.id,
        projectName: 'Villa Tropis Sentul',
        companyName: 'Studio Laras',
        role: 'Architect',
        location: 'Sentul',
        startYear: 2022,
        endYear: 2023,
        description: 'Konsep hunian tropis dengan ventilasi silang dan material lokal.'
      }
    ]
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-stage-001-official',
      projectId: activeProject.id,
      stageId: stage1.id,
      authorRole: 'admin',
      authorId: admin1.id,
      authorName: admin1.name,
      message: 'Pembersihan lahan sudah selesai diverifikasi. Area kerja telah siap untuk tahapan pondasi.',
      isOfficial: true,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-stage-001-reply',
      projectId: activeProject.id,
      stageId: stage1.id,
      authorRole: 'customer',
      authorId: customer2.id,
      authorName: customer2.name,
      message: 'Terima kasih atas update-nya. Mohon tetap diinformasikan jika ada perubahan jadwal berikutnya.',
      parentId: 'comment-stage-001-official',
      createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStagePublicComment.createMany({
    data: [
      {
        id: 'comment-stage-002-official-1',
        projectId: activeProject.id,
        stageId: stage2.id,
        authorRole: 'admin',
        authorId: admin1.id,
        authorName: admin1.name,
        message: 'Tahap galian dan pondasi berjalan. Progress resmi terakhir diverifikasi Pengawas sebesar 32%.',
        isOfficial: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'comment-stage-002-official-2',
        projectId: activeProject.id,
        stageId: stage2.id,
        authorRole: 'admin',
        authorId: admin1.id,
        authorName: admin1.name,
        message: 'Material besi dan semen untuk pekerjaan pondasi sudah masuk proses logistik. Tidak ada isu kritis yang perlu perhatian konsumen saat ini.',
        isOfficial: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]
  });

  await prisma.progressVerificationLog.createMany({
    data: [
      {
        id: 'progress-log-active-001',
        projectId: activeProject.id,
        supervisorId: supervisor1.id,
        previousProgress: 0,
        newProgress: 18,
        stageId: stage1.id,
        notes: 'Pembersihan lahan dan persiapan area kerja selesai sesuai checklist awal.',
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-002',
        projectId: activeProject.id,
        supervisorId: supervisor1.id,
        previousProgress: 18,
        newProgress: 32,
        stageId: stage2.id,
        notes: 'Galian dan pondasi berjalan; progress terverifikasi naik setelah pengecekan lapangan.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]
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

  // 6. SCENARIO 4: SECOND ACTIVE PROJECT
  console.log('Seeding Scenario 4: Second Active Project...');

  const activeProject2 = await prisma.project.create({
    data: {
      id: 'project-active-002',
      projectCode: 'PRJ-2024-002',
      name: 'Renovasi Rumah Tropis Depok',
      type: 'Renovasi',
      status: 'Berjalan',
      progress: 55,
      customerId: customer4.id,
      adminId: admin2.id,
      supervisorId: supervisor2.id,
      foremanId: foreman2.id,
      location: 'Depok, Jawa Barat',
      budgetTotal: 620000000,
      paidAmount: 260000000,
      remainingAmount: 360000000,
      startDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
      estimatedEndDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000),
      verifiedProgress: 58,
      verifiedProgressById: supervisor2.id,
      verifiedProgressUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

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

  const catRenovasi1 = await prisma.rabCategory.create({
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

  const catRenovasi2 = await prisma.rabCategory.create({
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

  await prisma.rabItem.createMany({
    data: [
      {
        id: 'item-bongkar-dapur-001',
        rabPlanId: rabActive2.id,
        categoryId: catRenovasi1.id,
        projectId: activeProject2.id,
        description: 'Bongkar area dapur lama dan pembersihan puing',
        volume: 1,
        unit: 'LS',
        unitPrice: 35000000,
        total: 35000000,
        status: 'completed',
        progress: 100,
        completedValue: 35000000
      },
      {
        id: 'item-kitchen-set-001',
        rabPlanId: rabActive2.id,
        categoryId: catRenovasi2.id,
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
    ]
  });

  const active2Stage1 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-002-001',
      projectId: activeProject2.id,
      rabPlanId: rabActive2.id,
      categoryId: catRenovasi1.id,
      code: 'REN-01',
      title: 'Bongkaran Area Dapur',
      description: 'Pembongkaran area dapur lama dan sortir material yang masih dapat digunakan.',
      status: 'Selesai',
      progress: 100,
      week: 1,
      order: 1,
      startDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000),
      durationDays: 12,
      isVerified: true,
      verifiedBy: supervisor2.id,
      verifiedAt: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000)
    }
  });

  const active2Stage2 = await prisma.projectStage.create({
    data: {
      id: 'stage-active-002-002',
      projectId: activeProject2.id,
      rabPlanId: rabActive2.id,
      categoryId: catRenovasi2.id,
      code: 'REN-02',
      title: 'Finishing Kitchen Set',
      description: 'Pemasangan kabinet bawah, top table, dan finishing HPL area dapur.',
      status: 'Berjalan',
      progress: 55,
      week: 3,
      order: 2,
      startDate: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000),
      durationDays: 28,
      isVerified: true,
      verifiedBy: supervisor2.id,
      verifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStage.create({
    data: {
      id: 'stage-active-002-003',
      projectId: activeProject2.id,
      rabPlanId: rabActive2.id,
      categoryId: catRenovasi2.id,
      code: 'REN-03',
      title: 'Pengecatan dan Styling Akhir',
      description: 'Pengecatan ulang area makan dan styling final setelah kitchen set selesai.',
      status: 'Belum Mulai',
      progress: 0,
      week: 6,
      order: 3,
      durationDays: 14
    }
  });

  await prisma.progressVerificationLog.createMany({
    data: [
      {
        id: 'progress-log-active-002-001',
        projectId: activeProject2.id,
        supervisorId: supervisor2.id,
        previousProgress: 0,
        newProgress: 35,
        stageId: active2Stage1.id,
        notes: 'Bongkaran selesai dan area kerja sudah bersih untuk pekerjaan finishing.',
        createdAt: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'progress-log-active-002-002',
        projectId: activeProject2.id,
        supervisorId: supervisor2.id,
        previousProgress: 35,
        newProgress: 58,
        stageId: active2Stage2.id,
        notes: 'Kitchen set mulai terpasang, top table masuk proses pengukuran final.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]
  });

  const active2Official = await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-active-002-official',
      projectId: activeProject2.id,
      stageId: active2Stage2.id,
      authorRole: 'admin',
      authorId: admin2.id,
      authorName: admin2.name,
      message: 'Kitchen set sudah masuk tahap pemasangan modul bawah. Estimasi pemasangan top table mengikuti hasil ukur akhir pekan ini.',
      isOfficial: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-active-002-reply',
      projectId: activeProject2.id,
      stageId: active2Stage2.id,
      authorRole: 'customer',
      authorId: customer4.id,
      authorName: customer4.name,
      message: 'Baik, mohon pastikan warna HPL sesuai sampel yang sudah disetujui.',
      parentId: active2Official.id,
      createdAt: new Date()
    }
  });

  // 7. SCENARIO 5: FINISHED PROJECT
  console.log('Seeding Scenario 5: Finished Project...');

  const finishedProject = await prisma.project.create({
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

  const rabFinished = await prisma.rabPlan.create({
    data: {
      id: 'rab-finished-001',
      projectId: finishedProject.id,
      title: 'RAB Final Renovasi Kos Margonda',
      type: 'Final',
      status: 'approved',
      totalAmount: 480000000,
      version: 'final',
      approvedAt: new Date('2023-08-05')
    }
  });

  const catFinished = await prisma.rabCategory.create({
    data: {
      id: 'cat-finished-001',
      rabPlanId: rabFinished.id,
      projectId: finishedProject.id,
      code: '01',
      name: 'Renovasi Kamar dan Koridor',
      subtotal: 480000000,
      order: 1
    }
  });

  await prisma.rabItem.create({
    data: {
      id: 'item-finished-001',
      rabPlanId: rabFinished.id,
      categoryId: catFinished.id,
      projectId: finishedProject.id,
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

  const finishedStage = await prisma.projectStage.create({
    data: {
      id: 'stage-finished-001',
      projectId: finishedProject.id,
      rabPlanId: rabFinished.id,
      categoryId: catFinished.id,
      code: 'FIN-01',
      title: 'Serah Terima Renovasi Kos',
      description: 'Pekerjaan renovasi kamar, koridor, dan pengecekan akhir telah selesai.',
      status: 'Selesai',
      progress: 100,
      week: 16,
      order: 1,
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-12-12'),
      durationDays: 133,
      isVerified: true,
      verifiedBy: supervisor3.id,
      verifiedAt: new Date('2023-12-12')
    }
  });

  await prisma.progressVerificationLog.create({
    data: {
      id: 'progress-log-finished-001',
      projectId: finishedProject.id,
      supervisorId: supervisor3.id,
      previousProgress: 92,
      newProgress: 100,
      stageId: finishedStage.id,
      notes: 'Final inspection selesai dan semua kamar sudah siap digunakan.',
      createdAt: new Date('2023-12-12')
    }
  });

  await prisma.projectStagePublicComment.create({
    data: {
      id: 'comment-finished-001',
      projectId: finishedProject.id,
      stageId: finishedStage.id,
      authorRole: 'admin',
      authorId: admin2.id,
      authorName: admin2.name,
      message: 'Project renovasi kos Margonda telah selesai dan diserahterimakan sesuai checklist final.',
      isOfficial: true,
      createdAt: new Date('2023-12-12')
    }
  });

  // 6. SCENARIO 4: PLANNING PROJECT (NOT READY)
  console.log('Seeding Scenario 6: Planning Project (Not Ready)...');
  
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

  // 8. SCENARIO 6: FIELD ISSUES (KENDALA LAPANGAN)
  console.log('Seeding Scenario 6: Field Issues...');

  await prisma.fieldIssue.create({
    data: {
      id: 'issue-active-001',
      issueCode: 'ISSUE-24-0001',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      supervisorId: supervisor1.id,
      title: 'Material Semen Telat',
      description: 'Pengiriman semen dari pusat logistik belum sampai, pekerjaan pengecoran tertunda.',
      category: 'Logistik',
      priority: 'high',
      status: 'open',
      stageId: stage2.id
    }
  });

  await prisma.fieldIssue.create({
    data: {
      id: 'issue-active-002',
      issueCode: 'ISSUE-24-0002',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      title: 'Cuaca Hujan Lebat',
      description: 'Pekerjaan outdoor dihentikan sementara karena hujan deras.',
      category: 'Alam',
      priority: 'medium',
      status: 'in_review'
    }
  });

  console.log('Seeding Scenario 7: Daily Tasks & Reports...');

  const dailyTask1 = await prisma.dailyTask.create({
    data: {
      id: 'task-active-001',
      projectId: activeProject.id,
      foremanId: foreman1.id,
      stageId: stage2.id,
      rabItemId: item2.id,
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
      projectId: activeProject.id,
      foremanId: foreman1.id,
      stageId: stage2.id,
      title: 'Pembersihan Area',
      targetDate: new Date(),
      status: 'todo',
      priority: 'medium'
    }
  });

  await prisma.dailyReport.create({
    data: {
      id: 'report-active-001',
      reportCode: 'DR-2024-001',
      projectId: activeProject.id,
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
