# Module Inventory

Daftar modul fungsional yang direncanakan untuk backend RumahKu Kontruksi.

| Module | Purpose | Status | Notes |
|---|---|---|---|
| **Auth Module** | Manajemen otentikasi dan login. | PLANNED | Mendukung JWT/Session. |
| **User Module** | Pengelolaan data pengguna. | PLANNED | Termasuk profil dan setting. |
| **Role & Permission** | Pengaturan RBAC (Role-Based Access Control). | PLANNED | Matriks akses dinamis. |
| **Client / Customer** | Database informasi konsumen. | PLANNED | Terintegrasi dengan riwayat proyek. |
| **Project Module** | Inti manajemen data proyek. | PLANNED | Menyimpan data lokasi, klien, dan info umum. |
| **Project Phase** | Manajemen tahapan dan workflow proyek. | PLANNED | Kontrol status per fase. |
| **Estimation / RAB** | Pengelolaan Rencana Anggaran Biaya. | PLANNED | Detail item pekerjaan dan harga. |
| **Contract Module** | Manajemen dokumen kontrak dan kesepakatan. | PLANNED | Versioning dokumen kontrak. |
| **Material Request** | Sistem permintaan material dari lapangan. | PLANNED | Diajukan oleh mandor/pengawas. |
| **Procurement** | Proses pengadaan dan pembelian material. | PLANNED | Verifikasi nota dan supplier. |
| **Daily Report** | Laporan aktivitas harian lapangan. | PLANNED | Diinput oleh mandor. |
| **Weekly Report** | Rekapitulasi laporan mingguan. | PLANNED | Disusun oleh pengawas. |
| **Progress Module** | Perhitungan persentase progres proyek. | PLANNED | Berdasarkan laporan lapangan. |
| **Payment / Termin** | Manajemen termin pembayaran konsumen. | PLANNED | Sinkron dengan progres fisik. |
| **Finance Module** | Pencatatan arus kas operasional proyek. | PLANNED | Khusus untuk penggunaan internal. |
| **File Upload** | Sistem penyimpanan dokumen dan media. | PLANNED | Integrasi Cloud Storage / S3. |
| **Approval Module** | Mesin pemrosesan persetujuan berjenjang. | PLANNED | Digunakan oleh banyak modul lain. |
| **Notification** | Pengiriman notifikasi sistem dan push. | PLANNED | In-app dan email. |
| **Audit Log** | Pencatatan setiap aktivitas penting user. | PLANNED | Immutable log. |
| **Dashboard** | Agregasi data untuk statistik dan reporting. | PLANNED | Data visual untuk Owner/Admin. |
| **Reference Data** | Manajemen data master (Satuan, Tipe Rumah, dll). | PLANNED | Katalog data pendukung. |

> [!NOTE]
> Status seluruh modul saat ini adalah **PLANNED**. Backend belum mulai diimplementasikan.
