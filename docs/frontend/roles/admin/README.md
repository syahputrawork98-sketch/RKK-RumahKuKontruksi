# Role: Admin

## Status Umum
Role Admin saat ini dalam tahap **Shell Expanded / Mock-First**. Seluruh navigasi utama, layout bertema (Light/Dark), dan halaman shell profesional telah tersedia untuk memandu pengembangan fitur operasional.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/admin/dashboard` | `DashboardAdmin.jsx` | **Done (Mock)** | Dashboard operasional admin. |
| Manajemen Proyek | `/admin/proyek` | `ProyekAdminPage.jsx` | **Done (Mock)** | List proyek, filter, & status. |
| Detail Proyek | `/admin/proyek/:id` | `DetailProyekAdminPage.jsx` | **Done (Mock)** | Detail informasi & penugasan. |
| RAB Proyek | `/admin/rab` | `RabAdminPage.jsx` | **Done (Mock)** | Ringkasan anggaran biaya. |
| Detail RAB | `/admin/rab/:id` | `DetailRabAdminPage.jsx` | **Done (Mock)** | Struktur RAB 3-level (Plan/Cat/Item). |
| Pembayaran | `/admin/pembayaran` | `PembayaranAdminPage.jsx` | **Done (Mock)** | Validasi termin konsumen. |
| Penugasan Tim | `/admin/penugasan-tim` | `PenugasanTimAdminPage.jsx` | **Done (Mock)** | Alokasi Pengawas & Mandor. |
| Laporan Progress | `/admin/laporan-progress` | `LaporanProgressAdminPage.jsx` | **Done (Mock)** | Monitoring aktivitas lapangan. |
| Pengaturan | `/admin/pengaturan` | `PengaturanAdminPage.jsx` | **Done (Mock)** | Profil & preferensi tampilan. |

## Komponen Terkait
- `AdminLayout.jsx`: Sidebar navigasi & Topbar dengan sinkronisasi tema.
- `DashboardStats.jsx`: Widget statistik dashboard.

## Data / Mock Data (Mock-First)
- **Projects**: Data simulasi status (Persiapan, Pengerjaan, Finishing, Terhenti).
- **RAB Management**: Admin mengelola struktur RAB 3 tingkat sesuai skema backend v0.
- **Relasi Staff**: Penugasan mitra (Mandor) dan staff internal (Pengawas).

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar lengkap (7 menu utama).
- [x] Sinkronisasi tema Light/Dark dengan Superadmin.
- [x] Routing lengkap (10+ route aktif).
- [x] Halaman shell profesional untuk seluruh modul Admin.

## Belum Dikerjakan
- [ ] Integrasi rill dengan API Backend v0 (Project List, Customer List).
- [ ] Fitur Create Proyek yang terhubung ke Database.
- [ ] Fitur Approval Pembayaran rill.

## Prioritas Berikutnya
1. Integrasi API `GET /api/projects` pada halaman Manajemen Proyek.
2. Implementasi `POST /api/projects` pada form Buat Proyek.
3. Sinkronisasi data RAB dengan API `GET /api/projects/:id/rab`.
