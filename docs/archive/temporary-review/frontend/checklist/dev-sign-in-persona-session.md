# Frontend Checklist - Dev Sign-In & Persona Session

## Status Saat Ini
Local Dev Tool. Bukan auth produksi.

## Tujuan
Mempermudah pengujian role dan persona di local development tanpa login/JWT/password.

## Prinsip
- Dev Sign-In bukan login produksi.
- Tidak ada password.
- Tidak ada JWT.
- Tidak ada session server.
- Tidak ada RBAC asli.
- Hanya untuk local development.
- Auth/JWT/RBAC produksi tetap Postponed.
- Persona harus diambil dari database/API lokal, bukan dari mock fallback.
- Jika API kosong/error, tampilkan empty/error state.

## Flow
- User membuka `/sign-in`.
- User memilih role.
- Sistem mengambil daftar persona berdasarkan role dari database API.
- User memilih persona.
- Sistem menyimpan dev session ke localStorage `rkk.devAuth`.
- **Sistem mensinkronkan persona.id ke key localStorage lama** agar context existing (seperti `SupervisorPersonaContext`) langsung mendeteksi pilihan tersebut.
- Sistem redirect ke dashboard sesuai role.

## Design Patterns
- **Pola Utama**: Menggunakan pola **Pengawas** dan **Mandor** sebagai acuan struktur persona context dan layout yang paling eksplisit.
- **Admin**: Didukung untuk local dev, namun context-nya (`AdminPersonaContext`) tetap dipertahankan perilakunya (auto-select first jika kosong) tanpa perombakan besar.
- **Arsitek**: Wajib didukung dengan endpoint `/api/architects`.

## Role → Endpoint Persona
| Role | Endpoint |
|---|---|
| Admin | `GET /api/admins` |
| Superadmin | `GET /api/superadmins` |
| Pengawas | `GET /api/supervisors` |
| Mandor | `GET /api/foremen` |
| Arsitek | `GET /api/architects` |
| Konsumen | `GET /api/customers` |

## Redirect Setelah Sign-In
| Role | Redirect |
|---|---|
| Admin | `/admin/dashboard` |
| Superadmin | `/superadmin/dashboard` |
| Pengawas | `/pengawas/dashboard` |
| Mandor | `/mandor/dashboard` |
| Arsitek | `/arsitek/dashboard` |
| Konsumen | `/konsumen/proyek` |

## LocalStorage
Gunakan key:
`rkk.devAuth`

Format data:
| Admin | `rkk.dev.selectedAdminId` |
| Superadmin | `rkk.dev.selectedSuperadminId` |
| Pengawas | `rkk.dev.selectedSupervisorId` |
| Mandor | `rkk_selected_foreman_id` |
| Arsitek | `rkk_selected_architect_id` |
| Konsumen | `rkk_customer_id` |

## UI States
- Role belum dipilih.
- Loading persona.
- Persona kosong.
- API error.
- Persona dipilih.
- Redirect success.

## Tidak Dikerjakan
- JWT.
- Password.
- Register.
- Refresh token.
- Auth backend.
- RBAC server-side.
- Permission production.

## Acceptance Criteria
- [ ] User bisa membuka `/sign-in`.
- [ ] User bisa memilih role.
- [ ] Persona difetch dari API sesuai role.
- [ ] User bisa memilih persona.
- [ ] Dev session tersimpan ke localStorage.
- [ ] User diarahkan ke dashboard role.
- [ ] User bisa sign out.
- [ ] Jika belum sign-in, route internal diarahkan ke `/sign-in`.
- [ ] Jika role tidak cocok dengan route, user diarahkan ke dashboard role aktif.
- [ ] Tidak ada JWT/password/register yang dibuat.
