# Role: Mandor

## Status Umum
Role Mandor saat ini masih berupa **Shell**. Fokus peran ini adalah laporan harian, manajemen tim lapangan, dan permintaan material di lokasi proyek.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/mandor/dashboard` | `DashboardMandor.jsx` | **Shell** | Placeholder dashboard harian. |

## Komponen Terkait
- `MandorLayout.jsx`: Sidebar navigasi mandor.

## Data / Mock Data
- **Mandor Table**: Menggunakan `mockForemen` di `src/data/mock/foremen.js`. Mandor diposisikan sebagai **Vendor Lapangan**.
- **Sertifikasi Table**: Menggunakan `mockForemanCertificates.js`.
- **Kapasitas**: Maksimal **2 proyek aktif**.
- **Tim Lapangan**: RKK tidak mengelola data tukang secara individu. Informasi tim tersedia secara ringkas di `teamSummary`.

| Mandor | Vendor Type | Capacity | Certificates | Status |
|---|---|---:|---:|---|
| Budi Santoso | Company (CV) | 2 | 3 valid | Full |
| Agus Setiawan | Individual | 2 | 2 valid | Normal |
| Dedi Rahman | Individual | 2 | 1 pending | Available |
| Hendra Wijaya | External (PT)| 2 | 1 expired | On Hold |

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar.
- [x] Routing dasar.
- [x] Transisi ke model Vendor Lapangan (Hapus data worker detail).

## Belum Dikerjakan
- [ ] Manajemen tim lapangan (Ringkasan personil).
- [ ] Form laporan harian/logbook.
- [ ] Form pengajuan material ke admin pusat.

## Prioritas Berikutnya
1. Desain form laporan harian sederhana yang ramah penggunaan mobile.
2. Penyesuaian UI manajemen tim agar sesuai dengan model vendor (tidak list per orang).
