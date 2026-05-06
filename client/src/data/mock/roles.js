// client/src/data/mock/roles.js

export const mockRoles = [
  {
    id: "role-superadmin",
    name: "superadmin",
    label: "Super Admin",
    description: "Akses penuh ke seluruh sistem, manajemen staff, dan pengaturan global.",
    permissions: ["all"]
  },
  {
    id: "role-admin",
    name: "admin",
    label: "Admin Pusat",
    description: "Manajemen proyek, verifikasi pembayaran, dan koordinasi staff lapangan.",
    permissions: [
      "view_dashboard",
      "manage_projects",
      "manage_customers",
      "verify_payments",
      "assign_staff"
    ]
  },
  {
    id: "role-pengawas",
    name: "pengawas",
    label: "Pengawas Lapangan",
    description: "Memantau progres harian, verifikasi pekerjaan, dan dokumentasi lapangan.",
    permissions: [
      "view_dashboard",
      "update_progress",
      "verify_work",
      "upload_photos",
      "manage_materials_request"
    ]
  },
  {
    id: "role-mandor",
    name: "mandor",
    label: "Mandor Proyek",
    description: "Vendor lapangan yang bertanggung jawab mengirim laporan progres dan koordinasi pekerjaan proyek.",
    permissions: [
      "view_dashboard",
      "view_assigned_projects",
      "submit_daily_report",
      "upload_progress_photos",
      "request_materials"
    ]
  },
  {
    id: "role-konsumen",
    name: "konsumen",
    label: "Konsumen",
    description: "Pemilik proyek yang memantau progres, pembayaran, dan hasil pekerjaan.",
    permissions: [
      "view_my_projects",
      "view_timeline",
      "approve_milestone",
      "make_payment",
      "comment_timeline"
    ]
  },
  {
    id: "role-customer-viewer",
    name: "customer_viewer",
    label: "Customer Viewer",
    description: "Akun tambahan dari pihak konsumen untuk melihat proyek dan memberi komentar terbatas.",
    permissions: [
      "view_project",
      "view_timeline",
      "view_project_photos",
      "view_project_rab",
      "comment_timeline"
    ]
  }
];
