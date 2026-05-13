# Active Roadmap - RKK RumahKu Konstruksi

Dokumen ini mencatat rencana pengembangan aktif setelah Batch 65.

## 🎯 Active Next (Priority)
Roadmap aktif saat ini:
1. **Supervisor Role Stabilization (Batch 00–04)**: **Stabilized**. Monitoring operasional & verifikasi progres resmi lapangan.
2. **Admin Role Stabilization (Batch 61–64)**: **Stabilized**. Dashboard, Progress SOT, Weekly Report, Material Request, Field Issue.
3. **Next Milestone**: **Batch 66 — Admin Project Lifecycle Normalization**.
4. **Focus**: Memastikan alur proyek end-to-end (Planning → Activation → Progress → Completion) dari perspektif Admin berfungsi stabil dan konsisten dengan database lokal.

## 🛠️ Technical Follow-up
- **Controlled Database Reset**: Pembersihan dataset untuk memulai simulasi Admin-first yang bersih (jika diperlukan).
- **UI/UX Micro-interactions**: Penambahan animasi transisi pada dashboard Admin.
- **Governance Audit**: Penguatan log aktivitas untuk aksi administratif sensitif (Admin role).
- **StatusBadge Regression Monitor**: Pantau tipe `material`, `issue`, `priority` yang ditambahkan di Batch 63–64.

## 🏗️ Workflow Priority Order
Peta jalan urutan implementasi modul operasional:
1. **Progress SOT**: Inti verifikasi progres resmi lapangan. (Stabilized)
2. **Weekly Journal**: Pelaporan aktivitas harian/mingguan Mandor. (Stabilized)
3. **Daily Workflow**: Penugasan & Pelaporan harian Mandor. (Stabilized)
4. **Supervisor Review**: Validasi jurnal dan inspeksi lapangan. (Stabilized)
5. **Field Issue**: Monitoring & Resolusi kendala lapangan. (Stabilized)
6. **Weekly Report**: Konsolidasi laporan manajerial & publikasi. (Stabilized — Publish: Hold)
7. **Material Request**: Pengadaan material berbasis RAB. (Stabilized — Admin Local Logistics)
8. **Documentation Sync**: Penyelarasan SOP & Workflow Room. (Accepted)
9. **Mandor Role Polish**: Finalisasi alur operasional Mandor (Batch 05). (Accepted)
10. **Supervisor Role Polish**: Stabilisasi Monitoring & Verifikasi (Batch 00-04). (Stabilized)
11. **Admin Dashboard & Sidebar**: Normalisasi statistik & navigasi. (Stabilized — Batch 61)
12. **Admin Progress SOT & Weekly Report**: Hardening SOT wording & admin review. (Stabilized — Batch 62)
13. **Admin Material Request**: Normalisasi logistik lokal. (Stabilized — Batch 63)
14. **Admin Field Issue**: Normalisasi monitoring & resolusi. (Stabilized — Batch 64)
15. **Next Focus**: **Batch 66 — Admin Project Lifecycle Normalization**.

## 🌟 Future Optional
- **Analytics Dashboard v2**: Visualisasi statistik global untuk Superadmin.
- **Support Ticketing System**: Placeholder sistem bantuan internal.

---
*Catatan: Roadmap ini fokus pada penyempurnaan fitur lokal. Production transition (Auth/RBAC) belum masuk dalam prioritas aktif fase ini. Terakhir diperbarui: Batch 65.*
