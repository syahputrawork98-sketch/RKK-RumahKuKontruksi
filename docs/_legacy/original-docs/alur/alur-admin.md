# Alur Admin - RKK RumahKu Konstruksi

## 1. Status Dokumen
- Dokumen ini menjelaskan alur operasional untuk role **Admin**.
- Admin adalah moderator utama operasional proyek RKK.
- Mengacu ke [Alur Bisnis RKK](./alur-bisnis-rkk.md) sebagai alur induk.

## 2. Posisi Role dalam Sistem
- Admin bertindak sebagai jembatan antara kebutuhan desain Konsumen dan pelaksanaan lapangan tim teknis.
- Bertanggung jawab atas inisiasi proyek, pengelolaan anggaran (RAB), dan penutupan proyek.
- Moderator laporan mingguan yang akan dilihat oleh Konsumen.

## 3. Entity / Database Terkait
- **Model Utama**: `Admin`.
- **Manajemen Data**: `Project`, `RabPlan`, `RabCategory`, `RabItem`, `ProjectStage`, `WeeklyReport`, `MaterialRequest`.

## 4. Fitur / Halaman / API Terkait
- **Route Frontend**: `/admin/dashboard`, `/admin/design-requests`, `/admin/proyek`, `/admin/rab-builder`, `/admin/reports`, `/admin/logistics`.
- **API**: `/api/admins`, `/api/projects`, `/api/rab`, `/api/weekly-reports`.

## 5. Alur Utama Role
1. **Design Conversion**: Menerima `DesignRequest` final dan mengkonversinya menjadi `Project`.
2. **Team Assignment**: Menunjuk Pengawas (`Supervisor`) dan Mandor (`Foreman`) ke dalam proyek.
3. **RAB Planning**: Menyusun daftar pekerjaan, volume, dan harga satuan dalam `RabBuilder`.
4. **Stage Definition**: Membagi fase proyek menjadi tahapan-tahapan yang dapat dipantau.
5. **Project Activation**: Mengaktifkan proyek setelah dokumen persiapan (Readiness Checklist) lengkap.
6. **Report Review**: Memeriksa `WeeklyReport` dari Pengawas dan memberikan persetujuan sebelum dipublikasikan.
7. **Logistics Management**: Menyetujui pengeluaran material (`MaterialRequest`) untuk didistribusikan ke site.
8. **Administrative Billing**: Mencatat termin pembayaran (`PaymentRecord`) sebagai helper metadata.
9. **Project Closeout**: Menutup proyek setelah seluruh tahapan diverifikasi selesai.

## 6. Hubungan dengan Role Lain
- **Admin ↔ Konsumen**: Koordinasi status proyek dan dokumen penagihan.
- **Admin ↔ Arsitek**: Serah terima data desain hasil tender.
- **Admin ↔ Pengawas**: Menerima laporan progres dan isu lapangan untuk tindakan manajerial.
- **Admin ↔ Mandor**: Memastikan logistik dan tugas harian berjalan sesuai rencana anggaran.

## 7. Batasan dan Catatan Scope
- **Non-Technical Progress SOT**: Admin tidak memiliki wewenang memverifikasi progres fisik rill; wewenang ini mutlak ada pada Pengawas.
- **Administrative Only**: Segala bentuk penagihan (Invoice) dan serah terima (BAST) di sini adalah simulasi administratif, bukan dokumen hukum rill.

## 8. Checklist Validasi Alur
- [ ] Fitur "Convert to Project" berhasil membuat entity Project baru.
- [ ] RAB yang disusun muncul dengan benar di dashboard Mandor/Pengawas.
- [ ] Laporan yang disetujui muncul di timeline Konsumen.

---
*Terakhir diperbarui: Batch Alur Per Role 01.*
