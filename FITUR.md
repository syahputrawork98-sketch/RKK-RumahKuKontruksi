# Daftar Fitur & Status Proyek (RKK)

Dokumen ini berisi daftar fitur yang telah diimplementasikan, fitur yang sedang direncanakan, serta batasan pengembangan dalam fase **Production-Ready Feature Completion Mode with Developer Persona Switcher**.

---

## 🚦 Status Umum & Batasan
- **Phase**: Production-Ready Feature Completion Mode with Developer Persona Switcher.
- **Goal**: Menstabilkan alur kerja (workflow) operasional antar role menggunakan database rill.
- **Auth**: Menggunakan **Dev Persona Switcher** (Bukan JWT/Session/Password).
- **Security**: Tidak ada RBAC production; keamanan didasarkan pada pemilihan persona lokal.
- **Production Scope**: Fitur Pembayaran, BAST/Legal Helper, dan Cloud Upload sekarang **Allowed for phased implementation**. Production auth, JWT, session, password, register, dan full RBAC berstatus **Hold/Out of Scope**.

---

## 🏷️ Legend Status
- ✅ **Stabilized**: Fitur sudah terintegrasi dengan database dan stabil secara fungsional.
- 🏗️ **Local Workflow v1/v2**: Fitur dalam tahap pengembangan/polish alur lokal.
- 🕒 **Planned**: Masuk dalam rencana batch berikutnya.
- 🛑 **Hold / Out of Scope**: Ditahan atau di luar lingkup pengembangan lokal saat ini.

---

## 👥 Fitur Berdasarkan Role

### 🦸 Superadmin
- ✅ **Direktori Persona Lokal**: Manajemen entitas simulasi (CRUD user lokal).
- ✅ **Global Monitoring Summary**: Oversight progres proyek secara global (Read-only).
- ✅ **Local Persona Governance**: Disclaimer simulasi dan batasan akun lokal.
- ✅ **Pusat Audit & Approval Lokal**: Audit Log & Profile Approval (Database-backed Local Workflow / Stabilized).
- ✅ **Database Activity Logs**: Pencatatan riwayat perubahan data penting secara lokal.

### 👔 Admin
- ✅ **Project Activation**: Gatekeeper untuk mengaktifkan proyek dari draft ke berjalan.
- ✅ **RAB Builder**: Membuat struktur biaya, kategori, dan item pekerjaan.
- ✅ **Material Request Distribution**: Validasi dan distribusi material ke lapangan.
- ✅ **Operational Control Summary**: Dashboard ringkasan status operasional proyek (DB-Backed / Stabilized).
- ✅ **Stage Communication Source Flow**: Sumber update resmi untuk timeline/thread konsumen (Stabilized).
- ✅ **Project Lifecycle Completion**: Penutupan proyek secara administratif/lokal (Action Guarded).
- ✅ **Customer Billing Plan**: Pengaturan termin pembayaran lokal (Local Billing Plan / Simulasi).
- ✅ **Foreman Payment Eligibility**: Penentuan kelayakan pembayaran mandor mingguan (Local Eligibility).
- 🛑 **Audit & Approval formal**: Local Hold / Planned.

### 🔍 Pengawas (Supervisor)
- ✅ **Verifikasi Progres SOT**: Update manual progres resmi proyek (`verifiedProgress`).
- ✅ **Review Jurnal Mandor**: Validasi aktivitas lapangan secara administratif.
- ✅ **Weekly Report**: Pembuatan laporan mingguan dengan snapshot progres resmi.
- ✅ **Stage Completion**: Menandai kategori pekerjaan (Stage) yang telah selesai.
- ✅ **Work Item Review**: Thread diskusi kualitas per item pekerjaan (Stabilized).
- ✅ **Visibility Guard**: Kontrol `isVisibleToCustomer` untuk laporan pengawas (Stabilized).

### 👷 Mandor (Foreman)
- ✅ **Jurnal Mingguan**: Pelaporan aktivitas harian dan klaim progres lapangan.
- ✅ **Material Request from RAB**: Permintaan bahan bangunan berdasarkan data RAB.
- ✅ **Work Item Evidence**: Unggah bukti kerja per item pekerjaan.
- ✅ **Weekly Payment Status**: Pantauan status kelayakan pembayaran mingguan (Read-only).
- ✅ **Experience History**: Riwayat proyek yang pernah dikerjakan secara lokal.

