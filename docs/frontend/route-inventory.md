# Route Inventory

Daftar seluruh route yang terdaftar di aplikasi berdasarkan `client/src/App.jsx`.

| Role | Halaman | Route | Status | Catatan |
|---|---|---|---|---|
| **Public** | Home | `/` | **Done** | Landing page utama. |
| **Public** | Layanan | `/layanan` | **Done** | Grid layanan jasa konstruksi. |
| **Public** | Cara Kerja | `/cara-kerja` | **Done** | Visualisasi alur kerja proyek. |
| **Public** | Proyek | `/proyek` | **Done** | Portfolio publik. |
| **Public** | Tentang | `/tentang` | **Done** | Visi, misi, dan tim. |
| **Public** | Kontak | `/kontak` | **Done** | Form kontak dan peta lokasi. |
| **Konsumen** | Dashboard | `/konsumen/dashboard` | **Done** | Monitoring progres proyek aktif. |
| **Konsumen** | Timeline Proyek | `/konsumen/TimelineProyek` | **Done** | Visualisasi tahap konstruksi. |
| **Konsumen** | Detail Tahap | `/konsumen/TimelineProyek/:id` | **Done** | Laporan teknis & foto per tahap. |
| **Admin** | Dashboard | `/admin/dashboard` | **Mock-First** | Dashboard operasional proyek. |
| **Admin** | Proyek | `/admin/proyek` | **Mock-First** | Manajemen list proyek global. |
| **Admin** | Detail Proyek | `/admin/proyek/:id` | **Mock-First** | Penugasan tim & info detail. |
| **Admin** | RAB | `/admin/rab` | **Mock-First** | Manajemen anggaran proyek. |
| **Admin** | Pembayaran | `/admin/pembayaran` | **Mock-First** | Monitoring termin konsumen. |
| **Arsitek** | Dashboard | `/arsitek/dashboard` | **Mock-First** | Kapasitas & antrean desain. |
| **Arsitek** | Permintaan Desain | `/arsitek/permintaan-desain` | **Mock-First** | List permintaan masuk & aktif. |
| **Arsitek** | File Desain | `/arsitek/file-desain` | **Mock-First** | Repositori dokumen desain. |
| **Arsitek** | Revisi | `/arsitek/revisi` | **Mock-First** | Monitoring revisi customer. |
| **Pengawas** | Dashboard | `/pengawas/dashboard` | **Mock-First** | Monitoring harian lapangan. |
| **Pengawas** | Proyek Diawasi | `/pengawas/proyek` | **Mock-First** | List proyek di bawah tanggung jawab. |
| **Pengawas** | Verifikasi | `/pengawas/verifikasi-progres` | **Mock-First** | Validasi laporan progres Mandor. |
| **Pengawas** | Dokumentasi | `/pengawas/dokumentasi` | **Mock-First** | Galeri foto fisik lapangan. |
| **Mandor** | Dashboard | `/mandor/dashboard` | **Mock-First** | Tugas harian & progress lapangan. |
| **Mandor** | Proyek Aktif | `/mandor/proyek-aktif` | **Mock-First** | List eksekusi harian tim. |
| **Mandor** | Tugas Harian | `/mandor/tugas-harian` | **Mock-First** | Checklist pekerjaan tim teknis. |
| **Mandor** | Laporan Harian | `/mandor/laporan-harian` | **Mock-First** | Logbook kemajuan fisik. |

## Keterangan Status:
* **Done**: Sudah stabil secara UI dan fungsionalitas mock (Standard RKK).
* **Mock-First / Shell Expanded**: Halaman shell profesional sudah tersedia dengan navigasi lengkap, namun data masih bersifat simulasi.
* **Planned**: Belum dibuat, masih dalam rencana pengembangan rill.

---
*Terakhir diperbarui: 7 Mei 2026*
