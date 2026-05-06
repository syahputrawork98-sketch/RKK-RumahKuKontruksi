// client/src/data/mock/admins.js

export const mockAdmins = [
  {
    id: "admin-001",
    userId: "user-admin-001",
    name: "Rina Maharani",
    email: "rina.maharani@rumahkukontruksi.com",
    phone: "081234567890",
    department: "Operasional",
    position: "Senior Admin Proyek",
    level: "senior",
    avatar: "https://i.pravatar.cc/150?u=admin-001",
    assignedProjectIds: ["project-001", "project-002", "project-008"],
    maxProjectCapacity: 3,
    status: "active",
    joinedAt: "2024-01-15",
    notes: "Admin senior untuk proyek renovasi dan pembangunan rumah tinggal."
  },
  {
    id: "admin-002",
    userId: "user-admin-002",
    name: "Dewi Lestari",
    email: "dewi.lestari@rumahkukontruksi.com",
    phone: "081234567899",
    department: "Operasional",
    position: "Admin Proyek",
    level: "middle",
    avatar: "https://i.pravatar.cc/150?u=admin-002",
    assignedProjectIds: ["project-004", "project-010", "project-005"],
    maxProjectCapacity: 3,
    status: "active",
    joinedAt: "2024-03-20",
    notes: "Berpengalaman dalam manajemen material dan vendor."
  },
  {
    id: "admin-003",
    userId: "user-admin-003",
    name: "Fajar Nugroho",
    email: "fajar.nugroho@rumahkukontruksi.com",
    phone: "081234567888",
    department: "Operasional",
    position: "Admin Proyek",
    level: "junior",
    avatar: "https://i.pravatar.cc/150?u=admin-003",
    assignedProjectIds: ["project-003", "project-011", "project-006"],
    maxProjectCapacity: 3,
    status: "active",
    joinedAt: "2024-06-10",
    notes: "Fokus pada administrasi dokumen dan kontrak."
  },
  {
    id: "admin-004",
    userId: "user-admin-004",
    name: "Siti Aminah",
    email: "siti.aminah@rumahkukontruksi.com",
    phone: "081234567877",
    department: "Operasional",
    position: "Admin Magang",
    level: "junior",
    avatar: "https://i.pravatar.cc/150?u=admin-004",
    assignedProjectIds: ["project-007", "project-009"],
    maxProjectCapacity: 3,
    status: "active",
    joinedAt: "2024-09-05",
    notes: "Dalam masa orientasi dan pelatihan sistem."
  }
];

// Helper to get workload status
export const getAdminWorkloadStatus = (admin) => {
  const assignedCount = admin.assignedProjectIds.length;
  if (assignedCount >= admin.maxProjectCapacity) return "full";
  if (assignedCount === 0) return "available";
  return "normal";
};

// Helper to get available admins
export const getAvailableAdmins = () =>
  mockAdmins.filter(
    (admin) =>
      admin.status === "active" &&
      admin.assignedProjectIds.length < admin.maxProjectCapacity
  );
