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
- [Admin](./admin.md) (Implemented)
- [Superadmin](./superadmin.md) (Implemented)
- [Konsumen](./konsumen.md) (Planned)
- [Arsitek](./arsitek.md) (Partial)
- [Mandor](./mandor.md) (Partial)
- [Pengawas](./pengawas.md) (Partial)
- [PIC](./pic.md) (Planned)
- [Pembayaran Konsumen](./payment-customer.md) (Planned)

## Alur Turunan (Derived Workflows)
- [Pengajuan Material Mandor](./material-request.md) (Implemented)
- [Pengajuan Pembayaran Mandor](./payment-foreman.md) (Planned)
- [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md) (Planned)
- [Laporan Mingguan Pengawas](./alur-laporan-mingguan-pengawas.md) (Planned)
- [Alur Notifikasi Sistem](./notification-system.md) (Planned)
- [Approval, Rejection, Revisi](./07-alur-approval-rejection-revisi.md) (Planned)
- [Progress Proyek ke Konsumen](./alur-progress-proyek-ke-konsumen.md) (Planned)
- [Dokumen & Foto Proyek](./dokumen-foto-proyek.md) (Planned)
