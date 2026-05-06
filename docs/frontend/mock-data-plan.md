# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi menggunakan sistem mock data terpusat sebagai *single source of truth*.

## Struktur Terimplementasi
Lokasi: `client/src/data/mock/`

| Mock Table | File | Status | Deskripsi |
|---|---|---|---|
| Users | `users.js` | **Audit Done** | Akun dasar semua role |
| Roles | `roles.js` | **Audit Done** | Definisi label dan permission role |
| Customers | `customers.js` | **Audit Done** | Profil konsumen (Individual & Company) |
| RAB Plan | `rabPlans.js` | **Audit Done** | Dokumen header RAB (Level 1) |
| RAB Category | `rabCategories.js` | **Audit Done** | Kelompok pekerjaan (Level 2) |
| RAB Item | `rabItems.js` | **Audit Done** | Detail pekerjaan (Level 3) |
| Admins | `admins.js` | **Audit Done** | Profil admin (Kapasitas: 3 proyek) |
| Supervisors | `supervisors.js` | **Audit Done** | Profil pengawas (Kapasitas: 3 proyek) |
| Foremen | `foremen.js` | **Audit Done** | Mandor sebagai Vendor Lapangan (Kapasitas: 2) |
| Projects | `projects.js` | **Audit Done** | Data proyek utama |
| Project Stages | `projectStages.js` | **Audit Done** | Tahapan timeline tersinkron RAB |
| Notifications | `notifications.js` | **Done** | Notifikasi tertarget |

## Aturan Konsistensi Relasi
*   **Capacity Limit**: Admin (3), Pengawas (3), Mandor (2).
*   **Mandor as Vendor**: Tidak mengelola tukang/worker detail. Permission `manage_workers` ditiadakan.
*   **RAB Integrity**: Subtotal Category harus cocok dengan total Item, atau diberi flag `isPlaceholder`.
*   **User Sync**: Setiap profil (Customer/Staff) wajib memiliki user entry yang valid di `users.js`.

## Struktur RAB 3 Tingkat
1.  **RAB Plan**: Mewakili dokumen/header RAB untuk satu proyek tertentu.
2.  **RAB Category**: Kelompok pekerjaan besar (Persiapan, Struktur, Dinding, dll).
3.  **RAB Item**: Rincian pekerjaan detail lengkap dengan volume, satuan, dan harga.

---
*Terakhir diperbarui: 7 Mei 2026*
