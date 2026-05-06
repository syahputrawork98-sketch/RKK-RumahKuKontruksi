# Next Actions - Frontend Development

Daftar prioritas pekerjaan berikutnya untuk tim frontend RKK.

## Prioritas 1: Sinkronisasi & Sentralisasi Mock Data (Single Source of Truth)
*   **Refactor Halaman Konsumen**: Memindahkan data hardcoded dari `Proyek.jsx` dan `Profil.jsx` ke dalam `client/src/data/mock/projects.js` dan `users.js`.
*   **Lengkapi Mock Data**: Membuat file `progress.js`, `workers.js`, `supervisors.js`, dan `admins.js` di folder `client/src/data/mock/`.
*   **Pembersihan Import**: Memastikan semua komponen merujuk ke folder mock data yang baru.

## Prioritas 2: Dashboard Operasional & Staf (Admin, Pengawas, Mandor)
*   **Dashboard Admin**: Membuat tampilan manajemen proyek pusat.
*   **Form Verifikasi Pengawas**: Mengembangkan antarmuka verifikasi tahapan yang sinkron dengan timeline konsumen.
*   **Logbook Mandor**: Membuat antarmuka laporan harian mandor.

## Prioritas 3: Refactoring & Optimasi
*   **Pembersihan Mock Data**: Memastikan semua komponen menggunakan data dari `src/data/mock/projects.js` dan menghapus file-file mock individual yang redundan.
*   **Interactive Modals**: Memperbaiki interaksi modal (seperti modal login atau modal verifikasi) agar memiliki transisi yang lebih halus menggunakan Framer Motion.

## Prioritas 4: Dokumentasi Lanjutan
*   **Component Inventory**: Mendokumentasikan komponen-komponen reusable yang sudah dibuat (Card, Badge, Table, Button) agar bisa digunakan dengan mudah oleh pengembang lain.

---
*Last Updated: 7 Mei 2026*
