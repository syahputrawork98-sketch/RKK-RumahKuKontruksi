# Role: Pengawas

## Status Umum
Role Pengawas saat ini dalam tahap **Database-Backed v1**. Pengawas adalah role pertama yang beralih dari data mock ke data rill dari database (PostgreSQL/Prisma) melalui **Persona Switcher (Dev Mode)**.

## Fungsi Utama Role
Pengawas bertanggung jawab atas monitoring teknis harian di lapangan, melakukan verifikasi terhadap capaian progres yang dilaporkan Mandor, serta mengelola dokumentasi fisik proyek untuk transparansi ke Admin/Konsumen.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/pengawas/dashboard` | `DashboardPengawas.jsx` | **Implemented (DB)** | Agregasi proyek rill berdasarkan persona pengawas. |
| Proyek Diawasi | `/pengawas/proyek` | `ProyekDiawasiPengawasPage.jsx` | **Implemented (DB)** | List proyek rill dari database dengan filter supervisorId. |
| Detail Proyek | `/pengawas/proyek/:id` | `DetailProyekDiawasiPengawasPage.jsx` | **Implemented (DB)** | Detail proyek rill termasuk info teknis dasar. |
| Verifikasi Progres | `/pengawas/verifikasi-progres` | `VerifikasiProgresPengawasPage.jsx` | **Experimental** | Backend draft pending. |
| Dokumentasi | `/pengawas/dokumentasi` | `DokumentasiLapanganPengawasPage.jsx` | **Shell / Pending** | Backend operasional pending. |
| Laporan Mingguan | `/pengawas/laporan-mingguan` | `LaporanMingguanPengawasPage.jsx` | **Shell / Pending** | Backend operasional pending. |
| Request Material | `/pengawas/request-material` | `RequestMaterialPengawasPage.jsx` | **Experimental** | Terhubung ke MR Backend Draft. |
| Pengaturan | `/pengawas/pengaturan` | `PengaturanPengawasPage.jsx` | **Implemented (DB)** | CRUD Profil, Sertifikasi, & Pengalaman rill DB. |

## Komponen Terkait
- `PengawasLayout.jsx`: Sidebar navigasi & Topbar khusus Pengawas.
- `DashboardStats.jsx`: Widget statistik progres lapangan.
- `SupervisorPersonaContext.jsx`: Manajemen persona pengawas di frontend.
- `supervisorService.js`: Service API untuk data pengawas.

## Data Source Policy
- **Source of Truth**: Seluruh data profil dan proyek utama ditarik dari database lokal.
- **No Persona Selected**: UI menampilkan `RolePersonaEmptyState` jika persona belum dipilih di Dev Mode.
- **Mock Data**: Mock data untuk Pengawas hanya boleh digunakan untuk *seeding* database atau referensi struktur kode, bukan sebagai fallback dashboard/proyek/profil di UI.
- **Operational Data**: Halaman operasional (verifikasi, dokumentasi, dsb) saat ini masih bersifat placeholder/statis karena backend operasional sengaja ditunda hingga modul Project/Progress stabil.

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar Pengawas.
- [x] Sinkronisasi tema Light/Dark global.
- [x] Routing lengkap (8 route aktif).
- [x] Integrasi Database-Backed v1 untuk Dashboard, Proyek, dan Profil.
- [x] Implementasi Persona Switcher khusus Pengawas.

## Belum Dikerjakan
- [ ] Integrasi API Backend rill untuk Modul Operasional (Progress Verification, Reports).
- [ ] Sistem Checklist Pekerjaan rill per tahapan.
- [ ] Fitur Sinkronisasi dengan Timeline Konsumen rill.

## Batasan Saat Ini
- **Operational Backend Pending**: Modul operasional belum terhubung ke database secara fungsional.
- **No Auth**: Belum ada sistem login/izin akses (menggunakan Persona Selector).
- **Local Dev Only**: Dioptimalkan untuk pengembangan di localhost.

## Prioritas Berikutnya
1. Stabilisasi modul Project/Stage/Progress untuk mendukung backend operasional.
2. Implementasi alur Verifikasi Progres yang terhubung dengan database.
3. Form pembuatan Laporan Mingguan otomatis.
