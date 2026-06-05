# Manajemen Proyek RKK

Direktori `docs/project/` adalah pusat kendali untuk proyek RKK (RumahKu Konstruksi). Semua hal terkait alur kerja, onboarding AI, pelacakan fitur, dan baseline dokumentasi diatur di sini.

## Struktur Direktori
- `onboarding/` - Instruksi kerja untuk asisten AI (seperti ChatGPT/Gemini).
- `workflow/` - Definisi sistem kerja, ukuran batch, dan panduan penggunaan model.
- `history/` - Pelacakan fitur (Feature Tracker), status terkini, dan riwayat pengerjaan batch.
- `baseline/` - Catatan kondisi dasar (existing) proyek sebelum adanya perapihan lebih lanjut.

## Prinsip Kerja Proyek
- **GitHub adalah Source of Truth**: Semua code yang valid dan disetujui berada di repository GitHub.
- **Anti-Gravity IDE sebagai Ruang Kerja**: Tempat eksekusi kode, pengujian, dan validasi nyata.
- **User Pengambil Keputusan**: Setiap perubahan yang diajukan harus disetujui dan di-commit/push oleh User.
- **Perubahan Bertahap**: Eksekusi selalu dilakukan dalam lingkup batch yang kecil dan terkontrol.
- **Baseline Dokumentasi**: Sebelum dilakukan perombakan besar, kondisi existing harus dicatat dalam `baseline/` sebagai referensi.
