# Current State Frontend

## Status Umum
Frontend telah berhasil dimigrasikan dari `RumahKuKontruksi-Dev/client` ke dalam folder `client/` repository utama. Aplikasi berjalan stabil menggunakan Vite.

## Konfigurasi Saat Ini
- **Sumber**: `RumahKuKontruksi-Dev/client`
- **Role Terimplementasi**: Guest, Konsumen, Superadmin, Admin, Pengawas, Mandor.
- **Backend Sync**: Belum terhubung (masih menggunakan mock data).

## Masalah Besar Saat Ini
1. **Dashboard Kosong**: Dashboard untuk role Admin, Pengawas, dan Mandor masih berupa "shell" kosong tanpa konten fungsional.
2. **Data Tersebar**: Data mock masih tersebar di berbagai file atau di-hardcode langsung di komponen.
3. **Responsive Navbar**: Navbar guest masih memiliki masalah breakpoint (hamburger menu muncul di desktop).
4. **Mock Import**: Beberapa file layout mengimpor mock notification dari direktori `server/` (di luar `client/`), yang perlu dipindahkan ke dalam `client/src/data/mock/`.

## Ringkasan Per Role
- **Guest**: Halaman Home, About, dan Contact sudah ada namun perlu polesan UI.
- **Konsumen**: Fitur Timeline Proyek sudah memiliki data mock yang cukup baik.
- **Superadmin**: Struktur manajemen data (Admin, Mandor, Pengawas) sudah ada namun datanya masih kosong/hardcoded.
- **Admin/Pengawas/Mandor**: Hanya berupa halaman dashboard awal (Welcome message saja).
