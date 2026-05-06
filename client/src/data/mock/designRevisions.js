// client/src/data/mock/designRevisions.js

export const mockDesignRevisions = [
  // Revisions for design-request-001
  {
    id: "design-rev-001-01",
    designRequestId: "design-request-001",
    revisionNumber: 1,
    requestedByUserId: "user-konsumen-001",
    architectId: "architect-001",
    requestNote: "Warna kabinet ganti ke putih tulang, area island diperluas sedikit.",
    status: "completed",
    isChargeable: false,
    chargeAmount: 0,
    requestedAt: "2026-05-10",
    completedAt: "2026-05-12",
    notes: "Revisi gratis ke-1."
  },
  {
    id: "design-rev-001-02",
    designRequestId: "design-request-001",
    revisionNumber: 2,
    requestedByUserId: "user-konsumen-001",
    architectId: "architect-001",
    requestNote: "Tolong tambahkan area penyimpanan botol di sisi kiri kabinet.",
    status: "in_progress",
    isChargeable: false,
    chargeAmount: 0,
    requestedAt: "2026-05-15",
    completedAt: null,
    notes: "Revisi gratis ke-2."
  },

  // Revisions for design-request-002 (Paid revision example)
  {
    id: "design-rev-002-04",
    designRequestId: "design-request-002",
    revisionNumber: 4,
    requestedByUserId: "user-konsumen-001",
    architectId: "architect-001",
    requestNote: "Ubah total bentuk kolam menjadi oval dan tambahkan jacuzi di sudut.",
    status: "requested",
    isChargeable: true,
    chargeAmount: 750000,
    requestedAt: "2026-05-18",
    completedAt: null,
    notes: "Perubahan besar pada konsep dasar, dikenakan biaya tambahan."
  }
];

// Helper to check if next revision is chargeable
export const isNextRevisionChargeable = (request) => {
  return request.currentRevisionCount >= request.revisionLimit;
};
