# Progress Verification Tables

Status: Draft / Generated from Prisma schema

## Tujuan Domain
Pencatatan riwayat audit progress fisik resmi untuk keperluan transparansi dan penagihan.

## Model/Tabel

### ProgressVerificationLog / `progress_verification_logs`
**Tujuan**: Mencatat setiap kejadian verifikasi progress fisik yang dilakukan oleh Pengawas.
**Relasi Utama**: Belongs to `Project`, `Supervisor`.
**Dipakai oleh workflow**: Verifikasi Progres Lapangan.
**Catatan penting**: Menyimpan `previous_progress` dan `new_progress` (Float). Data ini menjadi audit trail jika terjadi perubahan progress yang signifikan di level Project.

### Atribut Progress pada Tabel Utama
Selain tabel log khusus, terdapat beberapa kolom kritikal pada tabel utama yang menjadi *Current State* progress:
- **`projects.verified_progress`**: Angka progress fisik resmi terakhir (0-100%).
- **`projects.verified_progress_by_id`**: **Reference Field** (String). ID Supervisor yang melakukan verifikasi terakhir.
- **`project_stages.progress`**: Angka progress per tahap pengerjaan.
- **`project_stages.is_verified`**: Penanda status audit tahap pekerjaan.
- **`project_stages.verified_by`**: **Reference Field** (String). ID Supervisor yang memverifikasi tahap tersebut.
