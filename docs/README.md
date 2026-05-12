# Documentation - RKK RumahKu Konstruksi

Selamat datang di pusat dokumentasi proyek **RumahKu Konstruksi (RKK)**.

## Project Context & Phase
**Current Phase**: Local Development Feature Completion with production-minded quality.
**Environment**: Localhost only (`localhost:4000` API, `localhost:5173` Client).
**Status**: Project ini membangun fitur bisnis komprehensif dengan standar kualitas produksi, namun **TIDAK** ditujukan untuk production deployment dalam waktu dekat. Fokus utama adalah stabilitas fungsionalitas lokal (CRUD Integration).

---

## 🏗️ Core Source of Truth (SOT)
Dokumen-dokumen berikut adalah rujukan utama yang menggambarkan kondisi sistem saat ini:

### 1. Project Management & Status
- [**Current Status**](./project/current-status.md) - **RUJUKAN UTAMA** kondisi pengembangan terbaru dan milestone aktif.
- [**Implementation Blueprint**](./project/implementation-blueprint.md) - Peta arsitektur dan sinkronisasi fitur besar.
- [**Remaining Hold Features**](./project/remaining-hold-features.md) - Daftar fitur yang ditahan (Hold) atau direncanakan berikutnya.

### 2. Technical Inventory
- [**API Status (Backend)**](./backend/api-status.md) - Daftar endpoint aktual yang tersedia di server.
- [**Role Data Source Status (Frontend)**](./frontend/role-data-source-status.md) - Status integrasi database vs mock per role.
- [**Route Inventory (Frontend)**](./frontend/route-inventory.md) - Daftar rute aplikasi yang aktif.

### 3. Business Logic
- [**Master Workflow**](./alur/README.md) - Logika bisnis utama proyek (Design-to-Construction).
- [**Source of Truth (Database)**](./database/source-of-truth.md) - Definisi integritas data (Progress SOT).

---

## 📜 Historical & Reference Documents
Dokumen berikut bersifat pendukung atau catatan sejarah perkembangan:

- [**Batch History**](./project/batch-history.md) - Catatan lengkap progres batch-by-batch (Batch 1 sampai Batch 44).
- [**Commit Rules**](./project/commit-rules.md) - Panduan standarisasi kontribusi.
- [**Archived Analysis**](./project/admin_gap_analysis.md) - Analisa gap integrasi yang sudah sebagian besar diselesaikan.

---

## 👨‍💻 Arahan Developer Baru
Jika Anda baru bergabung dalam pengembangan RKK, ikuti urutan baca berikut:
1. Pahami **Visi Produk** di [Implementation Blueprint](./project/implementation-blueprint.md).
2. Pahami **Alur Bisnis** di [Master Workflow](./alur/README.md).
3. Cek **Status Terkini** di [Current Status](./project/current-status.md) untuk mengetahui batch apa yang sedang dikerjakan.
4. Gunakan **Dev Persona Switcher** di aplikasi untuk mensimulasikan role tanpa perlu sistem login rill.

---
*Catatan: Project ini mengutamakan stabilitas fungsionalitas lokal sebelum mengimplementasikan sistem autentikasi, security hardening, dan deployment produksi.*
