# Catatan Teknis Backend RKK

Folder ini dikhususkan untuk dokumentasi terkait pengembangan backend API proyek RKK.

## Arsitektur Utama
- Backend API RKK berada di direktori `server/`.
- Dibangun menggunakan **Node.js** dan framework **Express**.
- Struktur modular mengikuti pola: `routes` -> `controller` -> `service` -> `repository`.
- Integrasi Database menggunakan **Prisma ORM** yang terkoneksi dengan **PostgreSQL**.
- Pengelolaan file lokal (*local file upload*) ditangani melalui library **Multer**.

## Pemetaan API (API Map Level Tinggi)
Mengatur endpoint terpisah untuk setiap konteks operasi:
- `/api/project`
- `/api/admin`
- `/api/pengawas`
- `/api/mandor`
- Dan routing khusus untuk *file uploads* maupun *auth simulation*.

## Kebijakan & Data Integrity
- **Autentikasi Lokal**: Saat ini masih berada pada *local mode* atau simulasi role (tanpa *real JWT auth* untuk produksi). Batasan ini perlu dicabut saat migrasi ke fase produksi.
- **Progress Source of Truth (SOT)**: Progres proyek selalu mengacu pada `Project.verifiedProgress`.
- **Field Issue Guard**: Pencegahan eskalasi issue jika belum ditangani secara prosedural.
- **Helper Documents Guard**: Penjagaan konsistensi lampiran dokumen.
- **Payment Status Mapping**: Validasi status pembayaran harus selaras antara frontend dan backend.

## Aturan Pengembangan
- Dokumentasi spesifikasi request/response API detail akan dirinci pada batch khusus.
- Hindari menyentuh file fungsionalitas lain ketika sedang mengerjakan perbaikan spesifik di satu endpoint.
