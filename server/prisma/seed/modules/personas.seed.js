/**
 * Personas Seed Module
 * Seeds Master Roles: Admins, Superadmins, Architects, Foremen, and Supervisors.
 */

export const seedPersonas = async (prisma, ctx) => {
  console.log('Seeding Master Roles (Admins, Architects, Foremen, Supervisors)...');

  // --- ADMINS ---
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

  const admin3 = await prisma.admin.create({
    data: {
      id: 'admin-003',
      name: 'Agus Pranoto',
      email: 'agus.admin@rkk.local',
      phone: '081234567003',
      status: 'inactive',
      avatar: 'https://i.pravatar.cc/150?u=admin-003'
    }
  });

  ctx.admins = { admin1, admin2, admin3 };

  // --- SUPERADMINS ---
  const superadmin1 = await prisma.superadmin.create({
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

  ctx.superadmins = { superadmin1 };

  // --- ARCHITECTS ---
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

  ctx.architects = { arch1, arch2, arch3, arch4 };

  // --- FOREMEN ---
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

  ctx.foremen = { foreman1, foreman2, foreman3 };

  // --- SUPERVISORS ---
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

  ctx.supervisors = { supervisor1, supervisor2, supervisor3 };

  console.log('Personas seeded successfully.');
};

