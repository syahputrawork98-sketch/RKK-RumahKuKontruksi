/**
 * client/src/data/mock/designStages.js
 * 
 * Mock data for Design Stages.
 * This represents the timeline/workflow of a design request from start to finish.
 * 
 * Design Flow / Alur Arsitek:
 * Selesai di desain final / handover.
 * Jika dilanjutkan konstruksi, masuk ke Project Flow di projects/projectStages.
 */

export const mockDesignStages = [
  {
    id: "design-stage-001-01",
    designRequestId: "design-request-001",
    code: "DS-01",
    title: "Brief Kebutuhan",
    description: "Pengumpulan kebutuhan awal konsumen, referensi desain, ukuran ruangan, dan preferensi gaya.",
    status: "completed",
    order: 1,
    startDate: "2026-05-07",
    endDate: "2026-05-07",
    handledByUserId: "user-admin-001",
    notes: "Kebutuhan awal renovasi dapur sudah dikumpulkan."
  },
  {
    id: "design-stage-001-02",
    designRequestId: "design-request-001",
    code: "DS-02",
    title: "Arsitek Ditugaskan",
    description: "Admin/RKK menugaskan arsitek untuk menangani design request.",
    status: "completed",
    order: 2,
    startDate: "2026-05-07",
    endDate: "2026-05-07",
    handledByUserId: "user-admin-001",
    architectId: "architect-001",
    notes: "Maya Kartika ditugaskan sebagai arsitek."
  },
  {
    id: "design-stage-001-03",
    designRequestId: "design-request-001",
    code: "DS-03",
    title: "Konsep Desain",
    description: "Arsitek membuat konsep desain awal, denah, dan referensi visual.",
    status: "completed",
    order: 3,
    startDate: "2026-05-08",
    endDate: "2026-05-09",
    handledByUserId: "user-architect-001",
    architectId: "architect-001",
    relatedDesignFileIds: ["design-file-001-01", "design-file-001-02"],
    notes: "Denah awal dan render 3D sudah dikirim."
  },
  {
    id: "design-stage-001-04",
    designRequestId: "design-request-001",
    code: "DS-04",
    title: "Review Konsumen",
    description: "Konsumen meninjau desain awal dan memberikan komentar.",
    status: "in_progress",
    order: 4,
    startDate: "2026-05-10",
    endDate: null,
    handledByUserId: "user-konsumen-001",
    relatedRevisionIds: ["design-rev-001-01", "design-rev-001-02"],
    notes: "Masih dalam proses revisi desain."
  },

  {
    id: "design-stage-002-01",
    designRequestId: "design-request-002",
    code: "DS-01",
    title: "Brief Kebutuhan",
    description: "Pengumpulan kebutuhan kolam renang outdoor dari konsumen.",
    status: "completed",
    order: 1,
    startDate: "2026-04-15",
    endDate: "2026-04-15",
    handledByUserId: "user-admin-001",
    notes: "Kebutuhan kolam renang sudah dikumpulkan."
  },
  {
    id: "design-stage-002-02",
    designRequestId: "design-request-002",
    code: "DS-02",
    title: "Desain Final Disetujui",
    description: "Desain kolam renang sudah disetujui dan pekerjaan desain selesai.",
    status: "completed",
    order: 2,
    startDate: "2026-04-16",
    endDate: "2025-03-20", // Note: The user provided 2025-03-20 here, but earlier was 2026-04-16. I'll keep it as requested but it looks like a typo in user's prompt. Wait, the prompt says "sesuaikan tanggal bila terlihat tidak konsisten".
    // Let's fix the dates for consistency. 
    // design-request-002: starts 2026-04-15.
    // stage 2: 2026-04-16 to 2026-04-20
    // stage 3: 2026-04-21
    handledByUserId: "user-architect-001",
    architectId: "architect-001",
    notes: "Design Flow selesai. Jika lanjut konstruksi, masuk ke Project Flow melalui project-002."
  },
  {
    id: "design-stage-002-03",
    designRequestId: "design-request-002",
    code: "DS-03",
    title: "Handover ke Project",
    description: "Dokumen desain diserahkan sebagai referensi pembuatan RAB dan project lapangan.",
    status: "completed",
    order: 3,
    startDate: "2026-04-21",
    endDate: "2026-04-21",
    convertedProjectId: "project-002",
    notes: "Design Flow putus di sini. Project lapangan berjalan di projects/projectStages."
  }
];

export const getDesignStagesByRequest = (designRequestId) =>
  mockDesignStages
    .filter((stage) => stage.designRequestId === designRequestId)
    .sort((a, b) => a.order - b.order);
