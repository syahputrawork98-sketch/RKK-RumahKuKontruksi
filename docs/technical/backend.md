# Technical: Backend - RKK RumahKu Konstruksi

Backend RKK dibangun menggunakan **Node.js (Express)** dengan **Prisma ORM** untuk beroperasi sebagai layanan data lokal yang stabil.

## 🏗️ Arsitektur
- **Runtime**: Node.js (ES Modules).
- **Framework**: Express.js.
- **ORM**: Prisma (PostgreSQL).
- **Architecture**: Modular Monolith (Controller-Repository pattern).
- **Internal Pattern**: `routes` -> `controller` -> `service` -> `repository`.

## 🛡️ Batasan Backend
- **No Auth Implementation**: Tidak ada validasi JWT atau session di level server pada fase ini.
- **Local File Storage**: Menggunakan middleware `multer` untuk menyimpan binary ke folder `server/uploads/`.
- **Business Logic Layer**: Penanganan transisi status kritis (e.g., Project lifecycle, Design flow). Hard guards ditambahkan pada Batch 91 untuk Field Issue dan Helper Documents.
- **Reporting & Stats Engine**: Agregasi data operasional lokal untuk dashboard manajerial (Batch 93).
- **Payment Flow Bridge (Batch 107–110)**: Integrasi alur penagihan dan pembayaran menggunakan `PaymentRecord`, `CustomerPaymentPlan`, dan `ForemanWeeklyPaymentEligibility`.

## 🛡️ Aturan Integritas Data (Guards)
1. **Field Issue Guard**: Status `closed` hanya valid jika status sebelumnya adalah `resolved`.
2. **Helper Documents Guard**: Transisi status wajib mengikuti alur `draft` -> `reviewed` -> `released`.
3. **Progress SOT Guard**: Perubahan `Project.verifiedProgress` hanya diizinkan melalui modul verifikasi pengawas.
4. **Payment Status Mapping**:
   - `PaymentRecord`: `pending`, `paid`, `verified`, `rejected`.
   - `ForemanWeeklyPaymentEligibility`: `pending_review`, `eligible`, `partial`, `hold`, `correction_required`, `paid_simulated`.
   - `AdministrativeHelperDocument` (INVOICE): `draft`, `reviewed`, `released`.

## 📡 API Services & Data Fetching
Semua request menggunakan `apiClient.js` (frontend) yang menghubungi Express API secara lokal. Response handling diperkuat pada Batch 99 & 110 untuk menangani data kosong dan null-safety secara aman.

---
*Untuk daftar endpoint lengkap, silakan merujuk ke [API Map](./api-map.md).*
*Terakhir diperbarui: Batch 111.*
