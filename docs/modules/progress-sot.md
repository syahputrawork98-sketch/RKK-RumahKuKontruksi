# Progress Source of Truth (SOT)

Dokumen ini mendefinisikan aturan dan integritas data progres fisik proyek dalam sistem RKK.

## Prinsip Utama
1. **Verified Progress is King**: Progres resmi proyek disimpan dalam field `Project.verifiedProgress`.
2. **Manual Verification**: Progres resmi diperbarui secara manual oleh **Pengawas assigned** setelah melakukan verifikasi fisik di lapangan.
3. **No Automation**: Tidak ada sinkronisasi otomatis dari RAB, Project Stage, atau Jurnal Mandor ke progres resmi proyek. Hal ini untuk mencegah manipulasi data tanpa inspeksi fisik.

## Perbedaan Tipe Progres

| Tipe Progres | Field | Role | Sifat |
| :--- | :--- | :--- | :--- |
| **Official Progress** | `Project.verifiedProgress` | Pengawas | Sumber kebenaran resmi (SOT) |
| **Claimed Progress** | `WeeklyJournal.claimedProgress` | Mandor | Klaim sepihak dari lapangan (Non-Official) |
| **Snapshot Progress**| `WeeklyReport.verifiedProgressSnapshot` | Pengawas | Data historis progres saat laporan dibuat |

## Aturan Integritas
- **Aktivasi**: Aktivasi proyek (Batch 18) tidak mengubah `verifiedProgress`.
- **Material Request**: Pengajuan atau distribusi material (Batch 20) tidak mengubah progres fisik.
- **Stage Completion**: Menandai tahapan pekerjaan (Stage) sebagai selesai tidak otomatis menambah progres total proyek.
- **Timeline Konsumen**: Konsumen selalu melihat `verifiedProgress` sebagai satu-satunya indikator kemajuan proyek yang sah.

## Flow Verifikasi
1. Pengawas melakukan inspeksi fisik di site.
2. Pengawas membuka menu "Verifikasi Progres" di Detail Proyek.
3. Sistem menampilkan konteks pendukung (Jurnal Mandor, RAB, Stage) sebagai rujukan.
4. Pengawas menginput angka progres baru secara manual.
5. Sistem mencatat log perubahan dalam `ProgressVerificationLog`.
