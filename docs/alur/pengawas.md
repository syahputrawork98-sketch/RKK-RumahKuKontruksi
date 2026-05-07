# Alur Pengawas

## Status Dokumen
**Versi**: 1.0 (Local Development Integration Phase)
**Status**: Aktif - Konteks Produk

## Definisi Role
Pengawas adalah staf internal RKK (RumahKu Kontruksi) yang bertugas sebagai representasi teknis dan kontrol kualitas di lokasi proyek (lapangan). Pengawas memastikan bahwa apa yang dikerjakan oleh Mandor sesuai dengan Gambar Kerja, Rencana Anggaran Biaya (RAB), dan standar kualitas RKK.

## Posisi Pengawas dalam Alur Proyek
Pengawas mulai terlibat aktif ketika proyek telah mencapai status **Active** atau siap dieksekusi di lapangan. Pengawas berada di antara Admin (kantor) dan Mandor (lapangan), bertindak sebagai "mata dan telinga" sistem untuk memantau kondisi aktual.

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

## Rekomendasi Teknis Lapangan
Pengawas diperbolehkan memberikan rekomendasi perubahan teknis terbatas jika kondisi aktual lapangan membutuhkan penyesuaian mendesak agar pekerjaan tidak terhenti.

**Contoh Rekomendasi Teknis yang Diperbolehkan**:
- Penyesuaian ukuran minor (misal: pergeseran titik lampu atau pipa < 10cm karena struktur).
- Penyesuaian metode kerja (misal: urutan pengecoran yang lebih efisien).
- Catatan kondisi tanah atau struktur aktual yang berbeda dari asumsi desain.
- Rekomendasi solusi teknis untuk mengatasi kendala fisik kecil di lapangan.

**Batasan Rekomendasi**:
- Harus dicatat dalam sistem dengan alasan teknis yang jelas.
- Dilaporkan kepada Admin untuk pencatatan administratif.
- **Tidak otomatis** menjadi persetujuan biaya tambahan.
- **Tidak boleh** mengganti spesifikasi material tanpa prosedur Change Order.
- **Tidak boleh** menyetujui permintaan Konsumen/perwakilan Konsumen (PIC) secara langsung jika di luar scope.

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
