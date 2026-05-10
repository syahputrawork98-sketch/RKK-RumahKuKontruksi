# Daftar Fitur & Status Proyek (RKK)

Dokumen ini berisi daftar fitur yang telah diimplementasikan, fitur yang sedang direncanakan, serta batasan pengembangan dalam fase **Local Development CRUD Integration**.

---

## 🚦 Status Umum & Batasan
- **Phase**: Local Development CRUD Integration.
- **Goal**: Menstabilkan alur kerja (workflow) operasional antar role menggunakan database rill.
- **Auth**: Menggunakan **Dev Persona Switcher** (Bukan JWT/Session/Password).
- **Security**: Tidak ada RBAC production; keamanan didasarkan pada pemilihan persona lokal.
- **Production Scope**: Fitur Pembayaran (Payment Gateway), Legalitas (BAST/Kontrak Rill), dan Hosting/Deployment berstatus **Hold/Out of Scope**.

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
- 🛑 **Pusat Audit & Approval Lokal**: Hold / Preparation Only (Audit Log & Profile Approval belum aktif).

### 👔 Admin
- ✅ **Project Activation**: Gatekeeper untuk mengaktifkan proyek dari draft ke berjalan.
- ✅ **RAB Builder**: Membuat struktur biaya, kategori, dan item pekerjaan.
- ✅ **Material Request Distribution**: Validasi dan distribusi material ke lapangan.
- ✅ **Operational Control Summary**: Dashboard ringkasan status operasional proyek.
- ✅ **Project Lifecycle Completion**: Penutupan proyek secara administratif/lokal.

### 🔍 Pengawas (Supervisor)
- ✅ **Verifikasi Progres SOT**: Update manual progres resmi proyek (`verifiedProgress`).
- ✅ **Review Jurnal Mandor**: Validasi aktivitas lapangan secara administratif.
- ✅ **Weekly Report**: Pembuatan laporan mingguan dengan snapshot progres resmi.
- ✅ **Stage Completion**: Menandai kategori pekerjaan (Stage) yang telah selesai.
- ✅ **Work Item Review**: Thread diskusi kualitas per item pekerjaan (Stabilized).
- 🏗️ **Visibility Preparation**: Label customer-visible vs internal-only (Local Hold).

### 👷 Mandor (Foreman)
- ✅ **Jurnal Mingguan**: Pelaporan aktivitas harian dan klaim progres lapangan.
- ✅ **Material Request from RAB**: Permintaan bahan bangunan berdasarkan data RAB.
- ✅ **Work Item Evidence**: Unggah bukti kerja per item pekerjaan.
- ✅ **Experience History**: Riwayat proyek yang pernah dikerjakan secara lokal.

### 🏠 Konsumen (Customer)
- ✅ **Design Request**: Pengajuan permintaan desain baru.
- ✅ **Evidence Thread**: Melihat bukti foto/catatan kerja per item pekerjaan (Role-colored).
- ✅ **Project Transparency**: Pantauan progres resmi (SOT) dan timeline konstruksi.
- ✅ **Design vs Construction Phase**: Pemisahan visual alur desain dan pembangunan.
- ✅ **Project History**: Akses data proyek yang sudah selesai.

### 🎨 Arsitek
- ✅ **Design Collaboration Timeline**: Alur diskusi desain dengan label peran.
- ✅ **Revision Limits**: Pembatasan revisi Major (3x) dan Minor (5x) secara sistematis.
- ✅ **Arsitek Workspace**: Dashboard khusus untuk memantau status tender dan desain aktif.
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

---

## 🚀 Planned / Fitur Berikutnya
- **Local Audit Log v1**: Pencatatan riwayat perubahan data penting.
- **Profile Change Approval**: Alur persetujuan Admin/Superadmin untuk perubahan profil user.
- **Design RAB Draft Polish**: Integrasi estimasi biaya awal pada fase desain.
- **Advanced Superadmin Governance**: Kontrol akun yang lebih granular.

---

## 🛑 Hold / Out of Scope (Sengaja Ditunda)
- **Production Auth**: Login rill, JWT, Reset Password, Session Management.
- **Payment Gateway**: Integrasi bank, Escrow, dan otomatisasi invoice rill.
- **Legal Flow**: Tanda tangan digital, BAST legal, dan kontrak hukum otomatis.
- **Production Infrastructure**: Hosting, CDN, Cloud Storage, dan WebSocket/Chat rill.

---
*Dokumen ini diperbarui secara berkala sesuai dengan milestone pengembangan lokal.*
