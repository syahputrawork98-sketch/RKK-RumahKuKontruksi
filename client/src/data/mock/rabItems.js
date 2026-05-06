// client/src/data/mock/rabItems.js

export const mockRabItems = [
  // Items for project-001 (Renovasi Bekasi) -> Category: Pekerjaan Persiapan
  {
    id: "rab-item-001-01-01",
    rabPlanId: "rab-plan-001",
    categoryId: "rab-category-001-01",
    projectId: "project-001",
    description: "Pembersihan lokasi manual",
    location: "Area bangunan utama",
    volume: 120,
    unit: "m²",
    unitPrice: 8500,
    total: 1020000,
    progress: 100,
    completedValue: 1020000,
    status: "verified",
    notes: "Pembersihan area dari material bekas."
  },
  {
    id: "rab-item-001-01-02",
    rabPlanId: "rab-plan-001",
    categoryId: "rab-category-001-01",
    projectId: "project-001",
    description: "Pasang bouwplank kayu alba",
    location: "Keliling bangunan",
    volume: 45,
    unit: "m'",
    unitPrice: 55000,
    total: 2475000,
    progress: 100,
    completedValue: 2475000,
    status: "verified",
    notes: "Sudah di-setting elevasi 0.00."
  },

  // Items for project-001 -> Category: Pekerjaan Dinding
  {
    id: "rab-item-001-04-01",
    rabPlanId: "rab-plan-001",
    categoryId: "rab-category-001-04",
    projectId: "project-001",
    description: "Pasangan bata ringan (Hebel) t:10cm",
    location: "Lantai 1",
    volume: 85,
    unit: "m²",
    unitPrice: 165000,
    total: 14025000,
    progress: 80,
    completedValue: 11220000,
    status: "in_progress",
    notes: "Progress terhambat hujan."
  },

  // Items for project-008 (Rumah Tipe 36/72 - BSD) -> Category: Pekerjaan Persiapan
  {
    id: "rab-item-008-01-01",
    rabPlanId: "rab-plan-008",
    categoryId: "rab-category-008-01",
    projectId: "project-008",
    description: "Pembersihan lokasi & perataan",
    location: "Site BSD",
    volume: 72,
    unit: "m²",
    unitPrice: 15000,
    total: 1080000,
    progress: 100,
    completedValue: 1080000,
    status: "verified",
    notes: ""
  },
  {
    id: "rab-item-008-01-02",
    rabPlanId: "rab-plan-008",
    categoryId: "rab-category-008-01",
    projectId: "project-008",
    description: "Pekerjaan Bouwplank",
    location: "Keliling Site",
    volume: 38,
    unit: "m'",
    unitPrice: 65000,
    total: 2470000,
    progress: 100,
    completedValue: 2470000,
    status: "verified",
    notes: ""
  }
];

// Helper to get items by category ID
export const getRabItemsByCategoryId = (categoryId) =>
  mockRabItems.filter((item) => item.categoryId === categoryId);

// Helper to calculate category subtotal dynamically if needed
export const calculateCategorySubtotal = (categoryId) => {
  return mockRabItems
    .filter(item => item.categoryId === categoryId)
    .reduce((sum, item) => sum + item.total, 0);
};
