# Alur Pembuatan dan Review Laporan Mingguan Pengawas

## 1. Judul
**Alur Laporan Mingguan Pengawas (RKK Internal Reporting Workflow)**

## 2. Tujuan Alur
Alur ini bertujuan untuk mengatur mekanisme pelaporan resmi dari Pengawas kepada Admin sebagai rekapitulasi performa proyek mingguan. Laporan ini merupakan **rekap/evaluasi** berbasis Jurnal Mandor yang sudah *Approved*. Tujuannya adalah kontrol kualitas dan penyediaan narasi progres resmi yang akan dipublikasikan ke Konsumen.

## 3. Aktor yang Terlibat
### Pengawas
*   Membuat laporan mingguan berdasarkan pengawasan lapangan.
*   Menyimpan draf dan melakukan *submit* ke Admin.
*   Melakukan perbaikan/revisi jika diminta oleh Admin.

### Admin
*   Menerima dan meninjau (*review*) isi laporan mingguan.
*   Memberikan status persetujuan atau meminta revisi jika data tidak akurat/lengkap.
*   Mengontrol publikasi ringkasan laporan kepada Konsumen.

### Mandor
*   Mandor tidak membuat laporan mingguan.
*   Jurnal Mingguan Mandor yang sudah **Approved/Locked** adalah data primer wajib bagi Pengawas dalam menyusun laporan ini. Pengawas tidak perlu melakukan input ulang aktivitas harian.

### Konsumen
*   Tidak memiliki akses ke laporan internal penuh.
*   Hanya menerima ringkasan progres yang sudah dipilah dan diterbitkan oleh Admin.

## 4. Prinsip Dasar
*   **Evaluasi Resmi**: Bukan sekadar catatan aktivitas, melainkan evaluasi terhadap kualitas, pencapaian, dan kendala.
*   **Berbasis Data Jurnal**: Laporan ini tidak berdiri sendiri; ia harus menarik data dari jurnal yang sudah tervalidasi agar tidak terjadi duplikasi kerja.
*   **Privasi Internal**: Berisi catatan teknis dan rekomendasi internal yang sensitif, sehingga tidak semuanya boleh diketahui Konsumen.
*   **Kontrol Admin**: Admin bertindak sebagai filter akhir sebelum informasi dilempar ke pihak luar (Konsumen).

## 5. Perbedaan dengan Alur Lain
| Aspek | Laporan Mingguan Pengawas | Jurnal Mingguan Mandor | Verifikasi Progres |
| :--- | :--- | :--- | :--- |
| **Pemilik** | Pengawas | Mandor | Pengawas/Admin |
| **Sifat** | Rekap & Evaluasi Resmi | Catatan Aktivitas & Foto | Validasi Volume Pekerjaan |
| **Tujuan** | Pelaporan ke Manajemen | Bukti Kerja & Dasar Upah | Dasar Pembayaran Termin |
| **Relasi Material** | Catatan Penggunaan/Kendala | Catatan Pemakaian | Tidak Relevan |

*   **Bukan Pengajuan Material**: Laporan ini mencatat kondisi material, namun permintaan material tetap melalui [Material Request](material-request.md).
*   **Bukan Pengajuan Pembayaran**: Laporan ini adalah instrumen informasi, bukan pemicu otomatis transfer dana.

## 6. Data yang Dibutuhkan
Untuk menyusun laporan yang berkualitas, Pengawas membutuhkan:
*   Data proyek dan periode minggu (Start & End Date).
*   Referensi Jurnal Mingguan Mandor.
*   Dokumentasi foto lapangan mingguan.
*   Daftar kendala yang terjadi (cuaca, keterlambatan material, teknis).
*   Rekomendasi teknis untuk minggu berikutnya.

## 7. Status Laporan
*   **draft**: Laporan sedang disusun oleh Pengawas dan belum dikirim.
*   **submitted**: Laporan sudah dikirim ke Admin dan menunggu peninjauan.
*   **revision_requested**: Admin meminta perbaikan pada bagian tertentu.
*   **revised**: Laporan yang sudah diperbaiki oleh Pengawas dan dikirim ulang.
*   **reviewed**: Admin telah selesai meninjau dan menerima isi laporan sebagai arsip sah.
*   **published**: Bagian tertentu dari laporan telah diterbitkan ke dashboard Konsumen.
*   **archived**: Laporan disimpan sebagai histori permanen setelah proyek selesai atau periode berlalu.

