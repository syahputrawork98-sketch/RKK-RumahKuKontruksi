# Frontend Checklist - Jurnal Mingguan Mandor

## Source Alur
- [docs/alur/jurnal-mingguan-mandor.md](../../alur/jurnal-mingguan-mandor.md)

## Tujuan UI
Memfasilitasi Mandor untuk mencatat aktivitas harian dan progres klaim secara berkala selama satu minggu.

## Pages / Routes
- [ ] `/dashboard/foreman/journals`: Daftar jurnal mingguan.
- [ ] `/dashboard/foreman/journals/new`: Form buat jurnal baru.
- [ ] `/dashboard/foreman/journals/:id/edit`: Form isi/edit jurnal harian.
- [ ] `/dashboard/supervisor/journals/review`: Daftar jurnal yang perlu direview (Role Pengawas).

## Components
- [ ] `JournalCalendar`: Penanda periode minggu jurnal.
- [ ] `JournalEntryCard`: Komponen input aktivitas harian (Deskripsi, Pekerja, Foto).
- [ ] `PhotoUploader`: Upload multiple foto progres.
- [ ] `ProgressClaimInput`: Input % klaim progres mandor.
- [ ] `ReviewActionButtons`: Tombol Approve/Request Revision/Reject (Role Pengawas).

## User Actions
- [ ] **Mandor**: Simpan draf, Tambah entry harian, Upload foto, Klik Submit Jurnal.
- [ ] **Pengawas**: Klik Review, Tulis catatan verifikasi, Klik Approve/Revision/Reject.

## UI States
- [ ] **Empty state**: Tampil jika belum ada jurnal yang dibuat.
- [ ] **Loading state**: Saat upload foto atau simpan data.
- [ ] **Revision state**: Highlight bagian yang perlu direvisi jika status `revision_requested`.
- [ ] **Locked state**: Form dilarang diedit jika status sudah `submitted`, `approved`, atau `locked`.

## Role Visibility
- [ ] Form edit hanya untuk role **Mandor**.
- [ ] Dashboard review hanya untuk role **Pengawas**.

## Data Display
- [ ] Status Jurnal (Badge color).
- [ ] Tabel Riwayat Aktivitas Harian.
- [ ] Label tegas: "Klaim Mandor" vs "Terverifikasi Pengawas".

## Form & Validation UI
- [ ] Client-side validation: Deskripsi minimal 10 karakter.
- [ ] Upload foto wajib ada minimal 1 per entry.

## Integrasi dengan Alur Lain
- [ ] Status jurnal `approved` akan memicu ketersediaan di [Payment Foreman](./payment-foreman.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Fitur "Copy from Previous Week".
- [ ] Offline-first sync (PWA).
