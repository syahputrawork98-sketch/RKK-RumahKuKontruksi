# Technical: API Map - RKK RumahKu Konstruksi

**Base URL**: `http://localhost:4000/api`

## 📂 Endpoint Inventory

### 🏗️ Projects & Construction
| Method | Path | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects` | Stabilized | List proyek (Filter: supervisorId, foremanId, customerId). |
| `GET` | `/projects/:id` | Stabilized | Detail proyek & Verified Progress SOT. |
| `PATCH` | `/projects/:id/activate` | Stabilized | Aktivasi proyek (Readiness Checklist). |
| `PATCH` | `/projects/:id/verify-progress` | Stabilized | Update **Verified Progress** (SOT) oleh Pengawas. |
| `PATCH` | `/projects/:id/complete` | Stabilized | Penutupan proyek (Closeout Validation). |
| `GET` | `/projects/:id/stages` | Stabilized | Daftar tahapan proyek. |
| `PATCH` | `/projects/:id/stages/:sid` | Stabilized | Penandaan penyelesaian tahapan (Pengawas). |

### 📝 Operational Reporting
| Method | Path | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET/POST` | `/weekly-journals` | Stabilized | Jurnal mingguan Mandor & Review Pengawas. |
| `GET/POST` | `/weekly-reports` | Stabilized | Laporan mingguan Pengawas & Review Admin. |
| `PATCH` | `/weekly-reports/:id/publish`| Stabilized | Publikasi laporan ke timeline Konsumen. |
| `GET/POST` | `/material-requests` | Stabilized | Request material (RAB-linked). |
| `GET/POST` | `/field-issues` | Stabilized | Pencatatan kendala lapangan. |
| `GET/POST` | `/daily-reports` | Stabilized | Laporan harian teknis. |

### 🎨 Design Request & Tender
| Method | Path | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET/POST` | `/design-requests` | Stabilized | Pengajuan desain Konsumen. |
| `POST` | `/design-requests/:id/convert`| Stabilized | Konversi Design ke Project Planning (Admin). |
| `POST` | `/design-requests/:id/revision`| Stabilized | Pengajuan revisi (Limit: 3 Major / 5 Minor). |
| `GET/POST` | `/design-tenders` | Stabilized | Publikasi tender & Bidding Arsitek. |

### 👥 Persona & Governance
| Method | Path | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/admins`, `/supervisors`, ... | Stabilized | List persona per role. |
| `POST` | `/superadmins/personas` | Stabilized | CRUD persona lokal (Superadmin). |
| `GET` | `/audit-logs` | Stabilized | Log aktivitas database global. |
| `GET/POST` | `/profile-change-requests`| Stabilized | Antrian perubahan data sensitif (NIK/HP). |

### 📂 Documents & Finance
| Method | Path | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/project-documents/upload` | Stabilized | Upload file lokal (multer) ke `/uploads`. |
| `GET/POST` | `/payment-records` | Stabilized | Simulasi pencatatan termin pembayaran. |
| `GET/POST` | `/notifications` | Stabilized | Sistem notifikasi in-app (Polling-based). |

---
*Catatan: Seluruh endpoint tidak memerlukan header Authorization (Local Mode).*
