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
      id: "stage-01",
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
      rabItems: [
        {
          id: "rab-01-01",
          uraian: "Pembersihan lokasi manual",
          lokasi: "Area bangunan utama",
          volume: 120,
          satuan: "m²",
          hargaSatuan: 8500,
          total: 1020000,
          progress: 100,
          nilaiSelesai: 1020000,
          keterangan: "Area kerja dibersihkan dari material bekas dan tanaman liar."
        },
        {
          id: "rab-01-02",
          uraian: "Pas bouwplank kayu alba",
          lokasi: "Keliling area pondasi",
          volume: 42,
          satuan: "m¹",
          hargaSatuan: 52000,
          total: 2184000,
          progress: 100,
          nilaiSelesai: 2184000,
          keterangan: "Bouwplank dipasang sebagai acuan elevasi dan titik pondasi."
        },
        {
          id: "rab-01-03",
          uraian: "Koordinasi lapangan & mobilisasi",
          lokasi: "Basecamp proyek",
          volume: 1,
          satuan: "ls",
          hargaSatuan: 292999,
          total: 292999,
          progress: 100,
          nilaiSelesai: 292999,
          keterangan: "Rapat koordinasi awal, penentuan jadwal kerja, dan mobilisasi peralatan."
        }
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
      note: "Pekerjaan sesuai rencana dan telah diverifikasi pengawas. Lokasi bersih dan siap untuk tahap galian."
    },
    {
      id: "stage-02",
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
      rabItems: [
        {
          id: "rab-02-01",
          uraian: "Galian tanah pondasi lebar > 1m",
          lokasi: "Jalur pondasi utama",
          volume: 85,
          satuan: "m³",
          hargaSatuan: 35000,
          total: 2975000,
          progress: 100,
          nilaiSelesai: 2975000,
          keterangan: "Galian menggunakan alat bantu cangkul dan linggis, kedalaman rata-rata 0.8m."
        },
        {
          id: "rab-02-02",
          uraian: "Urugan pasir bawah pondasi",
          lokasi: "Dasar galian pondasi",
          volume: 12,
          satuan: "m³",
          hargaSatuan: 185000,
          total: 2220000,
          progress: 100,
          nilaiSelesai: 2220000,
          keterangan: "Pasir urug dimadatkan dengan ketebalan 10cm sebelum pemasangan pondasi."
        },
        {
          id: "rab-02-03",
          uraian: "Perataan & pemadatan tanah lokasi",
          lokasi: "Area halaman dan akses kerja",
          volume: 1,
          satuan: "ls",
          hargaSatuan: 5000,
          total: 5000,
          progress: 100,
          nilaiSelesai: 5000,
          keterangan: "Tanah di sekitar area kerja diratakan untuk akses mobilisasi material."
        }
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
      note: "Galian selesai tepat waktu meskipun cuaca sedikit hujan di hari ke-4. Kemiringan galian sudah sesuai gambar kerja."
    },
    {
      id: "stage-03",
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
      rabItems: [
        {
          id: "rab-03-01",
          uraian: "Pasangan pondasi batu kali 1:5",
          lokasi: "Jalur pondasi utama",
          volume: 32,
          satuan: "m³",
          hargaSatuan: 290000,
          total: 9280000,
          progress: 100,
          nilaiSelesai: 9280000,
          keterangan: "Batu kali dipasang dengan campuran semen:pasir 1:5 sesuai spesifikasi teknis."
        },
        {
          id: "rab-03-02",
          uraian: "Pemasangan besi sloof dia. 12mm",
          lokasi: "Jalur sloof keliling",
          volume: 48,
          satuan: "m¹",
          hargaSatuan: 55000,
          total: 2640000,
          progress: 100,
          nilaiSelesai: 2640000,
          keterangan: "Penulangan sloof menggunakan besi D12 ulir dengan sengkang Ø8-150mm."
        },
        {
          id: "rab-03-03",
          uraian: "Pengecoran sloof beton K-225",
          lokasi: "Jalur sloof keliling",
          volume: 4.8,
          satuan: "m³",
          hargaSatuan: 1100000,
          total: 5280000,
          progress: 100,
          nilaiSelesai: 5280000,
          keterangan: "Pengecoran menggunakan beton ready mix K-225, dipadatkan dengan vibrator."
        },
        {
          id: "rab-03-04",
          uraian: "Bekisting sloof dan perawatan",
          lokasi: "Jalur sloof keliling",
          volume: 48,
          satuan: "m¹",
          hargaSatuan: 52083,
          total: 2500000,
          progress: 100,
          nilaiSelesai: 2500000,
          keterangan: "Bekisting papan kayu, dibongkar setelah 7 hari curing."
        }
      ],
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
      ],
      payment: {
        amount: 12450000,
        paid: 9203001
      },
      verification: {
        isVerified: true,
        verifiedBy: "Ahmad Fauzi",
        verifiedAt: "2025-09-25"
      },
      note: "Struktur bawah sudah sangat kokoh. Mutu beton diuji dengan hammer test dan hasilnya memenuhi K-225. Sisa pembayaran akan dilunasi di bulan berikutnya."
    },
    {
      id: "stage-04",
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
      rabItems: [
        {
          id: "rab-04-01",
          uraian: "Pasangan dinding bata ringan t=10cm",
          lokasi: "Seluruh dinding lantai 1",
          volume: 210,
          satuan: "m²",
          hargaSatuan: 65000,
          total: 13650000,
          progress: 50,
          nilaiSelesai: 6825000,
          keterangan: "Pemasangan bata ringan dengan perekat khusus, berjalan 50% di area belakang."
        },
        {
          id: "rab-04-02",
          uraian: "Pemasangan kusen pintu kayu kamper",
          lokasi: "Lubang pintu utama & kamar",
          volume: 6,
          satuan: "bh",
          hargaSatuan: 750000,
          total: 4500000,
          progress: 33,
          nilaiSelesai: 1485000,
          keterangan: "Sudah terpasang 2 dari 6 kusen. Material kusen sudah tiba di lokasi."
        },
        {
          id: "rab-04-03",
          uraian: "Plesteran dinding kasar 1:5",
          lokasi: "Dinding yang telah selesai dipasang",
          volume: 105,
          satuan: "m²",
          hargaSatuan: 35000,
          total: 3675000,
          progress: 0,
          nilaiSelesai: 0,
          keterangan: "Menunggu pemasangan dinding selesai 100% sebelum mulai plester."
        },
        {
          id: "rab-04-04",
          uraian: "Pemasangan kusen jendela aluminium",
          lokasi: "Lubang jendela",
          volume: 8,
          satuan: "bh",
          hargaSatuan: 481250,
          total: 3850000,
          progress: 0,
          nilaiSelesai: 0,
          keterangan: "Material dalam proses pemesanan, estimasi tiba minggu depan."
        }
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
      note: "Proses pemasangan bata sedang berjalan di area belakang. Target selesai akhir minggu ini."
    },
    {
      id: "stage-05",
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
      rabItems: [
        {
          id: "rab-05-01",
          uraian: "Rangka atap baja ringan C75",
          lokasi: "Seluruh area atap",
          volume: 185,
          satuan: "m²",
          hargaSatuan: 85000,
          total: 15725000,
          progress: 0,
          nilaiSelesai: 0,
          keterangan: "Material baja ringan sudah disurvey, menunggu dinding selesai."
        },
        {
          id: "rab-05-02",
          uraian: "Penutup atap genteng keramik flat",
          lokasi: "Seluruh area atap",
          volume: 185,
          satuan: "m²",
          hargaSatuan: 95000,
          total: 17575000,
          progress: 0,
          nilaiSelesai: 0,
          keterangan: "Genteng keramik pilihan owner, warna abu-abu gelap."
        },
        {
          id: "rab-05-03",
          uraian: "Rangka plafon hollow galvalum 4x4",
          lokasi: "Seluruh area plafon lantai 1",
          volume: 120,
          satuan: "m²",
          hargaSatuan: 45000,
          total: 5400000,
          progress: 0,
          nilaiSelesai: 0,
          keterangan: "Menunggu rangka atap selesai sebelum rangka plafon dipasang."
        }
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
      note: "Belum dimulai. Jadwal mulai setelah pekerjaan dinding selesai 100%."
    }
  ]
};
