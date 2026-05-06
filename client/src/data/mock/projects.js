// client/src/data/mock/projects.js

export const mockProjects = [
  // customer-001 (Andi Pratama) - 3 projects
  {
    id: "project-001",
    projectCode: "RKK-PRJ-001",
    name: "Renovasi Rumah Tinggal - Bekasi",
    type: "Renovasi",
    status: "Berjalan",
    progress: 65,
    customerId: "customer-001",
    adminId: "admin-001",
    supervisorId: "supervisor-001",
    foremanId: "foreman-001",
    location: "Bekasi, Jawa Barat",
    startDate: "2025-09-01",
    estimatedEndDate: "2025-11-12",
    budgetTotal: 107683146,
    paidAmount: 18000000,
    remainingAmount: 89683146,
    heroImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-002",
    projectCode: "RKK-PRJ-002",
    name: "Pembangunan Kolam Renang - Bekasi",
    type: "Pembangunan Baru",
    status: "Berjalan",
    progress: 15,
    customerId: "customer-001",
    adminId: "admin-001",
    supervisorId: "supervisor-001",
    foremanId: "foreman-001",
    location: "Bekasi, Jawa Barat",
    startDate: "2025-04-01",
    estimatedEndDate: "2025-06-15",
    budgetTotal: 150000000,
    paidAmount: 50000000,
    remainingAmount: 100000000,
    heroImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-007",
    projectCode: "RKK-PRJ-007",
    name: "Pengecatan Pagar & Carport",
    type: "Perawatan",
    status: "Selesai",
    progress: 100,
    customerId: "customer-001",
    adminId: "admin-002",
    supervisorId: "supervisor-001",
    foremanId: "foreman-002",
    location: "Bekasi, Jawa Barat",
    startDate: "2024-12-01",
    estimatedEndDate: "2024-12-15",
    budgetTotal: 15000000,
    paidAmount: 15000000,
    remainingAmount: 0,
    heroImage: "https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&q=80&w=1200"
  },

  // customer-002 (Budi Santoso) - 2 projects
  {
    id: "project-008",
    projectCode: "RKK-PRJ-008",
    name: "Pembangunan Rumah Tinggal BSD",
    type: "Pembangunan Baru",
    status: "Berjalan",
    progress: 10,
    customerId: "customer-002",
    adminId: "admin-001",
    supervisorId: "supervisor-002",
    foremanId: "foreman-003",
    location: "BSD City, Tangerang Selatan",
    startDate: "2025-04-10",
    estimatedEndDate: "2025-10-15",
    budgetTotal: 850000000,
    paidAmount: 200000000,
    remainingAmount: 650000000,
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-004",
    projectCode: "RKK-PRJ-004",
    name: "Perbaikan Atap Gudang",
    type: "Perbaikan",
    status: "Berjalan",
    progress: 10,
    customerId: "customer-002",
    adminId: "admin-002",
    supervisorId: "supervisor-002",
    foremanId: "foreman-004",
    location: "Tangerang",
    startDate: "2025-04-01",
    estimatedEndDate: "2025-05-01",
    budgetTotal: 45000000,
    paidAmount: 10000000,
    remainingAmount: 35000000,
    heroImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200"
  },

  // customer-003 (PT Cipta Properti Nusantara) - 4 projects
  {
    id: "project-003",
    projectCode: "RKK-PRJ-003",
    name: "Renovasi Kantor Kuningan",
    type: "Renovasi",
    status: "Berjalan",
    progress: 25,
    customerId: "customer-003",
    adminId: "admin-001",
    supervisorId: "supervisor-001",
    foremanId: "foreman-002",
    location: "Jakarta Pusat",
    startDate: "2025-03-01",
    estimatedEndDate: "2025-05-15",
    budgetTotal: 585000000,
    paidAmount: 240000000,
    remainingAmount: 345000000,
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-009",
    projectCode: "RKK-PRJ-009",
    name: "Pembangunan Ruko Mega Kuningan",
    type: "Pembangunan Baru",
    status: "Perencanaan",
    progress: 0,
    customerId: "customer-003",
    adminId: "admin-001",
    supervisorId: "supervisor-001",
    foremanId: null,
    location: "Mega Kuningan, Jakarta Selatan",
    startDate: "2025-06-01",
    estimatedEndDate: "2026-02-15",
    budgetTotal: 2500000000,
    paidAmount: 0,
    remainingAmount: 2500000000,
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-010",
    projectCode: "RKK-PRJ-010",
    name: "Fit-out Showroom Sudirman",
    type: "Renovasi",
    status: "Penawaran",
    progress: 0,
    customerId: "customer-003",
    adminId: "admin-002",
    supervisorId: null,
    foremanId: null,
    location: "Sudirman, Jakarta Pusat",
    startDate: "2025-07-10",
    estimatedEndDate: "2025-09-15",
    budgetTotal: 350000000,
    paidAmount: 0,
    remainingAmount: 350000000,
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-011",
    projectCode: "RKK-PRJ-011",
    name: "Perbaikan Lobby Apartemen",
    type: "Perbaikan",
    status: "Selesai",
    progress: 100,
    customerId: "customer-003",
    adminId: "admin-003",
    supervisorId: "supervisor-003",
    foremanId: "foreman-002",
    location: "Jakarta Selatan",
    startDate: "2025-01-10",
    estimatedEndDate: "2025-02-28",
    budgetTotal: 125000000,
    paidAmount: 125000000,
    remainingAmount: 0,
    heroImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200"
  },

  // customer-004 (CV Maju Membangun) - 1 project
  {
    id: "project-006",
    projectCode: "RKK-PRJ-006",
    name: "Pembangunan Gudang Logistik",
    type: "Pembangunan Baru",
    status: "Berjalan",
    progress: 15,
    customerId: "customer-004",
    adminId: "admin-003",
    supervisorId: "supervisor-003",
    foremanId: null,
    location: "Bekasi Barat",
    startDate: "2025-04-15",
    estimatedEndDate: "2025-10-30",
    budgetTotal: 1200000000,
    paidAmount: 300000000,
    remainingAmount: 900000000,
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
  },

  // other previously existing projects mapped to correct customers
  {
    id: "project-005",
    projectCode: "RKK-PRJ-005",
    name: "Pengecatan Rumah Kost",
    type: "Perawatan",
    status: "Berjalan",
    progress: 5,
    customerId: "customer-001",
    adminId: "admin-002",
    supervisorId: "supervisor-001",
    foremanId: null,
    location: "Jakarta Selatan",
    startDate: "2025-04-10",
    estimatedEndDate: "2025-05-10",
    budgetTotal: 25000000,
    paidAmount: 5000000,
    remainingAmount: 20000000,
    heroImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200"
  }
];

