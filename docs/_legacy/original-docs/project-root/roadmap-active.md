# Active Roadmap - RKK RumahKu Konstruksi

Dokumen ini mencatat rencana pengembangan aktif setelah Batch 70.

## 🎯 Active Status (Completed)
Roadmap yang telah diselesaikan:
1. **Admin Role Stabilization (Batch 61–70)**: **Completed**. Dashboard, Lifecycle, RAB, Logistics, Issues, Customer, Design, Team Assignment.
2. **Integrated Flow & Transparency Hardening (Batch 71–79)**: **Completed**.
   - **Batch 71**: Supervisor / Admin Integrated Flow.
   - **Batch 72**: Daily Monitoring Cross-Role Polish.
   - **Batch 73**: Field Issue Resolve-vs-Close UX.
   - **Batch 74**: Konsumen Timeline & Transparency Polish.
   - **Batch 75**: Design Request Customer–Architect Polish.
   - **Batch 76-77**: Superadmin Governance & Audit Polish.
   - **Batch 78**: Pengawas Technical Read-only Panels.
   - **Batch 79**: Konsumen Administrative Helper Documents.
3. **Local Polish & Stability (Batch 81–89)**: **Completed**.
   - **Batch 81**: Runtime & Null-Safety Sweep.
   - **Batch 82**: Admin Helper Documents Local CRUD.
   - **Batch 83**: Konsumen Timeline visibility & VerifiedProgress SOT.
   - **Batch 84**: Design Request revision flow (Major/Minor limit).
   - **Batch 85**: Superadmin Governance & Audit Polish.
   - **Batch 86**: Operational Roles Polish (Field Issue wording).
   - **Batch 87**: Seed/Data Scenario Completion.
   - **Batch 88**: Placeholder/Hold wording cleanup.
   - **Batch 89**: Final Feature Closure Pass & StatusBadge harmonization.
4. **Operational Hardening & Analytics (Batch 91–99)**: **Completed**.
   - **Batch 91**: Backend Hard Guards (Field Issue & Helper Docs).
   - **Batch 92**: Daily Operations context & UI polish.
   - **Batch 93**: Operational Analytics v1 (Admin/Superadmin).
   - **Batch 94**: Progress SOT Integrity (VerifiedProgress only).
   - **Batch 95**: Advanced Seed Scenario (Project active-003).
   - **Batch 96**: Design-to-Project bridge eligibility transparency.
   - **Batch 97**: Consumer Transparency (Timeline & Docs status).
   - **Batch 98**: Governance & Status visual regression pass.
   - **Batch 99**: Technical Debt & Build Warning Sweep (Build Pass).
5. **Payment Flow Persistence & Hardening (Batch 101–110)**: **Completed**.
   - **Batch 101-105**: UI workflow & simulation for Customer/Admin/Mandor.
   - **Batch 106**: Backend audit & persistence bridging plan.
   - **Batch 107**: Customer payment persistence (ProjectDocument + PaymentRecord).
   - **Batch 108**: Admin billing persistence (AdministrativeHelperDocument INVOICE).
   - **Batch 109**: Mandor payment persistence (Eligibility + PaymentRecord).
   - **Batch 110**: Final consistency sweep & null-safety hardening.
6. **Latest Checkpoint**: **Batch 111 — Docs Sync + Checkpoint**. (Accepted)

## 🛠️ Next Focus (Post-Batch 111: Local QA, Stability, and Scope Review)
Rekomendasi pengembangan selanjutnya:
- **Payment Local Manual Test Scenario Review**: Dokumentasi dan review skenario pengujian manual untuk seluruh alur pembayaran DB-backed (Customer, Admin, Mandor).
- **Payment Data/Seed Consistency Review**: Audit konsistensi data antara seed dengan alur persistence rill untuk meminimalkan data mismatch.
- **Remaining Local Configuration Persistence Review**: Identifikasi sisa konfigurasi lokal (e.g., Bank Mandor) yang memerlukan transisi ke DB di masa depan.
- **Local Dashboard & Analytics Polish**: Penajaman visualisasi monitoring proyek dan log aktivitas untuk Admin/Superadmin secara bertahap.
- **Technical Debt & Build Maintenance**: Memastikan `npm run build` tetap pass dan codebase tetap bersih dari regresi runtime.
- **Next Feature Priority**: Prioritas fitur baru berikutnya menunggu keputusan dan review dari Room Chat 00.

## 🏗️ Workflow Priority Order
Peta jalan urutan implementasi modul operasional:
1. **Progress SOT**: Inti verifikasi progres resmi lapangan. (Stabilized)
2. **Weekly Journal**: Pelaporan aktivitas harian/mingguan Mandor. (Stabilized)
3. **Daily Workflow**: Penugasan & Pelaporan harian Mandor. (Stabilized)
4. **Supervisor Review**: Validasi jurnal dan inspeksi lapangan. (Hardened)
5. **Field Issue**: Monitoring & Resolusi kendala lapangan. (Hardened)
6. **Design Workflow**: Customer–Architect coordination. (Hardened)
7. **Consumer Transparency**: Timeline, Docs, & Progress. (Hardened)
8. **Payment Flow**: Local billing & payment proof (DB-backed). (Batch 101–110)
9. **Superadmin Governance**: Audit & Persona management. (Hardened)
10. **Analytics & Monitoring**: Managerial operational overview. (Batch 91–100)
11. **Documentation Sync**: Penyelarasan SOP & Workflow Room. (Batch 111 - Checkpoint)

---
*Catatan: Roadmap ini fokus pada penyempurnaan fitur lokal dan stabilitas alur kerja operasional. Terakhir diperbarui: Batch 111.*
