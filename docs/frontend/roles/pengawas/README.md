# Role: Pengawas

## Status Umum
Role Pengawas saat ini masih berupa **Shell**. Pengawas nantinya akan menjadi pengguna utama yang mengisi data progres dan memverifikasi pekerjaan di lapangan.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Dashboard | `/pengawas/dashboard` | `DashboardPengawas.jsx` | **Shell** | Placeholder monitoring. |

## Komponen Terkait
- `PengawasLayout.jsx`: Sidebar navigasi pengawas.

## Data / Mock Data
- **Pengawas Table**: Menggunakan `mockSupervisors` di `src/data/mock/supervisors.js`.
- **Sertifikasi Table**: Menggunakan `mockSupervisorCertificates.js` (Terpisah).
- **Progress Verification**: Verifikasi progres dilakukan pada level kategori dan item RAB (`rabItems.js`).
- **Relasi Proyek**: Pengawas memantau progres fisik dan dokumentasi lapangan.

| Pengawas | Assigned Projects | Capacity | Certificates | Status |
|---|---:|---:|---:|---|
| Ahmad Fauzi | 3 | 3 | 3 valid | Full |
| Bambang Wijaya | 2 | 3 | 2 valid | Normal |
| Eko Prasetyo | 1 | 3 | 1 pending | Available |
| Lukman Hakim | 0 | 3 | 1 expired | Inactive |

## Sudah Dikerjakan
- [x] Struktur layout dan navigasi sidebar.
- [x] Routing dasar.
- [x] Perancangan mock data pengawas dan pemisahan sertifikat.

## Belum Dikerjakan
- [ ] List Proyek yang diawasi.
- [ ] Form input progres mingguan.
- [ ] Tombol verifikasi tahapan (Checklist pekerjaan).
- [ ] Fitur upload foto dokumentasi lapangan.

## Prioritas Berikutnya
1. Membuat antarmuka untuk verifikasi tahapan yang akan sinkron dengan tampilan timeline Konsumen.
2. Form upload dokumentasi foto.