// BACKWARD COMPATIBILITY
export const activeCustomerProject = {
  ...mockProjects[0],
  customer: {
    name: "Andi Pratama",
    avatar: "https://i.pravatar.cc/150?u=andi"
  },
  team: {
    admin: {
      name: "Rina Maharani",
      role: "Admin Proyek",
      avatar: "https://i.pravatar.cc/150?u=admin-001",
      status: "Aktif"
    },
    pengawas: {
      name: "Ahmad Fauzi",
      role: "Pengawas Lapangan",
      avatar: "https://i.pravatar.cc/150?u=supervisor-001",
      status: "Aktif"
    },
    mandor: {
      name: "Budi Santoso",
      role: "Mandor",
      avatar: "https://i.pravatar.cc/150?u=foreman-001",
      status: "Aktif"
    }
  },
  budget: {
    total: 107683146,
    paid: 18000000,
    remaining: 89683146
  },
  timeline: [
    {
      id: "stage-01",
      week: 1,
      code: "I",
      title: "Pekerjaan Persiapan",
      status: "verified",
      progress: 100,
      startDate: "2025-09-01",
      endDate: "2025-09-05",
      durationDays: 5,
      tasks: [
        "Pembersihan lokasi manual",
        "Pas bouwplank kayu alba",
        "Koordinasi lapangan"
      ],
      rabItems: [
        {
          id: "rab-01-01",
          uraian: "Pembersihan lokasi manual",
          lokasi: "Area bangunan utama",
          volume: 120,
          satuan: "m²",
          hargaSatuan: 8500,
          total: 1020000,
          progress: 100,
          nilaiSelesai: 1020000,
          keterangan: "Area kerja dibersihkan dari material bekas dan tanaman liar."
        }
      ],
      images: [
        "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600"
      ],
      payment: {
        amount: 3496999,
        paid: 3496999
      },
      verification: {
        isVerified: true,
        verifiedBy: "Ahmad Fauzi",
        verifiedAt: "2025-09-05"
      },
      note: "Pekerjaan sesuai rencana."
    }
  ]
};
