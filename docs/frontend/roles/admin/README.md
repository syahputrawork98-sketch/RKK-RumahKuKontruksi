# Role: Admin

## Status Umum
Role Admin saat ini masih berupa **Shell**. Layout dasar sudah tersedia, namun fitur operasional seperti manajemen proyek dan approval pembayaran belum diimplementasikan.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/admin/dashboard` | `DashboardAdmin.jsx` | **Shell** | Placeholder dashboard. |

## Komponen Terkait
- `AdminLayout.jsx`: Sidebar navigasi admin.

## Data / Mock Data
- **Admin Table**: Menggunakan `mockAdmins` di `src/data/mock/admins.js`.
- **Kapasitas**: Setiap admin dibatasi menangani maksimal **3 proyek**.
- **Relasi**: Penugasan proyek dilakukan melalui `assignedProjectIds` pada profil admin.

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar.
- [x] Routing dasar.

## Belum Dikerjakan
- [ ] Manajemen Proyek (Create, Update status proyek global).
- [ ] Approval Pembayaran (Validasi pembayaran dari konsumen).
- [ ] Penugasan Tim (Assign pengawas dan mandor ke proyek).

## Prioritas Berikutnya
1. Membuat list proyek yang bisa dikelola oleh admin.
2. Membuat tampilan "Project Creation" untuk mendaftarkan proyek baru.
