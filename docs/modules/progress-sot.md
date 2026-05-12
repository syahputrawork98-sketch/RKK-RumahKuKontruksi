# Progress Source of Truth (SOT) - RKK RumahKu Konstruksi

Dokumen ini mendefinisikan aturan otoritas data progres fisik proyek untuk menghindari kerancuan antara klaim lapangan dan data resmi.

## 🛡️ Aturan Utama
1. **`Project.verifiedProgress`** adalah **satu-satunya** sumber progress resmi sistem.
2. **`WeeklyJournal.claimedProgress`** hanyalah klaim Mandor yang bersifat **non-resmi**.
3. **Review/Approval Jurnal Mandor** oleh Pengawas **tidak mengubah** progress resmi.
4. **`SupervisorWeeklyReport.verifiedProgressSnapshot`** hanyalah snapshot administratif saat laporan dibuat, bukan mekanime update progress.
5. **Admin Review/Approve Weekly Report** tidak memiliki wewenang untuk mengubah progress fisik lapangan.
6. **Progress Resmi** hanya dapat berubah melalui modul **Verifikasi Progres** yang dilakukan secara manual oleh **Pengawas assigned**.

## 📊 Technical Field Mapping
| Data | Field Sumber | Otoritas | Keterangan |
| :--- | :--- | :--- | :--- |
| **Progress Resmi** | `Project.verifiedProgress` | Pengawas | Diperbarui via modul Verifikasi Progres. |
| **Pencatat Progress**| `Project.verifiedProgressById` | Pengawas | ID Pengawas yang melakukan verifikasi terakhir. |
| **Progress Tahap** | `ProjectStage.progress` | Pengawas | Diperbarui saat verifikasi tahap pekerjaan. |
| **Verifikator Tahap**| `ProjectStage.verifiedBy` | Pengawas | ID Pengawas yang memverifikasi tahap tersebut. |
| **Log Verifikasi** | `ProgressVerificationLog` | Sistem | Histori detail perubahan persentase progres. |
| **Klaim Mandor** | `WeeklyJournal.claimedProgress` | Mandor | Klaim subjektif, bukan progres resmi. |

## 🔄 Relasi Jurnal vs Laporan
- **WeeklyJournal (Mandor)**: Aktivitas lapangan. Reviewer dicatat di `reviewedById`.
- **SupervisorWeeklyReport (Pengawas)**: Evaluasi mingguan. Merujuk pada jurnal mandor (`SupervisorWeeklyReportJournal`). Reviewer Admin dicatat di `reviewedByAdminId`.

## 🛑 Action Guards (No Progress Impact)
Aksi berikut **TIDAK BOLEH** mengubah `Project.verifiedProgress`:
- Pembuatan/Approval Material Request.
- Pencatatan Pembayaran (Payment Record).
- Penandaan Stage Completion (Penyelesaian Tahap).
- Komentar pada Stage Communication.
- Pengunggahan Dokumen Proyek.
- Pengelolaan Daily Task & Daily Report.
- Pencatatan & Resolusi Field Issue (Kendala Lapangan).

---
*Prinsip: Progres lahir dari verifikasi lapangan nyata, bukan dari administrasi dokumen.*
