import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ===== LAYOUTS =====




// ===== HALAMAN UMUM =====
import MainLayout from "./layouts/MainLayout";
import Home from "./modules/guest/pages/Home";
import Layanan from "./modules/guest/pages/Layanan";
import CaraKerja from "./modules/guest/pages/CaraKerja";
import ProyekGuest from "./modules/guest/pages/Proyek";
import About from "./modules/guest/pages/Tentang";
import Contact from "./modules/guest/Contact";

// ===== HALAMAN KONSUMEN =====
import KonsumenLayout from "./layouts/KonsumenLayout";
import TimelineProyek from "./pages/konsumen/TimelineProyek";
import DetailTimelineProyek from "./pages/konsumen/DetailTimelineProyek";
import Proyek from "./pages/konsumen/Proyek";
import Profil from "./pages/konsumen/Profil";

// ===== HALAMAN SUPER ADMIN =====
import SuperadminLayout from "./layouts/SuperAdminLayout";
import DashboardSuperadmin from "./pages/superadmin/DashboardSuperadmin";
import DataAdmin from "./pages/superadmin/DataAdminPage";
import DataPengawas from "./pages/superadmin/DataPengawasPage";
import DataMandor from "./pages/superadmin/DataMandorPage";
import PlaceholderPage from "./pages/superadmin/PlaceholderPage";





// ===== HALAMAN ADMIN =====
import AdminLayout from "./layouts/AdminLayout";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

// ===== HALAMAN PENGAWAS =====
import PengawasLayout from "./layouts/PengawasLayout";
import DashboardPengawas from "./pages/pengawas/DashboardPengawas";

// ===== HALAMAN MANDOR =====
import MandorLayout from "./layouts/MandorLayout";
import DashboardMandor from "./pages/mandor/DashboardMandor";

function App() {
  return (
    <Router>
      <Routes>
        {/* ================== MAIN LAYOUT (UMUM) ================== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/cara-kerja" element={<CaraKerja />} />
          <Route path="/proyek" element={<ProyekGuest />} />
          <Route path="/about" element={<About />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/kontak" element={<Contact />} />
        </Route>

        {/* ================== KONSUMEN LAYOUT ================== */}
        <Route path="/konsumen" element={<KonsumenLayout />}>
          <Route path="TimelineProyek" element={<TimelineProyek />} />
          <Route path="TimelineProyek/:stageId" element={<DetailTimelineProyek />} />
          <Route path="proyek" element={<Proyek />} />
          <Route path="profil" element={<Profil />} />
        </Route>

        {/* ================== SUPER ADMIN LAYOUT ================== */}
        <Route path="/superadmin" element={<SuperadminLayout />}>
          <Route path="dashboard" element={<DashboardSuperadmin />} />
          <Route path="data-admin" element={<DataAdmin />} />
          <Route path="data-pengawas" element={<DataPengawas />} />
          <Route path="data-mandor" element={<DataMandor />} />
          
          {/* PLACEHOLDERS */}
          <Route path="data-konsumen" element={<PlaceholderPage title="Manajemen Konsumen" description="Halaman untuk mengelola data konsumen retail dan korporat." />} />
          <Route path="data-perusahaan" element={<PlaceholderPage title="Data Perusahaan & PIC" description="Halaman untuk mengelola data legalitas perusahaan dan PIC proyek." />} />
          <Route path="proyek" element={<PlaceholderPage title="Monitoring Proyek" description="Halaman monitoring status seluruh proyek konstruksi." />} />
          <Route path="progres-proyek" element={<PlaceholderPage title="Laporan Progres" description="Halaman monitoring progres lapangan dari seluruh proyek." />} />
          <Route path="rab" element={<PlaceholderPage title="Monitoring RAB" description="Halaman monitoring rencana anggaran biaya seluruh proyek." />} />
          <Route path="pembayaran/konsumen" element={<PlaceholderPage title="Tagihan Konsumen" description="Halaman monitoring invoice dan pembayaran dari konsumen." />} />
          <Route path="pembayaran/mandor" element={<PlaceholderPage title="Opname Mandor" description="Halaman monitoring pengajuan pembayaran dan opname mandor." />} />
          <Route path="log-aktivitas" element={<PlaceholderPage title="Log Aktivitas Sistem" description="Halaman audit log untuk memantau aktivitas user di sistem." />} />
          <Route path="pengaturan" element={<PlaceholderPage title="Pengaturan Sistem" description="Halaman konfigurasi parameter sistem dan backup data." />} />
        </Route>

        {/* ================== ADMIN LAYOUT ================== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
        </Route>

        {/* ================== PENGAWAS LAYOUT ================== */}
        <Route path="/pengawas" element={<PengawasLayout />}>
          <Route path="dashboard" element={<DashboardPengawas />} />
        </Route>

        {/* ================== MANDOR LAYOUT ================== */}
        <Route path="/mandor" element={<MandorLayout />}>
          <Route path="dashboard" element={<DashboardMandor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
