# RKK Feature Audit & Operational QA Priority

## 1. Feature Inventory & Status Audit
This section maps the current state of RKK features categorized by their data source and readiness for QA.

### Core Construction Modules (Construction Flow)
| Feature | Role | Status | Data Source | QA Ready? | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Project Management** | Admin | **DB-backed** | PostgreSQL (Prisma) | **YES** | CRUD, Assignment, and Activation are fully integrated. |
| **Weekly Journal** | Mandor | **DB-backed** | PostgreSQL (Prisma) | **YES** | SOT for Foreman activities. Full lifecycle implemented. |
| **Journal Review** | Pengawas| **DB-backed** | PostgreSQL (Prisma) | **YES** | Integrated with Weekly Journal lifecycle. |
| **Weekly Report** | Pengawas| **DB-backed** | PostgreSQL (Prisma) | **YES** | Summary for Admin. Uses snapshot from SOT Progress. |
| **Verified Progress** | Pengawas| **DB-backed** | PostgreSQL (Prisma) | **YES** | **Source of Truth (SOT)** for project completion. |
| **Material Request** | All | **DB-backed** | PostgreSQL (Prisma) | **YES** | Full lifecycle: Mandor -> Pengawas -> Admin -> Logistics. |
| **RAB Management** | Admin | **DB-backed** | PostgreSQL (Prisma) | **YES** | Plan, Category, and Item CRUD are fully integrated. |
| **Project Stages** | Admin | **DB-backed** | PostgreSQL (Prisma) | **YES** | Integrated with Project Detail and Readiness Checklist. |

### Dashboard & UI Components
| Component | Status | Data Source | Notes |
| :--- | :--- | :--- | :--- |
| **Dashboard Stats (Mandor)** | **Mixed** | DB + Mock | Project counts are real; "Tugas Hari Ini" is mock. |
| **Dashboard Stats (Pengawas)**| **Mixed** | DB + Mock | Project counts are real; "Alerts" are partially mock. |
| **Dashboard Stats (Admin)** | **DB-backed**| DB | Aggregate counts for projects/reports are real. |
| **Persona Switcher** | **DB-backed**| DB (Seeds) | Uses `DevAuthContext` and database seed IDs. |

### Non-Construction & Experimental Modules
| Feature | Role | Status | Data Source | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Customer Portal** | Konsumen | **Experimental** | Mixed | Project list is real, but timeline/team details have mocks. |
| **Architect Dashboard** | Arsitek | **Experimental** | Mixed | Capacity is from DB; Design Requests are still placeholders. |
| **Payment Gateway** | Admin | **Do Not Build** | N/A | Mock UI only for demonstration. No production payment. |
| **Auth/Security** | All | **Do Not Build** | N/A | Using Persona Switcher only. No real JWT/Sessions. |

---

## 2. Source of Truth (SOT) Rules
1. **Official Progress**: Must come from `projects.verifiedProgress` (updated via `VerifikasiProgresPengawasPage`).
2. **Operational Reports**: Must come from `weekly_journals` and `supervisor_weekly_reports`.
3. **Financials**: Must come from `rab_plans` and linked `projects.budgetTotal`.
4. **Mock Fallback**: PROHIBITED for construction-critical data (Progress, Projects, Reports). Use "Empty State" or "Error State" instead.

---

## 3. Prioritized Manual QA Checklist
Recommended sequence for local stability verification:

1.  **Level 1: Project Setup (Admin)**
    *   Create Project -> Assign Tim (Supervisor & Mandor) -> Create RAB -> Create Stages -> **Activate Project**.
2.  **Level 2: Field Reporting (Mandor)**
    *   Switch to Mandor -> Create Weekly Journal -> Submit.
3.  **Level 3: Field Verification (Pengawas)**
    *   Switch to Pengawas -> Review Mandor Journal -> **Update Verified Progress (SOT)**.
4.  **Level 4: Management Reporting (Pengawas)**
    *   Create Supervisor Weekly Report -> Submit to Admin.
5.  **Level 5: Management Review (Admin)**
    *   Review Supervisor Weekly Report -> Approve/Reject.
6.  **Level 6: Logistics (Full Flow)**
    *   Mandor Request Material -> Pengawas Approve -> Admin Process -> Mandor Receive.

---

## 4. Scope Creep Risk Mitigation
> [!WARNING]
> The following areas are strictly **OFF-LIMITS** for current development to prevent scope creep:
> - **Production Auth**: Do not implement real login or JWT.
> - **Konsumen Portal expansion**: Focus remains on internal operational construction flow.
> - **Real Payments**: No real payment integration or file uploads for invoices.
