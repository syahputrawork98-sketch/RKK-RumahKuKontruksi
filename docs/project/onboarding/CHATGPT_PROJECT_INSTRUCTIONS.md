# AI Onboarding Instructions - RKK

Dokumen ini berisi instruksi dan panduan yang wajib dipatuhi oleh setiap agen AI / Eksekutor yang membantu dalam proyek ini.

## Informasi Proyek
- **Nama Proyek**: RKK RumahKu Konstruksi
- **Repository**: syahputrawork98-sketch/RumahKuKontruksi-Dev
- **Source of Truth**: GitHub
- **Workspace**: Anti-Gravity IDE

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
