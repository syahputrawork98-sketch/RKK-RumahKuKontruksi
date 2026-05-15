# Daftar Fitur & Status Proyek (RKK)

Dokumen ini berisi daftar fitur yang telah diimplementasikan, fitur yang sedang direncanakan, serta batasan pengembangan dalam fase **Local Development Feature Completion / Local CRUD Integration with production-minded quality**.

---

## 🚦 Status Umum & Batasan
- **Phase**: Local Development Feature Completion with production-minded quality.
- **Goal**: Menstabilkan alur kerja (workflow) operasional antar role menggunakan database rill dalam simulasi lokal.
- **Auth**: Menggunakan **Dev Persona Switcher** (Bukan JWT/Session/Password production).
- **Security**: Tidak ada RBAC production; keamanan didasarkan pada pemilihan persona lokal.
- **Local Scope**: Seluruh modul operasional inti (Superadmin, Admin, Pengawas, Mandor, Konsumen, Arsitek) telah melewati siklus hardening lokal dan integrasi status guard (Batch 91–99).
- **Production Guard**: Production auth, JWT, session, password, register, deployment, dan full RBAC tetap berstatus **Hold / Out of Scope**.

---

## 🏷️ Legend Status
- ✅ **Stabilized / Local Done**: Fitur sudah terintegrasi dengan database, memiliki backend guard, dan stabil secara fungsional dalam simulasi lokal.
- 🏗️ **Local Workflow v1/v2**: Fitur dalam tahap pengembangan/polish alur lokal.
- 🕒 **Planned / Next Roadmap**: Masuk dalam rencana pengembangan fase berikutnya (e.g. Local Reporting & Export).
- 🛑 **Hold / Out of Scope**: Ditahan atau di luar lingkup pengembangan lokal saat ini.

---

## 👥 Fitur Berdasarkan Role

### 🦸 Superadmin
- ✅ **Direktori Persona Lokal**: Manajemen entitas simulasi (CRUD user lokal).
- ✅ **Global Monitoring Summary**: Dashboard statistik operasional global (Batch 93).
- ✅ **Pusat Audit & Approval Lokal**: Audit Log & Profile Approval dengan highlighting aksi sensitif.
- ✅ **Governance Simulation**: Visualisasi status persona (active/inactive/deleted) yang konsisten (Batch 98).

### 👔 Admin
- ✅ **Project Lifecycle Management**: Mengelola proyek dari Planning hingga Completion.
- ✅ **Operational Analytics Dashboard**: Ringkasan harian (Daily Report & Field Issue) (Batch 93).
- ✅ **Design-to-Project Bridge**: Transparansi eligibility konversi desain ke proyek (Batch 96).
- ✅ **Field Issue Control**: Resolusi administratif dengan backend status guard (Batch 91).
- ✅ **Administrative Document Helper**: CRUD draf metadata dengan backend status guard (Batch 91).
- ✅ **Payment Center**: Manajemen tagihan konsumen & verifikasi bukti bayar (DB-backed) (Batch 101–110).
- ✅ **Invoice Draft Helper**: Pembuatan draf invoice menggunakan AdministrativeHelperDocument (Batch 108).

### 🔍 Pengawas (Supervisor)
- ✅ **Verifikasi Progres SOT**: Update manual progres resmi proyek (`verifiedProgress`) (SSOT).
- ✅ **Review Jurnal Mandor**: Validasi aktivitas lapangan dengan konteks progres terverifikasi.
- ✅ **Weekly Report**: Pembuatan laporan evaluasi mingguan.
- ✅ **Field Issue Resolution**: Penandaan status "Resolved" sebagai prasyarat penutupan administratif.

