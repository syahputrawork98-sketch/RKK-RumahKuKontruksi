# F11 — Auth Access Control System

## Story
Sistem keamanan lapisan inti untuk memverifikasi kredensial dan mengatur batas privasi pengguna berdasarkan *role* (Authentication & Authorization).

## Status
- **Current Status**: Existing / Partial (Dev Mock Auth Only)

## Scope
- Integrasi JWT Auth / Supabase Auth.
- Proteksi Route Frontend.
- Proteksi Middleware Backend.

## Role / Modul Terkait
- Lintas Role

## Alur Utama
1. User login dengan password/email.
2. Server merespon dengan token/sesi.
3. User menavigasi ke halaman khusus yang divalidasi lewat *auth guard*.

## Data / API / Dependency Terkait
- Auth Strategy (belum ditentukan pastinya, berpotensi JWT atau Supabase GoTrue).

## Status Implementasi Saat Ini
- *Not Verified* (kemungkinan masih digantikan *Dev Persona Switcher*).

## Risiko / Needs Verification
- *Needs Verification*: Peralihan strategi dari mock autentikasi `DevAuth` menuju JWT atau Supabase GoTrue untuk lingkungan produksi sesungguhnya.

## Codebase Verification
- **Frontend Auth Handling**: Menggunakan sistem simulasi *Developer Persona Switcher*. Komponen utama meliputi `DevAuthContext.jsx` untuk *state management* persona, dan `SignInPage.jsx` tanpa *input password*.
- **Route Protection**: Penjagaan rute *frontend* telah berfungsi menggunakan `DevRouteGuard.jsx` yang bersandar pada validasi *local storage* (`rkk.devAuth`) untuk mengecek otoritas *role prefix*.
- **Backend Middleware**: **Tidak Ditemukan**. Absennya penyedia autentikasi *backend* (tidak ada *middleware* verifikasi JWT atau *role guard* pada rute API).
- **Database Model**: **Tidak Ditemukan**. Skema Prisma bersih dari kolom penampung kredensial rahasia (seperti `passwordHash` atau `sessionToken`).
- **Keputusan Status**: Tervalidasi sebagian secara eksklusif untuk kepentingan pengembangan (*Existing / Partial*). Alur autentikasi produksi belum diimplementasikan.

## Next Step
- Merancang alur otentikasi asli untuk produksi.
