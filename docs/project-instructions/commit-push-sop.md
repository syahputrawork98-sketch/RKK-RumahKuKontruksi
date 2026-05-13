# SOP: Commit & Push Workflow

Proses penyimpanan perubahan ke repository Git harus dilakukan secara disiplin untuk menjaga riwayat perubahan yang bersih.

## ⚖️ Aturan Utama
1. **Manual Action by USER**: `git add`, `git commit`, dan `git push` **hanya** boleh dilakukan secara manual oleh USER melalui terminal lokal.
2. **Standard Message**: Gunakan format Conventional Commits (misal: `feat(module): description`, `docs(project): description`).
3. **Catatan Untuk USER**: Blok teks "Commit & Push" pada instruksi Room Chat 00 adalah **pengingat/catatan untuk USER**, bukan perintah untuk dieksekusi oleh Gemini 3 Flash.
4. **Dilarang Untuk Gemini**: Gemini 3 Flash dilarang menjalankan perintah git (add/commit/push) dalam kondisi apa pun.
5. **Clean Diff**: Selalu jalankan `git diff --check` sebelum melakukan commit untuk memastikan tidak ada whitespace yang tidak perlu atau konflik dasar.

## 🛠️ Alur Kerja
1. Executor menyelesaikan tugas dan memberikan laporan.
2. USER memeriksa `git status` dan `git diff`.
3. USER menjalankan:
   ```bash
   git add .
   git commit -m "tag(scope): detail message"
   git push
   ```
4. Update nomor commit di `docs/batches/` jika diperlukan (optional).

## 🚫 Batasan
- Hindari melakukan commit besar yang mencampuradukkan berbagai fitur yang tidak berhubungan.
- Jangan melakukan push jika tes dasar (smoke test) gagal.
