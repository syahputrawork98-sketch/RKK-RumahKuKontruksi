// client/src/data/mock/rabPlans.js

export const mockRabPlans = [
  {
    id: "rab-plan-001",
    projectId: "project-001",
    title: "Rencana Anggaran Biaya Renovasi Rumah - Bekasi",
    type: "Renovasi",
    version: "1.0",
    status: "approved",
    totalAmount: 107683146,
    createdAt: "2025-08-20",
    approvedAt: "2025-08-25",
    notes: "RAB awal untuk renovasi rumah tinggal Bekasi."
  },
  {
    id: "rab-plan-002",
    projectId: "project-002",
    title: "Rencana Anggaran Biaya Pembangunan Kolam Renang",
    type: "Pembangunan Baru",
    version: "1.0",
    status: "approved",
    totalAmount: 150000000,
    createdAt: "2025-03-15",
    approvedAt: "2025-03-20",
    notes: "RAB pembangunan kolam renang outdoor."
  },
  {
    id: "rab-plan-008",
    projectId: "project-008",
    title: "Rencana Anggaran Biaya Pembangunan Rumah Tipe 36/72 - BSD",
    type: "Pembangunan Baru",
    version: "1.1",
    status: "approved",
    totalAmount: 850000000,
    createdAt: "2025-03-25",
    approvedAt: "2025-04-05",
    notes: "Revisi 1 untuk penyesuaian material atap."
  }
];

// Helper to get active plan by project
export const getActiveRabPlanByProject = (projectId) => 
  mockRabPlans.find(p => p.projectId === projectId && p.status === "approved");
