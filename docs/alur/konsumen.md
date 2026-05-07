# Alur Konsumen

## Status Dokumen
**Versi**: 1.0 (Local Development Integration Phase)
**Status**: Aktif - Konteks Produk

## Definisi Role
Konsumen adalah pemilik kebutuhan proyek (retail maupun korporat) yang menggunakan jasa RKK (RumahKu Kontruksi) untuk desain maupun pembangunan. Dalam konteks bisnis atau SOP, Konsumen juga sering disebut sebagai **Klien**. 

Konsumen dapat bertindak sebagai perorangan, perusahaan, atau diwakili oleh perwakilan resmi (PIC). PIC adalah perwakilan Konsumen yang memiliki batas hak tertentu (detail hak PIC dibahas di dokumen terpisah).

## Posisi Konsumen dalam Alur RKK
Konsumen adalah titik awal dan pemegang keputusan akhir dalam ekosistem RKK. Posisi Konsumen dimulai dari tahap pengajuan (Inquiry) hingga serah terima proyek (Handover). Konsumen berperan sebagai pemberi brief, pemberi persetujuan (approval), dan pembayar termin sesuai kontrak.

## Jenis Pengajuan Konsumen
Konsumen dapat masuk ke sistem RKK melalui dua jalur utama:

### 1. Pengajuan Desain
Digunakan jika Konsumen belum memiliki Gambar Kerja (DED).
- **Alur**: Isi kebutuhan -> Validasi Admin -> Penugasan Arsitek -> Proses Desain Bertahap -> Approval Konsumen -> Final Approved (Siap Bangun).
- **Catatan**: Konsumen melakukan review dan memberikan masukan melalui sistem, bukan melalui jalur instruksi langsung yang tidak terdokumentasi.

### 2. Pengajuan Pembangunan / Konstruksi
Digunakan jika Konsumen ingin membangun proyek, baik sudah memiliki dokumen desain sendiri maupun hasil dari alur desain RKK.
- **Alur**: Isi data proyek -> Unggah Dokumen (Gambar/RAB) -> Review Teknis Admin -> Survey Lokasi -> RAB Standar RKK -> Penawaran Final -> Kontrak & DP.
- **Catatan**: RAB bawaan Konsumen akan direview ulang oleh RKK untuk memastikan kesesuaian harga pasar, risiko teknis, dan standar kualitas.

## Alur Utama Konsumen
1. **Registrasi/Database**: Data Konsumen terdaftar di sistem (pada fase lokal dapat dikelola oleh Admin).
2. **Inquiry**: Konsumen mengisi data awal proyek (lokasi, jenis proyek, referensi, target budget, dll).
3. **Validasi & Konsultasi**: Admin melakukan verifikasi kebutuhan dan survey lokasi jika diperlukan.
4. **Pre-Construction**: Proses penyusunan Gambar Kerja (jika lewat jalur desain) dan RAB detail.
5. **Review Penawaran**: Konsumen menerima dan meninjau penawaran resmi/RAB final.
6. **Kontrak & DP**: Penandatanganan kesepakatan dan pembayaran Down Payment (DP).
7. **Proyek Aktif**: Setelah DP diterima, proyek masuk tahap eksekusi lapangan.
8. **Monitoring**: Konsumen memantau progres fisik, dokumentasi, dan status termin melalui Dashboard Konsumen.
9. **Serah Terima**: Proses finalisasi pekerjaan dan penyerahan kunci (Handover).

## Alur Pembayaran Bertahap Konsumen
Pembayaran tidak dilakukan secara penuh di awal, melainkan bertahap untuk menjaga keamanan transaksi dan kelancaran arus kas proyek. Detail alur pembayaran dapat dilihat pada [Alur Pembayaran Konsumen](./payment-customer.md).

**Ketentuan Utama**:
- **DP Awal**: Umumnya sebesar 20% dari nilai kontrak (digunakan untuk mobilisasi dan tahap persiapan).
- **Pembayaran Termin**: Dilakukan berdasarkan kategori pekerjaan (misal: Tahap Pondasi, Tahap Struktur, dll) yang sudah terverifikasi progresnya di lapangan.
- **Validasi Progres**: Progres lapangan menjadi dasar penagihan termin kepada Konsumen.
- **Jalur Pembayaran**: Pembayaran **WAJIB** dikirim ke rekening resmi RKK. Konsumen **DILARANG** melakukan pembayaran langsung ke Mandor, Pengawas, atau personil lapangan lainnya.