### 👷 Mandor (Foreman)
- ✅ **Daily Report & Daily Task**: Pelaporan harian dengan konteks Proyek/Stage yang informatif (Batch 92).
- ✅ **Jurnal Mingguan**: Pelaporan mingguan terhubung dengan kategori RAB & Stage.
- ✅ **Material Request from RAB**: Pengajuan kebutuhan bahan berbasis sisa kuota RAB.
- ✅ **Field Issue Reporting**: Pelaporan kendala teknis dari lapangan.
- ✅ **Payment Eligibility**: Monitoring kelayakan bayar berbasis review jurnal (ForemanWeeklyPaymentEligibility) (Batch 109).
- ✅ **Payment History**: Monitoring riwayat pembayaran operasional (PaymentRecord FOREMAN_PAYMENT) (Batch 109).

### 🏠 Konsumen (Customer)
- ✅ **Timeline Transparency**: Diferensiasi Design vs Construction timeline (Batch 97).
- ✅ **Helper Documents Viewer**: Akses dokumen administratif berbasis status rilis rill (Batch 97).
- ✅ **Design Request Flow**: Pengajuan brief dan monitoring revisi desain.
- ✅ **Evidence Thread Polish**: Empty state jujur untuk bukti kerja yang belum tersedia (Batch 97).
- ✅ **Payment Monitoring**: Melihat tagihan aktif (PaymentPlan) & riwayat pembayaran (PaymentRecord) (Batch 107).
- ✅ **Payment Proof Upload**: Unggah bukti transfer lokal untuk verifikasi admin (Batch 107).

### 🎨 Arsitek
- ✅ **Design Request Management**: Dashboard koordinasi brief konsumen.
- ✅ **Revision Flow Control**: Pembatasan revisi Major (3) dan Minor (5).
- ✅ **Design Progress Update**: Pencatatan progres aktivitas desain secara periodik.

---

## ⚙️ Workflow Utama (Core Workflows)
1. **Design to Project**: Brief -> Revisi -> Approval -> Bridge Eligibility Check -> Draft Proyek.
2. **Project Setup**: Draft Proyek -> RAB Builder -> Stage Planning -> Penugasan Tim.
3. **Construction**: Jurnal Mandor -> Verifikasi Pengawas (SOT) -> Material Request -> Weekly Report.
4. **Payment Flow**: Tagihan (Plan) -> Upload Bukti (Customer) -> Verifikasi (Admin) -> Record (DB).
5. **Governance**: Audit Log Monitoring -> Sensitive Action Alert -> Status Consistency Pass.

---

## 📈 Aturan Progress SOT (Source of Truth)
- **`Project.verifiedProgress`** adalah satu-satunya indikator progres resmi sistem.
- **Frontend Consistency**: Seluruh dashboard merujuk langsung ke `verifiedProgress` (Batch 94).
- **Update Manual**: Hanya dapat diubah oleh **Pengawas assigned** melalui fitur Verifikasi Progres.
- **No Automation**: Aktivitas harian atau pembayaran **TIDAK** mengubah progres resmi secara otomatis.

---

## 💳 Payment Roadmap (Next Phases)
- ✅ **Local Billing Workflow**: Alur penagihan & bukti bayar lokal DB-backed (Completed Batch 110).
- ✅ **Foreman Disbursement Simulation**: Simulasi pencairan dana mandor (Completed Batch 110).
- 🛑 **Payment Gateway Integration**: Integrasi gateway pembayaran rill (Hold).
- 🛑 **Bank Webhook & Automated Verification**: Verifikasi otomatis via API bank (Hold).

---

## 🛑 Hold / Out of Scope (Sengaja Ditunda)
- **Production Auth**: Login/Register rill, JWT, Reset Password.
- **Production Infrastructure**: Deployment hardening, Full RBAC production.
- **Cloud Storage Production**: Integrasi S3 / Storage rill.
- **Legal Documents Export**: PDF/Export resmi untuk Invoice, Kontrak, & BAST.
- **Weekly Report Publish ke Konsumen**: Menunggu approval Room 00.
- **Realtime WebSocket**: Komunikasi dua arah instan skala besar.

---
*Terakhir diperbarui: Batch 111 — Docs Sync + Checkpoint.*
