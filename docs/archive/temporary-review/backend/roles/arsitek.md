# Backend Role - Arsitek

## Status
**DB-Backed v1** untuk Profil dan Dashboard. Alur kerja desain (*Design Workflow*) masih berstatus *Backend Pending*.

## Data Scope
- [x] Boleh membaca dan memperbarui data profil Arsitek.
- [x] Boleh mengelola data Sertifikat dan Pengalaman kerja.
- [ ] Boleh melihat permintaan desain (Planned).

## Entity / Model Terkait
- `Architect`, `Certificate`, `Experience`, `DesignRequest` (Planned).

## Endpoint Terkait
- `/api/architects`
- `/api/architects/:id/certificates`
- `/api/architects/:id/experiences`

## Allowed Actions
- [x] Update data profil profesional.
- [x] Menambah/menghapus data riwayat sertifikasi dan pengalaman.
- [ ] Mengunggah file desain (Planned).

## Forbidden Actions
- [ ] Menganggap alur kerja permintaan desain dan revisi sudah terhubung ke database.
- [ ] Menggunakan data mock sebagai fallback untuk bagian profil yang sudah DB-backed.

## Workflow Terkait
- Manajemen Profil Profesional.
- Alur Kerja Desain & Revisi (Planned).

## Belum Final / Backend Pending
- Modul Permintaan Desain (*Design Requests*).
- Modul Manajemen File & Revisi Desain.

## Catatan Sinkronisasi
Fokus saat ini adalah memastikan data profil arsitek sudah rill dari database. Seluruh alur pengerjaan desain masih menggunakan data simulasi di frontend.
