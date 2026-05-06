// client/src/data/mock/projectComments.js

export const mockProjectComments = [
  {
    id: "comment-001",
    projectId: "project-001",
    stageId: "stage-04", // Pekerjaan Dinding
    authorUserId: "user-konsumen-001",
    authorRole: "konsumen",
    message: "Apakah pemasangan bata sudah selesai semua? Mohon update fotonya ya.",
    visibility: "project_team",
    visibleToRoles: ["konsumen", "customer_viewer", "admin", "pengawas", "superadmin"],
    createdAt: "2026-05-07T09:00:00",
    status: "replied"
  },
  {
    id: "comment-002",
    projectId: "project-001",
    stageId: "stage-04",
    authorUserId: "user-pengawas-001",
    authorRole: "pengawas",
    message: "Sudah hampir selesai Pak Andi. Sedang proses finishing plester di sisi luar. Foto akan segera diunggah.",
    visibility: "project_team",
    visibleToRoles: ["konsumen", "customer_viewer", "admin", "pengawas", "superadmin"],
    createdAt: "2026-05-07T10:15:00",
    status: "resolved"
  },
  {
    id: "comment-003",
    projectId: "project-001",
    stageId: "stage-04",
    authorUserId: "user-customer-viewer-001",
    authorRole: "customer_viewer",
    message: "Warna semen plesterannya kok agak beda ya dari yang kemarin?",
    visibility: "project_team",
    visibleToRoles: ["konsumen", "customer_viewer", "admin", "pengawas", "superadmin"],
    createdAt: "2026-05-07T11:00:00",
    status: "open"
  },
  {
    id: "comment-004",
    projectId: "project-003",
    stageId: "stage-interior-01",
    authorUserId: "user-konsumen-003",
    authorRole: "konsumen",
    message: "Material wallpaper sudah sampai di lokasi?",
    visibility: "project_team",
    visibleToRoles: ["konsumen", "customer_viewer", "admin", "pengawas", "superadmin"],
    createdAt: "2026-05-06T15:00:00",
    status: "open"
  }
];

// Helper to get comments by project/stage
export const getProjectComments = (projectId, stageId = null) => {
  if (stageId) {
    return mockProjectComments.filter(c => c.projectId === projectId && c.stageId === stageId);
  }
  return mockProjectComments.filter(c => c.projectId === projectId);
};
