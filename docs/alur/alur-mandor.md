# Alur Mandor - RKK RumahKu Konstruksi

## 1. Status Dokumen
- Dokumen ini menjelaskan alur operasional untuk role **Mandor** (Foreman).
- Mandor adalah pelaksana teknis utama di lapangan (Construction Execution).
- Mengacu ke [Alur Bisnis RKK](./alur-bisnis-rkk.md) sebagai alur induk.

## 2. Posisi Role dalam Sistem
- Mandor bertanggung jawab memimpin tukang dan memastikan pekerjaan fisik di lokasi proyek berjalan sesuai instruksi.
- Bertindak sebagai sumber data primer untuk aktivitas harian, kendala lapangan, dan kebutuhan material.
- Memberikan bukti pengerjaan kepada Pengawas.

## 3. Entity / Database Terkait
- **Model Utama**: `Foreman`.
- **Manajemen Data**: `DailyTask` (Tugas), `DailyReport` (Logbook), `WeeklyJournal` (Claim), `MaterialRequest` (Request), `FieldIssue` (Report).

## 4. Fitur / Halaman / API Terkait
- **Route Frontend**: `/mandor/dashboard`, `/mandor/proyek-aktif`, `/mandor/laporan-harian`, `/mandor/jurnal-mingguan`, `/mandor/request-material`.
- **API**: `/api/foremen`, `/api/daily-reports`, `/api/weekly-journals`, `/api/material-requests`.

## 5. Alur Utama Role
1. **Pilih Proyek**: Melihat proyek aktif yang ditugaskan oleh Admin.
2. **Cek Tugas**: Melihat daftar `DailyTask` dari Pengawas.
3. **Daily Reporting**: Mengisi logbook harian (`DailyReport`) yang mencakup jumlah pekerja, cuaca, dan aktivitas teknis.
4. **Weekly Journaling**: Membuat rangkuman mingguan (`WeeklyJournal`) dan menyertakan `claimedProgress` (klaim progres menurut Mandor).
5. **Request Material**: Mengajukan kebutuhan material site yang divalidasi berdasarkan sisa volume di RAB.
6. **Report Issue**: Melaporkan kendala lapangan (`FieldIssue`) jika ada hambatan di site.
7. **Photo Documentation**: Mengunggah foto bukti pengerjaan sebagai lampiran laporan.

## 6. Hubungan dengan Role Lain
- **Mandor ↔ Pengawas**: Konsultasi teknis, menerima instruksi tugas, dan menyerahkan laporan untuk diverifikasi.
- **Mandor ↔ Admin**: Koordinasi logistik material.

## 7. Batasan dan Catatan Scope
- **Non-Official Progress**: `claimedProgress` Mandor adalah angka administratif/klaim subjektif pelaksana dan **TIDAK** mengubah `Project.verifiedProgress` (SOT) secara otomatis.
- **Local Operational**: Seluruh pelaporan Mandor wajib terhubung ke database operasional (DB-Backed), bukan data mock.

## 8. Checklist Validasi Alur
- [ ] Mandor dapat memilih proyek aktif di dashboard.
- [ ] Laporan harian tersimpan ke database dan dapat dilihat oleh Pengawas.
- [ ] Request material memotong sisa kuota RAB (jika logika validasi aktif).

---
*Terakhir diperbarui: Batch Alur Per Role 01.*
