# Alur Bisnis Aktif RKK - RumahKu Konstruksi

Dokumen ini menjelaskan alur operasional end-to-end aplikasi RKK berdasarkan implementasi teknis (Database, API, dan UI) yang ada di repositori saat ini.

## 1. Status Dokumen
- **Fase**: Local Development Feature Completion.
- **Konteks**: Simulasi alur kerja lokal dengan data nyata (Database-backed).
- **Source of Truth**: Schema Prisma, API Map, dan UI Route Aktif.

## 2. Batasan Scope Local Development
- **Autentikasi**: Menggunakan **Developer Persona Switcher** (pilihan role di UI) sebagai pengganti sistem login rill.
- **Keamanan**: Tidak ada JWT, session, atau server-side RBAC yang ketat.
- **Komunikasi**: Berbasis HTTP CRUD standar (non-realtime).
- **Storage**: Penyimpanan file dilakukan secara lokal di folder `server/uploads/`.
- **Finance**: Pencatatan pembayaran bersifat administratif/simulasi (Metadata-only).

## 3. Daftar Role Aktif
| Role | Representasi Entity | Peran Utama |
| :--- | :--- | :--- |
| **Publik** | N/A (Guest) | Pengunjung awal, melihat portofolio/landing page. |
| **Konsumen** | `Customer` | Pemilik proyek, mengajukan desain, memonitor progres. |
| **Arsitek** | `Architect` | Penyedia jasa desain, mengikuti tender, melakukan revisi. |
| **Admin** | `Admin` | Moderator operasional, konversi desain ke proyek, pengelola RAB. |
| **Pengawas** | `Supervisor` | Verifikator progres fisik, reviewer jurnal mandor, pembuat laporan mingguan. |
| **Mandor** | `Foreman` | Pelaksana lapangan, pelapor aktivitas harian, pembuat request material. |
| **Superadmin** | `Superadmin` | Pengelola persona lokal, auditor sistem, pengelola governance. |

## 4. Gambaran Besar Alur End-to-End
Alur bisnis RKK bergerak dari fase pra-konstruksi (Desain) menuju eksekusi lapangan (Konstruksi) hingga penutupan proyek:
`Publik` → `Konsumen` → `Design Request` → `Tender/Arsitek` → `Admin Convert` → `Project Planning (RAB & Stages)` → `Konstruksi (Mandor & Pengawas)` → `Reporting & Verification` → `Project Closeout`.

---

## 5. Fase Operasional Detail

### Fase 1 - Publik / Calon Konsumen
Pengunjung mengakses aplikasi sebagai guest untuk melihat informasi umum layanan konstruksi RKK sebelum memutuskan untuk mendaftar/menjadi konsumen.

### Fase 2 - Konsumen / Customer
User memilih persona Konsumen untuk mendapatkan akses ke dashboard personal. Konsumen dapat melengkapi profil dan melihat riwayat pengajuan mereka.

### Fase 3 - Design Request
Konsumen mengajukan permintaan desain rumah. Data mencakup lokasi, preferensi gaya, budget awal, dan kebutuhan ruang. Status awal: `Submitted`.

### Fase 4 - Arsitek / Tender / Revisi Desain
- Admin mempublikasikan permintaan desain ke sistem **Tender**.
- Arsitek melakukan bidding atau ditunjuk untuk mengerjakan desain.
- Terjadi proses iterasi desain (Revisi) antara Arsitek dan Konsumen.
- Batasan revisi: 3 Major / 5 Minor (Simulasi logika bisnis).

### Fase 5 - Admin Convert Design Request menjadi Project
Setelah desain disetujui, Admin melakukan **Konversi** dari `DesignRequest` menjadi `Project`. Data desain menjadi dasar awal informasi proyek konstruksi.

