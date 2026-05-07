# Alur Pengajuan Pembayaran Mandor Berdasarkan Kategori Pekerjaan

## 1. Definisi Alur
Alur ini digunakan ketika Mandor mengajukan pencairan pembayaran kepada RKK berdasarkan kategori pekerjaan yang sudah disepakati sebelumnya dalam kontrak atau kesepakatan kerja. Pembayaran dilakukan berdasarkan progres pekerjaan aktual di lapangan yang telah diverifikasi oleh Pengawas.

Contoh kategori pekerjaan meliputi:
*   Bouwplank / bowplang
*   Pembersihan lapangan
*   Galian
*   Pondasi
*   Sloof
*   Kolom
*   Dinding
*   Atap
*   Plester
*   Finishing

Kategori-kategori ini dapat disesuaikan dengan kebutuhan proyek dan kesepakatan spesifik antara RKK dan Mandor.

## 2. Prinsip Utama
*   **Internal RKK**: Mandor tidak menagih pembayaran langsung ke Konsumen. Transaksi finansial Mandor hanya berhubungan dengan RKK.
*   **Pemisahan Arus Kas**: Konsumen tetap membayar ke RKK sesuai alur `payment-customer.md`. Pembayaran Mandor adalah arus kas keluar (expenditure) RKK.
*   **Berdasarkan Kategori**: Pembayaran dihitung berdasarkan kategori pekerjaan yang sudah disepakati, bukan berdasarkan tagihan bebas.
*   **Kontrol Nilai**: Nilai pembayaran tidak diisi secara manual/bebas oleh Mandor, melainkan dihitung otomatis oleh sistem berdasarkan persentase progres.
*   **Verifikasi vs Validasi**: Pengawas memverifikasi progres fisik lapangan, sedangkan Admin/RKK memvalidasi kelayakan finansial dan administrasi sebelum pembayaran final.
*   **Batas Maksimum**: Total pembayaran per kategori tidak boleh melebihi 100% dari nilai kategori yang sudah disepakati.

## 3. Aktor yang Terlibat

### Mandor
Bertanggung jawab atas pengerjaan fisik di lapangan. Mandor memilih kategori pekerjaan yang akan diajukan, mengisi checklist penyelesaian, melampirkan bukti foto, dan mengirimkan pengajuan dalam periode yang ditentukan.

### Pengawas
Bertanggung jawab melakukan inspeksi lapangan untuk memvalidasi klaim Mandor. Pengawas menilai progres aktual dan menentukan persentase pekerjaan yang layak dibayar. Pengawas tidak memiliki wewenang final untuk mencairkan dana.

### Admin / RKK
Bertanggung jawab atas validasi akhir dari sisi administrasi dan keuangan. Memastikan tidak ada klaim ganda (*double claim*), memastikan ketersediaan dana, dan memproses transfer pembayaran sesuai jadwal.

### Sistem
Mengatur jendela waktu pengajuan (lock/unlock), menghitung nominal secara otomatis, mencatat histori perubahan status, dan mengirimkan notifikasi kepada aktor terkait.

## 4. Jadwal Pengajuan dan Pembayaran

### Periode Pengajuan Mandor
Tombol pengajuan di aplikasi hanya aktif pada:
**Jumat pukul 15.00 s/d Minggu pukul 17.00**

*   **Sebelum Jendela Dibuka**: Tombol disabled dengan pesan: *"Pengajuan pembayaran belum dibuka. Pengajuan dibuka setiap Jumat pukul 15.00 sampai Minggu pukul 17.00."*
*   **Setelah Jendela Ditutup**: Tombol disabled dengan pesan: *"Periode pengajuan minggu ini sudah ditutup. Silakan ajukan pada periode berikutnya."*

### Periode Review Pengawas
Pengawas melakukan pengecekan dan verifikasi pada:
**Sabtu s/d Minggu**

### Jadwal Pembayaran
RKK melakukan pencairan dana (transfer) pada:
**Senin**

Hanya pengajuan yang memenuhi kriteria berikut yang akan dibayar pada hari Senin:
1.  Masuk dalam periode pengajuan yang benar.
2.  Telah diverifikasi oleh Pengawas.
3.  Telah divalidasi dan disetujui oleh Admin/RKK.
4.  Lengkap secara administrasi dan tidak melebihi pagu kategori.

