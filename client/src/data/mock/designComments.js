// client/src/data/mock/designComments.js

export const mockDesignComments = [
  {
    id: "design-comment-001",
    designRequestId: "design-request-001",
    designFileId: "design-file-001-01",
    authorUserId: "user-konsumen-001",
    authorRole: "konsumen",
    message: "Secara denah sudah oke, tapi apakah area cuci piring bisa agak geser ke kanan?",
    visibleToRoles: ["konsumen", "customer_viewer", "architect", "admin", "superadmin"],
    createdAt: "2026-05-08T14:30:00",
    status: "replied"
  },
  {
    id: "design-comment-002",
    designRequestId: "design-request-001",
    designFileId: "design-file-001-01",
    authorUserId: "user-architect-001",
    authorRole: "architect",
    message: "Bisa Pak Andi, nanti saya sesuaikan di revisi berikutnya agar pipa pembuangan juga efisien.",
    visibleToRoles: ["konsumen", "customer_viewer", "architect", "admin", "superadmin"],
    createdAt: "2026-05-08T16:00:00",
    status: "resolved"
  },
  {
    id: "design-comment-003",
    designRequestId: "design-request-001",
    designFileId: null,
    authorUserId: "user-admin-001",
    authorRole: "admin",
    message: "Arsitek Maya, tolong pastikan spesifikasi material kabinet juga dicatat ya untuk RAB nanti.",
    visibleToRoles: ["architect", "admin", "superadmin"],
    createdAt: "2026-05-09T09:00:00",
    status: "open"
  }
];

// Helper to get comments by design request
export const getDesignComments = (requestId) =>
  mockDesignComments.filter((c) => c.designRequestId === requestId);
