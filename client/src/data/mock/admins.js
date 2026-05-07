// client/src/data/mock/admins.js

export const mockAdmins = [
  {
    id: "admin-001",
    name: "Budi Santoso",
    email: "budi.admin@rkk.local",
    phone: "081234567001",
    avatar: "https://i.pravatar.cc/150?u=admin-001",
    status: "active",
    role: "Admin",
    maxProjectCapacity: 3,
    assignedProjectIds: ["project-001", "project-002", "project-007"]
  },
  {
    id: "admin-002",
    name: "Siti Rahma",
    email: "siti.admin@rkk.local",
    phone: "081234567002",
    avatar: "https://i.pravatar.cc/150?u=admin-002",
    status: "active",
    role: "Admin",
    maxProjectCapacity: 3,
    assignedProjectIds: ["project-008", "project-004"]
  },
  {
    id: "admin-003",
    name: "Rizky Pratama",
    email: "rizky.admin@rkk.local",
    phone: "081234567003",
    avatar: "https://i.pravatar.cc/150?u=admin-003",
    status: "active",
    role: "Admin",
    maxProjectCapacity: 3,
    assignedProjectIds: ["project-003"]
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
