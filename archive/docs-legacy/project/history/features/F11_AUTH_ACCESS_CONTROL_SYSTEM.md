# Batch F11 — Auth Access Control System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Auth Access Control System.

## Status
Existing / Partial (Dev Mock)

## Story
Sistem keamanan lapisan inti untuk memverifikasi kredensial dan mengatur batas privasi pengguna berdasarkan *role* (Authentication & Authorization).

## Current State
- Mekanisme saat ini terverifikasi mutlak berstatus **Mock** lokal (`DevAuthContext`). Sistem menumpang pada _localStorage_ untuk transisi peran (Persona Switcher) dan sama sekali belum dilindungi oleh rintangan kriptografis produksi (JWT/Session).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F11A | Auth and Access Control Re-Verification | Completed | Memverifikasi ketiadaan Auth Produksi | - |

## HOLD / Blocked Notes
- *Needs Verification*: Peralihan strategi dari mock autentikasi `DevAuth` menuju JWT atau Supabase GoTrue untuk lingkungan produksi sesungguhnya.

## Next Step
- Merancang dan mengerahkan model Tabel `User`, alur pertukaran Sandi/Kredensial, penerbitan Token (JWT), serta proteksi absolut _Middleware Backend_ terhadap 25+ modul API yang saat ini terekspos terbuka.

## Validation Checklist
- [x] Pemetaan `DevAuthContext.jsx` dan _Frontend Guards_
- [x] Deteksi Perlindungan Modul Backend
- [x] Ketersediaan Tabel Database (_User/Session/Token_)
- [ ] Integrasi Kredensial (Hash Password/Supabase Auth)
- [ ] Konstruksi JWT/Session Middleware Production
- [ ] Sambungan _Identity_ ke _AuditLog_

## Notes
- [F11A] Penelusuran menyingkap bahwa fondasi penguncian peran di sisi klien (`DevRouteGuard.jsx`) hanyalah ilusi penyortiran rute berdasarkan penanda _localStorage_ belaka (`rkk.devAuth`), tanpa landasan legalitas _token_. Parahnya, pada sisi _Backend_ (`server/src/app.js`), ketiadaan global `authMiddleware` mengakibatkan semua pintu gerbang modul data bebas diakses tanpa tantangan. Begitu pula di lapisan _Database_, ketiadaan model `User`, `Credential`, maupun `Session` mengonfirmasi kemustahilan sistem mempertahankan diri di alam produksi. Pengerjaan mandiri fase **F11** sangat krusial dan bersyarat utama memblokade celah fatal ini sebelum aplikasi dinyatakan siap dikemas. (*Completed*)
