# SOP: Batch & Roadmap Management

Manajemen progres proyek RKK dilakukan melalui sistem Batch untuk menjaga keteraturan dan dokumentasi yang sinkron.

## ⚖️ Aturan Utama
1. **Kontinuitas Batch**: Jangan pernah mulai ulang dari Batch 1. Selalu lanjutkan dari nomor batch terakhir yang tercatat di `docs/batches/`.
2. **Batch Kelipatan 5**: Setiap batch dengan nomor kelipatan 5 (misal: Batch 50, 55, 60) adalah periode khusus untuk **Checkpoint, Review, dan Sinkronisasi Dokumentasi**.
3. **Pencatatan Status**: Setiap batch yang selesai harus dicatatkan di file history yang relevan (misal: `docs/batches/batch-51-60.md`).
4. **Exclusion Room 01**: Sesi analisa di Room Chat 01 **tidak dihitung** sebagai batch implementasi.
5. **Definisi Batch Implementasi**: Sebuah batch baru dihitung jika:
   - Room Chat 00 membuat instruksi eksekusi final.
   - Gemini 3 Flash menjalankan instruksi tersebut.
   - Terjadi perubahan file hasil eksekusi.
   - USER melakukan commit dan push manual.
6. **Ukuran Batch**: Satu batch idealnya mencakup **3 sampai 4 fitur kecil/terkait**, atau maksimal **3 fitur utama**.
7. **Patch Dokumentasi**: Patch kecil untuk menyelesaikan checkpoint batch (seperti perapihan SOP) tetap dihitung dalam batch checkpoint yang sama, bukan batch baru.

## 🛠️ Alur Kerja
- Tentukan target batch.
- Kerjakan fitur/perbaikan dalam beberapa sub-batch jika perlu.
- Update file dokumentasi setiap kali batch mencapai status "Accepted".
- Pastikan roadmap di `docs/project/roadmap-active.md` selalu up-to-date.

## 🚫 Batasan
- Dilarang melompati urutan batch tanpa alasan yang jelas.
- Batch kelipatan 5 tidak disarankan untuk mengerjakan fitur besar yang berisiko merusak stabilitas, melainkan fokus pada kerapihan docs.
