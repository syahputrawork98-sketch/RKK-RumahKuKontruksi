# Alur Mandor

## Status Dokumen
**Versi**: 1.0 (Local Development Integration Phase)
**Status**: Aktif - Konteks Produk

## Definisi Role
Mandor adalah mitra pelaksana lapangan RKK (RumahKu Kontruksi) yang memimpin tim pekerja (tukang) untuk mengeksekusi pekerjaan fisik di lokasi proyek. Mandor bukan merupakan karyawan internal RKK melainkan mitra profesional yang bekerja berdasarkan kontrak/penugasan per proyek.

### Relasi dengan Jurnal Mingguan Mandor (`jurnal-mingguan-mandor.md`)
Jurnal Mingguan yang sudah berstatus `Approved` atau `Locked` berfungsi sebagai bukti pendukung utama untuk pengajuan pembayaran. Mandor wajib melampirkan referensi jurnal terkait saat mengajukan pembayaran kategori tertentu.

## Posisi Mandor dalam Alur Proyek
Mandor mulai terlibat penuh ketika proyek sudah berstatus **Active**.

**Syarat Proyek Aktif (Pre-Active Requirements):**
Proyek tidak akan diaktifkan sebelum:
1.  **Mandor Pelaksana** sudah ditunjuk secara resmi.
2.  **Pengawas Proyek** sudah ditunjuk.
3.  **RAB & Scope** sudah dikunci (*Locked*).
4.  **Kontrak & DP** sudah diselesaikan oleh Konsumen.

## Status Kemitraan Mandor
Dalam sistem RKK, Mandor memiliki satu role otentikasi utama yaitu **Mandor**, namun dapat dibedakan berdasarkan status kemitraannya:

1. **Mandor Reguler**: Mandor yang sudah terdaftar dan terverifikasi di sistem RKK, berhak melihat postingan proyek dan mengajukan penawaran.
2. **Mandor Mitra**: Mandor dengan riwayat kerja yang sangat baik (misal: telah menyelesaikan > 5 proyek dengan rating tinggi). Status ini memberikan *highlight* (badge) di sistem agar menjadi prioritas pertimbangan Admin.

*Catatan: Reguler/Mitra hanyalah status kemitraan/label data, bukan role teknis/auth yang berbeda.*

## Tanggung Jawab Utama
- **Eksekusi Fisik**: Menjamin pekerjaan selesai sesuai Gambar Kerja dan standar kualitas.
- **Manajemen Tukang**: Mengatur kehadiran, produktivitas, dan kualitas kerja tim tukang.
- **Pengajuan Penawaran**: Memberikan harga dan estimasi waktu yang kompetitif dan masuk akal.
- **Jurnal Mingguan**: Membuat catatan pekerjaan mingguan sebagai bukti progres dan dasar pembayaran.
- **Kebutuhan Material**: Mengajukan permintaan material (Material Request) sesuai kebutuhan lapangan.

## Alur Utama Mandor
1. **Akses Dashboard**: Mandor terdaftar masuk ke dashboard khusus Mandor.
2. **Manajemen Profil**: Mandor mengelola profil profesionalnya (keahlian, pengalaman, tim).
3. **Melihat Project Posting**: Mandor memantau daftar proyek terbuka yang dipublikasikan oleh Admin.
4. **Analisis Proyek**: Mandor mempelajari detail proyek (lokasi, scope, Gambar Kerja, ringkasan RAB).
5. **Pengajuan Penawaran**: Jika berminat, Mandor mengajukan penawaran harga, estimasi durasi, dan catatan teknis.
6. **Seleksi Admin**: Mandor menunggu hasil evaluasi Admin yang membandingkan beberapa penawaran.
7. **Penetapan Pelaksana**: Jika terpilih, Mandor ditetapkan sebagai pelaksana dan proyek muncul di daftar proyek aktifnya.
8. **Eksekusi Lapangan**: Mandor memimpin tukang mengerjakan proyek di bawah pengawasan Pengawas.
9. **Pelaporan & Pengajuan**: Selama proyek berjalan, Mandor mengajukan material request dan mengisi **Jurnal Mingguan Mandor** secara bertahap.

