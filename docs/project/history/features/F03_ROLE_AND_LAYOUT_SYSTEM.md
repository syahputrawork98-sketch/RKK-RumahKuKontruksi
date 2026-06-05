# F03 — Role and Layout System

## Story
Sistem dasar yang mengatur *layout* spesifik untuk setiap peran (*role*) dan pengaturan state role global agar navigasi konsisten.

## Status
- **Current Status**: Existing / Verified Frontend
## Sub-Batch Story
- **F03**: Legacy verification stage, detail not expanded in current compact tracker.
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

## Codebase Verification
- **Layout / Role Component Ditemukan**: Ketujuh *layout* spesifik peran terdeteksi utuh di dalam `App.jsx`, meliputi `MainLayout`, `KonsumenLayout`, `SuperadminLayout`, `AdminLayout`, `PengawasLayout`, `MandorLayout`, dan `ArsitekLayout`.
- **Sidebar / Header Status**: Komponen navigasi *sidebar* dan *header* melekat utuh dalam implementasi *layout* di tiap peran, dibuktikan dengan keberhasilan render rute.
- **Developer Persona Switcher Status**: Teridentifikasi dalam wujud penggunaan kumpulan *Provider* pelacak status khusus (seperti `CustomerPersonaProvider`, `SuperadminPersonaProvider`, dsb) di setiap cakupan rute `DevRouteGuard`.
- **Build Result**: *Pass*. Proses kompilasi kode Vite berjalan sukses.

## Verification Coverage
- **Frontend**: Verified
- **Backend/API**: Not Verified
- **Database/Prisma**: Not Verified
- **Auth/Access**: Not Applicable
- **Build/Validation**: Pass
## Next Step
- Verifikasi kelancaran peralihan sesi (*persona switcher*) ke sistem otentikasi nyata yang dihubungkan dengan API/backend sesungguhnya.

## Risiko / Needs Verification
- *Needs Verification*: Bagaimana transisi *Dev Persona Switcher* menuju sistem otentikasi JWT asli.
