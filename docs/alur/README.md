# Alur Peran (Role Workflow)

Dokumen ini menjelaskan tanggung jawab dan alur kerja untuk setiap peran di sistem RumahKu Kontruksi (RKK).

## Prinsip Pengembangan Lokal (Local Development First)
- Sistem ini dikembangkan dengan pendekatan **local-development-first**.
- Belum ada sistem autentikasi (Login/JWT/Session) yang diimplementasikan.
- Pemilihan identitas (persona) dilakukan melalui **Switcher** di Topbar.
- Identitas yang dipilih bersifat persisten secara lokal (menggunakan `localStorage`).

## Status Fitur
Setiap alur kerja ditandai dengan status berikut:
- **Implemented**: Fitur sudah dapat digunakan dengan data dari database lokal.
- **Partial**: Fitur sudah memiliki UI namun integrasi data belum lengkap.
- **Planned**: Fitur sudah direncanakan namun belum mulai dibangun.
- **Postponed**: Fitur ditunda untuk sementara.
- **Do Not Build Yet**: Fitur tidak boleh dibangun pada fase ini.

## Daftar Peran
- [**Admin**](./admin.md) (DB-Backed v1)
- [**Superadmin**](./superadmin.md) (Partial / Entity API Exists)
- [**Konsumen**](./konsumen.md) (Mock-First / Partial)
- [**Arsitek**](./arsitek.md) (DB-Backed v1 Profile / Workflow Mock-First)
- [**Mandor**](./mandor.md) (DB-Backed v1 Projects / Operational Backend Pending)
- [**Pengawas**](./pengawas.md) (DB-Backed v1 Projects / Operational Backend Pending)
- [**PIC**](./pic.md) (Planned)

## Alur Turunan / Workflow Operasional
Dokumen di bawah ini menjelaskan proses bisnis spesifik yang melibatkan satu atau lebih peran.

- [**Pembayaran Konsumen / Termin**](./payment-customer.md) (Planned)
- [**Pengajuan Material Mandor**](./material-request.md) (Experimental Backend Draft)
- [**Pengajuan Pembayaran Mandor**](./payment-foreman.md) (Planned / Backend Pending)
- [**Jurnal Mingguan Mandor**](./jurnal-mingguan-mandor.md) (Planned / Backend Pending)
- [**Laporan Mingguan Pengawas**](./alur-laporan-mingguan-pengawas.md) (Planned / Backend Pending)
- [**Progress Proyek ke Konsumen**](./alur-progress-proyek-ke-konsumen.md) (Planned / Backend Pending)
- [**Alur Change Order / Perubahan RAB**](./alur-change-order-perubahan-rab-pekerjaan-tambahan.md) (Planned)
- [**Alur Notifikasi Sistem**](./notification-system.md) (Planned)
- [**Approval, Rejection, Revisi**](./07-alur-approval-rejection-revisi.md) (Planned)
- [**Dokumen & Foto Proyek**](./dokumen-foto-proyek.md) (Planned)
