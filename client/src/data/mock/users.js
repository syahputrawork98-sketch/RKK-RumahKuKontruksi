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
    avatar: "https://i.pravatar.cc/150?u=rina",
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "user-admin-002",
    name: "Dewi Lestari",
    email: "dewi.lestari@rumahkukontruksi.com",
    phone: "081234567899",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=dewi",
    status: "active",
    createdAt: "2024-03-20"
  },
  {
    id: "user-admin-003",
    name: "Fajar Nugroho",
    email: "fajar.nugroho@rumahkukontruksi.com",
    phone: "081234567888",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=fajar",
    status: "active",
    createdAt: "2024-06-10"
  },
  {
    id: "user-admin-004",
    name: "Siti Aminah",
    email: "siti.aminah@rumahkukontruksi.com",
    phone: "081234567877",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=siti-admin",
    status: "active",
    createdAt: "2024-09-05"
  },
  {
    id: "user-konsumen-001",
    name: "Andi Pratama",
    email: "andi@gmail.com",
    phone: "081222222222",
    role: "konsumen",
    avatar: "https://i.pravatar.cc/150?u=andi",
    status: "active",
    createdAt: "2025-01-01"
  },
  {
    id: "user-konsumen-002",
    name: "Budi Santoso",
    email: "budi@gmail.com",
    phone: "081233333333",
    role: "konsumen",
    avatar: "https://i.pravatar.cc/150?u=budi",
    status: "active",
    createdAt: "2025-04-10"
  },
  {
    id: "user-pengawas-001",
    name: "Ahmad Fauzi",
    email: "ahmad@rkk.com",
    phone: "081234567891",
    role: "pengawas",
    avatar: "https://i.pravatar.cc/150?u=ahmad",
    status: "active",
    createdAt: "2025-02-01"
  },
  {
    id: "user-mandor-001",
    name: "Hasan Basri",
    email: "hasan@rkk.com",
    phone: "081234567892",
    role: "mandor",
    avatar: "https://i.pravatar.cc/150?u=hasan",
    status: "active",
    createdAt: "2025-02-05"
  }
];

// Helper to get user by role for demo purposes
export const getUserByRole = (role) => mockUsers.find(u => u.role === role);
