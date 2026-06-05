# F09 — Backend API System

## Story
Sistem pusat yang menangani logika bisnis, validasi, rute *controller*, manipulasi data melalui repositori, serta pengolahan *request/response* secara keseluruhan.

## Status
- **Current Status**: Existing / Partial

## Scope
- Endpoint API Express.js.
- *Middleware* (Upload, Error Handling).
- Layanan Integrasi Database (Service/Repository).

## Role / Modul Terkait
- All Backend Logic

## Alur Utama
1. Frontend mengirim *request*.
2. Routing mendistribusikan ke controller berdasarkan *role/domain*.
3. Sistem memproses logika *guard* integritas (SOT).
4. Response dikembalikan secara aman.

## Data / API / Dependency Terkait
- Node.js, Express, Prisma.

## Status Implementasi Saat Ini
- *Existing / Partial*

## Risiko / Needs Verification
- *Needs Verification*: Stabilitas saat menangani beban file/gambar berjumlah besar dari mandor dan pengawas.

## API Verification (Design Request System)
- **Design Request Endpoint**: **Verified**. Telah tersedia di `server/src/modules/design-requests/` secara lengkap melingkupi fungsi CRUD dasar, pencatatan sejarah pengajuan, hingga eskalasi menuju kerangka konstruksi. Modul dilengkapi secara utuh oleh rute (`routes.js`), penengah aksi (`controller.js`), dan lapisan manipulasi basis data (`repository.js`).

## API Verification (Konsumen Project Tracking)
- **Project & Timeline Endpoint**: **Verified**. Endpoint pengambilan daftar proyek konsumen (`/projects?customerId=...`) serta pendalaman struktur proyek (`/projects/:id/stages`, `/projects/:id/rab`) tersedia dan berjalan aktif melintasi *controller* dan *repository* modul `projects`.
- **Document Hub Endpoint**: **Verified**. Layanan untuk menyajikan dokumen administratif yang telah dirilis terdapat utuh di folder `administrative-helper-documents`.

## API Verification (Operational Lapangan Pengawas & Mandor)
- **Field Reporting Endpoints**: **Verified**. Kumpulan modul pendukung seperti `daily-tasks`, `daily-reports`, `weekly-journals`, `supervisor-weekly-reports`, `material-requests`, dan `field-issues` sudah tersedia lengkap di sisi *backend* (mengandung *controller*, *routes*, dan *repository*).
- **Progress SOT (Single Source of Truth)**: **Verified**. Proses penyuntikan nilai kemajuan yang absolut (`verifiedProgress`) digawangi secara ketat melalui metode spesifik yang diizinkan melintasi otoritas rute Pengawas.

## API Verification (Superadmin & Admin Management)
- **Superadmin Governance Endpoints**: **Verified**. Modul `superadmins` dan `audit-logs` berpadu dalam menegakkan manajemen pengguna, hak akses persona, serta log aktivitas menyeluruh.
- **Admin Project Management Endpoints**: **Verified**. Rangkaian sistem `admins`, `projects`, `rab`, dan relasi `design-requests` telah dikonfigurasi guna menjamin alur persiapan pembangunan (*Project Readiness*) dan perhitungan *budgeting*.

## API Verification (Auth & Access Control)
- **Backend Auth Middleware**: **Not Verified**. Belum ditemukan implementasi *middleware* JWT, *controller* login asli, maupun gerbang otorisasi API tingkat *server*. Kontrol akses sejauh ini sepenuhnya disimulasikan secara absolut di lapisan *frontend*.

## API Verification (Report & Export)
- **Export Endpoints**: **Not Started**. Absennya penyedia API konversi data menjadi PDF di sisi *backend*. Belum terdapat layanan *generator* khusus untuk memproduksi dokumen fisik (*Report*).

## Next Step
- Penataan struktur API documentation internal.
