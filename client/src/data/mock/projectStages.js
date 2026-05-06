// client/src/data/mock/projectStages.js

export const mockProjectStages = [
  // Stages for project-001 (Renovasi Rumah Tinggal - Bekasi)
  {
    id: "stage-01",
    projectId: "project-001",
    rabPlanId: "rab-plan-001",
    categoryId: "rab-category-001-01",
    code: "I",
    title: "Pekerjaan Persiapan",
    description: "Pembersihan lokasi, pemasangan bouwplank, dan koordinasi awal.",
    week: 1,
    status: "verified",
    progress: 100,
    startDate: "2025-09-01",
    endDate: "2025-09-05",
    durationDays: 5,
    order: 1,
    note: "Pekerjaan sesuai rencana dan telah diverifikasi pengawas.",
    verification: {
      isVerified: true,
      verifiedBy: "Ahmad Fauzi",
      verifiedAt: "2025-09-05"
    }
  },
  {
    id: "stage-02",
    projectId: "project-001",
    rabPlanId: "rab-plan-001",
    categoryId: "rab-category-001-02",
    code: "II",
    title: "Pekerjaan Tanah & Galian",
    description: "Galian tanah pondasi dan urugan pasir.",
    week: 2,
    status: "verified",
    progress: 100,
    startDate: "2025-09-06",
    endDate: "2025-09-12",
    durationDays: 7,
    order: 2,
    note: "Galian selesai tepat waktu. Kemiringan galian sudah sesuai gambar kerja.",
    verification: {
      isVerified: true,
      verifiedBy: "Ahmad Fauzi",
      verifiedAt: "2025-09-12"
    }
  },
  {
    id: "stage-03",
    projectId: "project-001",
    rabPlanId: "rab-plan-001",
    categoryId: "rab-category-001-03",
    code: "III",
    title: "Pekerjaan Struktur Bawah",
    description: "Pasangan pondasi batu kali, sloof, dan pengecoran.",
    week: 3,
    status: "verified",
    progress: 100,
    startDate: "2025-09-13",
    endDate: "2025-09-25",
    durationDays: 12,
    order: 3,
    note: "Struktur bawah sangat kokoh. Mutu beton sesuai spesifikasi.",
    verification: {
      isVerified: true,
      verifiedBy: "Ahmad Fauzi",
      verifiedAt: "2025-09-25"
    }
  },
  {
    id: "stage-04",
    projectId: "project-001",
    rabPlanId: "rab-plan-001",
    categoryId: "rab-category-001-04",
    code: "IV",
    title: "Pekerjaan Dinding & Kusen",
    description: "Pasangan bata ringan dan pemasangan kusen.",
    week: 5,
    status: "in_progress",
    progress: 45,
    startDate: "2025-09-26",
    endDate: "2025-10-10",
    durationDays: 15,
    order: 4,
    note: "Proses pemasangan bata sedang berjalan di area belakang."
  },
  {
    id: "stage-05",
    projectId: "project-001",
    rabPlanId: "rab-plan-001",
    categoryId: null, // To be defined later or mapped
    code: "V",
    title: "Struktur Atap & Plafon",
    description: "Rangka baja ringan dan penutup atap.",
    week: 7,
    status: "pending",
    progress: 0,
    startDate: "2025-10-11",
    endDate: "2025-10-25",
    durationDays: 14,
    order: 5,
    note: "Belum dimulai. Menunggu dinding selesai."
  },

  // Stages for project-003 (Renovasi Kantor Kuningan)
  {
    id: "stage-interior-01",
    projectId: "project-003",
    code: "INT-01",
    title: "Pekerjaan Interior & Finishing",
    description: "Pemasangan wallpaper, karpet, dan partisi ruangan.",
    week: 1,
    status: "in_progress",
    progress: 30,
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    durationDays: 15,
    order: 1,
    note: "Pemasangan partisi selesai 80%."
  }
];

// Helper to get stages by project ID
export const getStagesByProject = (projectId) => mockProjectStages.filter(s => s.projectId === projectId);
