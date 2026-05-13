# SOP: Commit & Push Workflow

Proses penyimpanan perubahan ke repository Git harus dilakukan secara disiplin untuk menjaga riwayat perubahan yang bersih.

## ⚖️ Aturan Utama
1. **Manual Action**: Secara default, `git add`, `git commit`, dan `git push` dilakukan secara manual oleh USER melalui terminal lokal.
2. **Standard Message**: Gunakan format Conventional Commits (misal: `feat(module): description`, `docs(project): description`).
3. **Instruksi Executor**: Setiap instruksi dari Room 00 ke Gemini 3 Flash harus menyertakan blok teks "Commit & Push" di bagian paling atas sebagai pengingat bagi USER.
4. **Clean Diff**: Selalu jalankan `git diff --check` sebelum melakukan commit untuk memastikan tidak ada whitespace yang tidak perlu atau konflik dasar.

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
