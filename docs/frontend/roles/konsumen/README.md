# Role: Konsumen

## Status Umum
Role Konsumen saat ini berstatus **Done / Stable UI**. Fokus utama peran ini adalah memantau progres pembangunan melalui timeline premium, transparansi RAB, dan dokumentasi foto harian.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/konsumen/dashboard` | `DashboardKonsumen.jsx` | **Partial** | Menampilkan statistik proyek aktif. |
| List Proyek | `/konsumen/Proyek` | `Proyek.jsx` | **Partial** | Masih dalam proses migrasi ke `mockProjects`. |
| Timeline | `/konsumen/TimelineProyek` | `TLProyek.jsx` | **Done** | Redesain premium sudah selesai. |
| Detail Tahap | `/konsumen/TimelineProyek/:id` | `DetailTLProyek.jsx` | **Done** | Fitur detail RAB dan foto dokumentasi. |

## Komponen Terkait
- `KonsumenLayout.jsx`: Layout dengan sidebar khusus konsumen.

## Data / Mock Data
- **Three-Level RAB**: Menggunakan `rabPlans`, `rabCategories`, dan `rabItems` untuk rincian biaya yang terstruktur.
- **Timeline Sync**: Setiap tahap di `projectStages` terhubung ke kategori RAB tertentu melalui `categoryId`.
- **Backward Compatibility**: Untuk sementara, `activeCustomerProject` tetap dipertahankan hingga migrasi UI selesai.
- **Customer Types**: Mendukung profil `individual` dan `company`.

## Role Tambahan: Customer Viewer
- Role: `customer_viewer`
- Deskripsi: Akun tambahan pihak konsumen dengan akses hanya-baca dan komentar.

## Sudah Dikerjakan
- [x] Redesain Timeline menjadi lebih premium dan modern.
- [x] Pembuatan skema data banyak proyek per konsumen.
- [x] Pembuatan skema akun viewer tambahan.
- [x] Pembuatan sistem komentar mock.

## Belum Dikerjakan
- [ ] Refactor `Proyek.jsx` agar mengambil data dari `mockProjects`.
- [ ] Refactor `Profil.jsx` agar mengambil data dari `mockCustomers`.
- [ ] Fitur download laporan PDF otomatis (Dummy UI).
