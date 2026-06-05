# Alur Jurnal Mingguan Mandor

## Tujuan
Dokumen ini menjelaskan alur "Jurnal Mingguan Mandor" sebagai mekanisme pelaporan pekerjaan lapangan yang efisien namun tetap akuntabel. Jurnal ini berfungsi sebagai bukti pengerjaan fisik mingguan yang diverifikasi oleh Pengawas dan menjadi dokumen pendukung vital dalam proses pengajuan pembayaran Mandor.

## Prinsip Utama
1.  **Bukan Beban Harian**: Mandor tidak wajib membuat laporan formal setiap hari. Mandor diijinkan mengangsur catatan (entry) dan foto selama satu minggu berjalan.
2.  **Bukti Kerja & Catatan Progres**: Berfungsi sebagai rekam jejak aktivitas lapangan, kendala, dan penggunaan material secara naratif.
3.  **Dasar Verifikasi**: Menjadi acuan bagi Pengawas untuk menyetujui persentase progres fisik.
4.  **Bukti Pendukung Pembayaran**: Jurnal yang telah disetujui (*Approved*) menjadi syarat/lampiran untuk pencairan upah Mandor.
5.  **Bukan Mekanisme Keuangan Langsung**: Jurnal ini bukan alat pembayaran otomatis, bukan perubahan RAB, dan bukan *Change Order*.

## Aktor yang Terlibat
1.  **Mandor**: 
    *   Membuat draf jurnal mingguan.
    *   Menambahkan entry pekerjaan dan foto dokumentasi secara bertahap.
    *   Mencatat kendala lapangan dan klaim progres mingguan.
    *   Melakukan *submit* jurnal di akhir periode kerja.
2.  **Pengawas**:
    *   Menerima notifikasi jurnal masuk.
    *   Melakukan review teknis dan mencocokkan dengan kondisi nyata di lapangan.
    *   Memberikan keputusan: *Approve*, *Reject*, atau *Revision Requested*.
    *   Menentukan **Progress Terverifikasi Pengawas**.
3.  **Admin / RKK**:
    *   Memantau jurnal yang sudah disetujui sebagai bahan monitoring proyek.
    *   Menggunakan jurnal sebagai bukti administrasi untuk validasi pengajuan pembayaran Mandor.
4.  **Sistem**:
    *   Mengelola transisi status jurnal.
    *   Mengirim notifikasi otomatis.
    *   Mengunci (*Locking*) data setelah disetujui atau digunakan untuk pembayaran.

## Alur Utama
Mandor membuka menu Jurnal Mingguan
↓
Mandor memilih proyek aktif dan periode minggu berjalan
↓
Mandor memilih kategori pekerjaan (misal: Pekerjaan Dinding)
↓
Mandor menambahkan **Entry Jurnal** secara bertahap selama hari kerja
↓
Setiap entry dilengkapi dengan banyak **Foto Dokumentasi** (Proses & Hasil)
↓
Mandor melakukan *Final Check* dan klik **Submit** (Batas waktu: Akhir Minggu Kerja)
↓
Pengawas menerima notifikasi dan melakukan Review
↓
**Keputusan Pengawas:**
*   **Approved**: Jurnal terkunci, progres terverifikasi masuk ke rekap proyek, siap jadi bukti pembayaran.
*   **Revision Requested**: Jurnal dikembalikan ke Mandor untuk diperbaiki.
*   **Rejected**: Jurnal ditolak, tidak masuk progres resmi, tidak bisa jadi bukti pembayaran.

## Struktur Jurnal
Satu Jurnal Mingguan terdiri dari satu **Header** dan banyak **Entry**.

### Header Jurnal (Informasi Utama):
*   `projectId` & `foremanId`
*   `supervisorId` (Pengawas yang ditugaskan)
*   Periode Minggu (Tanggal Mulai - Tanggal Akhir)
*   Kategori Pekerjaan (Referensi ke RAB/Scope)
*   Status Jurnal
*   **Progress Klaim Mandor** (%)
*   **Progress Terverifikasi Pengawas** (%)
*   Catatan Umum Mandor & Catatan Verifikasi Pengawas

### Entry Jurnal (Catatan Aktivitas):
*   Tanggal Entry
*   Deskripsi Pekerjaan
*   Jumlah Pekerja (Opsional)
*   Material yang digunakan (Catatan pemakaian)
*   Kendala Lapangan (Jika ada)
*   **Foto Dokumentasi**: Minimal 1 foto, disarankan banyak foto (Proses, Detail, Hasil).

