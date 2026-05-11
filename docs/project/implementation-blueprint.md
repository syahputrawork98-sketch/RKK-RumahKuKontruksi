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
| **Local E2E Workflow v1 / UI Consistency Stabilized** | Flow lokal sudah tersambung end-to-end lintas role dan UI sudah distabilkan untuk Production-Ready Feature Completion Mode with Developer Persona Switcher, tetapi belum production-ready system. |
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
- **Material Request saat ini berstatus Local E2E Workflow v1 / UI Consistency Stabilized**, sehingga boleh dipakai untuk demo local CRUD lintas role tetapi belum boleh dianggap production procurement/warehouse/payment-ready.
- **Auth/JWT/RBAC belum final**, sehingga role docs saat ini adalah blueprint aturan, bukan enforcement server-side yang sudah berjalan.

## Prinsip Material Request

- Material Request sudah memiliki workflow lokal end-to-end lintas Mandor, Pengawas, Admin, dan Superadmin monitoring.
- Status saat ini adalah **Local E2E Workflow v1 / UI Consistency Stabilized**.
- Mandor membuat/submit kebutuhan material.
- Pengawas review/verifikasi kebutuhan lapangan.
- Admin approval dan status distribusi lokal.
- Mandor confirm received saat barang delivered.
- Superadmin hanya read-only monitoring.
- RBAC/auth production belum final; role enforcement masih berbasis dev persona/payload lokal.
- Mandor tidak boleh membeli material bebas tanpa approval sistem.
- Material Request belum boleh dianggap production-ready untuk procurement, warehouse/inventory, supplier comparison, payment/invoice/escrow, atau audit production.

## Tingkat Kesiapan Dokumentasi

Untuk memastikan implementasi yang presisi, dokumentasi dibagi menjadi tiga tingkat kedalaman:

- **Level 1 - Blueprint**: Dokumen menjelaskan arah besar, status, dan prinsip (e.g. `implementation-blueprint.md`).
- **Level 2 - Checklist**: Dokumen menjelaskan kebutuhan backend/frontend per workflow secara umum.
- **Level 3 - Implementation Contract**: Dokumen detail yang mencakup Database Contract, API Contract, Status Matrix, Role/Action Matrix, UI Contract, dan Acceptance Criteria.

Saat ini target berikutnya adalah menaikkan workflow prioritas dari Level 2 ke Level 3 secara bertahap.

## Workflow Prioritas (Target Level 3)
1. **Project Progress Source of Truth** (Level 3 - Active Example / Implemented Local Workflow v1)
2. **Jurnal Mingguan Mandor** (Level 3 - Backend + Frontend Implemented Local v1)
3. **Laporan Mingguan Pengawas** (Backend + Frontend Implemented Local v1)

> [!NOTE]
> Laporan Mingguan Pengawas menjadi workflow berikutnya setelah Jurnal Mingguan Mandor karena laporan ini merangkum jurnal approved dan progress verified menjadi evaluasi resmi untuk Admin. Laporan tidak boleh membuat progress baru, payment, atau publikasi Konsumen secara otomatis.

4. **Progress to Customer** (Level 2 -> Level 3 Target)
5. **Payment Foreman** (Level 2 -> Level 3 Target)
6. **Material Request Local Workflow** (Local E2E Workflow v1 / UI Consistency Stabilized)
7. **Documentation Metadata Foundation** (Implemented Local v1)

> [!NOTE]
> Jangan semua workflow dipaksa detail sekaligus untuk menghindari kontradiksi. Project Progress menjadi prioritas utama karena merupakan dasar dari modul payment, laporan, dan publikasi konsumen.

## Peta Jalan Prioritas (Workflow Order)
1. **Project Progress SOT**: Implementasi model verifikasi progres resmi.
2. **Weekly Journal Mandor**: Pelaporan aktivitas dari lapangan.
3. **Supervisor Verification**: Validasi klaim mandor menjadi progres rill.
4. **Supervisor Weekly Report**: Evaluasi mingguan manajemen lapangan.
5. **Progress-to-Customer**: Publikasi progres terpercaya ke pelanggan.
6. **Payment Foreman**: Alur keuangan berbasis capaian kerja.
7. **Material Request Local Workflow**: Alur kebutuhan material lokal lintas Mandor, Pengawas, Admin, dan Superadmin read-only monitoring.
8. **Documentation Metadata**: Fondasi metadata dokumen dan dokumentasi lapangan (API-backed metadata list).

## Modul yang Dipertahankan (Stable)
- Core CRUD untuk entitas: Customer, Project, Supervisor, Foreman, Architect, Admin, Superadmin.
- Integrasi Persona Switcher (Dev Mode) untuk simulasi peran.
- **Dev Sign-In & Persona Session**: Local development tool untuk memilih role/persona tanpa JWT.
- Sinkronisasi Route Inventory dengan `App.jsx`.

## Modul yang Diizinkan Masuk Roadmap (Allowed for phased implementation)
- **Payment & Finance**: Payment record, gateway preparation, invoice helper.
- **Legal & Document**: BAST helper, legal document helper, document metadata, file/cloud upload.
- **Notification System**: In-app notification, realtime notification bertahap.
- **Operational Workflows**: Seluruh modul pelaporan dan verifikasi lapangan (Checklist status), field issue, daily task.
- **Design Workflow**: Alur kerja arsitek (Permintaan desain & revisi, design file/package).

## Modul yang Tetap Ditunda (Still Excluded Until Auth Phase)
- **Auth/JWT/RBAC**: Login/Register rill, session, password system, full production RBAC, dan keamanan akses rill di sisi server.
- **Security & Deployment**: Deployment hardening dan full security audit.

## Aturan Pengembangan
- **Checklist as Guide**: Checklist backend/frontend adalah turunan implementasi, bukan pengganti alur bisnis di `docs/alur/`.
- **Honest Documentation**: Server/client tidak boleh dikembangkan di luar checklist tanpa memperbarui dokumentasi status terlebih dahulu.
