// client/src/data/mock/foremen.js

export const mockForemen = [
  {
    id: "foreman-001",
    userId: "user-mandor-001",
    name: "Budi Santoso",
    email: "budi.santoso@vendor.com",
    phone: "081234567892",
    avatar: "https://i.pravatar.cc/150?u=foreman-001",
    vendorType: "company",
    companyName: "CV Budi Karya Mandiri",
    address: "Bekasi, Jawa Barat",
    specialization: "Pekerjaan Struktur",
    experienceYears: 8,
    skillTags: ["Struktur", "Beton", "Pondasi", "Baja Ringan"],
    teamSummary: {
      estimatedWorkerCount: 8,
      mainSkills: ["Tukang Batu", "Tukang Besi", "Tukang Kayu"]
    },
    assignedProjectIds: ["project-001", "project-002"],
    maxProjectCapacity: 2,
    status: "active",
    joinedAt: "2023-08-15",
    notes: "Mandor eksternal untuk pekerjaan struktur dan renovasi rumah tinggal."
  },
  {
    id: "foreman-002",
    userId: "user-mandor-002",
    name: "Agus Setiawan",
    email: "agus.setiawan@vendor.com",
    phone: "081234567881",
    avatar: "https://i.pravatar.cc/150?u=foreman-002",
    vendorType: "individual",
    companyName: null,
    address: "Jakarta Timur, DKI Jakarta",
    specialization: "Pekerjaan Finishing & Interior",
    experienceYears: 5,
    skillTags: ["Pengecatan", "Plafon", "Lantai", "Wallpaper"],
    teamSummary: {
      estimatedWorkerCount: 5,
      mainSkills: ["Tukang Cat", "Tukang Plafon", "Tukang Keramik"]
    },
    assignedProjectIds: ["project-003"],
    maxProjectCapacity: 2,
    status: "active",
    joinedAt: "2023-11-20",
    notes: "Ahli dalam pekerjaan detail finishing dan interior."
  },
  {
    id: "foreman-003",
    userId: "user-mandor-003",
    name: "Dedi Rahman",
    email: "dedi.rahman@vendor.com",
    phone: "081234567882",
    avatar: "https://i.pravatar.cc/150?u=foreman-003",
    vendorType: "individual",
    companyName: null,
    address: "Depok, Jawa Barat",
    specialization: "Pekerjaan Atap & Plafon",
    experienceYears: 4,
    skillTags: ["Baja Ringan", "Genteng", "Gypsum", "PVC"],
    teamSummary: {
      estimatedWorkerCount: 4,
      mainSkills: ["Tukang Rangka Baja", "Tukang Plafon"]
    },
    assignedProjectIds: [],
    maxProjectCapacity: 2,
    status: "active",
    joinedAt: "2024-02-10",
    notes: "Mandor muda potensial dengan spesialisasi atap baja ringan."
  },
  {
    id: "foreman-004",
    userId: "user-mandor-004",
    name: "Hendra Wijaya",
    email: "hendra.wijaya@vendor.com",
    phone: "081234567883",
    avatar: "https://i.pravatar.cc/150?u=foreman-004",
    vendorType: "external",
    companyName: "PT Global Konstruksi",
    address: "Tangerang, Banten",
    specialization: "Pekerjaan Umum & Drainase",
    experienceYears: 10,
    skillTags: ["Saluran", "Pagar", "Paving", "Galian"],
    teamSummary: {
      estimatedWorkerCount: 12,
      mainSkills: ["Tukang Gali", "Tukang Las", "Operator Alat Berat"]
    },
    assignedProjectIds: ["project-004"],
    maxProjectCapacity: 2,
    status: "on_hold",
    joinedAt: "2023-05-15",
    notes: "Sedang tidak aktif menunggu pembaruan kontrak."
  }
];

// Helper to get workload status
export const getForemanWorkloadStatus = (foreman) => {
  const assignedCount = foreman.assignedProjectIds.length;
  if (assignedCount >= foreman.maxProjectCapacity) return "full";
  if (assignedCount === 0) return "available";
  return "normal";
};

// Helper to get available foremen
export const getAvailableForemen = () =>
  mockForemen.filter(
    (foreman) =>
      foreman.status === "active" &&
      foreman.assignedProjectIds.length < foreman.maxProjectCapacity
  );
