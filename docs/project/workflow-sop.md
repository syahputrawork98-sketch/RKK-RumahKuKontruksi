# RKK Project Workflow SOP

Dokumen ini adalah **Source of Truth** tunggal untuk prosedur kerja AI Agent (Room Chat 00, Room Chat 01, Gemini 3 Flash) dalam proyek RumahKu Konstruksi (RKK).

## 1. Peran & Tanggung Jawab

### Room Chat 00 — Master & Strategist
*   **Fungsi**: Pusat komando, pengambil keputusan utama, penjaga batasan proyek (*scope guard*).
*   **Tanggung Jawab**:
    *   Menganalisis kebutuhan USER dan menentukan strategi implementasi.
    *   Memecah fitur besar menjadi batch-batch kecil (Batch Planner).
    *   Membuat instruksi final yang spesifik untuk dieksekusi oleh Gemini 3 Flash.
    *   Mengevaluasi laporan dari Gemini 3 Flash.
    *   Memberikan status **Accepted** jika laporan sesuai dan pengecekan berhasil.
    *   Melanjutkan ke batch berikutnya tanpa meminta validasi berulang secara berlebihan.

### Room Chat 01 — Analysis-Only
*   **Fungsi**: Auditor kode dan analis repositori.
*   **Sifat**: **READ-ONLY**.
*   **Tanggung Jawab**:
    *   Membaca seluruh struktur repositori (client, server, database, docs).
    *   Melakukan audit kode dan memberikan rekomendasi teknis kepada Room Chat 00.
    *   **Dilarang Keras**: Melakukan edit file, implementasi fitur, atau perintah git.

### Gemini 3 Flash — Executor Only
*   **Fungsi**: Pelaksana teknis instruksi.
*   **Tanggung Jawab**:
    *   Menjalankan instruksi spesifik dari Room Chat 00 (satu instruksi, satu kali jalan).
    *   Melakukan pengecekan mandiri ringan (*smoke test/check*) sesuai instruksi.
    *   Melaporkan hasil pekerjaan: daftar file yang diubah, hasil pengecekan, dan risiko tersisa.
    *   **Dilarang Keras**: 
        *   Melakukan perintah git (*add, commit, push*).
        *   Memberikan instruksi commit/push kepada USER.
        *   Melakukan loop analisa-fix-check tanpa instruksi baru dari Room Chat 00.

## 2. Alur Kerja Batch (SOP Operasional)

1.  **Planning**: Room Chat 00 merencanakan batch (maksimal 3-4 fitur kecil/terkait).
2.  **Instruction**: Room Chat 00 memberikan instruksi kepada Gemini 3 Flash. Room Chat 00 boleh menyertakan blok "Commit & Push" sebagai pengingat manual untuk USER.
3.  **Execution**: Gemini 3 Flash mengeksekusi instruksi dan melakukan *smoke test*.
4.  **Reporting**: Gemini 3 Flash melapor kepada USER/Room 00.
5.  **Acceptance**: Jika laporan sehat dan sesuai scope, Room Chat 00 memberikan status **Accepted**.
6.  **Commit & Push**: USER melakukan *commit* dan *push* secara manual berdasarkan catatan di Room Chat 00.
7.  **Next Step**: Room Chat 00 lanjut ke perencanaan batch berikutnya.

## 3. Aturan Git & Validasi

*   **Git Operations**: Seluruh operasi git (*add, commit, push*) dilakukan secara **MANUAL** oleh USER di terminal lokal. AI Agent tidak memiliki akses/wewenang untuk menyentuh history git.
*   **Validation**: Room Chat 00 mengevaluasi laporan Gemini. Jika hasil pengecekan (*lint/check*) sukses dan file yang diubah sesuai, batch dianggap selesai. Tidak perlu meminta USER melakukan validasi manual berulang-ulang sebagai standar prosedur kecuali jika terdapat ambiguitas tinggi.

---
> [!IMPORTANT]
> Seluruh detail teknis di folder `docs/project-instructions/` kini bersifat **LEGACY**. Rujukan utama adalah file ini.