## 5. Alur Normal
1.  Admin/RKK menetapkan daftar kategori pekerjaan dan nilainya untuk proyek terkait.
2.  Mandor menyelesaikan pekerjaan sesuai kategori.
3.  Jumat pukul 15.00: Mandor masuk ke sistem untuk melakukan pengajuan.
4.  Mandor memilih proyek dan kategori pekerjaan yang ingin dicairkan.
5.  Mandor mengisi checklist item pekerjaan yang sudah selesai.
6.  Mandor menginput persentase progres yang diajukan (misal: 100%).
7.  Mandor mengunggah bukti foto progres lapangan.
8.  Sistem menghitung nominal pengajuan (Nilai Kategori x % Progres).
9.  Mandor mengirim (*Submit*) pengajuan.
10. Pengawas menerima notifikasi dan melakukan inspeksi pada Sabtu/Minggu.
11. Pengawas memberikan penilaian progres aktual (misal: disetujui 100% atau dikoreksi).
12. Sistem menghitung ulang nominal layak bayar berdasarkan angka dari Pengawas.
13. Admin/RKK menerima data pengajuan yang sudah diverifikasi.
14. Admin melakukan validasi akhir terhadap histori dan pagu kategori.
15. Admin menyetujui pengajuan untuk daftar bayar Senin.
16. Senin: RKK melakukan transfer dana ke Mandor.
17. Sistem memperbarui status menjadi `Paid` dan mencatat tanggal bayar.
18. Mandor menerima notifikasi pembayaran sukses.

## 6. Contoh Perhitungan

### Contoh 1: Progres Sempurna (100%)
*   **Kategori**: Bouwplank
*   **Nilai Kategori**: Rp 1.500.000
*   **Progres Diajukan**: 100%
*   **Verifikasi Pengawas**: 100%
*   **Nominal Dibayar**: Rp 1.500.000
*   **Status Kategori**: `Paid` / `Completed`

### Contoh 2: Progres Parsial (70%)
*   **Kategori**: Pembersihan Lapangan
*   **Nilai Kategori**: Rp 2.000.000
*   **Progres Diajukan**: 100% (Klaim Mandor)
*   **Verifikasi Pengawas**: 70% (Kondisi Lapangan)
*   **Nominal Dibayar**: Rp 1.400.000
*   **Sisa Progres**: 30%
*   **Sisa Nilai**: Rp 600.000
*   **Status Kategori**: `Partially Paid`
*   *Catatan: Sisa 30% dapat diajukan kembali pada periode minggu berikutnya.*

## 7. Status Pengajuan

| Status | Arti |
| :--- | :--- |
| **Draft** | Pengajuan sedang disiapkan Mandor, belum dikirim ke sistem. |
| **Submitted** | Pengajuan sudah dikirim oleh Mandor dan menunggu antrean review. |
| **Under Supervisor Review** | Sedang dalam proses pengecekan fisik oleh Pengawas. |
| **Partially Verified** | Pengawas menyetujui progres, namun di bawah angka yang diajukan Mandor. |
| **Fully Verified** | Pengawas menyetujui progres sesuai dengan angka pengajuan Mandor. |
| **Under Admin Review** | Data sudah diverifikasi Pengawas, sedang divalidasi keuangan oleh Admin. |
| **Revision Requested** | Pengajuan dikembalikan karena ada data/bukti yang kurang lengkap. |
| **Rejected by Supervisor** | Ditolak Pengawas karena pekerjaan tidak sesuai atau belum layak bayar. |
| **Rejected by Admin** | Ditolak Admin karena masalah administrasi atau finansial. |
| **Approved for Monday Payment** | Sudah disetujui dan masuk dalam jadwal transfer hari Senin. |
| **Paid** | Dana sudah ditransfer dan pengajuan selesai. |
| **Partially Paid** | Pembayaran berhasil untuk progres sebagian, kategori belum lunas. |
| **Payment Delayed** | Pembayaran ditunda (misal: kendala cashflow atau administrasi tambahan). |
| **Cancelled** | Pengajuan dibatalkan oleh Mandor atau sistem. |

## 8. Alur Jika Disetujui Sebagian
Jika terdapat perbedaan antara klaim Mandor (misal 100%) dan hasil inspeksi Pengawas (misal 70%):
1.  Pengawas menginput angka progres layak bayar (70%) di sistem.
2.  Sistem menyesuaikan nominal yang akan dibayarkan secara otomatis.
3.  Admin memvalidasi angka 70% tersebut.
4.  RKK membayar nilai 70% pada hari Senin.
5.  Sisa 30% tetap tersimpan di sistem sebagai "Sisa Progres Kategori" yang dapat diajukan di masa mendatang.

