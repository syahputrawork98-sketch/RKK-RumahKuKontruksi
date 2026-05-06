# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi menggunakan sistem mock data terpusat sebagai *single source of truth*.

## Struktur Terimplementasi
Lokasi: `client/src/data/mock/`

| Mock Table | File | Status | Deskripsi |
|---|---|---|---|
| Users | `users.js` | **Updated** | Akun dasar semua role |
| Roles | `roles.js` | **Updated** | Definisi label dan permission role |
| Customers | `customers.js` | **Done** | Profil konsumen (Individual & Company) |
| RAB Plan | `rabPlans.js` | **Done** | Dokumen header RAB (Level 1) |
| RAB Category | `rabCategories.js` | **Done** | Kelompok pekerjaan (Level 2) |
| RAB Item | `rabItems.js` | **Updated** | Detail pekerjaan (Level 3) |
| Admins | `admins.js` | **Done** | Profil admin (Kapasitas: 3 proyek) |
| Supervisors | `supervisors.js` | **Done** | Profil pengawas (Kapasitas: 3 proyek) |
| Foremen | `foremen.js` | **Updated** | Mandor sebagai Vendor Lapangan (Kapasitas: 2) |
| Projects | `projects.js` | **Updated** | Data proyek utama |
| Project Stages | `projectStages.js` | **Updated** | Tahapan timeline tersinkron RAB |
| Notifications | `notifications.js` | **Done** | Notifikasi tertarget |

## Struktur RAB 3 Tingkat
1.  **RAB Plan**: Mewakili dokumen/header RAB untuk satu proyek tertentu.
2.  **RAB Category**: Kelompok pekerjaan besar (Persiapan, Struktur, Dinding, dll).
3.  **RAB Item**: Rincian pekerjaan detail lengkap dengan volume, satuan, dan harga.

## Relasi Data Utama
*   `Project` (1) <-> (1) `RAB Plan`
*   `RAB Plan` (1) <-> (N) `RAB Categories`
*   `RAB Category` (1) <-> (N) `RAB Items`
*   `Project Stage` (1) <-> (1) `RAB Category` (untuk sinkronisasi timeline)

---
*Terakhir diperbarui: 7 Mei 2026*
