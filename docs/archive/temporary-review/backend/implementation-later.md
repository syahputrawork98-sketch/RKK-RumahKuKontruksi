# Implementation Notice

Dokumen ini berfungsi sebagai pengingat kebijakan pengembangan backend pada repository ini.

## Status Eksekusi
**Penting**: Backend **BELUM BOLEH** dieksekusi atau dibuat kodenya sekarang.

## Keputusan Stack Final
Backend telah diputuskan menggunakan:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **ORM**: Prisma ORM
- **Architecture**: Modular Monolith

**Catatan Framework**: 
- **Bukan Next.js**: RKK menggunakan Vite untuk frontend dan Express untuk backend secara terpisah.
- **Bukan NestJS**: Diputuskan menggunakan Express agar lebih ringan dan konsisten dengan stack frontend JSX.

## Alasan Penundaan
1. **Frontend Priority**: Fokus utama saat ini adalah penyelesaian UI/UX untuk seluruh role.
2. **Mock Data Maturity**: Frontend harus memiliki struktur Mock Data yang matang sebagai acuan skema API.

## Kapan Backend Dimulai?
Pengembangan backend (Phase 1) akan dimulai setelah kondisi berikut terpenuhi:
- Seluruh halaman dashboard role selesai secara UI.
- Halaman manajemen Superadmin terisi data fungsional (minimal mock).
- Terdapat instruksi eksplisit untuk memulai implementasi server.

## Larangan
- Jangan mengubah isi folder `server/` menjadi aplikasi backend (Express) dulu.
- Jangan menginstal dependensi backend (Express, Prisma, dll).
- Jangan membuat database atau skema Prisma fisik.
