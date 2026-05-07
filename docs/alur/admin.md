# Alur Admin

## Status Dokumen
**Draft / Konteks Produk**
Dokumen ini mendefinisikan alur kerja, batas wewenang, dan tanggung jawab role **Admin** dalam ekosistem RumahKu Konstruksi (RKK).

## Definisi Role
Admin adalah satu role internal RKK yang bertindak sebagai penanggung jawab administratif proyek dan penjaga disiplin sistem.

**Prinsip Utama Admin:**
- Admin bukan Admin Proyek, Admin Keuangan, Admin Operasional, atau Admin Lapangan.
- Admin adalah **satu role tunggal** (Admin).
- Admin adalah penjaga alur agar tidak ada proses yang melompati status atau dokumen yang tidak tercatat.
- **Filosofi Approval**: Admin fokus pada pengecualian (*Exceptions*), keputusan finansial, dan interaksi konsumen. Admin tidak perlu memberikan approval manual untuk setiap aktivitas lapangan normal yang sudah tervalidasi oleh Pengawas.

## Posisi Admin dalam Alur RKK
Admin berada di pusat koordinasi administratif. Admin menghubungkan kebutuhan Konsumen dengan kesiapan tim teknis (Arsitek, Pengawas, Mandor) melalui validasi dokumen, kontrak, dan status pembayaran.

## Aturan Maksimal 3 Proyek Aktif
Satu Admin maksimal bertanggung jawab atas **3 proyek aktif**.

**Tujuan aturan ini:**
- Menjaga kualitas kontrol dan ketelitian Admin.
- Mencegah beban kerja berlebih (overload).
- Memastikan dokumen, status, approval, dan pembayaran tiap proyek tetap terpantau dengan detail.
- Menjaga komunikasi administratif dengan Konsumen tetap responsif dan rapi.

**Definisi Proyek Aktif:**
Proyek dihitung sebagai "aktif" sejak fase aktivasi proyek (kontrak disepakati & DP diterima) sampai proyek dinyatakan selesai, serah terima, dibatalkan, atau ditutup secara resmi.

**Konsekuensi:**
- Jika Admin sudah memegang 3 proyek aktif, Admin tidak boleh menerima proyek aktif baru.
- Proyek baru harus dialihkan ke Admin lain atau menunggu salah satu proyek selesai/ditutup.

## Tanggung Jawab Utama
Admin bertanggung jawab penuh atas administrasi proyek yang dipegang, meliputi:
- Pengelolaan data Konsumen dan data pengajuan.
- Pengontrolan dokumen proyek (Gambar Kerja, RAB, Kontrak).
- Validasi status administratif (DP, Termin Pembayaran).
- Pengelolaan status proyek di sistem (Aktivasi, Progress Administratif).
- Komunikasi administratif dengan Konsumen (atau PIC sebagai perwakilan Konsumen).
- Publikasi *Project Posting* untuk Mandor dan seleksi penawaran (sebagai rencana fitur).
- Menjaga agar tidak ada pekerjaan lapangan tanpa dokumen legal dan finansial yang sah.

### Fokus Approval Admin
Admin **Wajib** memberikan Approval manual untuk:
*   Pencairan pembayaran/transfer (Disbursement).
*   *Material Request* yang melebihi budget/RAB (>5%).
*   *Change Order* (Perubahan biaya/scope).
*   Publikasi ringkasan progres ke Konsumen.
*   Aktivasi dan Penutupan proyek.

Admin cukup menerima **Notifikasi** (Tanpa Approval Manual) untuk:
*   Jurnal Mingguan yang sudah *Approved* secara normal oleh Pengawas.
*   Progress rutin yang sesuai dengan rencana jadwal.
*   Laporan mingguan Pengawas tanpa kendala kritikal.
*   *Material Request* urgent/kecil yang sesuai limit operasional.

