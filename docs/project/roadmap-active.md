# Active Roadmap - RKK RumahKu Konstruksi

Dokumen ini mencatat rencana pengembangan aktif setelah Batch 65.

## 🎯 Active Next (Priority)
Roadmap aktif saat ini:
1. **Admin Role Stabilization (Batch 61–70)**: **Completed**. Dashboard, Lifecycle, RAB, Logistics, Issues, Customer, Design, Team Assignment.
2. **Supervisor Role Stabilization (Batch 00–04)**: **Stabilized**. Monitoring operasional & verifikasi progres resmi lapangan.
3. **Next Milestone**: **Batch 71 — Supervisor / Admin Integrated Flow Hardening**.
4. **Focus**: Sinkronisasi verifikasi progres lapangan (Supervisor) dengan lifecycle proyek administratif (Admin) secara lebih seamless.

## 🛠️ Technical Follow-up
- **Fetch Resilience**: Implementasi `Promise.allSettled` pada dashboard summary.
- **UI/UX Premium Polish**: Micro-interactions pada transisi status proyek.
- **Governance Review**: Audit boundary pada aksi sensitif (e.g. self-assignment, document release).
- **StatusBadge Visual Quality**: Verifikasi konsistensi icon dan warna di semua role pasca-update.

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
11. **Admin Role Stabilization**: Normalisasi Dashboard, Lifecycle, RAB, & Boundaries (Batch 61-70). (Completed)
12. **Next Focus**: **Batch 71 — Supervisor / Admin Integrated Flow Hardening**.

---
*Catatan: Roadmap ini fokus pada penyempurnaan fitur lokal. Production transition (Auth/RBAC) belum masuk dalam prioritas aktif fase ini. Terakhir diperbarui: Batch 70.*

