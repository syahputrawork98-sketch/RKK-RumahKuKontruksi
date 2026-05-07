# Frontend Checklist - Jurnal Mingguan Mandor

## Source Alur
- [docs/alur/jurnal-mingguan-mandor.md](../../alur/jurnal-mingguan-mandor.md)

## Status Saat Ini
**Shell / Backend Pending**. Struktur UI dasar sedang disiapkan.

## Tujuan UI
Memberikan kemudahan bagi Mandor untuk mencatatkan progres aktivitas mingguan dari lapangan.

## Pages / Routes
- [ ] `/mandor/laporan-harian` (Akan direfaktor menjadi Jurnal/Logbook).
- [ ] `/mandor/laporan-harian/new`: Form pengisian jurnal baru.

## Components
- [ ] `ActivityListInput`: Baris dinamis untuk menambah aktivitas kerja.
- [ ] `LaborCountInput`: Input jumlah tukang/pekerja per kategori.
- [ ] `ProgressClaimInput`: Input estimasi progres yang dicapai (Klaim).

## User Actions
- [ ] Mengisi daftar aktivitas pekerjaan.
- [ ] Memasukkan jumlah tenaga kerja yang hadir.
- [ ] Klik "Submit Jurnal" untuk direview Pengawas.

## UI States
- [ ] **Draft state**: Jurnal yang belum dikirim.
- [ ] **Revision state**: Menampilkan catatan revisi dari Pengawas dengan warna kontras.
- [ ] **Locked/Submitted state**: Form tidak bisa diedit setelah dikirim.

## Role Visibility
- [ ] Form input hanya aktif untuk role **Mandor**.
- [ ] Role **Pengawas** melihat tombol "Approve" atau "Minta Revisi".

## Data Display
- [ ] Daftar aktivitas per hari/minggu.
- [ ] Statistik penggunaan tenaga kerja.

## Form & Validation UI
- [ ] Validasi: Field aktivitas tidak boleh kosong.
- [ ] Validasi: Persentase klaim progres tidak boleh > 100%.

## Integrasi API / Service
- [ ] `POST /api/journals/foreman`.

## Integrasi dengan Alur Lain
- [ ] Data progres klaim akan divalidasi di [Verifikasi Progres Proyek](./project-progress.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Fitur tanda tangan digital Mandor.
- [ ] Export jurnal ke format Excel.
