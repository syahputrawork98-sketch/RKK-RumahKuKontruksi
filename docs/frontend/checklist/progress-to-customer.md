# Frontend Checklist - Publikasi Progres ke Konsumen

## Source Alur
- [docs/alur/alur-progress-proyek-ke-konsumen.md](../../alur/alur-progress-proyek-ke-konsumen.md)

## Status Saat Ini
**Mock-First / Partial**. Dashboard konsumen sudah ada UI-nya namun datanya belum berasal dari alur verifikasi rill.

## Tujuan UI
Memberikan visibilitas progres pembangunan yang akurat dan terpercaya kepada Konsumen.

## Pages / Routes
- [ ] `/admin/laporan-progress`: Halaman bagi Admin untuk melakukan aksi "Publish".
- [ ] `/konsumen/TimelineProyek`: Dashboard progres di sisi Konsumen.

## Components
- [ ] `PublishToggle`: Tombol bagi Admin untuk merilis data ke dashboard konsumen.
- [ ] `CustomerTimelineCard`: Card progres yang sudah difilter untuk tampilan konsumen.
- [ ] `VerifiedBadge`: Indikator bahwa data sudah divalidasi tim teknis RKK.

## User Actions
- [ ] **Admin**: Klik "Publish ke Konsumen".
- [ ] **Konsumen**: Melihat detail progres dan dokumentasi foto.

## UI States
- [ ] **Unpublished state**: Di sisi Admin (Data verified ada tapi belum dipublish).
- [ ] **Verified state**: Di sisi Konsumen (Menampilkan badge kepercayaan).

## Role Visibility
- [ ] Kontrol aksi "Publish" hanya untuk **Admin**.
- [ ] **Konsumen** dilarang melihat angka klaim mentah dari Mandor.

## Data Display
- [ ] Angka progres kumulatif (e.g. 45%).
- [ ] Foto dokumentasi fisik lapangan yang terpilih.

## Integrasi API / Service
- [ ] `/api/projects/:id/publish-progress`.

## Integrasi dengan Alur Lain
- [ ] Sumber data berasal dari [Verifikasi Progres Proyek](./project-progress.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Animasi 3D progres pembangunan.
- [ ] Live streaming CCTV lapangan di dashboard konsumen.
