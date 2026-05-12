# Alur Progress Proyek ke Konsumen

## 1. Ringkasan Alur
Alur progress proyek ke konsumen menjelaskan mekanisme penyampaian informasi kemajuan pekerjaan fisik dari lapangan hingga tampil di dashboard konsumen secara resmi. Informasi yang ditampilkan harus **akurat, jujur, dan terverifikasi**, namun dikemas dalam narasi yang profesional untuk Konsumen.

## 2. Tujuan Alur
*   Menjamin akurasi data progress yang diterima oleh Konsumen.
*   Menjaga transparansi proyek tanpa mengekspos detail operasional internal yang sensitif.
*   Menyediakan jejak digital (timeline) yang rapi bagi Konsumen untuk memantau investasi pembangunan mereka.
*   Menghubungkan pencapaian milestone fisik dengan alur pembayaran/termin proyek.

## 3. Aktor yang Terlibat

### Mandor
*   Membuat laporan progress lapangan (data awal).
*   Mengisi persentase pekerjaan per tahap.
*   Mengunggah foto dokumentasi mentah.
*   Mencatat kendala lapangan dan catatan internal.
*   *Catatan: Mandor tidak menentukan apakah data tampil ke Konsumen.*

### Pengawas
*   Memeriksa dan memvalidasi laporan Mandor terhadap kondisi riil di lapangan.
*   Menyetujui, menolak, atau meminta revisi laporan.
*   Memilih foto yang layak untuk dokumentasi publik.
*   Memberikan catatan verifikasi teknis.
*   *Catatan: Pengawas memvalidasi data fisik, namun belum mempublikasikannya ke Konsumen.*

### Admin / Project Manager
*   Meninjau progress yang sudah diverifikasi Pengawas.
*   Menentukan kelayakan publikasi ke dashboard Konsumen.
*   Menyesuaikan narasi catatan publik agar mudah dipahami Konsumen.
*   Menghubungkan progress dengan penagihan termin jika milestone tercapai.
*   *Catatan: Admin adalah gatekeeper komunikasi akhir ke Konsumen.*

### Konsumen
*   Melihat progress resmi (total dan per tahap).
*   Melihat timeline update proyek dan dokumentasi foto publik.
*   Menerima notifikasi setiap ada pembaruan resmi.
*   *Catatan: Konsumen hanya melihat data yang sudah berstatus 'Published'.*

### Sistem
*   Mengelola status internal dan status publikasi secara terpisah.
*   Menyimpan histori update dan mengirim notifikasi otomatis.
*   Menampilkan data di dashboard Konsumen hanya jika status publikasi terpenuhi.

## 4. Prinsip Utama Alur
*   **Verify-then-Publish**: Data lapangan harus diverifikasi Pengawas sebelum bisa dipublikasikan Admin.
*   **Data Isolation**: Memisahkan catatan internal RKK (kendala teknis, konflik vendor) dari catatan publik Konsumen.
*   **Single Source of Truth**: Progress publik harus bersumber dari data yang sudah diverifikasi Pengawas.
*   **Prinsip Kejujuran**: Meskipun informasi diringkas, sistem dilarang menyembunyikan keterlambatan atau kegagalan milestone secara sengaja. Data publik harus mencerminkan realitas progres fisik.

## 5. Alur Utama
1.  Mandor membuat laporan progress lapangan dan mengunggah foto.
2.  Mandor mengirim laporan ke Pengawas (Status: `submitted_by_foreman`).
3.  Pengawas memeriksa laporan (Review teknis).
4.  Jika tidak sesuai, Pengawas meminta revisi atau menolak laporan.
5.  Jika valid, Pengawas menyetujui laporan (Status: `approved_by_supervisor`).
6.  Admin menerima notifikasi data progress yang siap ditinjau.
7.  Admin menyusun narasi publik dan memilih foto dokumentasi publik.
8.  Admin mempublikasikan progress (Status: `published_to_customer`).
9.  Sistem mengirim notifikasi ke Konsumen.
10. Konsumen melihat pembaruan di dashboard mereka.

## 6. Data yang Dibuat Mandor
*   ID Proyek & Tahap Pekerjaan.
*   Persentase Progress versi Mandor.
*   Foto Dokumentasi Lapangan (Mentah).
*   Catatan Kendala & Catatan Internal.

## 7. Data yang Diverifikasi Pengawas
*   Kesesuaian fisik vs laporan.
*   Validitas foto dokumentasi.
*   Kewajaran persentase progress.
*   Status persetujuan teknis.