## Project Posting dan Penawaran Mandor
Admin dapat mempublikasikan proyek ke bursa internal RKK agar bisa dilihat oleh daftar Mandor yang tersedia.

**Isi Penawaran Mandor**:
- **Harga Penawaran**: Total nilai jasa/pekerjaan yang diajukan.
- **Alasan/Perhitungan**: Penjelasan singkat dasar penetapan harga.
- **Estimasi Durasi**: Waktu yang dibutuhkan untuk menyelesaikan pekerjaan.
- **Catatan Pekerjaan**: Syarat teknis atau kebutuhan khusus dari sisi Mandor.

*Status Fitur: Project Posting dan Bidding masih dalam tahap **Planned**.*

## Yang Boleh Dilakukan di Aplikasi
- Melihat Dashboard Mandor dengan statistik penawaran dan proyek aktif.
- Melihat dan mengedit data profil Mandor sendiri (DB-backed).
- Melihat daftar Project Posting yang tersedia.
- Membaca detail proyek (Scope, Gambar Kerja, Ringkasan RAB) yang dibuka oleh Admin.
- Mengajukan harga dan durasi penawaran (Rencana Fitur).
- Mengajukan kebutuhan material (Material Request) (Rencana Fitur).
- Mengisi **Jurnal Mingguan Mandor** (bukti progres dan dokumentasi) (Rencana Fitur).

## Yang Tidak Boleh Dilakukan
- **Ubah RAB/Desain**: Mandor dilarang keras mengubah RAB, scope, atau desain secara sepihak.
- **Ganti Material**: Tidak boleh mengganti spesifikasi material tanpa Change Order yang disetujui.
- **Approval Langsung**: Dilarang menyetujui permintaan tambahan dari Konsumen/PIC di lapangan tanpa melalui sistem/Pengawas.
- **Keputusan Biaya**: Mandor tidak berwenang menentukan termin pembayaran atau biaya tambahan proyek.
- **Rekomendasi Teknis vs Biaya**: Mandor wajib memahami bahwa rekomendasi teknis dari Pengawas (misal: pergeseran posisi item) **tidak otomatis** berarti persetujuan biaya tambahan. Jika rekomendasi tersebut berdampak pada biaya/scope, Mandor dilarang mengerjakannya sebelum ada status **Change Order** resmi.
- **Pembelian Besar**: Tidak boleh melakukan pembelian material skala besar tanpa koordinasi/approval sistem.
- **Self-Approval**: Tidak boleh menetapkan dirinya sendiri sebagai pemenang penawaran.
- **Lompati Alur**: Dilarang memulai pekerjaan fisik di lapangan sebelum status di sistem resmi menjadi pelaksana.

## Status Implementasi Saat Ini
- **Data Mandor DB-backed**: Partial (Fondasi database sudah tersedia).
- **Edit Profil Mandor sendiri**: Tersedia.
- **Melihat Proyek Terkait**: Tersedia (jika sudah ditugaskan/terpilih).
- **Project Posting & Bidding**: Planned.
- **Seleksi Mandor oleh Admin**: Planned.
- **Status Kemitraan (Reguler/Mitra)**: Planned.
- **Material Request Workflow**: Postponed.
- **Verifikasi Jurnal Mingguan & Progres**: Postponed (Ref: jurnal-mingguan-mandor.md).
- **Manajemen Pembayaran Mandor**: Postponed.
- **Change Order Management**: Do Not Build Yet.
- **Auth/JWT/Session/Role Guard**: Do Not Build Yet.

## Catatan untuk Developer / AI Assistant
- Mandor adalah **mitra lapangan**, bukan staf internal (seperti Admin/Pengawas).
- Status **Reguler** dan **Mitra** adalah atribut data pada model Mandor, bukan role otentikasi yang berbeda.
- Jangan membangun fitur penawaran (*bidding*) atau seleksi mandor tanpa instruksi lanjutan (status **Planned**).
- Tetap gunakan prinsip **local-development-first** dengan Switcher persona.
- Segala permintaan perubahan di lapangan dari perwakilan Konsumen (PIC) harus diarahkan Mandor ke Pengawas/Admin untuk masuk alur Change Order resmi.
