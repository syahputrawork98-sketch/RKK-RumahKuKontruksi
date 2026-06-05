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
- *Verified Frontend + API* (Frontend sudah terhubung secara penuh ke backend/database).

## Codebase Verification
- **Route / Component Ditemukan**: Komponen publik seperti `Home`, `Layanan`, `CaraKerja`, `ProyekGuest`, `About`, `Contact`, dan `SignInPage` tersedia pada rute utama dan terbungkus oleh `MainLayout`.
- **Status Public Landing Page**: Tersedia dan dirender pada rute `/`.
- **Status Navigasi dan CTA**: Call-To-Action (CTA) di halaman publik telah diverifikasi mengarah pada path yang aktif (seperti `/contact`, `/layanan`, `/cara-kerja`, `/proyek`).
- **Status Portofolio / Proyek Guest**: Halaman `/proyek` diverifikasi masih menampilkan data statis (mock/showcase) sebagai *public showcase* (sesuai spesifikasi frontend-only tanpa paparan data operasional sensitif).
- **Status Design Request Entry Point**: Rute pengajuan desain untuk konsumen ditemukan pada path `/konsumen/permintaan-desain` (dan alias lama `/konsumen/design-request` turut dikelola) dengan menggunakan komponen `DesignRequestCustomerPage`.
- **Status Koneksi API / Database**: **Verified**. Form pengajuan konsumen telah terhubung penuh ke backend melalui `designRequestService.js` memanggil endpoint `/design-requests`.
- **Backend Endpoint**: Tersedia di `server/src/modules/design-requests`. Controller, route, dan repository sudah terbentuk utuh.
- **Database Model**: Tersedia `DesignRequest` dan `DesignRequestHistory` pada Prisma schema.
- **Build Result**: *Pass*. Pembangunan bundle `vite build` berhasil memverifikasi integritas file.

## API Verification
- **Frontend Submit Mechanism**: Menggunakan `apiClient.post('/design-requests')`. Payload yang dikirim mencakup field `title`, `description` (yang berisi gabungan *structured brief*), `buildingType`, `location`, `estimatedBudget`, dan `customerId`.
- **Backend Implementation**: Node.js/Express controller untuk Design Request (`createDesignRequest`) telah terimplementasi di `server/src/modules/design-requests/` dan mengekstrak *payload* yang sesuai.
- **Database Model**: Model Prisma `DesignRequest` sepenuhnya mendukung entri field inti. *Structured brief* sengaja dikonversi ke format narasi Markdown pada atribut `description` di area *client* sebelum *submit*, yang merupakan standar praktek efisien untuk data simulasi/MVP.
- **Keputusan Status Akhir**: Integrasi ujung-ke-ujung (End-to-End) dari komponen antarmuka hingga penulisan Prisma dinyatakan *Verified Frontend + API*.

## Next Step
- Mengimplementasikan sistem otentikasi nyata (jika sistem saat ini masih sebatas *mock/persona-based*).
