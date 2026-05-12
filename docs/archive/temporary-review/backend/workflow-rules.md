# Workflow Rules

Dokumen ini mengatur aturan alur kerja (logic) yang harus dipatuhi oleh backend.

## Prinsip Alur Kerja
- **No Jumping**: Status proyek tidak boleh melompat (misal: dari DRAFT langsung ke IN_PROGRESS tanpa APPROVED).
- **Approval Mandatory**: Pekerjaan di lapangan tidak boleh dianggap sah tanpa approval dari Pengawas/Admin.
- **Financial Control**: Pembelian material atau pembayaran termin memerlukan validasi bertingkat.
- **Scope Locking**: Setelah RAB/Kontrak disetujui, perubahan hanya boleh dilakukan melalui mekanisme *Change Order* (Variation Order).
- **Audit Consistency**: Aktivitas penghapusan data tidak boleh menghapus histori (Soft Delete only).

## Status Entitas (Contoh)
Setiap entitas utama (Proyek, Laporan, Approval) harus memiliki status yang jelas:
- **DRAFT**: Data sedang disusun, belum diajukan.
- **SUBMITTED**: Data telah diajukan untuk ditinjau.
- **REVIEWED**: Data sedang dalam proses peninjauan oleh pihak berwenang.
- **REVISE**: Data dikembalikan untuk diperbaiki (memerlukan catatan revisi).
- **APPROVED**: Data telah disahkan dan menjadi acuan.
- **IN_PROGRESS**: Pekerjaan fisik sedang berjalan.
- **ON_HOLD**: Pekerjaan dihentikan sementara.
- **COMPLETED**: Pekerjaan telah selesai 100%.
- **CANCELLED**: Pekerjaan dibatalkan.

## Aturan Approval
Setiap record approval wajib mencatat:
1. `requested_by`: User yang mengajukan.
2. `approved_by`: User yang menyetujui (nullable jika belum).
3. `status`: Current status (SUBMITTED/APPROVED/REJECTED).
4. `timestamp`: Waktu pengajuan dan waktu eksekusi.
5. `notes`: Catatan/alasan approval atau rejection.

## Allowed Actions
Frontend akan menerima daftar tindakan yang diizinkan (`allowed_actions`) dari backend berdasarkan status saat ini dan role user. Contoh:
- `SUBMIT`
- `APPROVE`
- `REJECT`
- `REVISE`
- `START`
- `HOLD`
- `COMPLETE`
- `CANCEL`
