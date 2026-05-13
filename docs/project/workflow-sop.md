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
        *   Menulis bagian "**Instruksi untuk USER**" di laporan akhir.
        *   Menyarankan tindakan manual git kepada USER dalam bentuk apapun.
        *   Melakukan loop analisa-fix-check tanpa instruksi baru dari Room Chat 00.
    *   **Format Laporan Akhir (Wajib)**:
        1. File yang diubah
        2. Ringkasan perubahan
        3. Hasil smoke test/check
        4. Konfirmasi scope (sesuai/tidak dengan instruksi Room 00)
        5. Risiko tersisa (jika ada)

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

## 4. Aturan Final Anti-Duplikasi (Workflow Guard)

Bagian ini mengunci aturan main agar tidak terjadi kebingungan rujukan atau duplikasi instruksi di masa mendatang:

*   **Satu Sumber Kebenaran (Single SoT)**: Seluruh detail Standard Operating Procedure (SOP) aktif hanya berada di `docs/project/workflow-sop.md`. Folder `docs/project-instructions/` telah dihapus dan **DILARANG KERAS** untuk dibuat ulang.
*   **Add Instructions ChatGPT**: Hanya boleh berisi *pointer* pendek dan aturan inti absolut. Jangan pernah menjadikan *Add Instructions* sebagai pusat SOP kedua yang mendetail.
*   **Wewenang Commit & Push**:
    *   Blok instruksi "Commit & Push" **hanya boleh** ditulis oleh **Room Chat 00** saat memberikan instruksi eksekusi final untuk Gemini 3 Flash.
    *   **Dilarang Keras** menyertakan instruksi *Commit & Push* pada tahap: diskusi, evaluasi laporan, *acceptance*, perencanaan umum, analisa, atau tanya jawab SOP.
*   **Batasan Laporan Gemini 3 Flash**:
    *   Hanya melaporkan hasil eksekusi teknis sesuai format wajib.
    *   **Dilarang Keras**: Menulis bagian "Instruksi untuk USER", memberi *command* git, atau menyarankan tindakan *commit/push* dalam bentuk apapun.
*   **Prosedur Acceptance**:
    *   Jika laporan Gemini sehat, sesuai *scope*, dan pengecekan (*check/lint*) berhasil, **Room Chat 00** memberikan status **Accepted** dan langsung melanjutkan ke rencana/batch berikutnya.
    *   Jangan meminta validasi manual berulang-ulang sebagai standar prosedur (*default*) jika data teknis sudah valid.
