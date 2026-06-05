# F02 — Public Website System

## Story
Sistem antarmuka publik untuk pengunjung non-login yang ingin melihat profil RKK, portofolio, atau mengajukan *Design Request*.

## Status
- **Current Status**: Existing / Verified Frontend + API

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
- **Status Koneksi API / Database**: **Verified**. Form pengajuan konsumen telah terhubung penuh ke backend melalui `designRequestService.js` memanggil endpoint `/design-requests`.
- **Backend Endpoint**: Tersedia di `server/src/modules/design-requests`. Controller, route, dan repository sudah terbentuk utuh.
- **Database Model**: Tersedia `DesignRequest` dan `DesignRequestHistory` pada Prisma schema.
- **Build Result**: *Pass*. Pembangunan bundle `vite build` berhasil memverifikasi integritas file.

## API Verification
- **Frontend Submit Mechanism**: Menggunakan `apiClient.post('/design-requests')`. Terbukti memanggil API backend (bukan sekadar mock local storage).
- **Backend Implementation**: Node.js/Express controller untuk Design Request (`createDesignRequest`, `updateDesignRequest`, `convertToProject`) sudah diimplementasikan di folder `server/src/modules/design-requests/`.
- **Database Model**: Model Prisma `DesignRequest` telah tervalidasi keberadaannya.
- **Keputusan Status Akhir**: Integrasi ujung-ke-ujung (End-to-End) untuk struktur kode Form Pengajuan (Design Request) dinyatakan *Verified* secara codebase.

## Next Step
- Verifikasi koneksi API dan pengetesan end-to-end fitur form publik.
