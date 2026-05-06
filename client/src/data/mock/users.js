// client/src/data/mock/users.js

export const mockUsers = [
  {
    id: "user-superadmin-001",
    name: "Syah Putra (Super)",
    email: "superadmin@rkk.com",
    phone: "081111111111",
    role: "superadmin",
    avatar: "https://i.pravatar.cc/150?u=superadmin",
    status: "active",
    createdAt: "2025-01-10"
  },
  {
    id: "user-admin-001",
    name: "Rina Maharani",
    email: "rina.maharani@rumahkukontruksi.com",
    phone: "081234567890",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin-001",
    status: "active",
    createdAt: "2024-01-15"
  },
  // ... other staff (kept in memory or to be truncated)
  {
    id: "user-konsumen-001",
    name: "Andi Pratama",
    email: "andi.pratama@gmail.com",
    phone: "081222222222",
    role: "konsumen",
    avatar: "https://i.pravatar.cc/150?u=customer-001",
    status: "active",
    createdAt: "2025-01-01"
  },
  {
    id: "user-konsumen-002",
    name: "Budi Santoso",
    email: "budi.santoso@gmail.com",
    phone: "081233333333",
    role: "konsumen",
    avatar: "https://i.pravatar.cc/150?u=customer-002",
    status: "active",
    createdAt: "2025-02-15"
  },
  {
    id: "user-konsumen-003",
    name: "Nadia Permata",
    email: "nadia@ciptaproperti.co.id",
    phone: "081299988877",
    role: "konsumen",
    avatar: "https://i.pravatar.cc/150?u=customer-company-003",
    status: "active",
    createdAt: "2025-03-12"
  },
  {
    id: "user-konsumen-004",
    name: "Haryanto",
    email: "haryanto@membangun.com",
    phone: "081255544433",
    role: "konsumen",
    avatar: "https://i.pravatar.cc/150?u=customer-company-004",
    status: "active",
    createdAt: "2025-04-05"
  },
  {
    id: "user-customer-viewer-001",
    name: "Dian Pratama",
    email: "dian.pratama@example.com",
    phone: "081288877766",
    role: "customer_viewer",
    avatar: "https://i.pravatar.cc/150?u=customer-viewer-001",
    status: "active",
    createdAt: "2026-04-20"
  },
  {
    id: "user-customer-viewer-002",
    name: "Rully Kurniawan",
    email: "rully@ciptaproperti.co.id",
    phone: "081266655544",
    role: "customer_viewer",
    avatar: "https://i.pravatar.cc/150?u=customer-viewer-002",
    status: "active",
    createdAt: "2026-04-25"
  },
  // Adding previously defined staff for completeness
  {
    id: "user-admin-002",
    name: "Dewi Lestari",
    email: "dewi.lestari@rumahkukontruksi.com",
    phone: "081234567899",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin-002",
    status: "active",
    createdAt: "2024-03-20"
  },
  {
    id: "user-pengawas-001",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@rumahkukontruksi.com",
    phone: "081234567891",
    role: "pengawas",
    avatar: "https://i.pravatar.cc/150?u=supervisor-001",
    status: "active",
    createdAt: "2023-06-10"
  },
  {
    id: "user-mandor-001",
    name: "Budi Santoso",
    email: "budi.santoso@rumahkukontruksi.com",
    phone: "081234567892",
    role: "mandor",
    avatar: "https://i.pravatar.cc/150?u=foreman-001",
    status: "active",
    createdAt: "2023-08-15"
  }
];

// Helper to get user by role for demo purposes
export const getUserByRole = (role) => mockUsers.find(u => u.role === role);
