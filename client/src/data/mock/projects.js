// client/src/data/mock/projects.js

export const mockProjects = [
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
    name: "Pembangunan Ruko 2 Lantai - Jakarta Barat",
    type: "Pembangunan Baru",
    status: "Selesai",
    progress: 100,
    customerId: "customer-002",
    adminId: "admin-001",
    supervisorId: "supervisor-001",
    foremanId: "foreman-001",
    location: "Jakarta Barat",
    startDate: "2025-01-10",
    estimatedEndDate: "2025-06-15",
    budgetTotal: 500000000,
    paidAmount: 500000000,
    remainingAmount: 0,
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
  }
];

// BACKWARD COMPATIBILITY: Do not delete until all components are refactored
// This uses the old structure that components currently expect
export const activeCustomerProject = {
  id: "project-001",
  name: "Renovasi Rumah Tinggal - Bekasi",
  type: "Renovasi",
  status: "Berjalan",
  progress: 65,
  location: "Bekasi, Jawa Barat",
  startDate: "2025-09-01",
  estimatedEndDate: "2025-11-12",
  heroImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200",
  customer: {
    name: "Andi Pratama",
    avatar: "https://i.pravatar.cc/150?u=andi"
  },
  team: {
    admin: {
      name: "Rina Maharani",
      role: "Admin Proyek",
      avatar: "https://i.pravatar.cc/150?u=rina",
      status: "Aktif"
    },
    pengawas: {
      name: "Ahmad Fauzi",
      role: "Pengawas Lapangan",
      avatar: "https://i.pravatar.cc/150?u=ahmad",
      status: "Aktif"
    },
    mandor: {
      name: "Budi Santoso",
      role: "Mandor",
      avatar: "https://i.pravatar.cc/150?u=budi",
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
    // ... other stages can be added or loaded from projectStages.js during refactoring
  ]
};
