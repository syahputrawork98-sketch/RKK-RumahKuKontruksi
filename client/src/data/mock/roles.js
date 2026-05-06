// client/src/data/mock/roles.js

export const mockRoles = [
  {
    id: "role-superadmin",
    name: "superadmin",
    label: "Super Admin",
    description: "Akses penuh ke seluruh sistem dan manajemen user internal.",
    permissions: ["manage_all", "manage_users", "view_all_projects"]
  },
  {
    id: "role-admin",
    name: "admin",
    label: "Admin",
    description: "Manajemen operasional proyek, approval pembayaran, dan penugasan tim.",
    permissions: ["manage_projects", "approve_payments", "assign_team"]
  },
  {
    id: "role-konsumen",
    name: "konsumen",
    label: "Konsumen",
    description: "Pengguna yang memantau proyek miliknya, melihat timeline, dan RAB.",
    permissions: ["view_own_projects", "view_project_progress", "view_payments"]
  },
  {
    id: "role-pengawas",
    name: "pengawas",
    label: "Pengawas",
    description: "Monitoring lapangan, verifikasi progres tahap, dan upload dokumentasi.",
    permissions: ["view_assigned_projects", "verify_progress", "upload_docs"]
  },
  {
    id: "role-mandor",
    name: "mandor",
    label: "Mandor",
    description: "Laporan harian, manajemen tukang, dan permintaan material.",
    permissions: ["report_daily", "manage_workers", "request_material"]
  }
];

// Legacy support if needed
export const roles = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  PENGAWAS: "pengawas",
  MANDOR: "mandor",
  KONSUMEN: "konsumen",
};
