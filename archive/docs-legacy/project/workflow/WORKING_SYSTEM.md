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

## Legacy Docs Migration Policy
1. Dokumen lama tidak boleh langsung dihapus.
2. Dokumen lama harus dipindahkan dulu ke `docs/_legacy/original-docs/`.
3. Semua perpindahan harus dicatat di `LEGACY_DOCS_INVENTORY.md`.
4. Informasi penting harus dimigrasikan ke docs aktif.
5. Penghapusan hanya boleh dilakukan setelah status file jelas dan user menyetujui.
6. Cleanup harus dilakukan batch kecil.

## Cleanup Policy
- Cleanup dokumen hanya boleh dilakukan pada batch cleanup khusus.
- Tidak ada file legacy yang boleh dihapus sebelum statusnya diverifikasi sebagai `Migrated`, `Duplicate`, `Deprecated`, atau `Safe to Delete Later`.

## Aturan Lanjutan & Scope Guard (Ekstraksi SOP Lama)
1. **Aturan Acceptance**: Jika scope sesuai dan check pass, Room 00 melakukan mark Accepted. Jika ada masalah, Room 00 memutuskan fix batch / hold / lanjut. Tidak perlu validasi manual berulang sebagai default.
2. **Anti-Duplikasi**: Dilarang membuat SOP paralel kedua atau menduplikasi instruksi berulang-ulang di Add Instructions.
3. **Aturan Eksekusi**: Eksekutor AI (Gemini 3F) difokuskan sebagai eksekutor murni. Tidak boleh memberikan command git, commit, atau push secara mandiri.
4. **Scope Guard Teknis**: 
   - Hindari pengerjaan *production auth* (JWT/session), implementasi *realtime chat* WebSocket besar, atau *payment gateway* / transaksi legal nyata kecuali diinstruksikan eksplisit.
   - Segala bentuk data operasional mandor/pengawas wajib berbasis *database* (DB-backed). *Mock data* dilarang menjadi *fallback* untuk lingkungan operasional.
