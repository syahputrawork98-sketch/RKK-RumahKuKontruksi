# Backend Checklist - Verifikasi Progres Proyek

## Source Alur
- [docs/alur/pengawas.md](../../alur/pengawas.md)
- [docs/alur/jurnal-mingguan-mandor.md](../../alur/jurnal-mingguan-mandor.md)

## Status Saat Ini
**Backend Pending**. Belum ada implementasi endpoint verifikasi progres resmi.

## Tujuan Backend
Menyediakan mekanisme bagi Pengawas untuk memverifikasi progres fisik di lapangan yang menjadi sumber kebenaran data (*Single Source of Truth*) bagi seluruh sistem.

## Entity / Model
- [ ] Field `verifiedProgress` pada model `Project` atau `Stage`.
- [ ] Model `ProgressVerificationLog` untuk mencatatUserID, Timestamp, Progres, dan Catatan.

## API / Service
- [ ] `PATCH /api/projects/:id/verify-progress`: Update progres resmi oleh Pengawas.
- [ ] `GET /api/projects/:id/progress-history`: Riwayat verifikasi progres.

## Status Flow
- [ ] Angka progres bersifat kumulatif (tidak boleh turun tanpa intervensi Admin).
- [ ] Update progres memicu kemungkinan publikasi ke Konsumen.

## Business Rules
- [ ] **Single Source of Truth**: Hanya progres terverifikasi Pengawas yang diakui sebagai progres resmi proyek.
- [ ] Progres pembayaran Mandor tidak boleh melebihi progres verifikasi ini.

## Permission / Role Rules
- [ ] Hanya **Pengawas** yang ditugaskan ke proyek tersebut yang bisa melakukan verifikasi.
- [ ] **Admin** hanya memiliki akses baca riwayat.

## Validation
- [ ] Input progres wajib di antara 0% - 100%.
- [ ] Wajib menyertakan catatan verifikasi teknis.

## Audit Trail / History
- [ ] Catat setiap perubahan progres: userID, Timestamp, Angka Lama, Angka Baru, Catatan.

## Integrasi dengan Alur Lain
- [ ] Dasar untuk [Payment Foreman](./payment-foreman.md).
- [ ] Dasar untuk [Progress to Customer](./progress-to-customer.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Otomasi perhitungan progres dari sub-task detail.
- [ ] Integrasi sensor IoT lapangan.
