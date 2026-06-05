# Alur Konsumen - RKK RumahKu Konstruksi

## 1. Status Dokumen
- Dokumen ini menjelaskan alur operasional untuk role **Konsumen** (Customer).
- Mengacu ke [Alur Bisnis RKK](./alur-bisnis-rkk.md) sebagai alur induk.
- Mengikuti skema database `Customer`, `DesignRequest`, dan `Project` aktif.

## 2. Posisi Role dalam Sistem
- Konsumen adalah pemilik proyek (Klien).
- Memulai perjalanan dari pengajuan desain hingga serah terima bangunan.
- Memiliki dashboard khusus untuk memonitor progres fisik, dokumen, dan status pembayaran.

## 3. Entity / Database Terkait
- **Model Utama**: `Customer` (Data Profil), `DesignRequest` (Permintaan Desain), `Project` (Proyek Konstruksi).
- **Relasi**: Terhubung ke `ProjectStageComment` (Komunikasi) dan `AdministrativeHelperDocument` (Metadata Invoice/BAST).

## 4. Fitur / Halaman / API Terkait
- **Route Frontend**: `/konsumen/dashboard`, `/konsumen/design-requests`, `/konsumen/proyek`, `/konsumen/timeline`.
- **API**: `/api/customers`, `/api/design-requests`, `/api/projects`.

## 5. Alur Utama Role
1. **Pilih Persona**: User mengaktifkan persona Konsumen/Customer.
2. **Pengajuan Desain**: Mengisi form `DesignRequest` (Lokasi, Budget, Gaya Arsitektur).
3. **Masa Tender & Revisi**: Meninjau bidding arsitek dan melakukan revisi desain hingga final.
4. **Monitoring Persiapan**: Melihat Admin melakukan konversi desain ke perencanaan proyek (RAB & Stage).
5. **Monitoring Konstruksi**: Memantau progres fisik resmi (`verifiedProgress`) melalui timeline.
6. **Review Laporan**: Melihat laporan mingguan (`WeeklyReport`) yang telah dipublikasikan oleh Admin.
7. **Komunikasi**: Memberikan komentar pada tahapan proyek (`ProjectStage`) yang berjalan.
8. **Dokumen & Invoice**: Mengunduh metadata BAST atau Invoice simulasi untuk catatan pribadi.

## 6. Hubungan dengan Role Lain
- **Konsumen ↔ Arsitek**: Interaksi selama fase revisi desain.
- **Konsumen ↔ Admin**: Koordinasi kontrak, RAB, dan approval laporan.
- **Konsumen ← Pengawas/Mandor**: Konsumen menerima output kerja lapangan dalam bentuk progres fisik dan laporan yang telah diverifikasi.

## 7. Batasan dan Catatan Scope
- **ReadOnly Progress**: Konsumen tidak dapat mengubah angka progres fisik; hanya berhak melihat hasil verifikasi Pengawas.
- **Simulasi Finance**: Status pembayaran bersifat administratif (Local Metadata) dan tidak terhubung ke gateway perbankan rill.
- **Local Dev**: Seluruh akses data dibatasi oleh pilihan persona di Topbar.

## 8. Checklist Validasi Alur
- [ ] Dashboard konsumen menampilkan daftar proyek aktif miliknya.
- [ ] Timeline menampilkan data yang sinkron dengan `verifiedProgress`.
- [ ] Form pengajuan desain menyimpan data ke database dengan benar.

---
*Terakhir diperbarui: Batch Alur Per Role 01.*
