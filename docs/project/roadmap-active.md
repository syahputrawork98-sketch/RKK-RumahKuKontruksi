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
4. **Latest Checkpoint**: **Batch 90 — Docs Sync + Checkpoint**. (Accepted)

## 🛠️ Next Focus (Batch 91+ Candidate Cycle)
Rekomendasi pengembangan selanjutnya (Post-Checkpoint):
- **Backend Hard Guard**: Implementasi hard-guard pada level controller/repository untuk transisi status sensitif (e.g. Field Issue closed, Helper Doc release).
- **Extended Operational Analytics**: Penambahan panel monitoring performa vendor/mandor berbasis history tugas (Local Simulation).
- **Technical Debt Audit**: Review sisa warning pada build client (chunk sizes, CSS unknown rules) dan audit dependensi backend.
- **Advanced Simulation Scenarios**: Pembuatan skenario proyek kompleks (multi-stage overlap, critical issues) untuk menguji ketahanan UI.

## 🏗️ Workflow Priority Order
Peta jalan urutan implementasi modul operasional:
1. **Progress SOT**: Inti verifikasi progres resmi lapangan. (Stabilized)
2. **Weekly Journal**: Pelaporan aktivitas harian/mingguan Mandor. (Stabilized)
3. **Daily Workflow**: Penugasan & Pelaporan harian Mandor. (Hardened)
4. **Supervisor Review**: Validasi jurnal dan inspeksi lapangan. (Hardened)
5. **Field Issue**: Monitoring & Resolusi kendala lapangan. (Hardened)
6. **Design Workflow**: Customer–Architect coordination. (Hardened)
7. **Consumer Transparency**: Timeline, Docs, & Progress. (Hardened)
8. **Superadmin Governance**: Audit & Persona management. (Hardened)
9. **Documentation Sync**: Penyelarasan SOP & Workflow Room. (Batch 90 - Checkpoint)

---
*Catatan: Roadmap ini fokus pada penyempurnaan fitur lokal. Production transition (Auth/RBAC) tetap berstatus **Hold**. Terakhir diperbarui: Batch 90.*
