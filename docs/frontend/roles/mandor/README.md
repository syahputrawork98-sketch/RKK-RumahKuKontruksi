# Role: Mandor

## Status Umum
Role Mandor saat ini masih berupa **Shell**. Fokus peran ini adalah laporan harian, manajemen tukang, dan permintaan material di lokasi proyek.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/mandor/dashboard` | `DashboardMandor.jsx` | **Shell** | Placeholder dashboard harian. |

## Komponen Terkait
- `MandorLayout.jsx`: Sidebar navigasi mandor.

## Data / Mock Data
- **Mandor Table**: Menggunakan `mockForemen` di `src/data/mock/foremen.js`.
- **Sertifikasi Table**: Menggunakan `mockForemanCertificates.js` (Terpisah).
- **Kapasitas**: Maksimal **2 proyek aktif**.
- **Relasi**: Terhubung ke `mockUsers`, `mockProjects`, `mockWorkers`, dan `mockForemanCertificates`.

| Mandor | Assigned Projects | Capacity | Certificates | Status |
|---|---:|---:|---:|---|
| Budi Santoso | 2 | 2 | 3 valid | Full |
| Agus Setiawan | 1 | 2 | 2 valid | Normal |
| Dedi Rahman | 0 | 2 | 1 pending | Available |
| Hendra Wijaya | 1 | 2 | 1 expired | Inactive |

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar.
- [x] Routing dasar.
- [x] Pemisahan tabel sertifikat mandor.

## Belum Dikerjakan
- [ ] Manajemen tukang (List pekerja dan absensi).
- [ ] Form laporan harian/logbook.
- [ ] Form pengajuan material ke admin pusat.

## Prioritas Berikutnya
1. Desain form laporan harian sederhana yang ramah penggunaan mobile.
2. Manajemen data pekerja proyek.
