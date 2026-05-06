// client/src/data/mock/notifications.js

export const mockNotifications = [
  {
    id: "notification-001",
    userId: "user-konsumen-001",
    role: "konsumen",
    title: "Progress Proyek Diperbarui",
    message: "Tahap pekerjaan dinding telah mencapai 45%.",
    type: "project_progress",
    read: false,
    createdAt: "2026-05-07T10:00:00",
    link: "/konsumen/TimelineProyek/stage-04"
  },
  {
    id: "notification-002",
    userId: "user-konsumen-001",
    role: "konsumen",
    title: "Pembayaran Dikonfirmasi",
    message: "Pembayaran untuk tahap Struktur Bawah telah diverifikasi.",
    type: "payment",
    read: true,
    createdAt: "2026-05-06T15:30:00",
    link: "/konsumen/TimelineProyek/stage-03"
  },
  {
    id: "notification-003",
    userId: "user-admin-001",
    role: "admin",
    title: "Request Material Baru",
    message: "Mandor Siti Aminah mengajukan request material untuk project-001.",
    type: "material_request",
    read: false,
    createdAt: "2026-05-07T09:15:00",
    link: "/admin/dashboard"
  }
];

// Legacy support
export const dummyNotifications = mockNotifications.map(n => ({
  id: n.id,
  title: n.title,
  description: n.message,
  time: "Beberapa saat yang lalu",
  read: n.read
}));
