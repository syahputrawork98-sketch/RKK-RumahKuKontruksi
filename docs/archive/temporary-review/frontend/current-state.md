# Current State Frontend (Historical)

> [!NOTE]
> **Dokumen ini bersifat reference/historical.**
> Untuk status terbaru, silakan merujuk ke [**docs/project/current-status.md**](../project/current-status.md) dan [**docs/frontend/role-data-source-status.md**](./role-data-source-status.md).


## Kondisi Umum
Frontend RKK saat ini adalah **prototype fungsional** yang sangat lengkap secara UI. Aplikasi berjalan stabil menggunakan **Vite + React** dan telah mengadopsi sistem desain publik yang konsisten (`public-card`, `btn-public-primary`, dll).

## Fitur & Pencapaian Utama
1. **Public Design System**: Halaman guest sudah sepenuhnya menggunakan class reusable untuk menjaga konsistensi visual.
2. **Consumer Monitoring (Timeline)**: Fitur monitoring proyek untuk konsumen sudah sangat matang dengan visualisasi timeline, detail laporan teknis (RAB), dan dokumentasi foto.
3. **Demo Role Access**: Tersedia shortcut di modal login untuk berpindah role secara cepat (Konsumen, Admin, Superadmin, dll) guna keperluan demo.
4. **Data Mock Terpusat**: Mulai beralih ke `client/src/data/mock/projects.js` sebagai *single source of truth* untuk data operasional proyek.

## Status Role
* **Guest**: **Done**. Semua halaman publik (Home, Layanan, Cara Kerja, Proyek, Tentang, Kontak) sudah memiliki UI premium dan responsif.
* **Konsumen**: **Partial**. Monitoring timeline sudah sangat matang, namun halaman Proyek dan Profil masih menggunakan data hardcoded.
* **Superadmin**: **Stable (UI Standard)**. Sidebar, Topbar, dan Layout sudah dipolish sebagai patokan desain dashboard internal. Route sudah diselaraskan ke `/superadmin`.
* **Admin**: **Shell Expanded / Mock-First**. Navigasi lengkap, layout bertema, dan halaman shell profesional sudah tersedia.
* **Arsitek**: **Shell Expanded / Mock-First**. Kerangka dashboard, permintaan desain, dan navigasi khusus arsitek sudah tersedia.
* **Pengawas**: **Shell Expanded / Mock-First**. Navigasi monitoring lapangan, verifikasi progres, dan dokumentasi sudah tersedia.
* **Mandor**: **Shell Expanded / Mock-First**. Navigasi operasional harian, logbook, dan request material lapangan sudah tersedia.


## Area Pengembangan Prioritas
1. **Single Source of Truth**: Memindahkan sisa data hardcoded di halaman Konsumen (Proyek & Profil) ke folder `src/data/mock/`.
2. **Dashboard Operasional**: Mengisi konten untuk dashboard Admin, Pengawas, dan Mandor agar setara dengan kualitas dashboard Konsumen.
3. **Interaktivitas Form**: Menambahkan validasi dan feedback visual pada form-form di sisi admin/superadmin.

---
*Terakhir diperbarui: 7 Mei 2026*
