# Module: Mandor - RKK RumahKu Konstruksi

Role Mandor adalah pelaksana teknis di lapangan yang bertanggung jawab atas pelaporan harian dan kebutuhan logistik proyek.

## 🏗️ Fitur Utama
- **Weekly Journal**: Melaporkan aktivitas mingguan dan klaim progres (`claimedProgress`).
- **Material Request**: Mengajukan kebutuhan material berdasarkan acuan RAB.
- **Project Detail**: Memantau info teknis proyek aktif yang ditugaskan.
- **Documentation**: Mengunggah foto bukti pekerjaan harian ke storage lokal.

## 🛡️ Aturan Data
- **DB-Backed**: Seluruh data operasional Mandor wajib ditarik dari database lokal (No Mock Fallback).
- **Claimed Progress**: Angka progres yang diinput Mandor bersifat klaim administratif dan tidak mengubah Progres Resmi proyek.
- **Post-Completion**: Proyek yang sudah `Selesai` berstatus read-only bagi Mandor.

---
*Status: Database-Backed v1.*
