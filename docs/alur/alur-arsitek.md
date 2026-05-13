# Alur Arsitek - RKK RumahKu Konstruksi

## 1. Status Dokumen
- Dokumen ini menjelaskan alur operasional untuk role **Arsitek** (Architect).
- Arsitek berfokus pada fase pra-konstruksi (Perencanaan & Desain).
- Mengacu ke [Alur Bisnis RKK](./alur-bisnis-rkk.md) sebagai alur induk.

## 2. Posisi Role dalam Sistem
- Arsitek adalah penyedia jasa profesional yang menerjemahkan kebutuhan Konsumen menjadi desain teknis.
- Terlibat dalam sistem **Tender** yang dikelola Admin.
- Bertanggung jawab atas kualitas visual dan teknis awal yang akan menjadi acuan pengerjaan lapangan.

## 3. Entity / Database Terkait
- **Model Utama**: `Architect`.
- **Relasi**: `DesignRequest`, `DesignTender`, `DesignRevision`.

## 4. Fitur / Halaman / API Terkait
- **Route Frontend**: `/arsitek/dashboard`, `/arsitek/tenders`, `/arsitek/my-designs`.
- **API**: `/api/architects`, `/api/design-tenders`, `/api/design-requests/revisions`.

## 5. Alur Utama Role
1. **Pilih Persona**: Aktifkan persona Arsitek.
2. **Browsing Tender**: Melihat daftar `DesignTender` yang dipublikasikan oleh Admin.
3. **Bidding / Submission**: Mengajukan penawaran desain untuk kebutuhan Konsumen tertentu.
4. **Design Iteration**: Jika terpilih, Arsitek mengunggah draf desain awal.
5. **Revisi Desain**: Melakukan perbaikan berdasarkan feedback Konsumen/Admin.
   - Batasan: 3 Major (Perubahan struktur/layout besar) / 5 Minor (Perubahan detail kecil).
6. **Final Approval**: Menyerahkan desain final yang akan digunakan Admin untuk konversi menjadi proyek konstruksi.

## 6. Hubungan dengan Role Lain
- **Arsitek ↔ Konsumen**: Diskusi konsep dan persetujuan visual.
- **Arsitek ↔ Admin**: Koordinasi tender dan serah terima data desain untuk perencanaan RAB.

## 7. Batasan dan Catatan Scope
- **Pre-Construction Only**: Arsitek tidak terlibat langsung dalam pengerjaan fisik di lapangan atau verifikasi progres konstruksi harian.
- **Local Tender**: Sistem tender di sini adalah simulasi alur kerja lokal untuk menguji logika bisnis desain.

## 8. Checklist Validasi Alur
- [ ] Arsitek dapat melihat daftar tender yang tersedia.
- [ ] Pengajuan revisi tercatat dengan status dan jumlah sisa revisi yang benar.
- [ ] Desain final dapat diakses oleh Admin untuk proses konversi.

---
*Terakhir diperbarui: Batch Alur Per Role 01.*
