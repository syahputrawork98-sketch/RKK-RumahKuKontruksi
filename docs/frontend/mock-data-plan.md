# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi menggunakan sistem mock data terpusat sebagai *single source of truth*.

## Struktur Terimplementasi
Lokasi: `client/src/data/mock/`

| Mock Table | File | Status | Deskripsi |
|---|---|---|---|
| Users | `users.js` | **Done** | Akun dasar semua role (ID: `user-role-00x`) |
| Roles | `roles.js` | **Done** | Definisi label, deskripsi, dan permission role |
| Customers | `customers.js` | **Done** | Profil detail konsumen |
| Admins | `admins.js` | **Done** | Profil admin (Kapasitas: 3 proyek) |
| Supervisors | `supervisors.js` | **Done** | Profil pengawas (Kapasitas: 3 proyek) |
| Supervisor Certs | `supervisorCertificates.js`| **Done** | Sertifikat pengawas terpisah |
| Foremen | `foremen.js` | **Done** | Profil mandor (Kapasitas: 2 proyek) |
| Foreman Certs | `foremanCertificates.js` | **Done** | Sertifikat mandor terpisah |
| Workers | `workers.js` | **Done** | Data tukang dan absensi |
| Projects | `projects.js` | **Done** | Data proyek utama |
| Project Stages | `projectStages.js` | **Done** | Tahapan pekerjaan |
| RAB Items | `rabItems.js` | **Done** | Rincian biaya per tahap |
| Notifications | `notifications.js` | **Done** | Notifikasi tertarget |

## Skema Kapasitas Staf
*   **Admin**: Maksimal **3 proyek aktif**.
*   **Pengawas**: Maksimal **3 proyek aktif**.
*   **Mandor**: Maksimal **2 proyek aktif**.

## Pemisahan Sertifikat
Sertifikat untuk **Mandor** dan **Pengawas** dipisahkan ke file `.js` tersendiri untuk menjaga kebersihan data profil utama. Admin tidak memiliki tabel sertifikat.

## Relasi Data Utama
*   `User` (1) <-> (1) `Profile` (Customer/Admin/Staff)
*   `Project` (1) <-> (N) `Project Stages`
*   `Project Stage` (1) <-> (N) `RAB Items`
*   `Profile` (1) <-> (N) `Certificates` (Hanya Mandor & Pengawas)

---
*Terakhir diperbarui: 7 Mei 2026*
