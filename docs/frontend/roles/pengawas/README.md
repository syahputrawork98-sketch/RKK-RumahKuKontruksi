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
| Detail Proyek | `/pengawas/proyek/:id` | `DetailProyekDiawasiPengawasPage.jsx` | **Done (Mock)** | Masih dalam tahap mock-first untuk detail teknis. |
| Verifikasi Progres | `/pengawas/verifikasi-progres` | `VerifikasiProgresPengawasPage.jsx` | **Done (Mock)** | Validasi capaian progres dari Mandor. |
| Dokumentasi | `/pengawas/dokumentasi` | `DokumentasiLapanganPengawasPage.jsx` | **Done (Mock)** | Galeri foto bukti fisik lapangan. |
| Laporan Mingguan | `/pengawas/laporan-mingguan` | `LaporanMingguanPengawasPage.jsx` | **Done (Mock)** | Monitoring kepatuhan pelaporan periodik. |
| Request Material | `/pengawas/request-material` | `RequestMaterialPengawasPage.jsx` | **Done (Mock)** | Monitoring permintaan logistik proyek. |
| Pengaturan | `/pengawas/pengaturan` | `PengaturanPengawasPage.jsx` | **Implemented (DB)** | CRUD Profil, Sertifikasi, & Pengalaman rill DB. |

## Komponen Terkait
- `PengawasLayout.jsx`: Sidebar navigasi & Topbar khusus Pengawas.
- `DashboardStats.jsx`: Widget statistik progres lapangan.

## Data / Mock Data (Mock-First)
- **Project Monitoring**: Fokus pada status `active`, `needs_verification`, dan `delayed`.
- **Verification Workflow**: Alur validasi dari pengajuan Mandor sebelum masuk ke sistem Admin/Konsumen.
- **Field Documentation**: Sinkronisasi foto lapangan per tahapan pengerjaan.

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar Pengawas.
- [x] Sinkronisasi tema Light/Dark global.
- [x] Routing lengkap (8 route aktif).
- [x] Halaman shell profesional untuk seluruh modul Pengawas.

## Belum Dikerjakan
- [ ] Integrasi API Backend rill (Progress Verification, Reports).
- [ ] Sistem Checklist Pekerjaan rill per tahapan.
- [ ] Fitur Sinkronisasi dengan Timeline Konsumen rill.

## Batasan Saat Ini
- **UI-Only / Mock-First**: Seluruh data dan aksi masih bersifat simulasi.
- **No Auth**: Belum ada sistem login/izin akses.
- **Backend v0**: Data belum sinkron dengan database rill.

## Prioritas Berikutnya
1. Implementasi alur Verifikasi Progres yang terhubung dengan database.
2. Modul Checklist Detail untuk setiap tahapan pekerjaan.
3. Form pembuatan Laporan Mingguan otomatis.
