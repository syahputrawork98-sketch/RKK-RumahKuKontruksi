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

## Batch 16A — Project Planning Bridge Guard & Readiness UI
- **Commit**: `fc36171a8d5159db6027ac8c2b0bbaab9bf71864`
- **Goal**: Memperketat UI readiness untuk manual convert Design Request menjadi Project Draft.
- **Result**:
  - Readiness guard di UI Admin Design Request (Approved status, decision = continue, review done).
  - Convert to Project tetap action manual Admin.
  - Tidak auto-create/auto-activate/auto-assign.
- **Status**: Accepted, Local Only.

## Batch 16B — Project Planning Bridge Backend Guard Hardening
- **Commit**: `6d19877694f460269e16f6f9d08a37c94ed7e168`
- **Goal**: Memperkuat backend guard untuk endpoint convert-to-project.
- **Result**:
  - Validasi ketat (adminId, status approved, decision continue, review exists, no duplicate).
  - Project hasil convert tetap berstatus `planning`.
- **Status**: Accepted, Local Only.

## Batch 17 — Final Assignment Mandor/Pengawas
- **Commit**: `05470f83492d33d517584c18f8526d3911197353`
- **Goal**: Menstabilkan assignment final manual Mandor dan Pengawas ke Project Draft.
- **Result**:
  - Admin dapat mengassign supervisorId dan foremanId secara final ke Project.
  - Penugasan tersimpan permanen di entitas Project.
  - Project tetap planning, tidak activate.
- **Status**: Accepted, Local Only.

## Batch 18 — Project Activation Gate
- **Commit**: `cd6e9bcd0ca8591d1dfa916e58a04a8aa1987075`
- **Goal**: Menambahkan activation gate manual untuk mengubah Project Draft menjadi Active Construction.
- **Result**:
  - Activation gate manual di Admin detail proyek dengan readiness checklist.
  - Project berubah status ke `Berjalan` (active) setelah aktivasi.
  - Tidak auto-activation dari bridge/assignment.
- **Status**: Accepted, Local Only.

## Batch 19 — Timeline & Progress Display Integration
- **Commit**: `512033646123c3a8ff3c040511be990004e5303a`
- **Goal**: Menyelaraskan tampilan timeline dan progress lintas role (Display-only).
- **Result**:
  - Konsumen project list memakai StatusBadge.
  - Timeline Konsumen membedakan tahap Perencanaan, Berjalan, dan Selesai.
  - verifiedProgress tetap sebagai Official Progress SOT.
- **Status**: Accepted, Display-Only.

## Batch 20 — Material Request / Field Operations Stabilization
- **Commit**: `a5fe9e4a0da37e9919c8affa285f20512f90cbc9`
- **Goal**: Menstabilkan alur Material Request sebagai local logistics workflow.
- **Result**:
  - Request material hanya untuk project `Berjalan`.
  - Planning/Selesai project mendapatkan guard/hold.
  - Wording diperjelas sebagai local workflow, bukan procurement/payment production.
- **Status**: Accepted, Local Workflow Stabilization.

## Batch Modularisasi M4 — Project Detail God Page Cleanup
- **Commit**: `e19d086eff2b94c8d56d430d23de0d2aa83ef2d7`
- **Goal**: Modularisasi halaman detail proyek Admin dan Mandor.
- **Result**:
  - `DetailProyekAdminPage.jsx` & `DetailProyekAktifMandorPage.jsx` direfactor menjadi modular.
  - Komponen baru di `client/src/components/admin/project-detail/` dan `client/src/components/mandor/project-detail/`.
  - No behavior change pada activation/material/payment logic.
- **Status**: Accepted, No-Behavior-Change.

## Batch 21 — Field Issue & Escalation Backend Foundation
- **Commit**: `e8578b33528e18a624497921df14ea7bbe4b9164`
- **Goal**: Membuat fondasi backend untuk kendala lapangan (Field Issue).
- **Result**:
  - Model `ProjectIssue` tersedia di Prisma.
  - API `/api/field-issues` aktif.
  - Integrasi Mandor Kendala Lapangan (List & Create).
- **Status**: Accepted, Local Backend Foundation.

## Batch 22 — Project Mode Reframing & Documentation Alignment
- **Commit**: `254490f72e3374bafb7eaed0b539a2b5fdfb5c9f`
- **Goal**: Mengubah framing proyek ke Production-Ready Feature Completion Mode.
- **Result**: Update dokumentasi besar-besaran untuk menyelaraskan visi proyek dengan Developer Persona Switcher.
- **Status**: Accepted, Documentation-Only.

## Batch 22B — Expand Production Feature Scope Boundaries
- **Commit**: `b6d46b8fae0b629b102de07e4b6536a328080633`
- **Goal**: Memperluas batasan fitur produksi yang diizinkan masuk roadmap.
- **Result**: Dokumentasi mencatat bahwa Payment, Invoice, BAST, Upload, dan Notification diizinkan secara bertahap.
- **Status**: Accepted, Documentation-Only.

## Batch 23 — Daily Task & Daily Report Backend-Backed Foundation
- **Commit**: `30fc0789044c19a4a93c18baa303cd8fca349230`
- **Goal**: Membangun fondasi backend untuk aktivitas harian mandor.
- **Result**:
  - Model `DailyTask` dan `DailyReport` tersedia.
  - API `/api/daily-reports` dan `/api/daily-tasks` aktif.
- **Status**: Accepted, Local Backend Foundation.

