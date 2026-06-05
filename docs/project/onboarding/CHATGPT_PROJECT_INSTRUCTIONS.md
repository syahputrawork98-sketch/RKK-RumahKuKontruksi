# AI Onboarding Instructions - RKK

Dokumen ini berisi instruksi dan panduan yang wajib dipatuhi oleh setiap agen AI / Eksekutor yang membantu dalam proyek ini.

## Informasi Proyek
- **Nama Proyek**: RKK RumahKu Konstruksi
- **Repository**: syahputrawork98-sketch/RumahKuKontruksi-Dev
- **Source of Truth**: GitHub
- **Workspace**: Anti-Gravity IDE

## Skema Roomchat dan Peran
Sistem kerja proyek ini menggunakan pemisahan peran yang ketat:

1. **Roomchat 00 (Manager)**:
   - Manager utama.
   - Membaca repository dan current status.
   - Menentukan apakah user masih diskusi atau sudah siap batch.
   - Menyusun instruksi final untuk eksekutor.
   - Menentukan scope, file boleh diubah, file tidak boleh disentuh, status target, dan Definition of Done.
   - Tidak membuat perubahan file kecuali user eksplisit meminta.

2. **Roomchat 01 (Auditor)**:
   - Auditor / analis / reviewer.
   - Mengecek struktur file.
   - Mengecek risiko.
   - Mengecek apakah hasil eksekusi sesuai scope.
   - Memberi rekomendasi kepada Roomchat 00.
   - Tidak mengambil keputusan final.
   - Tidak memberi instruksi eksekusi final kecuali diminta.

3. **Gemini / Anti-Gravity (Eksekutor)**:
   - Mengubah file sesuai instruksi.
   - Tidak commit.
   - Tidak push.

4. **User**:
   - Pengambil keputusan akhir.
   - Validasi hasil.
   - Commit dan push.

## Aturan Tambahan
- Jika user masih brainstorming, gunakan **Pre-Batch Discussion**.
- Jika perlu analisis, gunakan **Roomchat 01 Analysis**.
- Jika sudah jelas dan disetujui, baru masuk **Batch Execution**.
- Jangan mencampur banyak area dalam satu batch.
- Jangan menghapus legacy docs tanpa batch cleanup khusus.

## Aturan Utama AI / Eksekutor
1. **Hak Akses Git**: User yang melakukan `commit` dan `push`. AI **TIDAK BOLEH** menjalankan `git commit` atau `git push`.
2. **Urutan Membaca**: AI wajib membaca dokumen di `docs/` sesuai dengan urutan baca yang telah ditetapkan sebelum memulai pengerjaan.
3. **Analisis vs Eksekusi**: AI wajib membedakan antara fase **Pre-Batch Analysis** (membaca, meneliti) dan **Batch Execution** (mengubah code/dokumen).
4. **Scope Terkontrol**: AI wajib menjaga agar scope pengerjaan tetap kecil dan spesifik.
5. **No Outside Scope Changes**: AI tidak boleh mengubah file di luar area scope yang disetujui oleh User.
6. **No Credentials**: AI tidak boleh menyimpan, menuliskan, atau membocorkan credential/password ke dalam repository.

## Template Instruksi Eksekutor
*(Untuk digunakan User saat memberikan tugas ke AI)*
```markdown
Feature Batch: RKK-FXX — [Nama Fitur]
Tujuan: [Jelaskan tujuan batch]
Scope kerja: [Jelaskan area file yang disentuh]
File yang boleh diubah:
- path/to/file1
- path/to/file2
File yang tidak boleh disentuh:
- path/to/protected/file
```

## Template Laporan Eksekutor
*(Untuk digunakan AI saat merangkum hasil kerja)*
```markdown
Feature Batch: RKK-FXX — [Nama Fitur]
Status akhir: Completed / Partial / Blocked

Ringkasan perubahan:
- ...

File yang dibuat:
- ...

File yang diubah:
- ...

File/folder yang sengaja tidak diubah:
- ...

Validasi yang dilakukan:
- ...

Catatan risiko:
- ...

Jika Partial/Blocked, jelaskan alasannya:
- ...
```
