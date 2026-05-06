// client/src/data/mock/designFiles.js

export const mockDesignFiles = [
  // Files for design-request-001 (Dapur)
  {
    id: "design-file-001-01",
    designRequestId: "design-request-001",
    architectId: "architect-001",
    fileName: "denah-awal-dapur.pdf",
    fileType: "pdf",
    fileCategory: "floor_plan",
    version: "v1",
    fileUrl: "/mock/designs/design-request-001/denah-v1.pdf",
    uploadedAt: "2026-05-08",
    status: "submitted",
    notes: "Denah tata ruang awal."
  },
  {
    id: "design-file-001-02",
    designRequestId: "design-request-001",
    architectId: "architect-001",
    fileName: "render-3d-dapur-scandinavian.jpg",
    fileType: "jpg",
    fileCategory: "render_3d",
    version: "v1",
    fileUrl: "/mock/designs/design-request-001/render-v1.jpg",
    uploadedAt: "2026-05-09",
    status: "submitted",
    notes: "Visualisasi 3D konsep scandinavian."
  },

  // Files for design-request-003 (Rumah BSD - Approved)
  {
    id: "design-file-003-01",
    designRequestId: "design-request-003",
    architectId: "architect-002",
    fileName: "gambar-kerja-arsitektur-final.pdf",
    fileType: "pdf",
    fileCategory: "working_drawing",
    version: "final",
    fileUrl: "/mock/designs/design-request-003/arsitektur-final.pdf",
    uploadedAt: "2026-04-05",
    status: "approved",
    notes: "Dokumen untuk acuan pembangunan di lapangan."
  },
  {
    id: "design-file-003-02",
    designRequestId: "design-request-003",
    architectId: "architect-002",
    fileName: "render-eksterior-malam.jpg",
    fileType: "jpg",
    fileCategory: "render_3d",
    version: "final",
    fileUrl: "/mock/designs/design-request-003/render-exterior-final.jpg",
    uploadedAt: "2026-04-06",
    status: "approved",
    notes: "Visualisasi eksterior final."
  }
];

// Helper to get files by request
export const getDesignFilesByRequest = (requestId) =>
  mockDesignFiles.filter((f) => f.designRequestId === requestId);