## Alur Utama Admin
1. **Pendaftaran & Akses**: Admin terdaftar di sistem dan dapat dipilih melalui selector (topbar) pada fase local development.
2. **Dashboard**: Admin memantau daftar proyek dan kapasitas proyek aktif yang sedang dipegang.
3. **Pengelolaan Konsumen**: Admin membuat atau mengelola data Konsumen (karena self-register belum dibuat).
4. **Validasi Pengajuan**: Admin menerima pengajuan (Desain atau Konstruksi) dan memvalidasi data awal (lokasi, budget, status lahan).
5. **Koordinasi Fase Desain**: Jika pengajuan desain, Admin meneruskan brief ke Arsitek dan memantau revisi hingga approval.
6. **Koordinasi Fase Konstruksi**: Admin mengecek kesiapan dokumen (Gambar Kerja, RAB) dan memastikan review internal sesuai standar RKK.
7. **Finalisasi Kontrak**: Admin memastikan RAB final disepakati, kontrak ditandatangani, dan DP diterima.
8. **Aktivasi Proyek**: Admin menyiapkan aktivasi proyek di sistem setelah syarat terpenuhi.
9. **Monitoring Proyek**: Selama proyek berjalan, Admin memantau termin pembayaran, mereview **Jurnal Mingguan Mandor** (sebagai referensi monitoring), mencatat deviasi administratif, dan melakukan eskalasi jika terjadi kendala (misal: keterlambatan pembayaran).
10. **Penutupan**: Admin memastikan seluruh dokumentasi serah terima dan penutupan proyek tercatat lengkap di sistem.

## Admin dan Pengajuan Konsumen
Admin adalah pintu awal masuknya data. Pengajuan dibagi menjadi dua jalur utama:

### 1. Pengajuan Desain
- Admin memvalidasi kelengkapan brief kebutuhan desain.
- Admin memastikan komunikasi antara Konsumen dan Arsitek terdokumentasi.
- Admin memastikan approval desain tercatat sebagai dasar untuk tahap pembangunan.
- **Batas**: Admin tidak mengambil keputusan estetika atau teknis arsitektur.

### 2. Pengajuan Pembangunan / Konstruksi
- Admin memvalidasi data proyek dan mengecek dokumen bawaan Konsumen (jika ada).
- Admin memberikan pemahaman bahwa RAB bawaan Konsumen akan direview ulang menjadi RAB final standar RKK.
- Admin memastikan proyek tidak masuk tahap eksekusi tanpa kontrak sah dan DP.

## Admin dan Aktivasi Proyek
Admin bertanggung jawab memastikan proyek hanya bisa masuk status **Aktif** jika syarat berikut terpenuhi secara kumulatif:
1.  **Personil Lapangan**: Mandor pelaksana dan Pengawas proyek sudah ditugaskan (*Assigned*).
2.  **Legalitas**: Kontrak disepakati dan Gambar Kerja disetujui.
3.  **Finansial**: DP (Down Payment) sudah diterima.
4.  **Baseline**: RAB Final sudah terkunci (*Locked*) dan jadwal mulai sudah ditentukan.

**Prinsip**: Kontrak Sah + DP Diterima + RAB Final Terkunci + Personil Assigned = Proyek Boleh Aktif.

## Admin dan Pembayaran Bertahap
Admin mengelola status administratif pembayaran, bukan sebagai pemegang dana langsung.

**Ketentuan Pembayaran:**
- **DP Awal**: Umumnya 20% dari nilai kontrak (untuk memulai tahap 1).
- **Termin**: Pembayaran selanjutnya dilakukan bertahap berdasarkan progress lapangan atau kategori pekerjaan yang disepakati.
- **Monitoring**: Admin memantau apakah termin sudah dibayar sebelum mengizinkan tahap pekerjaan berikutnya dimulai (secara administratif).
- **Eskalasi**: Jika pembayaran terlambat, Admin berhak menandai status proyek "Menunggu Pembayaran" dan melakukan follow-up administratif.

