# SOP: Room Chat 00 - Master / Pengambil Keputusan

Room Chat 00 adalah **Master Room** yang berfungsi sebagai pusat komando, pengambil keputusan arsitektur, dan pengelola roadmap utama.

## ⚖️ Aturan Utama
1. **Pusat Kebenaran**: Room 00 memegang kendali penuh atas arah proyek.
2. **Delegasi Tugas**: Room 00 memberikan instruksi spesifik kepada Gemini 3 Flash (Executor) untuk pengerjaan teknis.
3. **Analisa Mendalam**: Menggunakan input dari Room 01 (Analisa Saja) untuk mempertimbangkan keputusan sebelum dieksekusi.
4. **Validasi Hasil**: Menerima laporan dari Executor dan memutuskan apakah tugas sudah selesai (Accepted) atau perlu perbaikan.

## 🛠️ Alur Kerja
- Mendefinisikan Batch dan Task.
- Menuliskan instruksi lengkap (termasuk blok Commit & Push) untuk dikirim ke Executor.
- Melakukan review terhadap laporan yang dikirimkan oleh Executor.
- Melakukan manual commit/push setelah verifikasi selesai.

## 🚫 Batasan
- Tidak melakukan pengetikan kode yang bersifat masif secara langsung jika tugas tersebut bisa didelegasikan ke Executor.
- Menghindari instruksi yang ambigu atau terlalu luas dalam satu kali jalan.