### Fase 6 - RAB dan Project Stage
Admin menyusun perencanaan detail:
- **RAB (Rencana Anggaran Biaya)**: Terdiri dari `RabCategory` dan `RabItem` (Volume, Satuan, Harga).
- **Project Stage**: Pembagian fase pekerjaan (misal: Fondasi, Dinding, Atap) dengan urutan (`order`) tertentu.

### Fase 7 - Pelaksanaan Lapangan oleh Mandor
Mandor ditugaskan ke proyek aktif. Mandor mengakses dashboard untuk:
- Melihat daftar tugas harian (`DailyTask`).
- Melaporkan progres pekerjaan lapangan.

### Fase 8 - Pengawasan dan Verifikasi oleh Pengawas
Pengawas memantau pekerjaan Mandor. Fitur kritikal:
- **Verifikasi Progres Resmi**: Satu-satunya mekanisme untuk mengubah `Project.verifiedProgress` (Source of Truth).
- **Stage Completion**: Menandai fase pekerjaan (Stage) telah selesai 100% secara administratif.

### Fase 9 - Weekly Report Pengawas dan Review Admin
- Pengawas menyusun **Laporan Mingguan** (`WeeklyReport`) sebagai ringkasan progres dan kondisi site.
- Admin mereview laporan tersebut sebelum dipublikasikan ke timeline Konsumen.

### Fase 10 - Material Request
- Mandor mengajukan permintaan material (`MaterialRequest`) yang terhubung ke `RabItem`.
- Pengawas menyetujui secara teknis, Admin memproses secara distribusi lokal.
- Status: `Submitted` → `Approved` → `Processing` → `Delivered` → `Received`.

### Fase 11 - Field Issue / Kendala Lapangan
- Mandor melaporkan kendala di site (misal: cuaca, kekurangan alat).
- Pengawas atau Admin memberikan respon/resolusi terhadap kendala tersebut.

### Fase 12 - Timeline dan Komunikasi Konsumen
- Konsumen melihat **Timeline** proyek yang berisi milestone penting.
- Konsumen dapat memberikan komentar/diskusi pada level `ProjectStage`.

### Fase 13 - Dokumen Project
- Seluruh dokumen (Foto progres, BAST, Metadata Invoice) diunggah dan dikelola dalam folder proyek.
- Penyimpanan menggunakan sistem file lokal server.

### Fase 14 - Payment Record dan Administrative Helper
- Pencatatan termin pembayaran dilakukan secara manual/simulasi.
- Dokumen seperti BAST atau Invoice bersifat metadata helper untuk mempermudah administrasi lokal.

### Fase 15 - Superadmin dan Governance
- Superadmin mengelola daftar akun/persona yang tersedia di switcher.
- Memantau **Audit Logs** untuk melihat jejak aktivitas sistem.
- Menyetujui permintaan perubahan data sensitif (`ProfileChangeRequest`).

---

## 6. Prinsip Source of Truth Progress (PENTING)
1. **Verified Progress**: Hanya `Project.verifiedProgress` yang dianggap sebagai progres fisik resmi.
2. **Manual Update**: Progres resmi tidak berubah secara otomatis berdasarkan laporan harian mandor atau pembayaran. Perubahan hanya dilakukan melalui form **Verifikasi Progres** oleh Pengawas.
3. **Klaim Mandor**: `claimedProgress` dalam Jurnal Mandor hanya bersifat referensi administratif dan bukti aktivitas, bukan angka progres resmi sistem.
4. **Administrative Snapshot**: Laporan mingguan mengambil snapshot dari `verifiedProgress` saat laporan dibuat.

---

## 7. Catatan Legacy / Archive
Referensi bisnis lama di folder `docs/archive/` atau `docs/old/` mungkin mengandung konsep yang sudah tidak relevan (seperti payment gateway otomatis atau auth rill). Selalu prioritaskan dokumen ini dan skema database aktif sebagai panduan operasional.

---
*Terakhir diperbarui: Batch Alur Bisnis 01.*