## 9. Alur Jika Ditolak atau Minta Revisi

### Penolakan oleh Pengawas
Terjadi jika pekerjaan tidak sesuai lapangan, foto bukti salah, atau checklist belum dipenuhi. Mandor harus memperbaiki pekerjaan sebelum bisa mengajukan ulang di periode berikutnya.

### Penolakan oleh Admin/RKK
Terjadi jika ditemukan indikasi *double claim*, nilai melebihi plafon kategori, atau ketidaksesuaian data rekening/administrasi.

### Permintaan Revisi
Status ini digunakan jika pengajuan secara prinsip benar namun butuh perbaikan kecil (misal: foto kabur, deskripsi kurang detail). Pengajuan dikembalikan ke Mandor untuk diedit tanpa harus menunggu periode minggu depan (jika masih dalam jendela waktu Jumat-Minggu).

## 10. Validasi Sistem (Konseptual)
*   **Scope Project**: Mandor hanya bisa melihat dan mengajukan pada proyek yang aktif ditugaskan kepadanya.
*   **Strict Category**: Mandor hanya bisa memilih dari daftar kategori yang sudah didefinisikan Admin (tidak bisa membuat kategori sendiri).
*   **Auto-Calculation**: Input Mandor hanya berupa persentase, nominal uang dihitung oleh sistem untuk menghindari kesalahan input manual.
*   **Ceiling Limit**: Sistem menolak pengajuan jika akumulasi progres bayar per kategori melebihi 100%.
*   **Immutable Paid Records**: Data pengajuan yang sudah berstatus `Paid` tidak dapat diubah atau dihapus.
*   **Duplicate Prevention**: Sistem memberi peringatan jika ada pengajuan ganda untuk kategori yang sama yang masih berstatus `Submitted` atau `Under Review`.
*   **Time Lock**: Sistem secara otomatis mengunci fitur submit di luar jendela Jumat 15.00 - Minggu 17.00.

## 11. Relasi dengan Alur Lain

### Relasi dengan Alur Pembayaran Konsumen (`payment-customer.md`)
Ini adalah alur yang berbeda. Pembayaran Konsumen adalah pendapatan (Income), sedangkan Pembayaran Mandor adalah biaya (Expense). Mandor dilarang keras menerima uang langsung dari Konsumen.

### Relasi dengan Alur Pengajuan Material (`material-request.md`)
Pemisahan tegas antara Biaya Upah (Alur ini) dan Biaya Logistik/Material. Permintaan semen, besi, dll masuk ke alur material, bukan alur pembayaran kategori ini.

### Relasi dengan Progress Proyek
Progres yang diverifikasi di alur ini secara otomatis mengupdate data progres internal proyek. Namun, tampilan progres untuk Konsumen bisa saja berbeda (lebih disederhanakan) sesuai kebijakan Admin.

## 12. Notifikasi
1.  **Mandor**: Notifikasi "Jendela Pengajuan Dibuka" (Jumat 15.00).
2.  **Pengawas**: Notifikasi "Ada Pengajuan Baru" saat Mandor klik Submit.
3.  **Mandor**: Notifikasi "Status Berubah" (Revision/Rejected/Approved).
4.  **Admin**: Notifikasi "Verifikasi Selesai" saat Pengawas menyetujui progres.
5.  **Mandor**: Notifikasi "Pembayaran Diproses" (Senin).

## 13. Batasan Penting
*   Dokumen ini bersifat konseptual bisnis.
*   **DILARANG** melakukan implementasi kode, API, atau skema database berdasarkan dokumen ini sebelum ada instruksi khusus.
*   Segala bentuk implementasi teknis akan dilakukan di tahap terpisah untuk menjaga integritas sistem yang sudah ada.

## 14. Ringkasan Alur
Mandor bekerja -> Jumat-Minggu mengajukan progres per kategori -> Sabtu-Minggu Pengawas cek lapangan -> Admin validasi kelayakan -> Senin RKK transfer upah. Nominal pembayaran bersifat sistematis (Nilai Kategori x % Progres Terverifikasi).
