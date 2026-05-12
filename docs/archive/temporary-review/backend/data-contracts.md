# Data Contracts for Gemini UI Integration

Dokumen ini mendefinisikan kontrak data rill untuk membantu Gemini mengintegrasikan UI dengan Local Backend API.

## 1. Consumer Profile (Edit Profil Konsumen)

**Persona**: Konsumen
**Status**: Data Foundation Ready
**Backend API**: Customers Module (CRUD Available)

### API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/customers/:id` | Mengambil data profil lengkap konsumen. |
| **PATCH** | `/api/customers/:id` | Memperbarui data profil konsumen. |

### Demo Data (Persona ID)
Gunakan ID berikut pada Persona Switcher untuk testing:
- `customer-001` (Iwan Setiawan - Individual)
- `customer-002` (Sari Kartika - Individual)
- `customer-003` (PT Maju Jaya - Company)

### Data Schema (Editable via UI)
| Field | Type | Input Type | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Text | Nama lengkap / Nama Perusahaan |
| `email` | String | Email | Alamat email (Unik) |
| `phone` | String | Tel | Nomor telepon |
| `address` | String | Textarea | Alamat lengkap |
| `avatar` | String | URL | URL foto profil (Placehold.co supported) |
| `identityNumber` | String | Text | NIK / No. KTP |
| `occupation` | String | Text | Pekerjaan |
| `notes` | String | Textarea | Catatan tambahan |

### Data Schema (Read-Only / Info)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique Identifier (CUID) |
| `customerType` | Enum | `individual` atau `company` |
| `createdAt` | DateTime | Tanggal pendaftaran |
| `updatedAt` | DateTime | Tanggal update terakhir |

### Validation & Errors
- **404 Not Found**: Customer tidak ditemukan. Tampilkan Error Page/State.
- **409 Conflict**: Email sudah digunakan oleh customer lain. Tampilkan pesan validasi pada input email.
- **400 Bad Request**: Mismatch data type atau missing required fields (`customerType`, `email`).

### Empty State / Hold Condition
- Fitur ganti password **HOLD** (Auth production belum rill).
- Fitur upload foto rill **HOLD** (Gunakan input URL string untuk avatar).
