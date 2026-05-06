# Role: Konsumen

## Status Umum
Role Konsumen memiliki fitur yang paling kompleks secara data. Fitur unggulannya adalah **Monitoring Timeline** yang memungkinkan konsumen melihat progres proyek secara detail hingga rincian RAB teknis dan dokumentasi foto lapangan.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard Timeline | `/konsumen/TimelineProyek` | `TimelineProyek.jsx` | **Done** | Monitoring progres utama. |
| Detail Laporan | `/konsumen/TimelineProyek/:stageId` | `DetailTimelineProyek.jsx` | **Done** | Tabel RAB teknis & foto. |
| Daftar Proyek | `/konsumen/proyek` | `Proyek.jsx` | **Partial** | Data masih hardcoded di komponen. |
| Profil Akun | `/konsumen/profil` | `Profil.jsx` | **Partial** | Data masih hardcoded di komponen. |

## Komponen Terkait
- `TLProyek.jsx`: Komponen timeline interaktif.
- `DetailPekerjaanProyek.jsx`: Renderer laporan teknis dan RAB.
- `KonsumenLayout.jsx`: Layout dengan sidebar khusus konsumen.

## Data / Mock Data
- **Centralized Mock Data**: Menggunakan folder `src/data/mock/` sebagai sumber data tunggal.
- **Timeline**: Sudah menggunakan `activeCustomerProject` (Backward compatibility mode).
- **Refactoring Target**: Halaman **Proyek** dan **Profil** sedang dalam proses migrasi dari data hardcoded ke `mockProjects`, `mockCustomers`, dan `mockUsers`.

## Sudah Dikerjakan
- [x] Redesain Timeline menjadi lebih premium dan modern.
- [x] Implementasi halaman detail tahap dengan URL param (`:stageId`).
- [x] Tabel RAB teknis (Volume, Satuan, Harga Satuan, Progress).
- [x] Galeri dokumentasi foto per tahap.
- [x] Ringkasan anggaran proyek di dashboard.

## Belum Dikerjakan
- [ ] Fitur chat/komentar langsung pada tahap pekerjaan tertentu.
- [ ] Tombol download laporan (PDF) yang fungsional (saat ini masih dummy).
- [ ] Notifikasi real-time jika ada progres baru.

## Prioritas Berikutnya
1. **Sentralisasi Data**: Memindahkan data dari `Proyek.jsx` dan `Profil.jsx` ke file mock terpusat.
2. Pemantapan fitur "Profil" (upload avatar, ganti password).
3. Perbaikan tampilan mobile untuk tabel RAB teknis yang sangat lebar.
