# F03 — Role and Layout System

## Story
Sistem dasar yang mengatur *layout* spesifik untuk setiap peran (*role*) dan pengaturan state role global agar navigasi konsisten.

## Status
- **Current Status**: Existing / Partial

## Scope
- Komponen Layout per role.
- Mekanisme navigasi Sidebar/Header dinamis.
- *Developer Persona Switcher* (mode lokal).

## Role / Modul Terkait
- Lintas Role (Admin, Konsumen, Pengawas, Mandor, Superadmin)

## Alur Utama
1. User masuk/simulasi sebagai Role tertentu.
2. Sistem menyuntikkan *RoleDataState*.
3. Sistem me-render Layout spesifik dengan menu yang sesuai hak akses role.

## Data / API / Dependency Terkait
- Dev Persona Switcher (Frontend).
- Route middlewares.

## Status Implementasi Saat Ini
- *Existing / Partial* (Switcher aktif di lokal).

## Risiko / Needs Verification
- *Needs Verification*: Bagaimana transisi *Dev Persona Switcher* menuju sistem otentikasi JWT asli.

## Next Step
- Verifikasi struktur *Layout* frontend.