## 8. Data yang Dipublikasikan ke Konsumen
*   Progress Total Proyek & Progress Per Tahap.
*   Foto Dokumentasi Publik (sudah dipilih).
*   Narasi Update (Catatan Publik).
*   Status Milestone (Selesai/Berjalan).
*   Tanggal Update Terakhir.

## 9. Data yang Tidak Boleh Tampil ke Konsumen
*   Catatan konflik internal (pekerja/supplier).
*   Detail biaya operasional internal.
*   Pengajuan material atau upah mandor.
*   Foto mentah yang tidak relevan atau blur.
*   Laporan yang masih dalam status draf, revisi, atau ditolak.

## 10. Status Alur

### Status Internal (Progress Data)
*   **draft**: Masih disusun Mandor.
*   **submitted_by_foreman**: Terkirim ke Pengawas.
*   **revision_requested**: Butuh perbaikan dari Mandor.
*   **rejected_by_supervisor**: Ditolak (tidak valid).
*   **approved_by_supervisor**: Disetujui secara teknis.
*   **verified_internal**: Tervalidasi sepenuhnya di level internal.

### Status Publikasi (Visibility)
*   **not_published**: Belum tampil di dashboard konsumen.
*   **published_to_customer**: Sudah tampil di dashboard konsumen.
*   **updated**: Data publik diperbarui.
*   **archived**: Data lama disimpan sebagai histori.

## 11. Alur Notifikasi
*   **Mandor Submit** -> Notifikasi ke Pengawas.
*   **Pengawas Revisi/Tolak** -> Notifikasi ke Mandor.
*   **Pengawas Approve** -> Notifikasi ke Admin.
*   **Admin Publish** -> Notifikasi ke Konsumen.
*   **Milestone Tercapai** -> Notifikasi penagihan/termin (Jika relevan).

## 12. Tampilan Dashboard Konsumen
Dashboard menyajikan informasi visual yang bersih:
*   **Progress Bar**: Total proyek dan per kategori (Persiapan, Pondasi, Struktur, dll).
*   **Gallery**: Foto-foto progress terpilih.
*   **Timeline**: Catatan sejarah update dari awal proyek.

### Contoh Tabel Progress
| Tahap | Progress | Status |
| :--- | :--- | :--- |
| Persiapan | 100% | Selesai |
| Pondasi | 75% | Berjalan |
| Struktur | 0% | Belum Mulai |

## 13. Hubungan dengan Alur Lain
*   **Jurnal Mingguan Mandor**: Sumber data utama input progress.
*   **Verifikasi Pengawas**: Gerbang validasi data fisik.
*   **Alur Notifikasi**: Penggerak informasi antar aktor.
*   **Alur Pembayaran**: Progress tertentu memicu termin pembayaran.

## 14. Potensi Tabrakan dan Aturan Pencegahan
1.  **Direct Publish**: Mandor input langsung tampil. *Aturan: Dashboard hanya membaca data status `published_to_customer`.*
2.  **Desinkronisasi**: Perbedaan data antar role. *Aturan: Semua status publikasi harus merujuk pada `verified_internal`.*
3.  **Leaks**: Catatan internal terbaca Konsumen. *Aturan: Pisahkan kolom `internalNote` dan `customerNote` di database.*
4.  **Bypass Verification**: Admin publish tanpa cek Pengawas. *Aturan: Tombol Publish Admin hanya aktif jika status sudah `approved_by_supervisor`.*

## 15. Rekomendasi Model Data Konseptual
*   **ProjectProgressUpdate**: `id`, `projectId`, `stageId`, `submittedBy`, `verifiedBy`, `publishedBy`, `progressPercent`, `internalNote`, `customerNote`, `internalStatus`, `publicationStatus`, `timestamps`.
*   **ProgressPhoto**: `id`, `updateId`, `imageUrl`, `isPublic`, `caption`.

## 16. Batasan Implementasi
*   Dilarang mencampur data biaya internal ke tampilan Konsumen.
*   Dilarang mengizinkan Mandor melakukan publikasi langsung.
*   Laporan yang ditolak atau revisi harus tetap tersimpan sebagai histori internal, tidak dihapus.

## 17. Kesimpulan
Progress yang tampil ke Konsumen adalah **Progress Resmi** yang telah melalui audit internal. Hal ini memastikan kepercayaan Konsumen tetap terjaga dan data yang disajikan memiliki dasar pertanggungjawaban yang kuat dari tim lapangan (Mandor & Pengawas) serta manajemen (Admin).
