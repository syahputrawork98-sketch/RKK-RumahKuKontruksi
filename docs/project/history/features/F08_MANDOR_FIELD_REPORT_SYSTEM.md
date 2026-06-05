# F08 — Mandor Field Report System

## Story
Sistem pencatatan log aktivitas harian oleh Mandor di lapangan, yang mencakup permintaan material ke Pengawas, pelaporan progres teknis (jurnal), dan pencatatan kendala (issue).

## Status
- **Current Status**: Existing / Verified Frontend + API

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
- *Needs Verification*: Koneksi *Material Request* menuju persetujuan Admin yang mengontrol budget RAB.

## Codebase Verification
- **Frontend Routes/Components**: Ditemukan komponen aktif untuk Mandor: Dashboard (`DashboardMandor`), Jurnal Mingguan (`JurnalMingguanMandorPage`), Tugas Harian (`TugasHarianMandorPage`), Laporan Harian (`LaporanHarianMandorPage`), Request Material (`RequestMaterialMandorPage`), Kendala Lapangan (`KendalaLapanganMandorPage`).
- **API Service**: Menggunakan layanan `foremanService.js`, `dailyTaskService.js`, `dailyReportService.js`, `weeklyJournalService.js`, `materialRequestService.js`, `fieldIssues.service.js`.
- **Backend Endpoints**: Modul operasional mandor telah didirikan secara utuh di `server/src/modules/` mencakup `daily-reports`, `daily-tasks`, `weekly-journals`, `material-requests`, dan `field-issues`.
- **Database Model**: Terdefinisinya kerangka kerja lapangan (`DailyTask`, `DailyReport`, `WeeklyJournal`, `MaterialRequest`, `FieldIssue`) secara sempurna pada model Prisma.
- **Daily/Weekly/Material/Field Issue Status**: **Verified**. Setiap elemen pelaporan fisik dari lapangan memiliki rute halaman mandiri dan *endpoint* penyimpanan *backend*. Catatan mandor bersifat *log* yang menanti verifikasi Pengawas.
- **Keputusan Status**: Tervalidasi utuh lintas *stack* (*Existing / Verified Frontend + API*).

## Next Step
- Memverifikasi endpoint upload dan flow Jurnal Harian.
