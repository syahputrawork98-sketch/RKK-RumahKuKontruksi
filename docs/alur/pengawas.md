# Alur Pengawas

## Status Dokumen
**Versi**: 1.0 (Local Development Integration Phase)
**Status**: Aktif - Konteks Produk

## Definisi Role
Pengawas adalah staf internal RKK (RumahKu Kontruksi) yang bertugas sebagai representasi teknis dan kontrol kualitas di lokasi proyek (lapangan). Pengawas memastikan bahwa apa yang dikerjakan oleh Mandor sesuai dengan Gambar Kerja, Rencana Anggaran Biaya (RAB), dan standar kualitas RKK.

## Posisi Pengawas dalam Alur Proyek
Pengawas mulai terlibat aktif ketika proyek telah mencapai status **Active**. 

**Syarat Proyek Menjadi Active (Pre-Active Requirements):**
Proyek tidak boleh diubah statusnya menjadi **Active** sebelum:
1.  **Mandor Pelaksana** sudah ditetapkan/assigned.
2.  **Pengawas Proyek** sudah ditetapkan/assigned.
3.  **RAB & Scope Baseline** sudah terkunci (*Locked*).
4.  **Jadwal Mulai** dan **Target Selesai** sudah ditentukan.
5.  **Dokumen Kontrak & Gambar Kerja** sudah disetujui Admin.

## Tanggung Jawab Utama
- **Kontrol Kualitas**: Memastikan material dan metode kerja sesuai standar.
- **Monitoring Progres**: Memverifikasi **Jurnal Mingguan Mandor** dan mencatat capaian fisik aktual.
- **Verifikasi Aktual**: Memastikan kondisi lapangan sesuai dengan rencana desain dan gambar kerja.
- **Rekomendasi Teknis**: Memberikan solusi teknis jika ditemukan kendala fisik di lapangan.
- **Pelaporan**: Melaporkan deviasi, kendala, atau progres kepada Admin.

## Alur Utama Pengawas
1. **Registrasi & Akses**: Pengawas terdaftar di database sistem dan dapat mengakses Dashboard Pengawas.
2. **Pemilihan Persona**: Dalam fase pengembangan lokal, Pengawas memilih identitasnya melalui Switcher di Topbar.
3. **Manajemen Profil**: Pengawas dapat melihat dan mengedit data profilnya sendiri (nama, kontak, spesialisasi, bio).
4. **Monitoring Proyek**: Pengawas melihat daftar proyek yang ditugaskan kepadanya.
5. **Review Informasi Proyek**: Pengawas membaca detail proyek termasuk lokasi, scope, Gambar Kerja, dan ringkasan RAB.
6. **Pengawasan Lapangan**: Pengawas hadir di lokasi untuk memantau pekerjaan yang dilakukan oleh tim Mandor.
7. **Pencatatan Kondisi**: Pengawas mencatat progres fisik dan kondisi aktual lapangan (Rencana Fitur).
8. **Penanganan Kendala**: Jika ada ketidaksesuaian rencana, Pengawas membuat catatan atau rekomendasi teknis untuk dilaporkan ke Admin.
9. **Koordinasi Terbatas**: Pengawas berkoordinasi dengan Mandor mengenai teknis pekerjaan, namun tetap menjaga jarak instruksi yang bersifat mengubah biaya/kontrak.

**Klasifikasi Dampak Rekomendasi Teknis**:
Setiap rekomendasi harus diklasifikasikan berdasarkan dampaknya:
1.  **No Cost Impact (Penyesuaian Teknis Murni)**: Pekerjaan boleh dilanjutkan. Dicatat sebagai catatan teknis di laporan.
2.  **Possible Cost Impact**: Admin wajib diberi notifikasi. Perlu review Admin sebelum diklaim sebagai biaya tambahan.
3.  **Must Become Change Order**: Jika dampak biaya atau perubahan scope signifikan, pekerjaan **dilarang** dilanjutkan sebelum ada approval resmi [Change Order](./alur-change-order-perubahan-rab-pekerjaan-tambahan.md).

**Batasan Ketat**:
- Pengawas boleh memberi rekomendasi teknis, namun **dilarang menyetujui biaya tambahan** atau mengubah kontrak secara sepihak.
- Keputusan akhir biaya selalu berada di tangan Admin.

## Yang Boleh Dilakukan di Aplikasi
- Melihat Dashboard Pengawas dengan ringkasan statistik proyek yang diawasi.
- Melihat dan mengedit data profil Pengawas milik sendiri (DB-backed).
- Melihat daftar proyek yang ditugaskan (assigned projects).
- Melihat informasi proyek, Gambar Kerja, dan RAB yang diperlukan untuk pengawasan.
- Mencatat progres fisik atau kondisi lapangan (Rencana Fitur).
- Membuat rekomendasi teknis lapangan (Rencana Fitur).
- Melaporkan kendala lapangan (Rencana Fitur).

## Yang Tidak Boleh Dilakukan
- **Ganti Material**: Pengawas dilarang keras mengganti spesifikasi material tanpa prosedur Change Order resmi.
- **Approval Langsung**: Pengawas tidak boleh menyetujui permintaan tambahan dari Konsumen/PIC secara lisan di lapangan tanpa masuk alur sistem.
- **Keputusan Biaya**: Pengawas tidak memiliki wewenang untuk mengambil keputusan terkait biaya proyek atau termin pembayaran.
- **Ubah Desain Besar**: Pengawas tidak boleh mengubah konsep desain utama tanpa persetujuan Arsitek dan Admin.
- **Ubah Scope Utama**: Pengawas tidak boleh menambah atau mengurangi volume pekerjaan besar tanpa approval Admin.
- **Keputusan Kontrak**: Pengawas tidak boleh membuat kesepakatan yang berdampak pada hukum atau kontrak.
- **Beralih Peran**: Pengawas tidak boleh bertindak sebagai Admin (manajemen keuangan/kontrak) atau Mandor (penyedia tenaga kerja).

## Status Implementasi Saat Ini
- **Data Pengawas DB-backed**: Partial (Fondasi database sudah ada).
- **Edit Profil Pengawas sendiri**: Tersedia.
- **Melihat proyek terkait**: Tersedia (jika sudah ditugaskan di database).
- **Laporan Harian Lapangan**: Postponed.
- **Dokumentasi Foto Lapangan**: Postponed.
- **Pelaporan Kendala Lapangan**: Postponed.
- **Verifikasi Jurnal Mingguan & Progres**: Postponed (Ref: jurnal-mingguan-mandor.md).
- **Approval Biaya & Invoice**: Do Not Build Yet.
- **Change Order Management**: Do Not Build Yet.
- **Auth/JWT/Session/Role Guard**: Do Not Build Yet.

## Catatan untuk Developer / AI Assistant
- Dokumen ini berfungsi sebagai panduan alur produk (business logic), bukan perintah implementasi fitur secara langsung.
- **Dilarang keras** membangun workflow yang ditandai **Postponed** atau **Do Not Build Yet** tanpa instruksi spesifik.
- Tetap gunakan prinsip **local-development-first** (Switcher persona, bukan login).
- Jangan membuat sistem upload file, autentikasi produksi, atau pengerasan keamanan (hardening) pada fase ini.
- Segala bentuk perubahan biaya atau material harus melalui alur Admin, bukan Pengawas.
