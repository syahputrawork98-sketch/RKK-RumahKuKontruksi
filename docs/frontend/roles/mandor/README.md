# Role: Mandor

## Status Umum
Role Mandor saat ini dalam tahap **Database-Backed v1**. Mandor menggunakan data rill dari database (PostgreSQL/Prisma) untuk modul utama melalui **Persona Switcher (Dev Mode)**.

## Fungsi Utama Role
Mandor bertanggung jawab atas eksekusi harian di lapangan, manajemen tugas tim teknis, pengisian logbook harian, pelaporan kendala, serta pengajuan kebutuhan material ke Pengawas/Admin.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/mandor/dashboard` | `DashboardMandor.jsx` | **Implemented (DB)** | Ringkasan tugas & progress harian dari database. |
| Proyek Aktif | `/mandor/proyek-aktif` | `ProyekAktifMandorPage.jsx` | **Implemented (DB)** | List proyek aktif berdasarkan persona mandor. |
| Detail Proyek | `/mandor/proyek-aktif/:id` | `DetailProyekAktifMandorPage.jsx` | **Implemented (DB)** | Info proyek rill dari database. |
| Tugas Harian | `/mandor/tugas-harian` | `TugasHarianMandorPage.jsx` | **Postponed** | Backend operasional pending. |
| Laporan Harian | `/mandor/laporan-harian` | `LaporanHarianMandorPage.jsx` | **Postponed** | Backend operasional pending. |
| Request Material | `/mandor/request-material` | `RequestMaterialMandorPage.jsx` | **Postponed** | Backend operasional pending. |
| Dokumentasi | `/mandor/dokumentasi` | `DokumentasiLapanganMandorPage.jsx` | **Postponed** | Backend operasional pending. |
| Kendala Lapangan | `/mandor/kendala-lapangan` | `KendalaLapanganMandorPage.jsx` | **Postponed** | Backend operasional pending. |
| Pengaturan | `/mandor/pengaturan` | `PengaturanMandorPage.jsx` | **Implemented (DB)** | Profil, Sertifikasi, & Pengalaman rill DB. |

## Komponen Terkait
- `MandorLayout.jsx`: Sidebar navigasi & Topbar khusus Mandor.
- `DashboardStats.jsx`: Widget statistik operasional harian.
- `ForemanPersonaContext.jsx`: Manajemen persona mandor di frontend.
- `foremanService.js`: Service API untuk data mandor.

## Data Source Policy
- **Source of Truth**: Seluruh data profil dan proyek utama ditarik dari database lokal.
- **No Persona Selected**: UI menampilkan `RolePersonaEmptyState` jika persona belum dipilih di Dev Mode.
- **Mock Data**: Mock data untuk Mandor hanya boleh digunakan untuk *seeding* database atau referensi struktur kode, bukan sebagai fallback dashboard/proyek/profil di UI.
- **Operational Data**: Halaman operasional (laporan harian, request material, dsb) saat ini masih bersifat placeholder/statis karena backend operasional sengaja ditunda hingga modul Project/Progress stabil.

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar Mandor.
- [x] Sinkronisasi tema Light/Dark global.
- [x] Routing lengkap (9 route aktif).
- [x] Integrasi Database-Backed v1 untuk Dashboard, Proyek, dan Profil.
- [x] Implementasi Persona Switcher khusus Mandor.

## Belum Dikerjakan
- [ ] Integrasi API Backend rill untuk Modul Operasional (Logbook, Material Requests).
- [ ] Modul Manajemen Tim Internal Mandor detail.
- [ ] Fitur Sinkronisasi Offline (PWA/Local Storage).

## Batasan Saat Ini
- **Operational Backend Pending**: Modul operasional belum terhubung ke database secara fungsional.
- **No Auth**: Belum ada sistem login/izin akses (menggunakan Persona Selector).
- **Local Dev Only**: Dioptimalkan untuk pengembangan di localhost.

## Prioritas Berikutnya
1. Stabilisasi modul Project/Stage/Progress untuk mendukung backend operasional.
2. Implementasi alur Laporan Harian (Logbook) yang terhubung ke database.
3. Modul Request Material dari sisi Mandor.
