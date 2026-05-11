# Batch History - RKK RumahKu Konstruksi

Dokumen ini mencatat riwayat pengembangan batch-by-batch pada fase *Local Development CRUD Integration*.

## Batch 10 - Post-Design Decision Flow
- **Goal**: Memungkinkan Konsumen mengambil keputusan setelah desain/RAB disetujui.
- **Key Actions**: `customer_post_design_decision`
- **Metadata**:
  - `decision`: `design_only_completed` | `continue_to_construction_preparation`
- **Result**: Flow desain kini memiliki jalur transisi ke konstruksi yang jelas namun tetap administratif (Hold assignment final).

## Batch 11 - Mandor Selection Preparation
- **Goal**: Persiapan shortlist Mandor untuk proyek yang akan masuk fase konstruksi.
- **Key Actions**: `admin_mandor_selection_preparation`
- **Metadata**: `selectedCandidateIds`, `preparationStatus`
- **Result**: Admin bisa melihat database Mandor lokal dan mencatat kandidat potensial dalam history request.

## Batch 12 - Construction Readiness Preparation
- **Goal**: Persiapan kandidat Pengawas dan checklist kesiapan lapangan.
- **Key Actions**: `admin_construction_readiness_preparation`
- **Metadata**: `selectedSupervisorCandidateIds`, `readinessStatus`
- **Result**: Penambahan layer verifikasi kesiapan teknis sebelum proyek benar-benar direncanakan rill.

## Batch 13 - Admin Construction Transition Summary
- **Goal**: Panel ringkasan untuk memantau status transisi Batch 10–12 dalam satu tempat.
- **Result**: Read-only dashboard dalam detail request yang merangkum seluruh kesiapan transisi tanpa mengubah state proyek rill.

## Batch 14 - Local Final Review Gate
- **Goal**: Penanda administratif terakhir sebelum sistem masuk ke bridge project planning.
- **Key Actions**: `admin_construction_transition_review`
- **Result**: Penambahan marker review final yang mengunci rekomendasi langkah selanjutnya (`project_planning_review_only`).

## Batch 15A - Modularisasi Admin Design Request
- **Goal**: Refactor `DesignRequestAdminPage.jsx` (God File) menjadi arsitektur modular.
- **Result**:
  - Main Page sebagai controller/orchestrator.
  - 11+ Panels dipindah ke `components/design/admin/`.
  - Shared Atoms di `components/design/shared/`.
  - Logic parsing dipindah ke `utils/designRequestHistory.js`.
- **Validation**: Build-safe, Lint-safe, No-Behavior-Change.

## Batch Modularisasi M1 — Konsumen Design Request
- **Commit**: `34205022ef14f3fdf8d79179adb3d198d12da82c`
- **Goal**: Refactor `DesignRequestCustomerPage.jsx` menjadi modular components.
- **Result**:
  - File utama turun dari ~715 line menjadi ~302 line.
  - Komponen baru di `client/src/components/konsumen/design-request/`.
- **Status**: Accepted, No-Behavior-Change.

## Batch Modularisasi M2 — Admin RAB
- **Commit**: `6d4fa3ab6cfadacc7b39d802e9efd622935a4294`
- **Goal**: Refactor `DetailRabAdminPage.jsx` (Admin RAB Builder) menjadi modular components.
- **Result**:
  - File utama turun dari ~633 line menjadi ~291 line.
  - Komponen baru di `client/src/components/admin/rab/`.
- **Status**: Accepted, No-Behavior-Change.

## Batch Modularisasi M3 — Role Settings Pengawas/Mandor
- **Commit**: `42c2f6a0fe9709d0b137f04805d92201ad35118e`
- **Goal**: Refactor monolithic Settings pages for Supervisor and Foreman roles.
- **Result**:
  - `PengaturanPengawasPage.jsx` & `PengaturanMandorPage.jsx` dimodularisasi.
  - Komponen shared baru di `client/src/components/role-settings/`.
- **Status**: Accepted, No-Behavior-Change.