## Kategori Pekerjaan
Jurnal harus dikaitkan dengan kategori pekerjaan spesifik agar terstruktur. Contoh kategori:
*   Pekerjaan Pondasi
*   Pekerjaan Dinding & Plester
*   Pekerjaan Rangka Atap
*   Instalasi Listrik / Plumbing
*   Finishing / Lantai

## Jadwal dan Siklus Mingguan
Untuk menjaga kelancaran verifikasi dan pembayaran, siklus berikut ditetapkan:
*   **Senin - Jumat Siang**: Mandor mengisi draf jurnal secara bertahap.
*   **Jumat pukul 12.00 (Deadline)**: Batas akhir Mandor melakukan *Submit* jurnal.
*   **Jumat Siang - Sabtu Sore**: Jendela waktu Pengawas melakukan review, inspeksi lapangan, dan *Approval*.
*   **Sabtu Sore - Minggu**: Jurnal yang sudah *Approved* siap menjadi dasar pengajuan pembayaran Mandor.
*   *Catatan*: Jurnal yang terlambat di-submit atau terlambat di-approve akan menggeser siklus pembayaran ke minggu berikutnya.

## Status Jurnal
1.  **Draft**: Masih dalam pengisian oleh Mandor.
2.  **Submitted**: Sudah dikirim, menunggu review Pengawas.
3.  **Under Review**: Sedang diperiksa oleh Pengawas.
4.  **Revision Requested**: Butuh perbaikan (kembali ke Mandor).
5.  **Approved**: Sah, data terkunci.
6.  **Rejected**: Ditolak, dianggap tidak valid.
7.  **Locked**: Jurnal sudah direferensikan dalam pengajuan pembayaran, dilarang diedit sama sekali.

## Aturan Edit
*   Mandor hanya bisa edit pada status **Draft** dan **Revision Requested**.
*   Setelah **Approved**, Mandor dilarang mengubah isi jurnal.
*   Setiap perubahan status dicatat dalam *History* sistem.

## Hubungan dengan Progress Proyek
Jurnal mencatat dua jenis progres:
1.  **Progress Klaim Mandor**: Persentase menurut Mandor (hanya klaim awal, bukan data resmi).
2.  **Progress Terverifikasi Pengawas**: Persentase resmi yang menjadi **Single Source of Truth** untuk seluruh sistem (pembayaran, monitoring, dan publikasi).
*Data progress resmi hanya lahir dari verifikasi Pengawas.*

## Hubungan dengan Pengajuan Pembayaran Mandor
*   Hanya jurnal dengan status **Approved** atau **Locked** yang dapat dijadikan bukti pendukung dalam [Alur Pengajuan Pembayaran Mandor](payment-foreman.md).
*   Jurnal berfungsi sebagai data primer untuk membuktikan bahwa tagihan mandor didasarkan pada pekerjaan nyata.

## Hubungan dengan Material Request
*   Catatan pemakaian material di jurnal **BUKAN** pengajuan material baru.
*   Jika ada kekurangan material, Mandor tetap wajib membuat [Material Request](material-request.md) secara terpisah.

## Hubungan dengan Notifikasi
1.  **Jurnal Submitted**: Ke Pengawas (Minta Review).
2.  **Jurnal Revision/Rejected/Approved**: Ke Mandor.
3.  **Deadline Reminder**: Ke Mandor (Pengingat akhir minggu).

## Hubungan dengan Konsumen
*   Konsumen **TIDAK** melihat jurnal mentah, catatan kendala internal, atau proses revisi.
*   Konsumen hanya melihat **Ringkasan Progress Approved** yang berisi: Kategori, Progres Terverifikasi, dan Foto-foto terpilih yang telah disetujui Pengawas.

## Potensi Tabrakan dan Pencegahan
1.  **Tabrakan Laporan Harian**: Pencegahan: Tidak ada modul laporan harian terpisah; entry harian adalah bagian integral dari Jurnal Mingguan.
2.  **Tabrakan Progres Resmi**: Pencegahan: Membedakan secara tegas Klaim Mandor vs Verifikasi Pengawas.
3.  **Tabrakan Pembayaran**: Pencegahan: Jurnal adalah bukti pendukung, bukan pemicu otomatis pencairan dana.
4.  **Edit Pasca-Approval**: Pencegahan: Sistem mengunci data jurnal segera setelah status berubah menjadi `Approved`.

## Catatan Implementasi Nanti
*   Pengembangan Database, API, dan UI dilakukan pada sprint berikutnya.
*   Skema database harus mendukung relasi 1-to-many antara Header Jurnal dan Entry Jurnal.
*   Penyimpanan foto harus mendukung multiple upload per entry.
*   Fitur "Copy from Previous Week" dapat dipertimbangkan untuk mempercepat input Mandor pada pekerjaan yang bersifat kontinu.
