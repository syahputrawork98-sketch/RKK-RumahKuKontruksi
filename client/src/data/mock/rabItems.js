// client/src/data/mock/rabItems.js

export const mockRabItems = [
  // RAB for project-001, stage-01
  {
    id: "rab-001",
    projectId: "project-001",
    stageId: "stage-01",
    description: "Pembersihan lokasi manual",
    location: "Area bangunan utama",
    volume: 120,
    unit: "m²",
    unitPrice: 8500,
    total: 1020000,
    progress: 100,
    completedValue: 1020000,
    notes: "Area kerja dibersihkan dari material bekas."
  },
  {
    id: "rab-002",
    projectId: "project-001",
    stageId: "stage-01",
    description: "Pas bouwplank kayu alba",
    location: "Keliling area pondasi",
    volume: 42,
    unit: "m¹",
    unitPrice: 52000,
    total: 2184000,
    progress: 100,
    completedValue: 2184000,
    notes: "Acuan elevasi dan titik pondasi."
  },
  
  // RAB for project-001, stage-02
  {
    id: "rab-003",
    projectId: "project-001",
    stageId: "stage-02",
    description: "Galian tanah pondasi",
    location: "Jalur pondasi utama",
    volume: 85,
    unit: "m³",
    unitPrice: 35000,
    total: 2975000,
    progress: 100,
    completedValue: 2975000,
    notes: "Kedalaman rata-rata 0.8m."
  },

  // RAB for project-001, stage-04 (In Progress)
  {
    id: "rab-004",
    projectId: "project-001",
    stageId: "stage-04",
    description: "Pasangan dinding bata ringan",
    location: "Seluruh dinding lantai 1",
    volume: 210,
    unit: "m²",
    unitPrice: 65000,
    total: 13650000,
    progress: 50,
    completedValue: 6825000,
    notes: "Berjalan 50% di area belakang."
  }
];

// Helper to get RAB items by project and stage
export const getRabByStage = (projectId, stageId) => 
  mockRabItems.filter(r => r.projectId === projectId && r.stageId === stageId);