**Otoritas Skema Pembayaran**:
Admin memiliki otoritas penuh untuk menentukan skema pembayaran yang digunakan oleh Konsumen (Desain, Termin Konstruksi, atau Per Kategori Konstruksi). Pilihan ini didasarkan pada nilai proyek, risiko, dan kesepakatan awal.

## Admin dan Project Posting Mandor
*Fase ini adalah Rencana Fitur (Planned).*

Admin dapat mempublikasikan informasi proyek agar bisa dilihat oleh Mandor:
1. **Membuat Posting**: Berisi lokasi, scope, ringkasan RAB, dan gambar kerja.
2. **Menerima Penawaran**: Mandor mengirimkan harga, estimasi durasi, dan catatan teknis.
3. **Seleksi Mandor**: Admin membandingkan penawaran berdasarkan harga, kualitas riwayat kerja, dan kapasitas Mandor.
4. **Assignment**: Admin menunjuk Mandor yang terpilih untuk proyek tersebut.

## Admin dan Kontrol Dokumen / Approval
Admin adalah kurator dokumen proyek:
- Menjaga agar versi dokumen (RAB/Gambar) tetap rapi dan tidak hilang.
- Memastikan setiap perubahan (Change Order) melalui alur approval yang benar.
- Melarang bypass sistem atau penghapusan histori dokumen.

## Yang Boleh Dilakukan di Aplikasi
- Melihat Dashboard Admin dan kapasitas proyek.
- Mengelola data Konsumen (CRUD).
- Membuat dan mengedit data proyek (sesuai batasan).
- Mengelola status administratif (Aktivasi, Pending, Closed).
- Melihat dokumen proyek, RAB, dan status pembayaran.
- Membuat *Project Posting* untuk Mandor (Planned).
- Membandingkan penawaran Mandor (Planned).
- Melakukan eskalasi administratif jika ada pelanggaran alur (Planned).

## Yang Tidak Boleh Dilakukan
- **Dilarang** membuat sub-role seperti Admin Keuangan atau Admin Proyek.
- **Dilarang** mengubah status proyek tanpa dasar dokumen/pembayaran yang valid.
- **Dilarang** menghapus histori revisi dokumen.
- **Dilarang** memberikan izin pekerjaan lapangan tanpa Kontrak, RAB Final, dan DP.
- **Dilarang** mengambil keputusan teknis lapangan (wewenang Pengawas).
- **Dilarang** mengambil keputusan desain (wewenang Arsitek).
- **Dilarang** mengabaikan keterlambatan pembayaran yang menghambat cashflow proyek.
- **Dilarang** membuat fitur Auth/JWT/Session production dalam fase ini.

## Status Implementasi Saat Ini
- **Data Admin DB-backed**: Partial (Fondasi sudah ada)
- **Topbar Admin Selector**: Partial (Fondasi sudah ada)
- **Relasi Project ke Admin**: Partial (Fondasi sudah ada)
- **Aturan Max 3 Proyek**: Partial (Dasar validasi produk)
- **CRUD Konsumen**: Partial (Fondasi sudah ada)
- **CRUD Project**: Partial (Fondasi sudah ada)
- **Pengajuan Desain/Konstruksi**: Planned
- **Aktivasi Proyek**: Planned
- **Project Posting Mandor**: Planned
- **Penawaran & Seleksi Mandor**: Planned
- **Termin Pembayaran**: Planned
- **Upload Dokumen Production**: Postponed
- **Payment Gateway Production**: Postponed
- **Auth/JWT/Security Production**: Do Not Build Yet

## Catatan untuk Developer / AI Assistant
- Dokumen ini adalah panduan konteks alur, bukan perintah implementasi instan.
- Jangan membangun fitur yang bertanda **Planned, Postponed, atau Do Not Build Yet** tanpa instruksi spesifik.
- Admin adalah role administratif; jangan campur adukkan logic-nya dengan role teknis (Pengawas/Mandor).
- Tetap gunakan prinsip *local-development-first*.
- Pastikan validasi "Max 3 Proyek Aktif" selalu menjadi pengecekan utama saat assign Admin ke Proyek.
