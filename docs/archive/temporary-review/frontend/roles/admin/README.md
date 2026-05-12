# Role: Admin

## Status Umum
Role Admin saat ini dalam tahap **DB-Backed v1**. Seluruh navigasi utama, dashboard, manajemen proyek, dan penugasan tim telah terintegrasi dengan database lokal (PostgreSQL) melalui API Backend.

## Fungsi Utama Role
Admin bertanggung jawab atas manajemen operasional proyek konstruksi secara menyeluruh, mulai dari inisialisasi proyek, penugasan tim lapangan (Pengawas & Mandor), hingga monitoring progres dan anggaran (RAB).

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/admin/dashboard` | `DashboardAdmin.jsx` | **DB-Backed v1** | Statistik rill dari database. |
| Manajemen Proyek | `/admin/proyek` | `ProyekAdminPage.jsx` | **DB-Backed v1** | List proyek rill. |
| Detail Proyek | `/admin/proyek/:id` | `DetailProyekAdminPage.jsx` | **DB-Backed v1** | Detail & penugasan rill. |
| Buat Proyek | `/admin/proyek/create` | `CreateProyekAdminPage.jsx` | **DB-Backed v1** | Submit data ke database. |
| RAB Proyek | `/admin/rab` | `RabAdminPage.jsx` | **DB-Backed v1** | List RAB rill. |
| Detail RAB | `/admin/rab/:id` | `DetailRabAdminPage.jsx` | **DB-Backed v1** | Read-first dari database. |
| Penugasan Tim | `/admin/penugasan-tim` | `PenugasanTimAdminPage.jsx` | **DB-Backed v1** | Alokasi Pengawas & Mandor rill. |
| Pembayaran | `/admin/pembayaran` | `PembayaranAdminPage.jsx` | **Shell / Pending** | Manajemen termin konsumen (Operational Pending). |
| Laporan Progress | `/admin/laporan-progress` | `LaporanProgressAdminPage.jsx` | **Shell / Pending** | Monitoring progres (Operational Pending). |
| Request Material | `/admin/request-material`| `RequestMaterialAdminPage.jsx`| **Experimental** | Terhubung ke MR Backend Draft. |
| Pengaturan | `/admin/pengaturan` | `PengaturanAdminPage.jsx` | **DB-Backed v1** | Profil admin dari database. |

## Komponen Terkait
- `AdminLayout.jsx`: Sidebar navigasi & Topbar dengan sinkronisasi tema.
- `DashboardStats.jsx`: Widget statistik dashboard.

## Data / Mock Data (Mock-First)
- **Projects**: Data simulasi status (Persiapan, Pengerjaan, Finishing, Terhenti).
- **RAB Management**: Admin mengelola struktur RAB 3 tingkat sesuai skema backend v0.
- **Relasi Staff**: Penugasan mitra (Mandor) dan staff internal (Pengawas).

## Sudah Dikerjakan
- [x] Struktur navigasi dropdown-based (Proyek, Tim, Keuangan).
- [x] Integrasi Dashboard dengan statistik database rill.
- [x] CRUD Proyek (List, Detail, Create) terkoneksi ke Backend.
- [x] Manajemen Penugasan Tim terkoneksi ke Database.
- [x] Read-First RAB dari Database.

## Belum Dikerjakan / Postponed
- [ ] Validasi Pembayaran rill (Menunggu modul Keuangan stabil).
- [ ] Sinkronisasi Laporan Progress rill (Menunggu modul Lapangan stabil).
- [ ] Alur approval RAB (Workflow approval).

## Batasan Saat Ini
- **Operational CRUD Pending**: Modul mendalam seperti input progress harian dan detail transaksi pembayaran masih menggunakan shell/mock sesuai kebijakan postponement.
- **No Auth**: Masih menggunakan Dev Switcher untuk akses.