## Batch 24 — Documentation Metadata Foundation
- **Commit**: `28250a7a5592a16723c24daa8cd1ee9a9f310c47`
- **Goal**: Membangun fondasi metadata dokumen sebelum masuk fase upload binary.
- **Result**:
  - Model `ProjectDocument` tersedia dengan relasi lengkap.
  - API `/api/project-documents` aktif.
  - Halaman Dokumentasi Lapangan Mandor & Pengawas sudah API-backed (metadata list).
  - Seed demo dokumentasi tersedia.
- **Status**: Accepted, Local Backend Foundation (Metadata-only).
## Batch 31 — Core Runtime & Route Smoke Stabilization
- **Goal**: Memperbaiki runtime errors dan route crash pada dashboard utama semua role.
- **Result**: Stabilisasi menu sidebar, perbaikan import path, dan penanganan blank pages saat data kosong/loading.
- **Status**: Accepted, Local Stability.

## Batch 32 — Mandor Weekly Journal Stabilization
- **Goal**: Menstabilkan alur pembuatan Jurnal Mingguan Mandor.
- **Result**: CRUD Jurnal Mingguan API-backed, loading/error states standar, dan proteksi agar pengiriman jurnal tidak mengubah status proyek secara ilegal.
- **Status**: Accepted, Local Workflow Stabilization.

## Batch 33 — Pengawas Journal Review + Progress Verification Stabilization
- **Goal**: Menstabilkan alur review jurnal oleh Pengawas dan verifikasi progres resmi.
- **Result**: Pengawas dapat membuka detail jurnal Mandor, me-review (Approve/Reject), dan memperbarui progres fisik resmi (SOT) dengan konteks Stage & RAB yang akurat.
- **Status**: Accepted, Local Workflow Stabilization.

## Batch 34 — Pengawas Weekly Report + Admin Review Final Stabilization
- **Goal**: Menstabilkan Laporan Mingguan Pengawas dan review oleh Admin.
- **Result**: Laporan Mingguan Pengawas API-backed, Admin review flow (Approved/Revision/Reject) stabil, fitur Publish diletakkan pada status **Hold**, dan Progress SOT dilindungi (Review Admin tidak mengubah progres fisik).
- **Status**: Accepted, Local Workflow Stabilization.

## Batch 35 — Docs Sync Ringan (Checkpoint 31–34)
- **Goal**: Sinkronisasi dokumentasi dan penegasan kembali aturan Progress Source of Truth (SOT).
- **Result**: `current-status.md` dan `remaining-hold-features.md` diperbarui; status Batch 31-34 tercatat resmi.
- **Status**: Accepted, Documentation-Only.
## Batch 36 — Konsumen Dashboard/Profile/Project Monitoring Stabilization
- **Goal**: Menstabilkan dashboard, profil, dan fitur monitoring proyek untuk Konsumen.
- **Result**: Data ditarik dari database lokal (Local CRUD Integration); verifiedProgress tampil sebagai Official Progress.
- **Status**: Accepted.

## Batch 37 — Konsumen Timeline + Stage Communication Polish
- **Goal**: Memperluas fitur monitoring dengan timeline mendalam dan panel komunikasi per tahap (Stage).
- **Result**: Admin-Consumer communication thread (HTTP-based) stabil; visual phase selector (Design vs Construction) aktif.
- **Status**: Accepted.

## Batch 38 — Design Request + Design-to-Project Bridge Stabilization
- **Goal**: Menstabilkan alur konversi Design Request menjadi Project Planning.
- **Result**: Validasi anti-duplikasi diperketat; bridge hanya membuat draft proyek berstatus planning.
- **Status**: Accepted.

## Batch 39 — Superadmin CRUD Final Pass
- **Goal**: Menyelesaikan CRUD persona lokal untuk role Superadmin.
- **Result**: Manajemen user lokal (Admin, Mandor, Pengawas, Arsitek, Konsumen) stabil dengan delete safety.
- **Status**: Accepted.

## Batch 40 — Checkpoint Review
- **Goal**: Melakukan review menyeluruh stabilitas sistem setelah Batch 31-39.
- **Result**: Tidak ada blocker mayor; sistem dinyatakan stabil untuk fase Local Integration.
- **Status**: Accepted.

## Batch 41 — Admin Material Request Follow-up Stabilization
- **Goal**: Memperkuat alur rejection pada Material Request.
- **Result**: Admin wajib menyertakan note saat menolak request; visibility log diperbaiki.
- **Status**: Accepted.

## Batch 42 — UI Consistency Cleanup Across Roles
- **Goal**: Standarisasi loading, empty, dan error state lintas role.
- **Result**: Penggunaan `RoleDataState` dan `RolePersonaEmptyState` diwajibkan; wording dashboard diselaraskan ke "Local Simulation".
- **Status**: Accepted.

## Batch 43 — Final Checkpoint Integration
- **Goal**: Verifikasi akhir seluruh workflow integrasi lokal.
- **Result**: Sistem dinyatakan "Local Feature Complete"; siap untuk fase pendokumentasian dan pembersihan.
- **Status**: Accepted with notes.

## Batch 44 — Docs Inventory & Source-of-Truth Mapping
- **Goal**: Analisa kelayakan folder dokumentasi dan pemetaan rujukan utama (Source of Truth).
- **Result**: Teridentifikasi perlunya refactor folder `docs/` untuk mempertegas index dan menyelaraskan wording project.
- **Status**: Accepted with notes.
