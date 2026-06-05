# F12 — Report / PDF Export System

## Story
Sistem pembuatan dokumen pelaporan fisik/digital (PDF) dari data *verified progress* maupun RAB proyek.

## Status
- **Current Status**: Existing / Needs Verification

## Scope
- Ekspor Laporan Kemajuan Proyek (Progress).
- Ekspor Dokumen Finansial (RAB, Material).

## Role / Modul Terkait
- Admin, Konsumen, Superadmin

## Alur Utama
1. User meminta cetak dokumen melalui dashboard.
2. Sistem mengekstrak SOT progress.
3. Server me-render HTML/Data menjadi format PDF yang dapat diunduh.

## Data / API / Dependency Terkait
- Library PDF generation (misalnya `puppeteer` atau library frontend).

## Status Implementasi Saat Ini
- *Existing / Needs Verification*

## Risiko / Needs Verification
- *Needs Verification*: Pemilihan pustaka ekspor. Library konversi PDF rentan terhadap limit memori di lingkungan server lokal atau *serverless*.

## Next Step
- Verifikasi modul *Report Generation*.
