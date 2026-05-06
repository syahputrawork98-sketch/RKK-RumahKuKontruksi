# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi menggunakan sistem mock data terpusat sebagai *single source of truth*.

## Struktur Terimplementasi
Lokasi: `client/src/data/mock/`

| Mock Table | File | Status | Deskripsi |
|---|---|---|---|
| Users | `users.js` | **Done** | Akun dasar semua role (ID: `user-role-00x`) |
| Roles | `roles.js` | **Done** | Definisi label, deskripsi, dan permission role |
| Customers | `customers.js` | **Done** | Profil detail konsumen (Relasi ke `users`) |
| Admins | `admins.js` | **Done** | Profil staf admin pusat |
| Supervisors | `supervisors.js` | **Done** | Profil pengawas lapangan |
| Foremen | `foremen.js` | **Done** | Profil mandor proyek |
| Workers | `workers.js` | **Done** | Data tukang dan absensi harian |
| Projects | `projects.js` | **Done** | Data proyek utama (ID: `project-00x`) |
| Project Stages | `projectStages.js` | **Done** | Tahapan pekerjaan (Relasi ke `projects`) |
| RAB Items | `rabItems.js` | **Done** | Rincian biaya per tahap (Relasi ke `projectStages`) |
| Notifications | `notifications.js` | **Done** | Notifikasi tertarget per user/role |

## Relasi Data
*   `User` (1) <-> (1) `Profile` (Customer/Admin/Staff)
*   `Project` (1) <-> (N) `Project Stages`
*   `Project Stage` (1) <-> (N) `RAB Items`
*   `Project` (1) <-> (1) `Customer`, `Admin`, `Supervisor`, `Foreman`

## Strategi Refactoring (Ongoing)
1.  **Backward Compatibility**: File `projects.js` tetap mengekspor `activeCustomerProject` untuk mendukung komponen yang belum direfaktorisasi.
2.  **Next Steps**: 
    *   Refactor `Proyek.jsx` Konsumen untuk mengambil data dari `mockProjects`.
    *   Refactor `Profil.jsx` Konsumen untuk mengambil data dari `mockCustomers` / `mockUsers`.

---
*Terakhir diperbarui: 7 Mei 2026*
