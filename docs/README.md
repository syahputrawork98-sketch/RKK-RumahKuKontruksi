# Documentation - RumahKu Konstruksi

Selamat datang di pusat dokumentasi proyek **RumahKu Konstruksi**. Repository ini diatur secara terstruktur untuk memudahkan navigasi informasi teknis dan manajerial selama fase integrasi CRUD lokal.

### 1. [Project Management & Strategy](./project/)
- [**Implementation Blueprint**](./project/implementation-blueprint.md) - Peta besar hasil sinkronisasi.
- [Current Status](./project/current-status.md) - Kondisi pengembangan terbaru.
- [Commit Rules](./project/commit-rules.md) - Panduan standarisasi kontribusi.

### 2. [Business Workflow / Alur](./alur/)
- [**Master Workflow**](./alur/README.md) - Sumber logika bisnis utama (*Single Source of Truth*).

### 3. [Backend Documentation](./backend/)
- [**Backend Roles**](./backend/roles/README.md) - Scope data per peran.
- [**Backend Checklist**](./backend/checklist/README.md) - Panduan implementasi server.
- [API Status](./backend/api-status.md) - Daftar endpoint aktual.

### 4. [Frontend Documentation](./frontend/)
- [**Role Data Source Status**](./frontend/role-data-source-status.md) - Status integrasi DB vs Mock.
- [**Frontend Checklist**](./frontend/checklist/README.md) - Panduan implementasi UI.
- [Route Inventory](./frontend/route-inventory.md) - Daftar rute aktual aplikasi.

## Alur Baca Dokumentasi
Untuk memahami sistem RKK secara menyeluruh, ikuti urutan berikut:
1. **Bisnis**: Pahami alur di [**docs/alur**](./alur/README.md).
2. **Peta Besar**: Baca [**Implementation Blueprint**](./project/implementation-blueprint.md).
3. **Aturan Peran**: Cek [**Backend Roles**](./backend/roles/README.md) dan [**Frontend Roles**](./frontend/roles/README.md).
4. **Implementasi**: Gunakan [**Backend Checklist**](./backend/checklist/README.md) dan [**Frontend Checklist**](./frontend/checklist/README.md) sebagai panduan pengerjaan kode.

---
*Catatan: Project ini mengutamakan stabilitas fungsionalitas lokal sebelum mengimplementasikan sistem autentikasi dan deployment produksi.*
