# F02 — Public Website System

## Story
Sistem antarmuka publik untuk pengunjung non-login yang ingin melihat profil RKK, portofolio, atau mengajukan *Design Request*.

## Status
- **Current Status**: Existing / Verified Frontend

## Scope
- Halaman *Landing Page* publik.
- Pengajuan *Design Request* awal.
- Routing pengunjung non-otentikasi.

## Role / Modul Terkait
- Publik / Guest

## Alur Utama
1. Publik mengakses website utama.
2. Publik dapat membaca portofolio.
3. Publik dapat mengisi form pengajuan proyek baru (Design Request).

## Data / API / Dependency Terkait
- Frontend public routes.

## Status Implementasi Saat Ini
- *Existing / Partial* (Frontend sudah ada, tapi integrasi penuh belum divalidasi).

## Risiko / Needs Verification
- *Needs Verification*: Perlu mengecek apakah form *Design Request* publik sudah benar-benar terhubung ke backend dan database.

## Codebase Verification
- **Route / Component Ditemukan**: Komponen publik seperti `Home`, `Layanan`, `CaraKerja`, `ProyekGuest`, `About`, `Contact`, dan `SignInPage` tersedia pada rute utama dan terbungkus oleh `MainLayout`.
- **Status Public Landing Page**: Tersedia dan dirender pada rute `/`.
- **Status Design Request Entry Point**: Rute pengajuan desain untuk konsumen ditemukan pada path `/konsumen/permintaan-desain` dengan menggunakan komponen `DesignRequestCustomerPage`.
- **Status Koneksi API / Database**: Secara antarmuka komponen tersedia, namun integrasi API dan fungsi kirim data secara keseluruhan masuk dalam status *Needs Verification* lebih lanjut (karena batch ini fokus pada kerangka frontend).
- **Build Result**: *Pass*. Pembangunan bundle `vite build` berhasil memverifikasi integritas file.

## Next Step
- Verifikasi koneksi API dan pengetesan end-to-end fitur form publik.
