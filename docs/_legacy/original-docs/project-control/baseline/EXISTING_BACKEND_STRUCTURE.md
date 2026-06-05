# Existing Backend Structure

Kondisi existing struktur backend pada proyek RKK.

## Teknologi Utama
- Ditempatkan dalam direktori `server/`.
- Dibangun menggunakan **Node.js** dan framework **Express**.

## Fungsionalitas Dikenali
- Terlihat adanya routing API yang mengatur:
  - Project
  - Admin
  - Pengawas
  - Mandor
  *(Berdasarkan observasi awal pada `app.js` atau struktur route).*
- Terdapat dependency **Supabase** untuk pengelolaan database dan/atau layanan backend.

## Area Perhatian
- Status Auth (Autentikasi dan Autorisasi) belum diverifikasi final apakah sudah sepenuhnya siap digunakan untuk tahap produksi.
