# Technical: Dev Persona Switcher - RKK RumahKu Konstruksi

Sistem ini menggunakan **Developer Persona Switcher** sebagai pengganti sistem autentikasi rill selama fase pengembangan lokal.

## 🏗️ Mekanisme
- **PersonaContext**: Menyimpan ID dan data role aktif di state aplikasi.
- **LocalStorage**: Menyimpan pilihan persona terakhir agar tidak hilang saat refresh.
- **No Password**: Berpindah role hanya memerlukan satu klik pada modal switcher (Dev Sign-In).

## 🛡️ Batasan
- **Bukan Auth Rill**: Tidak ada token JWT, session server-side, atau enkripsi password.
- **Simulasi Saja**: Switcher ini digunakan untuk mempermudah pengujian alur kerja lintas role (Mandor, Pengawas, Admin, dll) dalam satu browser.

---
*Keamanan produksi akan diimplementasikan pada fase sistem hardening di masa depan.*
