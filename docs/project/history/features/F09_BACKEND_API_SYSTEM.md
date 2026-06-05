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

## Next Step
- Penataan struktur API documentation internal.
