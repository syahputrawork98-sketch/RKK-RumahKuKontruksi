# Frontend Checklist - Laporan Mingguan Pengawas

## Source Alur
- [docs/alur/alur-laporan-mingguan-pengawas.md](../../alur/alur-laporan-mingguan-pengawas.md)

## Status Saat Ini
**Shell / Backend Pending**.

## Tujuan UI
Antarmuka bagi Pengawas untuk memberikan evaluasi resmi mingguan kepada manajemen (Admin).

## Pages / Routes
- [ ] `/pengawas/laporan-mingguan`: List riwayat laporan.
- [ ] `/pengawas/laporan-mingguan/create`: Form pembuatan evaluasi mingguan.

## Components
- [ ] `SummaryVerifiedProgress`: Widget yang menarik data progres terakhir yang diverifikasi.
- [ ] `ForemanEvaluationCard`: Komponen input rating dan catatan untuk Mandor.
- [ ] `FieldIssueSummary`: Daftar kendala yang dilaporkan pada minggu tersebut.

## User Actions
- [ ] Menulis evaluasi pengerjaan.
- [ ] Memberikan rekomendasi tindakan (misal: penambahan tukang).
- [ ] Klik "Submit Laporan Mingguan".

## UI States
- [ ] **Loading state**: Menarik ringkasan data progres dan jurnal Mandor.
- [ ] **Success state**: Konfirmasi laporan terkirim ke Admin.

## Role Visibility
- [ ] Form hanya untuk role **Pengawas**.
- [ ] Role **Admin** dapat melihat detail laporan di dashboard manajemen.

## Data Display
- [ ] Grafik progres mingguan (Verified).
- [ ] List aktivitas Mandor yang sudah diapprove.

## Form & Validation UI
- [ ] Validasi: Field evaluasi teknis wajib diisi.

## Integrasi API / Service
- [ ] `POST /api/reports/supervisor`.

## Integrasi dengan Alur Lain
- [ ] Mengambil data dari [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md).
- [ ] Menjadi referensi bagi Admin di [Laporan Progress Admin].

## Tidak Dikerjakan di Fase Ini
- [ ] Print preview laporan dalam format surat resmi.
