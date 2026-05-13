# Alur Publik - RKK RumahKu Konstruksi

## 1. Status Dokumen
- Dokumen ini menjelaskan alur operasional untuk role **Publik** (Guest/Calon Konsumen).
- Mengacu ke [Alur Bisnis RKK](./alur-bisnis-rkk.md) sebagai alur induk.
- Mengikuti kondisi frontend dan landing page aktif saat ini.

## 2. Posisi Role dalam Sistem
- Publik adalah pengunjung awal aplikasi atau calon konsumen yang belum masuk ke dalam workflow operasional proyek.
- Role ini bersifat *Guest* (Anonim) sebelum memilih persona atau mendaftar sebagai Konsumen.
- Fungsinya adalah mendapatkan informasi layanan, portofolio, dan cara kerja RKK.

## 3. Entity / Database Terkait
- **N/A**: Publik tidak memiliki entity database operasional utama sampai mereka menjadi Konsumen (`Customer`).
- Data yang diakses bersifat publik (Portofolio, Landing Content).

## 4. Fitur / Halaman / API Terkait
- **Route Frontend**: `/` (Landing Page), `/portfolio`, `/about`.
- **API**: Mengakses endpoint publik (jika tersedia) untuk konten informasi.

## 5. Alur Utama Role
1. **Akses Landing Page**: Pengunjung melihat ringkasan layanan RKK.
2. **Eksplorasi Portofolio**: Melihat hasil kerja RKK sebelumnya untuk membangun kepercayaan.
3. **Cek Layanan**: Memahami perbedaan antara jasa desain, konstruksi, dan manajemen proyek.
4. **Konversi ke Konsumen**: Jika tertarik, pengunjung beralih menggunakan **Persona Switcher** atau mendaftar untuk menjadi Konsumen agar dapat mengajukan desain.

## 6. Hubungan dengan Role Lain
- **Publik → Konsumen**: Titik sambung utama di mana pengunjung anonim beralih menjadi user terdaftar (`Customer`) untuk memulai workflow.

## 7. Batasan dan Catatan Scope
- **Non-Operational**: Publik tidak dapat melihat progres proyek rill, RAB, atau laporan internal.
- **Local Dev**: Dalam konteks pengembangan lokal, Publik diwakili oleh kondisi awal aplikasi sebelum user memilih persona di switcher.

## 8. Checklist Validasi Alur
- [ ] Landing page dapat diakses tanpa login/persona.
- [ ] Portofolio terlihat jelas sebagai nilai jual.
- [ ] Tombol atau instruksi untuk mulai konsultasi/desain mengarah ke aktivasi persona Konsumen.

---
*Terakhir diperbarui: Batch Alur Per Role 01.*