### 🏠 Konsumen (Customer)
- ✅ **Design Request**: Pengajuan permintaan desain baru.
- ✅ **Evidence Thread**: Melihat bukti foto/catatan kerja per item pekerjaan (Role-colored).
- ✅ **Project Transparency**: Pantauan progres resmi (SOT) dan timeline konstruksi berbasis RAB Tree.
- ✅ **Stage Communication Viewer**: Melihat official update dan membalas thread (Local HTTP Thread).
- ✅ **Local Approval Intent**: Memberikan sinyal persetujuan desain (Local-only / Non-legal).
- ✅ **Project History**: Akses data proyek yang sudah selesai (Read-only).
- 🕒 **Payment/Document Download**: Planned for staged implementation.

### 🎨 Arsitek
- ✅ **Design Collaboration Timeline**: Alur diskusi desain dengan label peran.
- ✅ **Revision Limits**: Pembatasan revisi Major (3x) dan Minor (5x) secara sistematis.
- ✅ **Arsitek Workspace**: Dashboard untuk memantau instruksi admin, progres desain, dan status tender.
- ✅ **Design Progress Update**: Pencatatan progres desain lokal ke timeline (Local Workflow).
- ✅ **Design Tender/Bid**: Alur bidding/bidding simulation polished (Local Simulation).

---

## ⚙️ Workflow Utama (Core Workflows)
1. **Design to Project**: Permintaan Desain -> Tender -> Award -> Bridge ke Draft Proyek.
2. **Project Setup**: Draft Proyek -> RAB Builder -> Stage Planning -> Penugasan Tim.
3. **Activation**: Project Activation Gate (Validasi data lengkap).
4. **Construction**: Jurnal Mandor -> Verifikasi Pengawas -> Material Request -> Weekly Report.
5. **Timeline Evidence**: Mandor Upload Evidence -> Pengawas/Admin Review -> Konsumen View.
6. **Completion**: Verified Progress 100% -> Project Closeout -> History Mode.

---

## 📈 Aturan Progress SOT (Source of Truth)
- **`Project.verifiedProgress`** adalah satu-satunya indikator progres resmi.
- **Update Manual**: Hanya dapat diubah oleh **Pengawas assigned** melalui fitur Verifikasi Progres.
- **No Automation**: Jurnal Mandor, Stage Completion, dan Material Request **TIDAK** mengubah progres resmi secara otomatis untuk menjaga integritas data fisik lapangan.
- **Communication Guard**: Stage Communication adalah local thread berbasis HTTP CRUD, bukan realtime chat/websocket.
- **Action Guard**: Proyek dengan status `Selesai` terkunci (Read-only) bagi role lapangan (Mandor/Pengawas).

---

## 🚀 Planned / Fitur Berikutnya
- **Advanced RBAC Simulation**: Simulasi role-based access control yang lebih mendalam secara lokal.
- **Project Document Archive**: Pusat arsip dokumen digital rill (Local DB-backed).
- **UX Soften**: Memperhalus wording "Hold" pada modul payment/detail pekerjaan Konsumen.

---

## 🛑 Hold / Out of Scope (Sengaja Ditunda)
- **Production Auth**: Login/Register rill, JWT, Reset Password, Session Management, dan sistem password penuh.
- **Full Production Security**: Full production RBAC, full user security model, dan deployment hardening.
- *(Catatan: Invoice helper, BAST helper, payment record, gateway integration bertahap, file/cloud upload, dan in-app notification kini diizinkan masuk ke roadmap prioritas secara bertahap (Planned) sesuai definisi Batch 22B, dan dikeluarkan dari status Hold total).*

---
*Dokumen ini diperbarui secara berkala sesuai dengan milestone pengembangan lokal. Arah fundamental Batch 4–6 tersedia di [RAB-Based Construction Workflow & Payment Model](docs/product/rab-based-construction-workflow.md).*
