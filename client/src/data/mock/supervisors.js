// client/src/data/mock/supervisors.js

export const mockSupervisors = [
  {
    id: "supervisor-001",
    userId: "user-pengawas-001",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@rumahkukontruksi.com",
    phone: "081234567891",
    avatar: "https://i.pravatar.cc/150?u=supervisor-001",
    address: "Jakarta Timur, DKI Jakarta",
    specialization: "Pengawasan Struktur Bangunan",
    experienceYears: 7,
    skillTags: ["Quality Control", "Struktur", "K3", "Progress Verification"],
    assignedProjectIds: ["project-001", "project-002", "project-003"],
    maxProjectCapacity: 3,
    status: "active",
    joinedAt: "2023-06-10",
    notes: "Pengawas senior untuk proyek rumah tinggal dan ruko."
  },
  {
    id: "supervisor-002",
    userId: "user-pengawas-002",
    name: "Bambang Wijaya",
    email: "bambang.wijaya@rumahkukontruksi.com",
    phone: "081234567811",
    avatar: "https://i.pravatar.cc/150?u=supervisor-002",
    address: "Jakarta Barat, DKI Jakarta",
    specialization: "Pengawasan Arsitektur & Finishing",
    experienceYears: 5,
    skillTags: ["Interior", "Finishing", "Material Audit"],
    assignedProjectIds: ["project-004", "project-005"],
    maxProjectCapacity: 3,
    status: "active",
    joinedAt: "2023-09-15",
    notes: "Detail-oriented pengawas dengan fokus pada estetika dan kualitas finishing."
  },
  {
    id: "supervisor-003",
    userId: "user-pengawas-003",
    name: "Eko Prasetyo",
    email: "eko.prasetyo@rumahkukontruksi.com",
    phone: "081234567812",
    avatar: "https://i.pravatar.cc/150?u=supervisor-003",
    address: "Jakarta Selatan, DKI Jakarta",
    specialization: "Pengawasan Sipil Umum",
    experienceYears: 3,
    skillTags: ["Drainase", "Pagar", "Lanskap"],
    assignedProjectIds: ["project-006"],
    maxProjectCapacity: 3,
    status: "active",
    joinedAt: "2024-01-05",
    notes: "Pengawas muda yang rajin dan teliti dalam pelaporan harian."
  },
  {
    id: "supervisor-004",
    userId: "user-pengawas-004",
    name: "Lukman Hakim",
    email: "lukman.hakim@rumahkukontruksi.com",
    phone: "081234567813",
    avatar: "https://i.pravatar.cc/150?u=supervisor-004",
    address: "Tangerang, Banten",
    specialization: "Pengawasan Infrastruktur",
    experienceYears: 12,
    skillTags: ["Jalan", "Jembatan", "Konstruksi Berat"],
    assignedProjectIds: [],
    maxProjectCapacity: 3,
    status: "inactive",
    joinedAt: "2023-04-10",
    notes: "Sedang cuti panjang untuk urusan pribadi."
  }
];

// Helper to get workload status
export const getSupervisorWorkloadStatus = (supervisor) => {
  const assignedCount = supervisor.assignedProjectIds.length;
  if (assignedCount >= supervisor.maxProjectCapacity) return "full";
  if (assignedCount === 0) return "available";
  return "normal";
};

// Helper to get available supervisors
export const getAvailableSupervisors = () =>
  mockSupervisors.filter(
    (supervisor) =>
      supervisor.status === "active" &&
      supervisor.assignedProjectIds.length < supervisor.maxProjectCapacity
  );
