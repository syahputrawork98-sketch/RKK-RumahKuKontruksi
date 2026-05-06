// client/src/data/mock/designRequests.js

export const mockDesignRequests = [
  {
    id: "design-request-001",
    customerId: "customer-001",
    title: "Desain Renovasi Dapur Minimalis",
    requestType: "renovation",
    propertyType: "Rumah Tinggal",
    description: "Konsumen ingin renovasi dapur agar lebih terbuka dan terang, konsep scandinavian.",
    location: "Bekasi, Jawa Barat",
    estimatedArea: 18,
    budgetRange: "50,000,000 - 80,000,000",
    assignedArchitectId: "architect-001",
    status: "in_design",
    revisionLimit: 3,
    currentRevisionCount: 2,
    isRevisionChargeable: false,
    createdAt: "2026-05-07",
    approvedAt: null,
    convertedProjectId: null,
    notes: "Konsumen baru memberikan referensi foto dari Pinterest."
  },
  {
    id: "design-request-002",
    customerId: "customer-001",
    title: "Pembangunan Kolam Renang Belakang",
    requestType: "new_build",
    propertyType: "Rumah Tinggal",
    description: "Kolam renang outdoor ukuran 3x7m dengan decking kayu.",
    location: "Bekasi, Jawa Barat",
    estimatedArea: 21,
    budgetRange: "120,000,000 - 150,000,000",
    assignedArchitectId: "architect-001",
    status: "waiting_customer_review",
    revisionLimit: 3,
    currentRevisionCount: 3,
    isRevisionChargeable: true,
    createdAt: "2026-04-15",
    approvedAt: null,
    convertedProjectId: null,
    notes: "Sudah masuk revisi ke-3. Revisi berikutnya dikenakan biaya."
  },
  {
    id: "design-request-003",
    customerId: "customer-002",
    title: "Desain Rumah Tinggal Modern BSD",
    requestType: "new_build",
    propertyType: "Rumah Tinggal",
    description: "Rumah 2 lantai tipe 120 dengan konsep industrial modern.",
    location: "BSD City, Tangerang Selatan",
    estimatedArea: 120,
    budgetRange: "800,000,000 - 1,000,000,000",
    assignedArchitectId: "architect-002",
    status: "approved",
    revisionLimit: 3,
    currentRevisionCount: 1,
    isRevisionChargeable: false,
    createdAt: "2026-03-20",
    approvedAt: "2026-04-10",
    convertedProjectId: "project-008",
    notes: "Desain disetujui, gambar kerja final sudah tersedia."
  },
  {
    id: "design-request-004",
    customerId: "customer-004",
    title: "Pembangunan Gudang Logistik Baru",
    requestType: "new_build",
    propertyType: "Gudang",
    description: "Gudang penyimpanan barang logistik dengan struktur baja.",
    location: "Bekasi Barat",
    estimatedArea: 500,
    budgetRange: "1,000,000,000 - 1,500,000,000",
    assignedArchitectId: "architect-003",
    status: "converted_to_project",
    revisionLimit: 5,
    currentRevisionCount: 2,
    isRevisionChargeable: false,
    createdAt: "2026-02-15",
    approvedAt: "2026-03-15",
    convertedProjectId: "project-006",
    notes: "Sudah masuk tahap konstruksi lapangan."
  }
];

// Helper to get request status label
export const getDesignRequestStatusLabel = (status) => {
  const labels = {
    new: "Baru",
    reviewed: "Direview",
    assigned: "Ditugaskan",
    in_design: "Proses Desain",
    waiting_customer_review: "Menunggu Review Konsumen",
    revision_requested: "Revisi Diminta",
    approved: "Disetujui",
    converted_to_project: "Menjadi Proyek",
    cancelled: "Dibatalkan"
  };
  return labels[status] || status;
};
