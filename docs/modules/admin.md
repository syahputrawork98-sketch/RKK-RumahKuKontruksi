# Module: Admin - RKK RumahKu Konstruksi

Role Admin berfungsi sebagai pengelola operasional pusat dan jembatan antara kebutuhan Konsumen dengan eksekusi lapangan.

## 🏗️ Tanggung Jawab Utama
- **Project Lifecycle**: Mengelola proyek dari Planning, Activation, hingga Completion.
- **RAB Management**: Menyusun baseline RAB (Plan/Category/Item) sebagai acuan kerja.
- **Material Request Approval**: Melakukan approval akhir dan pemantauan distribusi material.
- **Weekly Report Review**: Meninjau laporan mingguan Pengawas sebelum dipublikasikan ke Konsumen.
- **Field Issue Monitoring**: Memantau eskalasi kendala lapangan dan memastikan resolusi akhir (Archive/Close).
- **Design Management**: Mengelola alur permintaan desain hingga konversi menjadi draf proyek.

## 🛡️ Batasan Role (Boundary)
- **Bukan Verifikator Fisik**: Admin tidak melakukan verifikasi progres fisik di lapangan; wewenang ini eksklusif milik Pengawas.
- **Hold Production**: Fitur pembayaran rill, pembuatan dokumen legal resmi (kontrak/BAST), dan procurement production masih berstatus Hold.

## 📊 Technical Context
- **Services**: `projectService`, `customerService`, `supervisorService`, `foremanService`, `architectService`, `designRequestService`, `designTenderService`, `projectStageCommentService`, `materialRequestService`.
- **Bridge Boundary**: Konversi Design Request hanya menghasilkan draf proyek (`planning`) tanpa aktivasi otomatis.
- **Closeout Validation**: Penyelesaian proyek mensyaratkan progres 100%, seluruh stage selesai, dan tidak ada Material Request aktif.

---
*Status: Database-Backed / Local Dashboard Polish Stabilized.*
