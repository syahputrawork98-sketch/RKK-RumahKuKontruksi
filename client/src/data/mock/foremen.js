// client/src/data/mock/foremen.js

export const mockForemen = [
  {
    id: "foreman-001",
    userId: "user-mandor-001",
    name: "Budi Santoso",
    email: "budi.santoso@rumahkukontruksi.com",
    phone: "081234567892",
    avatar: "https://i.pravatar.cc/150?u=foreman-001",
    address: "Jl. Bekasi Timur No. 12, Bekasi, Jawa Barat",
    specialization: "Pekerjaan Struktur",
    experienceYears: 8,
    skillTags: ["Struktur", "Beton", "Pondasi", "Baja Ringan"],
    assignedProjectIds: ["project-001", "project-002"],
    workerIds: ["worker-001", "worker-002", "worker-003"],
    maxProjectCapacity: 2,
    certificates: [
      {
        id: "cert-foreman-001-001",
        title: "Sertifikat Kompetensi Kerja Mandor Konstruksi",
        issuer: "BNSP",
        certificateNumber: "BNSP-MDR-2024-001",
        issuedAt: "2024-01-20",
        expiredAt: "2027-01-20",
        fileUrl: "/mock/certificates/mandor/foreman-001-skk.pdf",
        fileType: "pdf",
        status: "valid"
      },
      {
        id: "cert-foreman-001-002",
        title: "Sertifikat K3 Konstruksi",
        issuer: "Kemnaker",
        certificateNumber: "K3-MDR-2024-118",
        issuedAt: "2024-03-15",
        expiredAt: "2027-03-15",
        fileUrl: "/mock/certificates/mandor/foreman-001-k3.pdf",
        fileType: "pdf",
        status: "valid"
      },
      {
        id: "cert-foreman-001-003",
        title: "Pelatihan Manajemen Tukang Lapangan",
        issuer: "RKK Internal",
        certificateNumber: "RKK-TR-2024-05",
        issuedAt: "2024-04-10",
        expiredAt: "2029-04-10",
        fileUrl: "/mock/certificates/mandor/foreman-001-training.pdf",
        fileType: "pdf",
        status: "valid"
      }
    ],
    status: "active",
    joinedAt: "2023-08-15",
    notes: "Mandor senior untuk pekerjaan struktur dan renovasi rumah tinggal."
  },
  {
    id: "foreman-002",
    userId: "user-mandor-002",
    name: "Agus Setiawan",
    email: "agus.setiawan@rumahkukontruksi.com",
    phone: "081234567881",
    avatar: "https://i.pravatar.cc/150?u=foreman-002",
    address: "Jakarta Timur, DKI Jakarta",
    specialization: "Pekerjaan Finishing & Interior",
    experienceYears: 5,
    skillTags: ["Pengecatan", "Plafon", "Lantai", "Wallpaper"],
    assignedProjectIds: ["project-003"],
    workerIds: ["worker-004", "worker-005"],
    maxProjectCapacity: 2,
    certificates: [
      {
        id: "cert-foreman-002-001",
        title: "Sertifikat Keahlian Finishing Bangunan",
        issuer: "LPJK",
        certificateNumber: "LPJK-FIN-2023-088",
        issuedAt: "2023-05-10",
        expiredAt: "2026-05-10",
        fileUrl: "/mock/certificates/mandor/foreman-002-skk.pdf",
        fileType: "pdf",
        status: "valid"
      },
      {
        id: "cert-foreman-002-002",
        title: "Sertifikat K3 Konstruksi",
        issuer: "Kemnaker",
        certificateNumber: "K3-MDR-2023-210",
        issuedAt: "2023-06-01",
        expiredAt: "2026-06-01",
        fileUrl: "/mock/certificates/mandor/foreman-002-k3.pdf",
        fileType: "pdf",
        status: "valid"
      }
    ],
    status: "active",
    joinedAt: "2023-11-20",
    notes: "Ahli dalam pekerjaan detail finishing dan interior."
  },
  {
    id: "foreman-003",
    userId: "user-mandor-003",
    name: "Dedi Rahman",
    email: "dedi.rahman@rumahkukontruksi.com",
    phone: "081234567882",
    avatar: "https://i.pravatar.cc/150?u=foreman-003",
    address: "Depok, Jawa Barat",
    specialization: "Pekerjaan Atap & Plafon",
    experienceYears: 4,
    skillTags: ["Baja Ringan", "Genteng", "Gypsum", "PVC"],
    assignedProjectIds: [],
    workerIds: [],
    maxProjectCapacity: 2,
    certificates: [
      {
        id: "cert-foreman-003-001",
        title: "Sertifikat Pelatihan Baja Ringan",
        issuer: "BlueScope",
        certificateNumber: "BS-TRAIN-2024-012",
        issuedAt: "2024-02-15",
        expiredAt: "2027-02-15",
        fileUrl: "/mock/certificates/mandor/foreman-003-blue.pdf",
        fileType: "pdf",
        status: "pending"
      }
    ],
    status: "active",
    joinedAt: "2024-02-10",
    notes: "Mandor muda potensial dengan spesialisasi atap baja ringan."
  },
  {
    id: "foreman-004",
    userId: "user-mandor-004",
    name: "Hendra Wijaya",
    email: "hendra.wijaya@rumahkukontruksi.com",
    phone: "081234567883",
    avatar: "https://i.pravatar.cc/150?u=foreman-004",
    address: "Tangerang, Banten",
    specialization: "Pekerjaan Umum & Drainase",
    experienceYears: 10,
    skillTags: ["Saluran", "Pagar", "Paving", "Galian"],
    assignedProjectIds: ["project-004"],
    workerIds: ["worker-006"],
    maxProjectCapacity: 2,
    certificates: [
      {
        id: "cert-foreman-004-001",
        title: "Sertifikat Mandor Drainase",
        issuer: "BNSP",
        certificateNumber: "BNSP-DRN-2020-005",
        issuedAt: "2020-01-10",
        expiredAt: "2023-01-10",
        fileUrl: "/mock/certificates/mandor/foreman-004-expired.pdf",
        fileType: "pdf",
        status: "expired"
      }
    ],
    status: "inactive",
    joinedAt: "2023-05-15",
    notes: "Sedang tidak aktif menunggu pembaruan sertifikasi."
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
