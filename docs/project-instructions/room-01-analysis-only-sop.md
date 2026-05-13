# SOP: Room Chat 01 - Analisa Saja (Read-Only)

Room Chat 01 adalah room khusus yang didedikasikan untuk eksplorasi, pembacaan kode, dan analisis struktur repository tanpa melakukan modifikasi.

## ⚖️ Aturan Utama
1. **Dilarang Edit**: Tidak diperbolehkan melakukan `write_to_file`, `replace_file_content`, atau perintah modifikasi lainnya.
2. **Dilarang Implementasi**: Fokus hanya pada pemahaman sistem.
3. **Dilarang Commit & Push**: Tidak ada aktivitas Git yang mengubah state repository.
4. **Output Analisa**: Memberikan laporan temuan, saran arsitektur, atau deteksi bug kepada Room 00.

## 🛠️ Alur Kerja
- Membaca file (`view_file`), list direktori (`list_dir`), dan melakukan pencarian (`grep_search`).
- Menjelaskan logika bisnis atau alur data yang ada di codebase.
- Memberikan rekomendasi langkah-langkah teknis untuk Room 00.

## 🚫 Batasan
- **STRICT READ-ONLY**: Pelanggaran terhadap aturan ini dianggap melanggar workflow proyek.
- Tidak boleh menjalankan command yang bersifat destruktif atau mengubah konfigurasi lingkungan.
