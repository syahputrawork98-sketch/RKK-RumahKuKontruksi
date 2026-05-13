# Batch History 61 - 70

## Admin Role Stabilization Series
(Stabilisasi E2E Admin — In Progress)

---

### Admin Batch 61 — Dashboard & Sidebar Data Source Normalization
- **Status**: Accepted
- **Commit**: `Not recorded`
- **Ringkasan**:
  - Normalisasi statistik Dashboard Admin agar menggunakan data DB/API yang benar.
  - Perbaikan kalkulasi Material Request dari pola `.filter()` ke helper `getGroupedCount` (`_count._all`).
  - Hardening Field Issues stat: menggabungkan `open` + `in_review` sebagai "Kendala Aktif".
  - Perbaikan active state sidebar untuk menu "Dokumen & RAB" (`/admin/rab` ditambah ke `activeStartsWith`).
  - Label: "Kendala Terbuka" → "Kendala Aktif".
  - **Scope**: Frontend only. Tidak ada perubahan backend/schema/seed.

### Admin Batch 62 — Progress SOT & Weekly Report Hardening
- **Status**: Accepted
- **Commit**: `Not recorded`
- **Ringkasan**:
  - Audit dan penguatan wording UI agar Admin tidak terkesan bisa mengubah `verifiedProgress`.
  - `LaporanProgressAdminPage`: Array guard, footer history diperjelas sebagai log Pengawas bukan Admin.
  - `LaporanMingguanPengawasAdminPage`: Array guard, `STATUS_LABELS` mapping Indonesia, null guard untuk `verifiedProgressSnapshot`.
  - `DetailLaporanMingguanPengawasAdminPage`: Section title diperbaiki, label "Progres Dilaporkan (Klaim)" + disclaimer "Bukan verifiedProgress SOT", Snapshot sidebar + disclaimer, Timeline empty state, null guards.
  - Tombol Publish ke Konsumen tetap **Hold/Disabled**.
  - **Scope**: Frontend only. Tidak ada perubahan backend/schema/seed.

### Admin Batch 63 — Material Request Normalization
- **Status**: Accepted
- **Commit**: `Not recorded`
- **Ringkasan**:
  - Normalisasi halaman `/admin/request-material` untuk status flow yang manusiawi.
  - Penambahan `STATUS_CONFIG` map terpusat dengan label Indonesia dan icon.
  - Status labels diperbarui: `submitted` → "Antrean Pengawas", `approved_by_supervisor` → "Perlu Approval Admin", `processing` → "Persiapan Distribusi", dll.
  - Disclaimer tegas: sistem ini adalah koordinasi logistik lokal, bukan procurement/payment produksi.
  - Null guards pada semua field relasi (project, foreman, supervisor, items).
  - Action guard: submitted → info "Awaiting Supervisor", delivered → info "Menunggu Mandor", completed/rejected/cancelled → info "Request Selesai".
  - Sinkronisasi label pada `StatusBadge.jsx` (tipe `material`).
  - Fix: impor `FiX` yang hilang (Pre-Fix Batch 65).
  - **Scope**: Frontend only. Tidak ada perubahan backend/schema/seed.

### Admin Batch 64 — Field Issue / Kendala Lapangan Normalization
- **Status**: Accepted
- **Commit**: `Not recorded`
- **Ringkasan**:
  - Normalisasi halaman `/admin/monitoring/kendala` untuk status flow yang manusiawi.
  - Penambahan tipe `issue` dan `priority` pada `StatusBadge.jsx`.
  - Status labels: `open` → "Terbuka", `in_review` → "Ditinjau", `resolved` → "Terselesaikan", `closed` → "Diarsipkan".
  - Definisi Kendala Aktif: `open` + `in_review`.
  - Penambahan search bar (filter by judul, proyek, deskripsi, pelapor).
  - Tombol "Monitoring Proyek" sekarang navigasi ke `/admin/proyek/:projectId` jika `projectId` tersedia; disabled jika tidak.
  - Wording resolusi prompt diperbaiki; fallback catatan jika kosong.
  - Null guards untuk category, priority, project, foreman.
  - Fix: Route `/admin/projects/` → `/admin/proyek/` (Batch 64 Fix).
  - Fix: Import `React, useState, useEffect` yang terhapus (Batch 64 Fix).
  - **Scope**: Frontend only. Tidak ada perubahan backend/schema/seed.

### Admin Batch 65 — Admin Stabilization Docs Sync
- **Status**: Accepted
- **Commit**: `Not recorded`
- **Ringkasan**:
  - Sinkronisasi dokumentasi setelah Batch 61–64.
  - `docs/project/current-status.md`: Status Admin Role diperbarui ke "Stabilized (Batch 61–64)". Weekly Report Publish dicatat sebagai Hold.
  - `docs/project/hold-and-follow-up.md`: Ditambahkan Hold item spesifik Admin (Weekly Report Publish, Production Procurement). Ditambahkan Follow-up (Field Issue Direct Close, StatusBadge regression, Dashboard CTA). Ditambahkan historical stabilized items untuk Batch 61–64.
  - `docs/project/roadmap-active.md`: Batch 61–64 ditandai Stabilized. Batch 66 ditetapkan sebagai Next Milestone.
  - `docs/modules/admin.md`: Penambahan prinsip SOT, batasan role, dan technical context pasca-hardening.
  - `docs/batches/batch-61-70.md`: Dibuat baru sebagai file histori batch Admin Series.
  - **Scope**: Docs only. Tidak ada perubahan client/server/schema/seed.
