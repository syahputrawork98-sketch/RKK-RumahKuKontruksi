# Database Entity Plan

Rencana entitas database untuk backend RumahKu Kontruksi. Dokumen ini hanya berupa pemetaan logika, bukan skema fisik (Prisma).

| Entity | Purpose | Relasi Utama | Catatan |
|---|---|---|---|
| **User** | Data akun pengguna. | Role | Identitas login. |
| **Role** | Definisi peran (Admin, Mandor, dll). | Permission | Hak akses grup. |
| **Permission** | Detail izin spesifik. | Role | Level aksi (create_project, dll). |
| **ClientProfile** | Informasi detail konsumen/klien. | User, Project | Data tambahan khusus klien. |
| **Project** | Inti data proyek konstruksi. | Client, Member | Master data proyek. |
| **ProjectPhase** | Tahapan dalam sebuah proyek. | Project | Terminologi workflow per proyek. |
| **ProjectMember** | User yang ditugaskan ke proyek. | Project, User | Menentukan mandor/pengawas. |
| **Estimation** | Rencana Anggaran Biaya (RAB). | Project | Header anggaran. |
| **EstimationItem** | Detail item pekerjaan dalam RAB. | Estimation | Item pekerjaan, volume, harga. |
| **Contract** | Data kontrak hukum. | Project | File PDF dan status tanda tangan. |
| **Material** | Katalog material bangunan. | - | Master data harga material. |
| **MaterialRequest** | Permintaan material dari lapangan. | Project, User | Diajukan Mandor. |
| **Procurement** | Realisasi pembelian material. | MaterialRequest | Pencatatan nota dan pengeluaran. |
| **DailyReport** | Laporan harian aktivitas fisik. | Project, User | Foto progres harian. |
| **WeeklyReport** | Rekapitulasi mingguan. | Project, DailyReport | Evaluasi progres mingguan. |
| **ProgressReport** | Kalkulasi persentase progres. | Project | Data visual progres. |
| **Payment** | Catatan pembayaran dari klien. | Project, Invoice | History transaksi. |
| **Invoice** | Tagihan termin kepada klien. | Project | Dokumen tagihan. |
| **Document** | Penyimpanan file digital. | Project | Gambar IMB, Denah, dll. |
| **Approval** | History persetujuan (Log). | Entity terkait | Polymorphic relationship. |
| **Notification** | Data notifikasi user. | User | Pesan in-app. |
| **AuditLog** | Jejak aktivitas sistem. | User | Data log sistem. |
| **Supplier** | Data vendor/toko material. | Procurement | Partner pengadaan. |

> [!CAUTION]
> **Dilarang** membuat file `schema.prisma` atau melakukan migrasi database pada tahap ini.  
> Perencanaan ini hanya bersifat blueprint dokumentatif.
