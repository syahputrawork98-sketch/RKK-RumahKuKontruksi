# Role: Superadmin

## Status Umum
Role Superadmin sudah memiliki struktur navigasi dan manajemen data dasar (Admin, Pengawas, Mandor). Fokus saat ini adalah pengisian data mock agar tabel tidak terlihat kosong dan penambahan fitur statistik global.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/superadmin/dashboard` | `DashboardSuperadmin.jsx` | **Partial** | Perlu widget statistik tambahan. |
| Data Admin | `/superadmin/data-admin` | `DataAdminPage.jsx` | **Shell** | Tabel manajemen admin. |
| Data Pengawas | `/superadmin/data-pengawas` | `DataPengawasPage.jsx` | **Shell** | Tabel manajemen pengawas. |
| Data Mandor | `/superadmin/data-mandor` | `DataMandorPage.jsx` | **Shell** | Tabel manajemen mandor. |

## Komponen Terkait
- `SuperAdminLayout.jsx`: Sidebar dengan akses penuh ke manajemen user.

## Data / Mock Data
- **Centralized Staff Tables**: Menggunakan `mockAdmins`, `mockSupervisors`, dan `mockForemen`.
- **Mandor as Vendor**: Mandor dikelola sebagai vendor lapangan eksternal. Data tukang individu tidak lagi dikelola oleh RKK (hanya `teamSummary`).
- **Separated Certificates**: Sertifikat Pengawas dan Mandor dikelola dalam tabel terpisah.

## Sudah Dikerjakan
- [x] Struktur layout dengan sidebar dan header.
- [x] Routing dasar untuk semua manajemen entitas.
- [x] Tampilan tabel awal.

## Belum Dikerjakan
- [ ] Form Create/Update untuk data admin, pengawas, dan mandor.
- [ ] Fitur aktivasi/deaktivasi akun user.
- [ ] Visualisasi grafik pertumbuhan proyek di dashboard.

## Prioritas Berikutnya
1. Implementasi CRUD modal/page untuk manajemen staff.
2. Sinkronisasi data mock staf agar selaras dengan data tim di `projects.js`.
