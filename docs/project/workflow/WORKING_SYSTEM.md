# Sistem Kerja RKK

Dokumen ini mendefinisikan alur kerja dan sistem manajemen yang digunakan dalam proyek RumahKu Konstruksi (RKK).

## Peran (Roles)
- **User**: Pengambil keputusan utama, pemilik proyek, dan eksekutor akhir untuk urusan commit/push ke repository.
- **Roomchat 00 / Manager**: Mengelola arsitektur, rencana fitur, dan roadmap secara keseluruhan.
- **Roomchat 01 / Auditor**: Mengaudit kode, keamanan, arsitektur yang sudah berjalan, dan memastikan tidak ada deviasi dari desain sistem.
- **Anti-Gravity IDE**: Ruang kerja dan tempat eksekusi nyata untuk melakukan coding, validasi, dan refactoring.
- **Eksekutor / Gemini**: Asisten AI yang bertugas mengeksekusi instruksi dari User sesuai batasan (scope) yang ditetapkan.

## Ukuran Batch
Setiap pekerjaan harus dibagi ke dalam ukuran batch yang terkelola:
- **Small**: 1–3 file, satu area fokus, risiko sangat rendah.
- **Medium**: 4–8 file, satu sampai dua area fokus, risiko sedang.
- **Large**: Lebih dari 8 file. *Wajib dipecah* menjadi batch lebih kecil atau diaudit secara ketat sebelum dieksekusi.

## Scope Area
Pembagian area pada repository:
- `docs` - Dokumentasi dan administrasi proyek.
- `frontend` - UI, komponen, routing (folder `client/`).
- `backend` - API, controllers, services (folder `server/`).
- `database` - Skema Prisma, integrasi Supabase.
- `auth` - Autentikasi dan autorisasi (multi-role access).
- `deployment` - Konfigurasi hosting, CI/CD, dan environment produksi.

## Batch Gate (Persyaratan Memulai Batch)
Setiap eksekusi batch harus memiliki kejelasan pada hal-hal berikut:
- **Tujuan**: Harus spesifik dan terukur.
- **Scope**: Area apa saja yang dilibatkan.
- **File Boleh Diubah**: Daftar eksplisit file yang diizinkan untuk dimodifikasi.
- **File Tidak Boleh Disentuh**: Daftar eksplisit file atau area yang dilindungi.
- **Definition of Done (DoD)**: Kriteria pasti yang menandakan batch selesai.
- **Validasi**: Cara untuk menguji keberhasilan implementasi.

## Status Pekerjaan
- **Completed**: Selesai sepenuhnya sesuai DoD.
- **In Progress**: Sedang dikerjakan.
- **Partial**: Sebagian selesai, sisanya ditunda karena alasan tertentu (misal: perlu perbaikan arsitektur pendukung).
- **Blocked**: Tidak bisa dilanjutkan karena error atau hambatan dependency.
- **HOLD**: Ditangguhkan sementara oleh keputusan User.
- **Not Started**: Belum dimulai.

## Definition of Done (DoD)
Sebuah batch dianggap selesai (Completed) hanya jika:
- Semua tujuan terpenuhi.
- Tidak ada perubahan file di luar scope yang telah disepakati.
- Validasi fungsional telah dilakukan (misal: pengecekan error log atau routing berhasil).
- Laporan akhir (Akhir Batch) sudah diberikan oleh AI dengan lengkap.
*Catatan: Jika poin-poin di atas belum sepenuhnya terpenuhi, status wajib diubah menjadi Partial atau Blocked.*

## Aturan Review
Sebelum User melakukan commit/push, wajib dilakukan review terhadap:
- Cek file changed (pastikan sesuai instruksi).
- Cek scope (pastikan tidak ada file "bocor" yang dimodifikasi).
- Cek path direktori.
- Cek risiko implementasi pada sistem eksisting.
- Memastikan bahwa hasil pekerjaan sudah aman sebelum melanjutkan ke batch berikutnya.
