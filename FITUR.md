# Daftar Fitur & Status Proyek (RKK)

Dokumen ini berisi daftar fitur yang telah diimplementasikan, fitur yang sedang direncanakan, serta batasan pengembangan dalam fase **Local Development Feature Completion / Local CRUD Integration with production-minded quality**.

---

## 🚦 Status Umum & Batasan
- **Phase**: Local Development Feature Completion with production-minded quality.
- **Goal**: Menstabilkan alur kerja (workflow) operasional antar role menggunakan database rill dalam simulasi lokal.
- **Auth**: Menggunakan **Dev Persona Switcher** (Bukan JWT/Session/Password production).
- **Security**: Tidak ada RBAC production; keamanan didasarkan pada pemilihan persona lokal.
- **Local Scope**: Seluruh modul operasional inti (Superadmin, Admin, Pengawas, Mandor, Konsumen, Arsitek) telah melewati siklus hardening lokal (Batch 81–89).
- **Production Guard**: Production auth, JWT, session, password, register, deployment, dan full RBAC tetap berstatus **Hold / Out of Scope**.

---

## 🏷️ Legend Status
- ✅ **Stabilized / Local Done**: Fitur sudah terintegrasi dengan database dan stabil secara fungsional dalam simulasi lokal.
- 🏗️ **Local Workflow v1/v2**: Fitur dalam tahap pengembangan/polish alur lokal.
- 🕒 **Planned / Next Roadmap**: Masuk dalam rencana pengembangan fase berikutnya.
- 🛑 **Hold / Out of Scope**: Ditahan atau di luar lingkup pengembangan lokal saat ini.

---

## 👥 Fitur Berdasarkan Role

### 🦸 Superadmin
- ✅ **Direktori Persona Lokal**: Manajemen entitas simulasi (CRUD user lokal).
- ✅ **Global Monitoring Summary**: Oversight progres proyek secara global (Read-only).
- ✅ **Pusat Audit & Approval Lokal**: Audit Log & Profile Approval monitoring (Batch 85).
- ✅ **Sensitive Action Highlighting**: Visualisasi aksi kritis di dashboard governance.
- ✅ **Empty/Error State Polish**: UX premium pada direktori data kosong.

### 👔 Admin
- ✅ **Project Lifecycle Management**: Mengelola proyek dari Planning hingga Completion.
- ✅ **RAB & Baseline Builder**: Penyusunan struktur biaya, kategori, dan item pekerjaan.
- ✅ **Material Request Coordination**: Monitoring logistik material berbasis RAB (Batch 86).
- ✅ **Administrative Document Helper**: CRUD draf metadata helper document (Batch 82).
- ✅ **Field Issue Control**: Resolusi administratif kendala lapangan (Resolved-vs-Closed).
- ✅ **Team Assignment**: Penugasan role operasional ke proyek aktif.

### 🔍 Pengawas (Supervisor)
- ✅ **Verifikasi Progres SOT**: Update manual progres resmi proyek (`verifiedProgress`).
- ✅ **Review Jurnal Mandor**: Validasi aktivitas lapangan secara administratif.
- ✅ **Weekly Report**: Pembuatan laporan evaluasi mingguan (Batch 86).
- ✅ **Technical Read-only Panels**: Akses data teknis baseline (RAB, Jadwal, Gambar Kerja).
- ✅ **Field Issue Resolution**: Penandaan status "Resolved" pada kendala teknis lapangan.

### 👷 Mandor (Foreman)
- ✅ **Daily Report & Daily Task**: Checklist dan pelaporan aktivitas harian (Batch 86).
- ✅ **Jurnal Mingguan**: Pelaporan mingguan terhubung dengan kategori RAB & Stage.
- ✅ **Material Request from RAB**: Pengajuan kebutuhan bahan berbasis sisa kuota RAB.
- ✅ **Field Issue Reporting**: Pelaporan kendala teknis dari lapangan.
- ✅ **Weekly Payment Status**: Pantauan kelayakan pembayaran mingguan (Simulasi Lokal).

### 🏠 Konsumen (Customer)
- ✅ **Timeline Visibility**: Pantauan progres resmi (SOT) dan history proyek (Batch 83).
- ✅ **Design Request Flow**: Pengajuan brief dan monitoring revisi desain (Batch 84).
- ✅ **Helper Documents Viewer**: Akses dokumen administratif yang dirilis Admin.
- ✅ **Project Transparency**: Akses bukti foto/catatan kerja per item (Evidence Thread).
- ✅ **In-App Notifications**: Notifikasi perkembangan proyek (Polling simulation).

### 🎨 Arsitek
- ✅ **Design Request Management**: Dashboard koordinasi brief konsumen.
- ✅ **Revision Flow Control**: Pembatasan revisi Major (3) dan Minor (5) (Batch 84).
- ✅ **Design Progress Update**: Pencatatan aktivitas desain ke timeline kolaborasi.
- ✅ **Tender/Bid Simulation**: Alur simulasi penugasan desain proyek.

---

## ⚙️ Workflow Utama (Core Workflows)
1. **Design to Project**: Brief -> Revisi -> Approval -> Bridge ke Draft Proyek.
2. **Project Setup**: Draft Proyek -> RAB Builder -> Stage Planning -> Penugasan Tim.
3. **Construction**: Jurnal Mandor -> Verifikasi Pengawas (SOT) -> Material Request -> Weekly Report.
4. **Transparency**: Evidence Upload -> Supervisor Review -> Consumer Timeline Visibility.
5. **Closure**: Verified Progress 100% -> Project Completion -> History Mode.

---

## 📈 Aturan Progress SOT (Source of Truth)
- **`Project.verifiedProgress`** adalah satu-satunya indikator progres resmi sistem.
- **Update Manual**: Hanya dapat diubah oleh **Pengawas assigned** melalui fitur Verifikasi Progres.
- **No Automation**: Jurnal Mandor, Stage Completion, dan Material Request **TIDAK** mengubah progres resmi secara otomatis untuk menjaga integritas data fisik lapangan.

---

## 💳 Payment Roadmap (Next Phases)
- 🕒 **Payment Record / Termin Monitoring**: Simulasi lokal pencatatan pembayaran (Existing visibility).
- 🕒 **Payment Gateway Integration**: Integrasi gateway pembayaran produksi (Planned).
- 🕒 **Payment Proof Upload**: Fitur unggah bukti bayar oleh konsumen (Planned).
- 🕒 **Invoice Internal Production Flow**: Alur penagihan internal rill (Planned).
- 🛑 **Tax Compliance**: e-Faktur/pajak legal (Out of current scope).

---

## 🛑 Hold / Out of Scope (Sengaja Ditunda)
- **Production Auth**: Login/Register rill, JWT, Reset Password, Session Management.
- **Full Production Security**: Full production RBAC, deployment hardening.
- **Payment Settlement**: Proses settlement keuangan rill (Production context).
- **Tax/Legal Compliance Final**: Kepatuhan pajak/hukum final untuk invoice resmi.
- **Cloud Upload Production**: Integrasi S3/Cloud Storage untuk file besar.
- **Realtime WebSocket**: Komunikasi dua arah instan skala besar.

---
*Terakhir diperbarui: Batch 90 — Docs Sync + Checkpoint.*
