# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi menggunakan sistem mock data terpusat sebagai *single source of truth*.

## Struktur Terimplementasi
Lokasi: `client/src/data/mock/`

| Mock Table | File | Status | Deskripsi |
|---|---|---|---|
| Users | `users.js` | **Updated** | Akun dasar semua role (termasuk `customer_viewer`) |
| Roles | `roles.js` | **Updated** | Definisi label dan permission role |
| Customers | `customers.js` | **Done** | Profil konsumen (Individual & Company) |
| Customer Members | `customerProjectMembers.js`| **Done** | Akun tambahan/viewer pihak konsumen |
| Project Comments | `projectComments.js` | **Done** | Komentar/diskusi pada proyek |
| Admins | `admins.js` | **Done** | Profil admin (Kapasitas: 3 proyek) |
| Supervisors | `supervisors.js` | **Done** | Profil pengawas (Kapasitas: 3 proyek) |
| Foremen | `foremen.js` | **Done** | Profil mandor (Kapasitas: 2 proyek) |
| Workers | `workers.js` | **Done** | Data tukang dan absensi |
| Projects | `projects.js` | **Updated** | Data proyek utama dengan banyak relasi |
| Notifications | `notifications.js` | **Done** | Notifikasi tertarget |

## Skema Konsumen & Viewer
*   **Konsumen**: Bisa berupa perorangan atau perusahaan. Satu konsumen bisa memiliki banyak proyek.
*   **Customer Viewer**: Role khusus untuk pihak konsumen (keluarga, konsultan, staff finance) yang hanya memiliki akses baca dan komentar terbatas.
*   **Project Members**: Menghubungkan user `customer_viewer` ke proyek tertentu milik konsumen utama.

## Relasi Data Utama
*   `User` (1) <-> (1) `Profile` (Customer/Admin/Staff)
*   `Project` (1) <-> (N) `Project Stages`
*   `Project` (1) <-> (N) `Project Comments`
*   `Project` (1) <-> (N) `Customer Members`

---
*Terakhir diperbarui: 7 Mei 2026*
