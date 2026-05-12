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
- **Non-Realtime**: Tidak ada dukungan WebSocket; seluruh update berbasis request-response standar.
- **No RBAC Guard**: Pengecekan role/permission di sisi server belum diimplementasikan secara ketat.
- **No Financial Production**: Tidak ada integrasi payment gateway atau sistem akuntansi legal rill.
- **Administrative Helpers**: Modul dokumen (BAST/Invoice) hanya bersifat metadata helper, bukan dokumen legal resmi atau sistem invoice production.

## 📡 API Standard Response
Seluruh response menggunakan format JSON standar:
```json
{
  "success": true,
  "message": "OK",
  "data": {},
  "meta": {}
}
```
Error Response:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [],
  "code": "ERROR_CODE"
}
```
---
*Untuk daftar endpoint rill, silakan merujuk ke [API Map](./api-map.md).*
