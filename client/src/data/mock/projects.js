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
    status: "Berjalan",
    progress: 40,
    customerId: "customer-002",
    adminId: "admin-001",
    supervisorId: "supervisor-001",
    foremanId: "foreman-001",
    location: "Jakarta Barat",
    startDate: "2025-02-10",
    estimatedEndDate: "2025-08-15",
    budgetTotal: 500000000,
    paidAmount: 150000000,
    remainingAmount: 350000000,
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-003",
    projectCode: "RKK-PRJ-003",
    name: "Renovasi Interior Apartemen",
    type: "Renovasi",
    status: "Berjalan",
    progress: 25,
    customerId: "customer-001",
    adminId: "admin-001",
    supervisorId: "supervisor-001",
    foremanId: "foreman-001",
    location: "Jakarta Pusat",
    startDate: "2025-03-01",
    estimatedEndDate: "2025-05-15",
    budgetTotal: 85000000,
    paidAmount: 40000000,
    remainingAmount: 45000000,
    heroImage: "https://images.unsplash.com/photo-1517646281694-2226b1445771?auto=format&fit=crop&q=80&w=1200"
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
    supervisorId: "supervisor-001",
    foremanId: "foreman-001",
    location: "Tangerang",
    startDate: "2025-04-01",
    estimatedEndDate: "2025-05-01",
    budgetTotal: 45000000,
    paidAmount: 10000000,
    remainingAmount: 35000000,
    heroImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200"
  },
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
    foremanId: "foreman-001",
    location: "Jakarta Selatan",
    startDate: "2025-04-10",
    estimatedEndDate: "2025-05-10",
    budgetTotal: 25000000,
    paidAmount: 5000000,
    remainingAmount: 20000000,
    heroImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "project-006",
    projectCode: "RKK-PRJ-006",
    name: "Pembangunan Pagar Panel",
    type: "Pembangunan Baru",
    status: "Berjalan",
    progress: 15,
    customerId: "customer-002",
    adminId: "admin-003",
    supervisorId: "supervisor-001",
    foremanId: "foreman-001",
    location: "Depok",
    startDate: "2025-04-15",
    estimatedEndDate: "2025-05-30",
    budgetTotal: 65000000,
    paidAmount: 15000000,
    remainingAmount: 50000000,
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
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
  ]
};
