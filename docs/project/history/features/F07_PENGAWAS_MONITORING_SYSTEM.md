# F07 — Pengawas Monitoring System

## Story
Sistem operasional bagi Pengawas lapangan yang bertugas mengecek pekerjaan Mandor, menyetujui *Material Request*, menangani laporan *Field Issue*, dan mengunci *Verified Progress* (SOT) setiap minggunya.

## Status
- **Current Status**: Existing / Partial

## Scope
- Modul Persetujuan *Material Request*.
- Modul *Progress SOT Update*.
- Modul penanganan *Field Issue*.

## Role / Modul Terkait
- Pengawas

## Alur Utama
1. Pengawas menerima laporan progres harian dan kendala dari Mandor.
2. Pengawas mengevaluasi *Material Request* dari Mandor, lalu menyetujui atau meneruskannya ke Admin.
3. Pengawas melakukan update `Project.verifiedProgress` yang menjadi *Source of Truth* resmi proyek.

## Data / API / Dependency Terkait
- Integrasi ke SOT `Project.verifiedProgress`.
- Integrasi *Field Issue Guard*.

## Status Implementasi Saat Ini
- *Existing / Partial*

## Risiko / Needs Verification
- *Needs Verification*: Alur eskalasi spesifik untuk `Field Issue Guard`. Jika terjadi kendala fatal, apakah progress terkunci total?

## Next Step
- Validasi modul pelaporan pengawas pada *codebase* backend.
