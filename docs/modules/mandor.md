# Module: Mandor - RKK RumahKu Konstruksi

Role Mandor adalah pelaksana teknis di lapangan yang bertanggung jawab atas pelaporan harian dan kebutuhan logistik proyek.

## 🏗️ Fitur Utama
- **Daily Task**: Menerima dan mengelola penugasan harian dari Pengawas/Admin.
- **Daily Report**: Melaporkan hasil pekerjaan harian secara mendetail.
- **Weekly Journal**: Melaporkan aktivitas mingguan dan klaim progres (`claimedProgress`).
- **Material Request**: Mengajukan kebutuhan material berdasarkan acuan RAB.
- **Field Issue**: Melaporkan kendala teknis atau alam di lapangan untuk dikoordinasikan.
- **Project Detail**: Memantau info teknis proyek aktif yang ditugaskan.
- **Documentation**: Mengunggah foto bukti pekerjaan harian ke storage lokal.

## 🛡️ Aturan Data
- **DB-Backed**: Seluruh data operasional Mandor wajib ditarik dari database lokal (No Mock Fallback).
- **Claimed Progress**: Angka progres yang diinput Mandor bersifat klaim administratif dan tidak mengubah Progres Resmi proyek.
- **Operational Logs**: Daily Task, Daily Report, dan Field Issue berfungsi sebagai logbook operasional dan **tidak mengubah** Progres Resmi proyek.
- **Post-Completion**: Proyek yang sudah `Selesai` berstatus read-only bagi Mandor.

## 📊 Technical Context
- **Context**: `ForemanPersonaContext`
- **Services**: `foremanService`, `projectService`
- **Reference**: Jurnal Mingguan dapat merujuk `projectStageId` dan `rabItemId` secara opsional untuk konteks pekerjaan.

---
*Status: Database-Backed v1.*
