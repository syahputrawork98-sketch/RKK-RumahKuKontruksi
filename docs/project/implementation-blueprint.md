# RKK Implementation Blueprint

## Tujuan
Menjadi peta besar implementasi **RumahKu Konstruksi (RKK)** setelah sinkronisasi antara alur bisnis, status backend aktual, status frontend aktual, serta ketersediaan data di database.

## Source of Truth (Hierarki Dokumentasi)
1. [**Business Workflow**](../alur/README.md): Sumber logika bisnis utama.
2. [**Backend Role Scope**](../backend/roles/README.md): Batasan akses data di sisi server.
3. [**Frontend Data Source Policy**](../frontend/role-data-source-status.md): Aturan penggunaan data (DB vs Mock).
4. [**Implementation Checklist**](../backend/checklist/README.md) & [**Frontend Checklist**](../frontend/checklist/README.md): Panduan teknis per alur kerja.

## Tingkat Kesiapan Dokumentasi

Untuk memastikan implementasi yang presisi, dokumentasi dibagi menjadi tiga tingkat kedalaman:

- **Level 1 - Blueprint**: Dokumen menjelaskan arah besar, status, dan prinsip (e.g. `implementation-blueprint.md`).
- **Level 2 - Checklist**: Dokumen menjelaskan kebutuhan backend/frontend per workflow secara umum.
- **Level 3 - Implementation Contract**: Dokumen detail yang mencakup Database Contract, API Contract, Status Matrix, Role/Action Matrix, UI Contract, dan Acceptance Criteria.

Saat ini target berikutnya adalah menaikkan workflow prioritas dari Level 2 ke Level 3 secara bertahap.

## Workflow Prioritas (Target Level 3)
1. **Project Progress Source of Truth** (Level 3 - Active Example)
2. **Jurnal Mingguan Mandor** (Level 2 -> Level 3 Target)
3. **Laporan Mingguan Pengawas** (Level 2 -> Level 3 Target)
4. **Progress to Customer** (Level 2 -> Level 3 Target)
5. **Payment Foreman** (Level 2 -> Level 3 Target)
6. **Material Request Finalization** (Experimental -> Level 3 Target)

> [!NOTE]
> Jangan semua workflow dipaksa detail sekaligus untuk menghindari kontradiksi. Project Progress menjadi prioritas utama karena merupakan dasar dari modul payment, laporan, dan publikasi konsumen.

## Peta Jalan Prioritas (Workflow Order)
1. **Project Progress SOT**: Implementasi model verifikasi progres resmi.
2. **Weekly Journal Mandor**: Pelaporan aktivitas dari lapangan.
3. **Supervisor Verification**: Validasi klaim mandor menjadi progres rill.
4. **Supervisor Weekly Report**: Evaluasi mingguan manajemen lapangan.
5. **Progress-to-Customer**: Publikasi progres terpercaya ke pelanggan.
6. **Payment Foreman**: Alur keuangan berbasis capaian kerja.
7. **Material Request Finalization**: Pengetatan alur approval pengadaan.

## Modul yang Dipertahankan (Stable)
- Core CRUD untuk entitas: Customer, Project, Supervisor, Foreman, Architect, Admin, Superadmin.
- Integrasi Persona Switcher (Dev Mode) untuk simulasi peran.
- Sinkronisasi Route Inventory dengan `App.jsx`.

## Modul yang Masih Pending / Experimental
- **Auth/JWT/RBAC**: Keamanan akses rill di sisi server.
- **Operational Workflows**: Seluruh modul pelaporan dan verifikasi lapangan (Checklist status).
- **Design Workflow**: Alur kerja arsitek (Permintaan desain & revisi).
- **Notification System**: Penghubung antar peran saat terjadi aksi penting.

## Aturan Pengembangan
- **Checklist as Guide**: Checklist backend/frontend adalah turunan implementasi, bukan pengganti alur bisnis di `docs/alur/`.
- **Honest Documentation**: Server/client tidak boleh dikembangkan di luar checklist tanpa memperbarui dokumentasi status terlebih dahulu.
