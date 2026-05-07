# Backend Checklist - Verifikasi Progres Proyek

## Source Alur
- [docs/alur/pengawas.md](../../alur/pengawas.md)
- [docs/alur/jurnal-mingguan-mandor.md](../../alur/jurnal-mingguan-mandor.md)

## Tujuan Backend
Menyediakan mekanisme bagi Pengawas untuk memverifikasi progres fisik di lapangan yang menjadi sumber kebenaran data (*Single Source of Truth*) bagi seluruh sistem.

## Entity / Model
- [ ] Tambahkan field `verifiedProgress` pada model `Project` atau `Stage`.
- [ ] Model `ProgressVerificationLog` untuk mencatat siapa, kapan, dan angka progres yang diverifikasi.

## API / Service
- [ ] `PATCH /api/projects/:id/verify-progress`: Endpoint untuk update progres resmi oleh Pengawas.
- [ ] `GET /api/projects/:id/progress-history`: Mendapatkan riwayat verifikasi progres.

## Status Flow
- [ ] Progres tidak boleh berkurang (kecuali ada koreksi khusus oleh Admin).
- [ ] Update progres memicu pembaruan status pada dashboard Konsumen jika Admin menyetujui.

## Business Rules
- [ ] **Single Source of Truth**: Hanya progres terverifikasi Pengawas yang diakui sebagai progres resmi proyek.
- [ ] Progres pembayaran Mandor harus mengikuti (tidak boleh melebihi) progres verifikasi ini.

## Permission / Role Rules
- [ ] Hanya role **Pengawas** (yang ditugaskan ke proyek tersebut) yang bisa melakukan verifikasi progres.
- [ ] Role **Admin** bisa melihat riwayat namun tidak mengubah secara langsung tanpa audit trail.

## Validation
- [ ] Progres harus di antara 0% sampai 100%.
- [ ] Wajib menyertakan catatan verifikasi.

## Audit Trail / History
- [ ] Catat setiap perubahan progres: UserID, Timestamp, Angka Lama, Angka Baru, Catatan.

## Integrasi dengan Alur Lain
- [ ] Menjadi dasar untuk [Payment Foreman](./payment-foreman.md).
- [ ] Menjadi sumber data untuk [Progress to Customer](./progress-to-customer.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Otomasi perhitungan progres dari sub-task yang sangat detail.
- [ ] Integrasi dengan sensor IoT di lapangan.
