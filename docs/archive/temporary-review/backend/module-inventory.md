# Module Inventory

Daftar modul fungsional yang direncanakan untuk backend RumahKu Kontruksi.

| Module | Purpose | Status | Notes |
|---|---|---|---|
| **Auth Module** | Manajemen otentikasi dan login. | PLANNED | Belum ada Login/JWT. |
| **User Module** | Pengelolaan data pengguna. | PLANNED | Placeholder di database. |
| **Role & Permission** | Pengaturan RBAC. | PLANNED | Belum ada enforcement API. |
| **Client / Customer** | Database informasi konsumen. | **Implemented v0** | **Full CRUD** aktif. |
| **Supervisor Module** | Manajemen profil & kompetensi pengawas. | **Implemented v1** | **Full CRUD** (Profile, Certs, Exp) aktif. |
| **Project Module** | Inti manajemen data proyek. | **Partial / Refined** | **CRUD** aktif (Filter by SupervisorId). |
| **Project Phase** | Manajemen tahapan proyek. | **Partial** | **Read-Only** aktif. |
| **Estimation / RAB** | Pengelolaan Rencana Anggaran Biaya. | **Partial** | **Read-Only** (3 levels) aktif. |
| **Contract Module** | Manajemen dokumen kontrak. | PLANNED | - |
| **Material Request** | Permintaan material lapangan. | **Experimental** | **Backend Draft** (Prisma + API). |
| **Procurement** | Pengadaan material. | PLANNED | - |
| **Daily Report** | Laporan aktivitas harian. | PLANNED | - |
| **Weekly Journal** | Jurnal aktivitas mandor (Weekly). | **Implemented v1** | **Full CRUD** (Prisma + API) aktif. |
| **Weekly Report** | Rekapitulasi mingguan Pengawas. | **Implemented v1** | **Full CRUD** (Prisma + API) aktif. |
| **Progress Module** | Perhitungan progres fisik resmi. | **Implemented v1** | **DB-Backed (Project.verifiedProgress)**. |
| **Payment / Termin** | Manajemen termin pembayaran. | PLANNED | - |
| **Finance Module** | Arus kas internal. | PLANNED | - |
| **File Upload** | Penyimpanan dokumen/media. | PLANNED | - |
| **Approval Module** | Mesin persetujuan berjenjang. | **Implemented v1** | Terintegrasi di Journal/Report. |
| **Notification** | Notifikasi sistem. | PLANNED | - |
| **Audit Log** | Pencatatan aktivitas user. | **Partial** | History di Material Request. |
| **Dashboard** | Agregasi data statistik. | **Partial** | Terintegrasi di role dashboard. |
| **Reference Data** | Manajemen data master. | PLANNED | - |

> [!NOTE]
> Status **Implemented v0** berarti modul sudah terhubung ke Database (Prisma) dan memiliki API endpoint yang berfungsi.  
> Status **Partial** berarti baru mendukung operasi Read (GET).  
> **Auth & Role Security** belum diimplementasikan di seluruh modul.
