# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi akan menggunakan sistem mock data terpusat.

## Target Struktur
Lokasi: `client/src/data/mock/`

- `index.js`: Export utama untuk semua mock data.
- `users.js`: Data user (admin, mandor, pengawas, konsumen).
- `projects.js`: List proyek dan detailnya.
- `roles.js`: Definisi role dan permission.
- `notifications.js`: Data notifikasi (akan menggantikan mock di server/).
- `progress.js`: Data laporan progres harian/mingguan.
- `workers.js`: Data pekerja/tukang.
- `supervisors.js`: Data pengawas proyek.
- `admins.js`: Data administrator.

## Strategi Migrasi Mock
Saat ini, mock data masih tersebar di:
1. `server/services/NotificationService.js` (Sementara)
2. `server/data/dummyNotifications.js` (Sementara)
3. Hardcoded di dalam file komponen di `client/src/pages/` (Proyek, Profil)

**Action Plan**:
1. [x] Pindahkan `dummyNotifications` ke `client/src/data/mock/notifications.js`.
2. [x] Buat file `users.js` untuk mengisi data di halaman manajemen superadmin.
3. [x] Buat file `projects.js` untuk melengkapi dashboard role konsumen/admin.
4. [x] Buat file `roles.js` untuk definisi hak akses.
5. [ ] Buat file `progress.js`, `workers.js`, `supervisors.js`, `admins.js`.
6. [ ] Refactor `Proyek.jsx` dan `Profil.jsx` Konsumen agar menggunakan centralized mock data.
7. [x] Update import di komponen (Timeline & Detail) untuk merujuk ke folder mock data baru.
