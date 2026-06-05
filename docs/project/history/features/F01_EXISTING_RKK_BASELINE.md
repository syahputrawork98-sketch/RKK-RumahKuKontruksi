# F01 — Existing RKK Baseline

## Story
Sebelum memulai pengembangan atau refactoring lebih lanjut, penting untuk mencatat kondisi basis kode (codebase) yang ada saat ini. Proyek RKK sudah memiliki implementasi frontend dan backend yang berfungsi parsial, sehingga pemetaan kondisi existing diperlukan agar pengembangan berikutnya tidak merusak fitur yang sudah berjalan.

## Status
- **Current Status**: Completed

## Tujuan
Mencatat kondisi existing repository, arsitektur frontend, arsitektur backend, pemetaan route, dan risiko awal sebelum dilakukan modifikasi fungsionalitas.

## Scope
- Direktori `docs/project/baseline/`

## Ringkasan Kondisi Existing
- Frontend menggunakan React dan Vite.
- Backend menggunakan Node.js dan Express.
- Terdapat multi-role (konsumen, superadmin, admin, pengawas, mandor).
- Database terintegrasi dengan Supabase.
- Dokumentasi teknis sebelumnya kurang lengkap atau tersebar.

## File Baseline Terkait
- `EXISTING_REPOSITORY_STATE.md`
- `EXISTING_FRONTEND_STRUCTURE.md`
- `EXISTING_BACKEND_STRUCTURE.md`
- `EXISTING_ROUTE_MAP.md`
- `EXISTING_RISK_NOTES.md`

## Risiko Awal
Terdapat risiko dari sistem auth yang belum terverifikasi penuh dan struktur hardcoded yang mungkin ada. Modifikasi berikutnya perlu dilakukan secara hati-hati per area.

## Next Step
- Merencanakan batch fungsional berikutnya (Frontend / Backend) berdasarkan prioritas.