**Kategori Pekerjaan Umum**:
- Persiapan & Mobilisasi
- Pondasi & Struktur Bawah
- Struktur Lantai (1, 2, dst)
- Dinding & Pasangan
- Atap & Plafon
- MEP (Plumbing & Listrik)
- Finishing & Serah Terima

## Hubungan RAB, Progress, dan Termin
- **RAB**: Dasar perhitungan nilai total pekerjaan.
- **Termin**: Pembagian tagihan berdasarkan kesepakatan kontrak.
- **Progress**: Kondisi fisik nyata di lapangan.
- **Transparansi**: Konsumen dapat melihat nilai pekerjaan dan status pembayaran termin, namun **tidak melihat** margin keuntungan internal atau detail subsidi silang operasional RKK.

## Jika Pembayaran Termin Terlambat
Jika pembayaran termin tidak dilakukan sesuai jadwal:
1. Status pembayaran akan ditandai terlambat di sistem.
2. Admin akan melakukan konfirmasi/follow-up.
3. Pekerjaan di lapangan pada tahap berikutnya dapat **ditahan atau dijeda** hingga pembayaran diterima.
4. Segala keputusan penundaan pekerjaan akan didokumentasikan secara resmi.

## Hak Approval Konsumen
Konsumen Utama memiliki hak mutlak untuk memberikan persetujuan (Approval) terhadap:
- Desain Final (sebelum masuk konstruksi).
- RAB dan Penawaran Resmi.
- Kontrak Kerja.
- Perubahan lingkup pekerjaan (Change Order).
- Berita Acara Serah Terima (BAST).

## Yang Boleh Dilakukan di Aplikasi
- Melihat Dashboard Konsumen dengan ringkasan status proyek miliknya.
- Melihat detail pengajuan desain/pembangunan yang sedang berjalan.
- Mengisi dan memperbarui data kebutuhan proyek.
- Melihat status progres pekerjaan berdasarkan laporan yang diverifikasi.
- Melihat dokumentasi foto proyek dari lapangan.
- Melihat jadwal termin dan status pembayaran (DP & Termin).
- Memberikan review atau approval pada tahapan desain (Rencana Fitur).
- Mengajukan permintaan perubahan melalui sistem (Rencana Fitur).

## Yang Tidak Boleh Dilakukan
- **Instruksi Langsung Lapangan**: Konsumen dilarang memberikan instruksi teknis langsung kepada Mandor di lapangan sebagai keputusan resmi.
- **Instruksi Luar Sistem**: Dilarang meminta revisi desain ke Arsitek tanpa melalui sistem.
- **Ubah Scope Tanpa Alur**: Tidak boleh meminta penambahan/pengurangan pekerjaan tanpa melalui prosedur Change Order resmi.
- **Pembayaran Personal**: Dilarang membayar uang proyek ke rekening pribadi staf atau mandor.
- **Abaikan Kontrak**: Dilarang meminta proyek dimulai sebelum kontrak ditandatangani dan DP dibayarkan.
- **Intervensi Internal**: Tidak memiliki akses atau hak untuk mencampuri urusan margin dan manajemen vendor internal RKK.

## Status Implementasi Saat Ini
- **Data Konsumen DB-backed**: Partial (Fondasi database sudah ada).
- **CRUD Konsumen oleh Admin**: Tersedia.
- **Dashboard Konsumen**: Partial (UI-only / Draft).
- **Pengajuan Desain/Bangun**: Planned.
- **Review Dokumen Bawaan**: Planned.
- **Sistem Termin & Payment Tracking**: Planned.
- **Upload Gambar/RAB Production**: Postponed.
- **Payment Gateway Integration**: Postponed.
- **Progress Tracking Real-time**: Planned.
- **Change Order Management**: Do Not Build Yet.
- **Auth/JWT/Session/Role Guard**: Do Not Build Yet.

## Catatan untuk Developer / AI Assistant
- Konsumen adalah **pemilik proyek**, namun instruksi mereka harus difilter melalui sistem/Admin agar tidak merusak alur konstruksi.
- Pembayaran DP 20% adalah **aturan bisnis**, bukan fitur integrasi payment gateway pada tahap ini.
- Jangan membangun workflow pembayaran riil, upload file produksi, atau sistem autentikasi pada fase ini (status **Postponed**).
- Tetap gunakan prinsip **local-development-first** dengan Switcher persona jika dashboard konsumen sudah tersedia.
- Pastikan termin pembayaran selalu dikaitkan dengan kategori pekerjaan dan progres lapangan sebagai konteks logika bisnis.
