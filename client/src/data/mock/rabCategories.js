// client/src/data/mock/rabCategories.js

export const mockRabCategories = [
  // Categories for project-001 (Renovasi Bekasi)
  {
    id: "rab-category-001-01",
    rabPlanId: "rab-plan-001",
    projectId: "project-001",
    code: "I",
    name: "Pekerjaan Persiapan",
    description: "Pembersihan lokasi dan persiapan area kerja.",
    order: 1,
    subtotal: 3496999
  },
  {
    id: "rab-category-001-02",
    rabPlanId: "rab-plan-001",
    projectId: "project-001",
    code: "II",
    name: "Pekerjaan Tanah dan Pasir",
    description: "Galian dan urugan tanah/pasir.",
    order: 2,
    subtotal: 5250000
  },
  {
    id: "rab-category-001-03",
    rabPlanId: "rab-plan-001",
    projectId: "project-001",
    code: "III",
    name: "Pekerjaan Struktur",
    description: "Beton bertulang, sloof, kolom, dan balok.",
    order: 3,
    subtotal: 25750000
  },
  {
    id: "rab-category-001-04",
    rabPlanId: "rab-plan-001",
    projectId: "project-001",
    code: "IV",
    name: "Pekerjaan Dinding",
    description: "Pasangan bata, plesteran, dan acian.",
    order: 4,
    subtotal: 35000000
  },

  // Categories for project-008 (Rumah Tipe 36/72 - BSD)
  {
    id: "rab-category-008-01",
    rabPlanId: "rab-plan-008",
    projectId: "project-008",
    code: "I",
    name: "Pekerjaan Persiapan",
    description: "Site clearing, bouwplank, gudang proyek.",
    order: 1,
    subtotal: 12000000
  },
  {
    id: "rab-category-008-02",
    rabPlanId: "rab-plan-008",
    projectId: "project-008",
    code: "II",
    name: "Pekerjaan Tanah dan Pondasi",
    description: "Galian, pasir urug, batu kali, dan footplat.",
    order: 2,
    subtotal: 85000000
  }
];

// Helper to get categories by plan ID
export const getRabCategoriesByPlanId = (rabPlanId) =>
  mockRabCategories.filter((category) => category.rabPlanId === rabPlanId);
