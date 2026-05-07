# Module Inventory

Daftar modul fungsional yang direncanakan untuk backend RumahKu Kontruksi.

| Module | Purpose | Status | Notes |
|---|---|---|---|
| **Auth Module** | Manajemen otentikasi dan login. | PLANNED | Belum ada Login/JWT. |
| **User Module** | Pengelolaan data pengguna. | PLANNED | Placeholder di database. |
| **Role & Permission** | Pengaturan RBAC. | PLANNED | Belum ada enforcement API. |
| **Client / Customer** | Database informasi konsumen. | **Implemented v0** | **Full CRUD** aktif. |
| **Project Module** | Inti manajemen data proyek. | **Partial** | **Read-Only** aktif. |
| **Project Phase** | Manajemen tahapan proyek. | **Partial** | **Read-Only** aktif. |
| **Estimation / RAB** | Pengelolaan Rencana Anggaran Biaya. | **Partial** | **Read-Only** (3 levels) aktif. |
| **Contract Module** | Manajemen dokumen kontrak. | PLANNED | - |
| **Material Request** | Permintaan material lapangan. | PLANNED | - |
| **Procurement** | Pengadaan material. | PLANNED | - |
| **Daily Report** | Laporan aktivitas harian. | PLANNED | - |
| **Weekly Report** | Rekapitulasi mingguan. | PLANNED | - |
| **Progress Module** | Perhitungan progres fisik. | PLANNED | - |
| **Payment / Termin** | Manajemen termin pembayaran. | PLANNED | - |
| **Finance Module** | Arus kas internal. | PLANNED | - |
| **File Upload** | Penyimpanan dokumen/media. | PLANNED | - |
| **Approval Module** | Mesin persetujuan berjenjang. | PLANNED | - |
| **Notification** | Notifikasi sistem. | PLANNED | - |
| **Audit Log** | Pencatatan aktivitas user. | PLANNED | - |
| **Dashboard** | Agregasi data statistik. | PLANNED | - |
| **Reference Data** | Manajemen data master. | PLANNED | - |

> [!NOTE]
> Status **Implemented v0** berarti modul sudah terhubung ke Database (Prisma) dan memiliki API endpoint yang berfungsi.  
> Status **Partial** berarti baru mendukung operasi Read (GET).  
> **Auth & Role Security** belum diimplementasikan di seluruh modul.
