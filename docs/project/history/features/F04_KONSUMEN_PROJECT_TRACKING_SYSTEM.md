# F04 — Konsumen Project Tracking System

## Story
Sistem pelacakan proyek khusus untuk role Konsumen, meliputi pengajuan desain, pembayaran, hingga pemantauan progres pembangunan fisik.

## Status
- **Current Status**: Existing / Partial

## Scope
- Dashboard Konsumen.
- Modul *Design Request* & *Payment*.
- Pemantauan *Verified Progress*.

## Role / Modul Terkait
- Konsumen

## Alur Utama
1. Konsumen melihat status persetujuan desain.
2. Konsumen melakukan pembayaran dan melihat statusnya.
3. Konsumen melihat update SOT progres pembangunan yang disetujui Pengawas.

## Data / API / Dependency Terkait
- `Project.verifiedProgress`
- API `/api/project/konsumen`

## Status Implementasi Saat Ini
- *Existing / Partial*

## Risiko / Needs Verification
- *Needs Verification*: Integritas status pembayaran dan perhitungan desimal tagihan dengan database.

## Next Step
- Verifikasi *codebase* untuk dashboard Konsumen.
