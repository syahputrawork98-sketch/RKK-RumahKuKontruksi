# Implementation Notice

Dokumen ini berfungsi sebagai pengingat kebijakan pengembangan backend pada repository ini.

## Status Eksekusi
**Penting**: Backend **BELUM BOLEH** dieksekusi atau dibuat kodenya sekarang.

## Alasan Penundaan
1. **Frontend Priority**: Fokus utama saat ini adalah penyelesaian UI/UX untuk seluruh role (Superadmin, Admin, Pengawas, Mandor, Konsumen).
2. **Mock Data Maturity**: Frontend harus memiliki struktur Mock Data yang matang dan terpusat terlebih dahulu sebagai acuan skema API.
3. **Requirement Validation**: Blueprint ini perlu divalidasi kembali setelah seluruh alur UI/UX dianggap final.

## Kapan Backend Dimulai?
Pengembangan backend (Phase 1) akan dimulai setelah kondisi berikut terpenuhi:
- Seluruh halaman dashboard role (Admin, Pengawas, Mandor) selesai secara UI.
- Halaman manajemen Superadmin terisi data fungsional (minimal mock).
- API Contract sudah disinkronkan dengan kebutuhan komponen frontend.
- Terdapat instruksi eksplisit untuk memulai migrasi server.

## Larangan
- Jangan mengubah isi folder `server/` menjadi aplikasi backend (NestJS/Express) dulu.
- Jangan menginstal dependensi backend (Prisma, Nest, dll).
- Jangan membuat database lokal atau cloud.
- Jangan mencoba menghubungkan frontend ke API yang belum ada.
