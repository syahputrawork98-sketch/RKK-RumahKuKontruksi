# RKK Implementation Blueprint

## Tujuan
Menjadi peta besar implementasi **RumahKu Konstruksi (RKK)** setelah sinkronisasi antara alur bisnis, status backend aktual, status frontend aktual, serta ketersediaan data di database.

## Source of Truth (Hierarki Dokumentasi)
1. [**Business Workflow**](../alur/README.md): Sumber logika bisnis utama.
2. [**Backend Role Scope**](../backend/roles/README.md): Batasan akses data di sisi server.
3. [**Frontend Data Source Policy**](../frontend/role-data-source-status.md): Aturan penggunaan data (DB vs Mock).
4. [**Implementation Checklist**](../backend/checklist/README.md) & [**Frontend Checklist**](../frontend/checklist/README.md): Panduan teknis per alur kerja.

## Status Label & Definisi

Untuk menjaga dokumentasi tetap jujur terhadap kondisi implementasi, gunakan label berikut:

| Label | Definisi |
|---|---|
| **DB-Backed v1** | Sudah terhubung ke database rill melalui API lokal dan digunakan oleh UI/role terkait. |
| **Local CRUD** | Endpoint CRUD lokal sudah tersedia, tetapi belum berarti workflow bisnis final sudah lengkap. |
| **Partial** | Sebagian data atau UI sudah rill, sebagian masih shell/mock/placeholder. |
| **Shell / Static** | UI atau struktur sudah ada, tetapi belum memakai data dinamis rill. |
| **Mock-First** | Masih menggunakan data dummy/mock sebagai sumber utama. |
| **Experimental Backend Draft** | Backend/model/route sudah ada sebagai draf awal, tetapi alur, RBAC, validasi, dan status transition belum final. |
| **Backend Pending** | UI/dokumen/alur sudah ada, tetapi backend operasional belum tersedia. |
| **Postponed / Do Not Build Yet** | Modul sengaja ditunda dan tidak boleh dibangun pada fase ini. |

## Prinsip Utama Implementasi

Prinsip ini wajib dijaga saat menurunkan alur menjadi backend, frontend, dan database:

- **Alur bisnis tetap menjadi sumber utama**: Semua implementasi harus merujuk ke `docs/alur` terlebih dahulu.
- **Progress resmi proyek hanya berasal dari verifikasi Pengawas**.
- **Jurnal Mandor adalah bukti aktivitas dan klaim awal**, bukan progress resmi proyek.
- **Payment Foreman hanya memakai progress verified**, bukan membuat atau mengubah progress proyek.
- **Laporan Mingguan Pengawas hanya merangkum dan mengevaluasi progress verified**, bukan membuat progress baru.
- **Dashboard Konsumen hanya menampilkan progress verified yang sudah dipublish Admin**.
- **Admin memutuskan publikasi dan keputusan administratif/biaya**, tetapi bukan sumber progress lapangan.
- **Mandor mengeksekusi pekerjaan dan mengirim klaim/data lapangan**, tetapi tidak boleh approve progress, payment, RAB, atau scope.
- **Material Request saat ini berstatus Experimental Backend Draft**, sehingga boleh dipertahankan sebagai basis awal tetapi belum boleh dianggap production-ready.
- **Auth/JWT/RBAC belum final**, sehingga role docs saat ini adalah blueprint aturan, bukan enforcement server-side yang sudah berjalan.

## Prinsip Material Request

- Material Request sudah memiliki draft backend awal, tetapi belum final.
- Status saat ini adalah **Experimental Backend Draft**.
- Kode/model/route yang sudah ada boleh dipertahankan sebagai basis awal.
- Normal vs Urgent flow belum final.
- Approval chain Mandor → Pengawas → Admin belum final.
- RBAC dan status transition belum final.
- Mandor tidak boleh membeli material bebas tanpa approval sistem.
- Material Request belum boleh dianggap production-ready sampai checklist backend/frontend dan aturan alurnya naik ke Level 3.

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
- **Dev Sign-In & Persona Session**: Local development tool untuk memilih role/persona tanpa JWT.
- Sinkronisasi Route Inventory dengan `App.jsx`.

## Modul yang Masih Pending / Experimental
- **Auth/JWT/RBAC**: Keamanan akses rill di sisi server.
- **Operational Workflows**: Seluruh modul pelaporan dan verifikasi lapangan (Checklist status).
- **Design Workflow**: Alur kerja arsitek (Permintaan desain & revisi).
- **Notification System**: Penghubung antar peran saat terjadi aksi penting.

## Aturan Pengembangan
- **Checklist as Guide**: Checklist backend/frontend adalah turunan implementasi, bukan pengganti alur bisnis di `docs/alur/`.
- **Honest Documentation**: Server/client tidak boleh dikembangkan di luar checklist tanpa memperbarui dokumentasi status terlebih dahulu.
