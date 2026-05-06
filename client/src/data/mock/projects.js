export const activeCustomerProject = {
  id: "PRJ-001",
  name: "Renovasi Rumah Tinggal - Bekasi",
  type: "Renovasi",
  status: "Berjalan",
  progress: 65,
  location: "Bekasi, Jawa Barat",
  startDate: "2025-09-01",
  estimatedEndDate: "2025-11-12",
  heroImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200",
  customer: {
    name: "Andi Pratama",
    avatar: "https://i.pravatar.cc/150?u=andi"
  },
  team: {
    admin: {
      name: "Rina Maharani",
      role: "Admin Proyek",
      avatar: "https://i.pravatar.cc/150?u=rina",
      status: "Aktif"
    },
    pengawas: {
      name: "Ahmad Fauzi",
      role: "Pengawas Lapangan",
      avatar: "https://i.pravatar.cc/150?u=ahmad",
      status: "Aktif"
    },
    mandor: {
      name: "Budi Santoso",
      role: "Mandor",
      avatar: "https://i.pravatar.cc/150?u=budi",
      status: "Aktif"
    }
  },
  budget: {
    total: 107683146,
    paid: 18000000,
    remaining: 89683146
  },
  timeline: [
    {
      id: "STG-001",
      week: 1,
      code: "I",
      title: "Pekerjaan Persiapan",
      status: "verified",
      progress: 100,
      startDate: "2025-09-01",
      endDate: "2025-09-05",
      durationDays: 5,
      tasks: [
        "Pembersihan lokasi manual",
        "Pas bouwplank kayu alba",
        "Koordinasi lapangan"
      ],
      images: [
        "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=600"
      ],
      payment: {
        amount: 3496999,
        paid: 3496999
      },
      verification: {
        isVerified: true,
        verifiedBy: "Ahmad Fauzi",
        verifiedAt: "2025-09-05"
      },
      note: "Pekerjaan sesuai rencana dan telah diverifikasi pengawas."
    },
    {
      id: "STG-002",
      week: 2,
      code: "II",
      title: "Pekerjaan Tanah & Galian",
      status: "verified",
      progress: 100,
      startDate: "2025-09-06",
      endDate: "2025-09-12",
      durationDays: 7,
      tasks: [
        "Galian tanah pondasi",
        "Urugan pasir bawah pondasi",
        "Perataan tanah lokasi"
      ],
      images: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600"
      ],
      payment: {
        amount: 5200000,
        paid: 5200000
      },
      verification: {
        isVerified: true,
        verifiedBy: "Ahmad Fauzi",
        verifiedAt: "2025-09-12"
      },
      note: "Galian selesai tepat waktu meskipun cuaca sedikit hujan."
    },
    {
      id: "STG-003",
      week: 3,
      code: "III",
      title: "Pekerjaan Struktur Bawah",
      status: "verified",
      progress: 100,
      startDate: "2025-09-13",
      endDate: "2025-09-25",
      durationDays: 12,
      tasks: [
        "Pasangan pondasi batu kali",
        "Pemasangan besi sloof",
        "Pengecoran sloof beton"
      ],
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
      ],
      payment: {
        amount: 12450000,
        paid: 9203001 // Partially paid demo
      },
      verification: {
        isVerified: true,
        verifiedBy: "Ahmad Fauzi",
        verifiedAt: "2025-09-25"
      },
      note: "Struktur bawah sudah sangat kokoh. Lanjut ke dinding."
    },
    {
      id: "STG-004",
      week: 5,
      code: "IV",
      title: "Pekerjaan Dinding & Kusen",
      status: "in_progress",
      progress: 45,
      startDate: "2025-09-26",
      endDate: "2025-10-10",
      durationDays: 15,
      tasks: [
        "Pasangan dinding bata ringan",
        "Pemasangan kusen pintu & jendela",
        "Plesteran dinding kasar"
      ],
      images: [
        "https://images.unsplash.com/photo-1517646281694-2226b1445771?auto=format&fit=crop&q=80&w=600"
      ],
      payment: {
        amount: 18750000,
        paid: 0
      },
      verification: {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null
      },
      note: "Proses pemasangan bata sedang berjalan di area belakang."
    },
    {
      id: "STG-005",
      week: 7,
      code: "V",
      title: "Struktur Atap & Plafon",
      status: "pending",
      progress: 0,
      startDate: "2025-10-11",
      endDate: "2025-10-25",
      durationDays: 14,
      tasks: [
        "Pemasangan rangka atap baja ringan",
        "Pemasangan penutup atap (genteng)",
        "Pemasangan rangka plafon"
      ],
      images: [],
      payment: {
        amount: 22300000,
        paid: 0
      },
      verification: {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null
      },
      note: "Belum dimulai."
    }
  ]
};
