# Component Inventory

Inventarisasi layout dan komponen utama yang ada di direktori `client/src`.

## Layouts
| Component | Path | Deskripsi | Status |
|---|---|---|---|
| `MainLayout` | `src/layouts/MainLayout.jsx` | Layout untuk guest (Landing, About, Contact). | OK |
| `KonsumenLayout` | `src/layouts/KonsumenLayout.jsx` | Layout untuk dashboard Konsumen. | OK |
| `SuperAdminLayout` | `src/layouts/SuperAdminLayout.jsx` | Layout untuk dashboard SuperAdmin. | OK |
| `AdminLayout` | `src/layouts/AdminLayout.jsx` | Layout untuk dashboard Admin. | OK |
| `PengawasLayout` | `src/layouts/PengawasLayout.jsx` | Layout untuk dashboard Pengawas. | OK |
| `MandorLayout` | `src/layouts/MandorLayout.jsx` | Layout untuk dashboard Mandor. | OK |

## Komponen Utama
| Component | Category | Path | Catatan |
|---|---|---|---|
| `SidebarBase` | UI | `src/components/ui/sidebar/SidebarBase.jsx` | Sidebar navigasi universal. |
| `TopbarBase` | UI | `src/components/ui/topbar/TopbarBase.jsx` | Topbar dashboard universal. |
| `Navbar` | UI | `src/components/Navbar.jsx` | Navbar untuk halaman guest. |
| `Footer` | UI | `src/components/Footer.jsx` | Footer untuk halaman guest. |
| `DashboardStats` | Dashboard | `src/components/ui/dashboard/DashboardStats.jsx` | Komponen statistik dashboard. |
| `DashboardCharts` | Dashboard | `src/components/ui/dashboard/DashboardCharts.jsx` | Visualisasi grafik data. |
| `TLProyek` | Konsumen | `src/components/konsumen/TLProyek.jsx` | Komponen Timeline Proyek. |

## Modul/Fitur
- **Guest Home Components**: Terletak di `src/modules/guest/components/home/` (Slider, AboutSection, FeaturesSection, dll).
- **Guest Tentang Components**: Terletak di `src/modules/guest/components/tentang/`.
- **Dashboard UI Components**: Terletak di `src/components/ui/dashboard/`.
