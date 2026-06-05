# Batch F12 — Report PDF Export System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Report PDF Export System.

## Status
Existing / Verified Frontend

## Story
Sistem pembuatan dokumen pelaporan fisik/digital (PDF) dari data *verified progress* maupun RAB proyek.

## Current State
- Frontend terverifikasi, namun API backend mungkin belum sepenuhnya terintegrasi.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F12A | Report export initial audit | Completed | Verifikasi ketersediaan library PDF | - |
| F12B | RAB PDF export MVP | Completed | Ekspor RAB dari Admin | F12A |
| F12C | RAB PDF export hardening | Completed | Pencegahan error pada payload RAB | F12B |
| F12D | Supervisor Weekly Report PDF MVP | Completed | Ekspor laporan pengawas | F12C |

## HOLD / Blocked Notes
- *Needs Verification*: Pemilihan pustaka ekspor. Library konversi PDF rentan terhadap limit memori di lingkungan server lokal atau *serverless*.

## Next Step
- Mengimplementasikan logika fungsional `jspdf` untuk ekspor dokumen di fitur lain jika dibutuhkan.

## Validation Checklist
- [x] jspdf & jspdf-autotable terintegrasi di client
- [x] Tombol ekspor RAB memproduksi PDF
- [x] Tombol ekspor Supervisor Weekly memproduksi PDF
- [ ] Backend PDF Generator (jika kelak dibutuhkan)

## Notes
- [F12A] Audit awal: dependensi PDF (`jspdf` & `jspdf-autotable`) sudah tersedia di client.
- [F12B] RAB PDF Export MVP dibuat untuk halaman RAB Admin (frontend-only).
- [F12C] UX hardening ekspor PDF RAB; pencegahan error jika data RAB kosong/null.
- [F12D] Export PDF MVP untuk laporan mingguan Pengawas (Supervisor Weekly Report) berhasil diterapkan di antarmuka. Pengerjaan F12 ini murni digerakkan lewat generator client.