## 8. Alur Utama
1.  **Pemilihan Proyek**: Pengawas memilih proyek aktif yang diawasi.
2.  **Penarikan Data Otomatis**: Sistem menampilkan ringkasan aktivitas dari Jurnal Mandor yang sudah *Approved* sebagai basis laporan.
3.  **Penyusunan Evaluasi**: Pengawas menambahkan evaluasi kualitas, kendala lapangan, rekomendasi teknis minggu depan, dan catatan keselamatan (K3). Pengawas tidak perlu menyalin ulang deskripsi pekerjaan Mandor.
4.  **Simpan Draf**: Pengawas dapat menyimpan draf jika data belum lengkap.
5.  **Submit**: Pengawas mengirim laporan ke Admin.
6.  **Notifikasi**: Admin menerima pemberitahuan adanya laporan mingguan baru.
7.  **Review**: Admin membaca dan melakukan peninjauan terhadap kualitas data.
8.  **Penyelesaian**: Admin menandai laporan sebagai `reviewed`.

## 9. Alur Revisi
1.  Admin menemukan data yang tidak sinkron atau penjelasan yang kurang detail.
2.  Admin mengubah status menjadi `revision_requested` dan memberikan catatan revisi.
3.  Pengawas menerima notifikasi revisi.
4.  Pengawas memperbarui data dan mengirim ulang (status menjadi `revised`).
5.  Admin meninjau ulang hingga status menjadi `reviewed`.

## 10. Alur Publish ke Konsumen
1.  Admin menekan tombol "Prepare for Customer" pada laporan yang berstatus `reviewed`.
2.  Admin menyalin/merangkum bagian `customerVisibleSummary`.
3.  Admin memilih foto-foto terbaik dari laporan untuk ditampilkan.
4.  Admin mengubah status publikasi menjadi `published`.
5.  Konsumen menerima update progres di dashboard mereka.

## 11. Hak Akses Per Role
*   **Pengawas**: Create, Read (Own), Update (Draft/Revised).
*   **Admin**: Read (All), Update Status (Review/Publish), Delete (Internal Policy).
*   **Mandor**: No Access.
*   **Konsumen**: Read (Published Summary Only).

## 12. Potensi Tabrakan atau Kejanggalan
1.  **Risiko Tertukar**: Laporan mingguan dianggap sama dengan jurnal harian/mingguan mandor. *Pencegahan: Penamaan menu dan struktur data yang berbeda tajam.*
2.  **Single Source of Truth**: Data progress di laporan ini harus identik dengan progress di Jurnal Approved. Laporan ini dilarang menciptakan angka progress baru yang berbeda dari jurnal yang sudah diverifikasi.
3.  **Kebocoran Data**: Seluruh isi laporan internal (termasuk keluhan mandor atau catatan sensitif) tampil ke Konsumen. *Pencegahan: Adanya field khusus `customerVisibleSummary` yang wajib diisi/diedit oleh Admin.*
4.  **Edit Tanpa Histori**: Pengawas mengubah data setelah laporan dinyatakan `reviewed`. *Pencegahan: Sistem mengunci laporan setelah status mencapai `reviewed`.*
5.  **Ketidakjelasan Periode**: Laporan dibuat tanpa rentang tanggal yang standar (Senin-Minggu). *Pencegahan: Validasi sistem untuk memilih minggu berdasarkan kalender.*

## 13. Rekomendasi Implementasi Nanti
*   Sistem harus mendukung *Rich Text* untuk bagian ringkasan/evaluasi.
*   Integrasi otomatis foto-foto dari Jurnal Mandor agar Pengawas tidak perlu upload ulang dari nol.
*   Fitur "Export PDF" untuk arsip cetak kantor.

## 14. Catatan MVP
Untuk fase MVP, laporan mingguan cukup memiliki struktur data sebagai berikut:
*   `projectId`: Relasi ke proyek.
*   `supervisorId`: Penulis laporan.
*   `weekStartDate` & `weekEndDate`: Rentang periode.
*   `summary`: Ringkasan umum evaluasi.
*   `progressSummary`: Capaian progres fisik dalam persentase atau narasi.
*   `completedWorks`: Daftar pekerjaan yang selesai minggu ini.
*   `ongoingWorks`: Daftar pekerjaan yang sedang berjalan.
*   `delayedWorks`: Daftar pekerjaan yang terlambat.
*   `fieldIssues`: Catatan kendala lapangan (cuaca, sdm, dll).
*   `materialNotes`: Catatan kondisi dan ketersediaan material.
*   `qualityNotes`: Evaluasi kualitas pekerjaan mandor.
*   `safetyNotes`: Catatan K3/Keselamatan kerja.
*   `supervisorRecommendation`: Saran untuk manajemen/admin.
*   `internalNotes`: Catatan rahasia internal RKK.
*   `customerVisibleSummary`: Narasi sopan yang akan tampil di dashboard konsumen.
*   `status`: (draft, submitted, reviewed, dll).
*   `reviewedByAdminId` & `reviewedAt`: Data audit review.
*   `createdAt` & `updatedAt`: Timestamps.

---
**Dokumen ini adalah panduan bisnis. Dilarang melakukan implementasi kode tanpa instruksi teknis lanjutan.**
