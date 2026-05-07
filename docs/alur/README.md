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
