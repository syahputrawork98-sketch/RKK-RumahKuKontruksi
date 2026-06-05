# F08 — Mandor Field Report System

## Story
Sistem pencatatan log aktivitas harian oleh Mandor di lapangan, yang mencakup permintaan material ke Pengawas, pelaporan progres teknis (jurnal), dan pencatatan kendala (issue).

## Status
- **Current Status**: Existing / Partial

## Scope
- Input Jurnal Harian.
- Pengajuan *Material Request* lokal.
- Pelaporan kendala lapangan.

## Role / Modul Terkait
- Mandor

## Alur Utama
1. Mandor mengakses dashboard via perangkat *mobile/tablet*.
2. Mandor mengisi jurnal pekerjaan harian dengan lampiran foto bukti.
3. Mandor mengajukan permintaan belanja material (Material Request) kepada Pengawas.
4. Mandor melaporkan isu kritis yang bisa menghambat proyek.

## Data / API / Dependency Terkait
- API `/api/mandor`
- Tabel Operasional (Jurnal).

## Status Implementasi Saat Ini
- *Existing / Partial*

## Risiko / Needs Verification
- *Needs Verification*: Sistem *upload* foto dari mobile dan integrasi penyimpanan *local file upload* melalui `multer`.

## Next Step
- Memverifikasi endpoint upload dan flow Jurnal Harian.
