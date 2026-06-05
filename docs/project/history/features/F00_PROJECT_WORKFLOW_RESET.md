# F00 — Project Workflow Reset

## Story
Proyek RKK memiliki basis kode frontend dan backend yang sudah berjalan secara parsial (dengan fungsionalitas multi-role), tetapi kurangnya dokumentasi manajemen operasional yang terstruktur dapat menyebabkan inkonsistensi saat dikerjakan berkolaborasi antara User dan AI di masa depan. Oleh karena itu, diperlukan pengaturan ulang sistem kerja (workflow reset).

## Status
- **Current Status**: Completed

## Tujuan
Membuat fondasi sistem kerja baru untuk repository RKK agar proyek lebih terarah, terdokumentasi, dan mudah dikendalikan. Sistem kerja ini mengatur alur pengerjaan batch, aturan AI, ukuran tugas, dan struktur direktori `docs/project/`.

## Scope
- Dokumentasi root (`README.md`)
- Direktori `docs/`
- Direktori manajemen di `docs/project/` (onboarding, workflow, history, baseline)

## File yang Dibuat / Diubah
- `README.md`
- `docs/README.md`
- `docs/project/README.md`
- `docs/project/onboarding/CHATGPT_PROJECT_INSTRUCTIONS.md`
- `docs/project/workflow/WORKING_SYSTEM.md`
- `docs/project/workflow/MODEL_USAGE_GUIDE.md`
- `docs/project/history/CURRENT_STATUS.md`
- `docs/project/history/FEATURE_HISTORY.md`
- `docs/project/history/features/F00_PROJECT_WORKFLOW_RESET.md`
- `docs/project/history/features/F01_EXISTING_RKK_BASELINE.md`
- `docs/frontend/README.md`
- `docs/backend/README.md`
- `docs/database/README.md`

## Batasan
- Tidak boleh menyalin atau merujuk identitas/branding dari proyek lain.
- RKK harus independen sebagai proyek tersendiri.
- File konfigurasi, `client/`, dan `server/` tidak boleh diubah.

## Definition of Done
- Semua file dokumentasi berhasil dibuat sesuai dengan format dan aturan.
- Struktur `docs/project` merepresentasikan sistem manajerial yang utuh.
- Panduan peran dan AI onboarding sudah terdefinisi.

## Next Step
- Menyelesaikan baseline existing RKK (F01).
