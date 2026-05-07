# Frontend Roles Documentation

Dokumentasi detail implementasi antarmuka berdasarkan peran (role) pengguna di aplikasi RKK.

| Role | Status | Dokumentasi |
|---|---|---|
| **Guest/Public** | Stable UI | [View Details](./guest/README.md) |
| **Konsumen** | Mock-First / Partial | [View Details](./konsumen/README.md) |
| **Superadmin** | Partial / UI Shell / Entity API Exists | [View Details](./superadmin/README.md) |
| **Admin** | DB-Backed v1 / Operational Mixed | [View Details](./admin/README.md) |
| **Arsitek** | DB-Backed v1 Profile & Dashboard / Design Workflow Mock-First | [View Details](./arsitek/README.md) |
| **Pengawas** | DB-Backed v1 / Operational Backend Pending | [View Details](./pengawas/README.md) |
| **Mandor** | DB-Backed v1 / Operational Backend Pending | [View Details](./mandor/README.md) |

## Catatan Penting
- [**Role Data Source Status**](../role-data-source-status.md): Acuan utama sumber data frontend (DB vs Mock).
- [**Route Inventory**](../route-inventory.md): Daftar lengkap rute aktual di aplikasi.
- [**Frontend Checklist**](../checklist/README.md): Panduan implementasi per alur kerja.

## Filosofi Desain per Role
*   **Guest**: Mengutamakan estetika premium, *trust building*, dan kemudahan informasi layanan.
*   **Konsumen**: Mengutamakan transparansi data, kemudahan monitoring, dan akses dokumen teknis.
*   **Internal (Admin/Staff)**: Mengutamakan efisiensi input data, visibilitas status proyek secara cepat, dan manajemen penugasan.
