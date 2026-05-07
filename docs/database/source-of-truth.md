# Source of Truth Data

Dokumen ini menjelaskan aturan otoritas data dalam sistem RKK untuk menghindari kerancuan antara data klaim dan data resmi.

## 1. Otoritas Progress Proyek
Progress proyek di RKK memiliki aturan yang sangat ketat mengenai siapa yang berhak mengubahnya.

| Data | Field Sumber | Otoritas | Keterangan |
|------|--------------|----------|------------|
| **Progress Resmi (Global)** | `Project.verifiedProgress` | **Pengawas** | Update dilakukan melalui modul Verifikasi Progres. |
| **Pencatat Progress** | `Project.verifiedProgressById` | **Pengawas** | **Reference Field**: Menyimpan ID Pengawas yang verifikasi terakhir. |
| **Progress Tahap** | `ProjectStage.progress` | **Pengawas** | Diupdate saat verifikasi tahap pekerjaan. |
| **Verifikator Tahap** | `ProjectStage.verifiedBy` | **Pengawas** | **Reference Field**: Menyimpan ID Pengawas yang verifikasi tahap. |
| **Log Verifikasi** | `ProgressVerificationLog` | **Sistem** | **Formal Relation**: Histori detail perubahan % progress. |
| **Klaim Mandor** | `WeeklyJournal.claimedProgress` | **Mandor** | Bersifat subjektif, bukan progress resmi sistem. |

> [!WARNING]
> **Klaim Mandor** (`claimedProgress`) tidak secara otomatis mengupdate `Project.verifiedProgress`. Data ini hanya digunakan sebagai dasar Pengawas untuk melakukan inspeksi lapangan.

## 2. Jurnal vs Laporan
Sistem memisahkan antara bukti aktivitas harian dengan evaluasi mingguan.

- **WeeklyJournal (Mandor)**: Data mentah aktivitas. Status `Approved` berarti aktivitas diakui. Reviewer dicatat di `reviewedById` (Reference Field).
- **SupervisorWeeklyReport (Pengawas)**: Data evaluasi. Merujuk pada jurnal mandor (`SupervisorWeeklyReportJournal`). Reviewer Admin dicatat di `reviewedByAdminId` (Reference Field).

## 3. Material Request
- Sumber data kuantitas material yang valid untuk proyek adalah `RabItem.volume`.
- `MaterialRequestItem` harus merujuk pada `RabItem` jika item tersebut ada dalam perencanaan.
- Jika ada penambahan material di luar RAB, ditandai dengan field `isAdditionalMaterial = true` dan memerlukan approval khusus Admin.

## 4. Keuangan vs Progress
- **Progress tidak lahir dari Pembayaran**. Pembayaran konsumen (`Project.paidAmount`) adalah data administratif keuangan.
- **Progress lahir dari Verifikasi Lapangan**. 
- Keduanya dipantau secara berdampingan namun tidak memiliki relasi otomatis di level database.

## 5. Master Data Persona & Auth
Sistem ini menggunakan pendekatan Persona. Data di tabel `superadmins`, `admins`, `supervisors`, `foremen`, `architects`, dan `customers` adalah profil fungsional. 
- Field `userId` pada beberapa model digunakan untuk memetakan persona ke sistem autentikasi.
- **Penting**: Dokumentasi ini fokus pada skema data master, bukan pada implementasi session/JWT production.
