import { PrismaClient } from '@prisma/client';
import { mockCustomers } from '../../client/src/data/mock/customers.js';
import { mockProjects } from '../../client/src/data/mock/projects.js';
import { mockProjectStages } from '../../client/src/data/mock/projectStages.js';
import { mockRabPlans } from '../../client/src/data/mock/rabPlans.js';
import { mockRabCategories } from '../../client/src/data/mock/rabCategories.js';
import { mockRabItems } from '../../client/src/data/mock/rabItems.js';
import { mockForemen } from '../../client/src/data/mock/foremen.js';
import { mockForemanCertificates } from '../../client/src/data/mock/foremanCertificates.js';
import { mockArchitects } from '../../client/src/data/mock/architects.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 0. Supervisors
  console.log('Seeding supervisors...');
  const supervisors = [
    {
      id: 'supervisor-001',
      name: 'Ahmad Fauzi',
      email: 'fauzi@rkk.com',
      phone: '081234567890',
      specialization: 'Struktur & Sipil',
      city: 'Bekasi',
      bio: 'Pengawas berpengalaman 10 tahun di bidang konstruksi residensial.',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=supervisor-001',
      maxProjectCapacity: 3
    },
    {
      id: 'supervisor-002',
      name: 'Bambang Wijaya',
      email: 'bambang@rkk.com',
      phone: '081234567891',
      specialization: 'Arsitektur & Interior',
      city: 'Tangerang',
      bio: 'Fokus pada detail finishing dan kualitas material interior.',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=supervisor-002',
      maxProjectCapacity: 3
    },
    {
      id: 'supervisor-003',
      name: 'Eko Prasetyo',
      email: 'eko@rkk.com',
      phone: '081234567892',
      specialization: 'MEP & Infrastruktur',
      city: 'Jakarta',
      bio: 'Ahli dalam sistem mekanikal, elektrikal, dan pemipaan.',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=supervisor-003',
      maxProjectCapacity: 3
    },
    {
      id: 'supervisor-004',
      name: 'Lukman Hakim',
      email: 'lukman@rkk.com',
      phone: '081234567893',
      specialization: 'Generalist',
      city: 'Depok',
      bio: 'Pengawas junior dengan dedikasi tinggi pada manajemen waktu.',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?u=supervisor-004',
      maxProjectCapacity: 3
    }
  ];

  for (const s of supervisors) {
    await prisma.supervisor.upsert({
      where: { id: s.id },
      update: {
        status: 'active',
        specialization: s.specialization,
        maxProjectCapacity: s.maxProjectCapacity
      },
      create: s
    });
  }

  // Clear related to avoid duplicates
  await prisma.supervisorCertificate.deleteMany({});
  await prisma.supervisorExperience.deleteMany({});

  console.log('Seeding supervisor certificates...');
  const certificates = [
    { id: 'cert-001', supervisorId: 'supervisor-001', title: 'SKA Ahli Madya Bangunan Gedung', issuer: 'LPJK', status: 'valid' },
    { id: 'cert-002', supervisorId: 'supervisor-001', title: 'Sertifikasi K3 Konstruksi', issuer: 'Kemnaker', status: 'valid' },
    { id: 'cert-003', supervisorId: 'supervisor-002', title: 'SKA Ahli Muda Arsitektur', issuer: 'IAI', status: 'valid' },
    { id: 'cert-004', supervisorId: 'supervisor-002', title: 'Manajemen Proyek Konstruksi', issuer: 'PMP', status: 'valid' },
    { id: 'cert-005', supervisorId: 'supervisor-003', title: 'SKA Ahli Muda MEP', issuer: 'LPJK', status: 'valid' },
    { id: 'cert-006', supervisorId: 'supervisor-004', title: 'Sertifikat Pengawas Lapangan', issuer: 'RKK Training', status: 'valid' }
  ];

  for (const cert of certificates) {
      await prisma.supervisorCertificate.create({ data: cert });
  }

  console.log('Seeding supervisor experiences...');
  const experiences = [
    { id: 'exp-001', supervisorId: 'supervisor-001', projectName: 'Pembangunan Cluster Green Hill', role: 'Chief Supervisor', companyName: 'PT Jaya Konstruksi', startYear: 2020, endYear: 2022 },
    { id: 'exp-002', supervisorId: 'supervisor-004', projectName: 'Renovasi Rumah Kost Margonda', role: 'Junior Supervisor', companyName: 'Freelance', startYear: 2024, endYear: 2025 }
  ];

  for (const exp of experiences) {
      await prisma.supervisorExperience.create({ data: exp });
  }

  // 0.5 Foremen
  console.log('Seeding foremen...');
  for (const f of mockForemen) {
    await prisma.foreman.upsert({
      where: { id: f.id },
      update: {},
      create: {
        id: f.id,
        userId: f.userId,
        name: f.name,
        email: f.email,
        phone: f.phone,
        avatar: f.avatar,
        vendorType: f.vendorType,
        companyName: f.companyName,
        address: f.address,
        specialization: f.specialization,
        experienceYears: f.experienceYears,
        skillTags: f.skillTags,
        teamSummary: f.teamSummary,
        maxProjectCapacity: f.maxProjectCapacity,
        status: f.status,
        joinedAt: f.joinedAt ? new Date(f.joinedAt) : null,
        notes: f.notes
      }
    });
  }

  // Clear related to avoid duplicates
  await prisma.foremanCertificate.deleteMany({});
  await prisma.foremanExperience.deleteMany({});

  console.log('Seeding foreman certificates...');
  for (const cert of mockForemanCertificates) {
    await prisma.foremanCertificate.create({
      data: {
        id: cert.id,
        foremanId: cert.foremanId,
        title: cert.title,
        issuer: cert.issuer,
        certificateNumber: cert.certificateNumber,
        issuedAt: cert.issuedAt ? new Date(cert.issuedAt) : null,
        expiredAt: cert.expiredAt ? new Date(cert.expiredAt) : null,
        fileUrl: cert.fileUrl,
        fileType: cert.fileType,
        status: cert.status
      }
    });
  }

  // 0.7 Architects
  console.log('Seeding architects...');
  for (const a of mockArchitects) {
    await prisma.architect.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        userId: a.userId,
        name: a.name,
        email: a.email,
        phone: a.phone,
        avatar: a.avatar,
        employmentType: a.employmentType,
        specialization: a.specialization,
        experienceYears: a.experienceYears,
        skillTags: a.skillTags,
        maxDesignCapacity: a.maxDesignCapacity,
        status: a.status,
        joinedAt: a.joinedAt ? new Date(a.joinedAt) : null,
        notes: a.notes
      }
    });
  }

  // Clear related to avoid duplicates
  await prisma.architectCertificate.deleteMany({});
  await prisma.architectExperience.deleteMany({});

  console.log('Seeding architect certificates...');
  const archCertificates = [
    { id: 'arch-cert-001', architectId: 'architect-001', title: 'SKA Arsitek Madya', issuer: 'IAI', status: 'valid' },
    { id: 'arch-cert-002', architectId: 'architect-002', title: 'Sertifikasi Green Building', issuer: 'GBCI', status: 'valid' }
  ];
  for (const cert of archCertificates) {
    await prisma.architectCertificate.create({ data: cert });
  }

  console.log('Seeding architect experiences...');
  const archExperiences = [
    { id: 'arch-exp-001', architectId: 'architect-001', projectName: 'Villa Uluwatu', role: 'Principal Architect', companyName: 'IndoDesign', startYear: 2021, endYear: 2022 },
    { id: 'arch-exp-002', architectId: 'architect-003', projectName: 'Warehouse Cikarang', role: 'Lead Architect', companyName: 'Partner Arch', startYear: 2019, endYear: 2021 }
  ];
  for (const exp of archExperiences) {
    await prisma.architectExperience.create({ data: exp });
  }

  // 1. Customers
  console.log('Seeding customers...');
  for (const c of mockCustomers) {
    await prisma.customer.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        userId: c.userId,
        customerType: c.customerType,
        name: c.name,
        email: c.email,
        phone: c.phone,
        avatar: c.avatar,
        address: c.address,
        identityNumber: c.identityNumber,
        occupation: c.occupation,
        companyName: c.companyName,
        picName: c.picName,
        picPosition: c.picPosition,
        logo: c.logo,
        taxNumber: c.taxNumber,
        businessField: c.businessField,
        notes: c.notes,
      },
    });
  }

  // 2. Projects
  console.log('Seeding projects...');
  // Distribution: Ahmad (3), Bambang (2), Eko (1), Lukman (0)
  const distribution = {
    'project-001': 'supervisor-001',
    'project-002': 'supervisor-001',
    'project-007': 'supervisor-001',
    'project-008': 'supervisor-002',
    'project-004': 'supervisor-002',
    'project-003': 'supervisor-003',
  };

  for (const p of mockProjects) {
    const sId = distribution[p.id] || null;
    
    await prisma.project.upsert({
      where: { id: p.id },
      update: {
          supervisorId: sId,
          foremanId: p.foremanId || null
      },
      create: {
        id: p.id,
        projectCode: p.projectCode,
        name: p.name,
        type: p.type,
        status: p.status,
        progress: p.progress,
        customerId: p.customerId,
        location: p.location,
        startDate: p.startDate ? new Date(p.startDate) : null,
        estimatedEndDate: p.estimatedEndDate ? new Date(p.estimatedEndDate) : null,
        budgetTotal: p.budgetTotal,
        paidAmount: p.paidAmount,
        remainingAmount: p.remainingAmount,
        heroImage: p.heroImage,
        sourceDesignRequestId: p.sourceDesignRequestId,
        adminId: p.adminId,
        supervisorId: sId,
        foremanId: p.foremanId || null,
      },
    });
  }

  // 3. RabPlans
  console.log('Seeding RAB plans...');
  for (const r of mockRabPlans) {
    await prisma.rabPlan.upsert({
      where: { id: r.id },
      update: {},
      create: {
        id: r.id,
        projectId: r.projectId,
        title: r.title,
        type: r.type,
        version: r.version,
        status: r.status,
        totalAmount: r.totalAmount,
        notes: r.notes,
        sourceDesignRequestId: r.sourceDesignRequestId,
        createdAt: r.createdAt ? new Date(r.createdAt) : new Date(),
        approvedAt: r.approvedAt ? new Date(r.approvedAt) : null,
      },
    });
  }

  // 4. ProjectStages
  console.log('Seeding project stages...');
  for (const s of mockProjectStages) {
    await prisma.projectStage.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        projectId: s.projectId,
        rabPlanId: s.rabPlanId,
        categoryId: s.categoryId,
        code: s.code,
        title: s.title,
        description: s.description,
        week: s.week,
        status: s.status,
        progress: s.progress,
        startDate: s.startDate ? new Date(s.startDate) : null,
        endDate: s.endDate ? new Date(s.endDate) : null,
        durationDays: s.durationDays,
        order: s.order,
        note: s.note,
        isVerified: s.verification?.isVerified || false,
        verifiedBy: s.verification?.verifiedBy,
        verifiedAt: s.verification?.verifiedAt ? new Date(s.verification.verifiedAt) : null,
      },
    });
  }

  // 5. RabCategories
  console.log('Seeding RAB categories...');
  for (const cat of mockRabCategories) {
    await prisma.rabCategory.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        rabPlanId: cat.rabPlanId,
        projectId: cat.projectId,
        code: cat.code,
        name: cat.name,
        description: cat.description,
        order: cat.order,
        subtotal: cat.subtotal,
      },
    });
  }

  // 6. RabItems
  console.log('Seeding RAB items...');
  for (const item of mockRabItems) {
    await prisma.rabItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        rabPlanId: item.rabPlanId,
        categoryId: item.categoryId,
        projectId: item.projectId,
        description: item.description,
        location: item.location,
        volume: item.volume,
        unit: item.unit,
        unitPrice: item.unitPrice,
        total: item.total,
        progress: item.progress,
        completedValue: item.completedValue,
        status: item.status,
        notes: item.notes,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
