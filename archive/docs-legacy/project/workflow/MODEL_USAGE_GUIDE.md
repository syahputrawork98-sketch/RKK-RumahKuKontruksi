# Panduan Penggunaan Model AI

Proyek RKK menggunakan AI model secara spesifik berdasarkan bobot dan risiko tugas (batch). 

## Aturan Pemilihan Model
- **Gemini 3.1 Pro Low**: Digunakan untuk pengerjaan batch "Small" yang meliputi perbaikan dokumentasi, perbaikan tipe (typo), modifikasi file tunggal yang sangat ringan.
- **Gemini 3.1 Pro High**: Digunakan secara default untuk batch "Medium", pekerjaan multi-file yang kompleks, refactoring arsitektur, dan tugas audit (Roomchat 01).
- **Alternative Acceleration Model**: Hanya digunakan *jika dan hanya jika* ada instruksi eksplisit dari User untuk menggunakannya demi percepatan eksekusi yang spesifik.

## Batasan Operasional AI Model
- **Tidak ada hak Commit/Push**: Model eksekutor dilarang keras dan secara sistem tidak boleh melakukan `git commit` maupun `git push`.
- **User sebagai Penentu**: Keputusan final untuk mengadopsi atau menolak saran AI berada di tangan User. Model hanya menyajikan proposal dan eksekusi lokal.
