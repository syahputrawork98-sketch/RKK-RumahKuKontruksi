# RKK Implementation Blueprint

## Tujuan
Menjadi peta besar implementasi **RumahKu Konstruksi (RKK)** setelah sinkronisasi antara alur bisnis, status backend aktual, status frontend aktual, serta ketersediaan data di database.

## Source of Truth (Hierarki Dokumentasi)
1. [**Business Workflow**](../alur/README.md): Sumber logika bisnis utama.
2. [**Backend Role Scope**](../backend/roles/README.md): Batasan akses data di sisi server.
3. [**Frontend Data Source Policy**](../frontend/role-data-source-status.md): Aturan penggunaan data (DB vs Mock).
4. [**Implementation Checklist**](../backend/checklist/README.md) & [**Frontend Checklist**](../frontend/checklist/README.md): Panduan teknis per alur kerja.

## Status Label & Definisi
Untuk menjaga kejujuran status implementasi, gunakan label berikut:
- **DB-Backed v1**: Sudah terhubung ke database rill melalui API (Stable).
- **Partial**: Sebagian data rill, sebagian masih mock/placeholder.
- **Shell / Static**: UI sudah ada, namun data masih bersifat simulasi/manual.
- **Mock-First**: Masih menggunakan data dummy dari repositori `mock/`.
- **Experimental Backend Draft**: Terhubung ke backend yang masih dalam tahap draf/uji coba (Belum final).
- **Backend Pending**: UI sudah siap, namun menunggu implementasi API operasional.
- **Postponed / Do Not Build Yet**: Pengembangan modul ditunda secara sengaja.

## Prinsip Utama Implementasi
- **Progres Resmi**: Hanya berasal dari **Verifikasi Pengawas**.
- **Data Progres Mandor**: Bersifat "Klaim" atau aktivitas harian, bukan kebenaran data proyek.
- **Pembayaran Mandor**: Wajib merujuk pada progres yang sudah diverifikasi Pengawas.
- **Dashboard Konsumen**: Hanya menampilkan progres yang telah **Dipublikasikan oleh Admin** setelah diverifikasi Pengawas.
- **Material Request**: Berstatus **Experimental**. Kode yang ada saat ini adalah basis awal, bukan alur produksi final.

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
