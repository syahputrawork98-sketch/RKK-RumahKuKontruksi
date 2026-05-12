# Technical: Backend - RKK RumahKu Konstruksi

Backend RKK dibangun menggunakan **Node.js (Express)** dengan **Prisma ORM** untuk beroperasi sebagai layanan data lokal yang stabil.

## 🏗️ Arsitektur
- **Runtime**: Node.js (ES Modules).
- **Framework**: Express.js.
- **ORM**: Prisma (PostgreSQL).
- **Architecture**: Controller-Repository pattern (sebagian besar).

## 🛡️ Batasan Backend
- **No Auth Implementation**: Tidak ada validasi JWT atau session di level server pada fase ini.
- **Local File Storage**: Menggunakan middleware `multer` untuk menyimpan binary ke folder `server/uploads/`.
- **Non-Realtime**: Tidak ada dukungan WebSocket; seluruh update berbasis request-response standar.

---
*Untuk daftar endpoint rill, silakan merujuk ke [API Map](./api-map.md).*
