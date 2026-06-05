# F07 — Pengawas Monitoring System

## Story
Sistem operasional bagi Pengawas lapangan yang bertugas mengecek pekerjaan Mandor, menyetujui *Material Request*, menangani laporan *Field Issue*, dan mengunci *Verified Progress* (SOT) setiap minggunya.

## Status
- **Current Status**: Existing / Verified Frontend + API

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
- *Needs Verification*: Bagaimana sistem menangani *overriding* nilai progres oleh Pengawas jika Mandor mengisi *daily log* secara tidak logis.

## Codebase Verification
- **Frontend Routes/Components**: Ditemukan komponen aktif untuk Pengawas: Dashboard (`DashboardPengawas`), Verifikasi Progres (`VerifikasiProgresPengawasPage`), Laporan Mingguan (`LaporanMingguanPengawasPage`), Request Material (`RequestMaterialPengawasPage`), Jurnal Mandor (`JurnalMandorPengawasPage`), Kendala Lapangan (`KendalaLapanganPengawasPage`).
- **API Service**: Menggunakan layanan `supervisorService.js`, `progressService.js`, `supervisorWeeklyReportService.js`, `materialRequestService.js`, `fieldIssues.service.js`.
- **Backend Endpoints**: Modul utuh ditemukan di `server/src/modules/` yang melingkupi `supervisors`, `supervisor-weekly-reports`, `material-requests`, dan `field-issues`.
- **Database Model**: Ditemukan model terkait `SupervisorWeeklyReport`, `SupervisorWeeklyReportJournal`, `SupervisorWeeklyReportNote`, `FieldIssue`, dan `MaterialRequest` di skema Prisma.
- **Progress SOT Verification Status**: **Verified**. Mekanisme Single Source of Truth tervalidasi tersedia, di mana hanya Pengawas yang menyuntikkan angka mutlak pada properti `verifiedProgress` di model Proyek.
- **Weekly/Daily/Field Issue Status**: **Verified**. Seluruh fungsionalitas pendukung (validasi jurnal, pembuatan laporan mingguan pengawas, tinjauan request material, dan manajemen isu/kendala) telah diwadahi oleh komponen *frontend* dan modul *backend* yang sepadan.
- **Keputusan Status**: Tervalidasi utuh lintas *stack* (*Existing / Verified Frontend + API*).

## Next Step
- Validasi modul pelaporan pengawas pada *codebase* backend.
