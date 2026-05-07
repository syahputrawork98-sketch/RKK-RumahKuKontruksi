import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ===== CONTEXT / AUTH =====
import { DevAuthProvider } from "./context/DevAuthContext";
import DevRouteGuard from "./components/auth/DevRouteGuard";
import SignInPage from "./pages/auth/SignInPage";

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
import LogAktivitas from "./pages/superadmin/LogAktivitasPage";
import PlaceholderPage from "./pages/superadmin/PlaceholderPage";

// ===== HALAMAN ADMIN =====
import AdminLayout from "./layouts/AdminLayout";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProyekAdminPage from "./pages/admin/ProyekAdminPage";
import CreateProyekAdminPage from "./pages/admin/CreateProyekAdminPage";
import DetailProyekAdminPage from "./pages/admin/DetailProyekAdminPage";
import RabAdminPage from "./pages/admin/RabAdminPage";
import DetailRabAdminPage from "./pages/admin/DetailRabAdminPage";
import PembayaranAdminPage from "./pages/admin/PembayaranAdminPage";
import PenugasanTimAdminPage from "./pages/admin/PenugasanTimAdminPage";
import LaporanProgressAdminPage from "./pages/admin/LaporanProgressAdminPage";
import RequestMaterialAdminPage from "./pages/admin/RequestMaterialAdminPage";
import PengaturanAdminPage from "./pages/admin/PengaturanAdminPage";

// ===== HALAMAN PENGAWAS =====
import PengawasLayout from "./layouts/PengawasLayout";
import DashboardPengawas from "./pages/pengawas/DashboardPengawas";
import ProyekDiawasiPengawasPage from "./pages/pengawas/ProyekDiawasiPengawasPage";
import DetailProyekDiawasiPengawasPage from "./pages/pengawas/DetailProyekDiawasiPengawasPage";
import VerifikasiProgresPengawasPage from "./pages/pengawas/VerifikasiProgresPengawasPage";
import DokumentasiLapanganPengawasPage from "./pages/pengawas/DokumentasiLapanganPengawasPage";
import LaporanMingguanPengawasPage from "./pages/pengawas/LaporanMingguanPengawasPage";
import RequestMaterialPengawasPage from "./pages/pengawas/RequestMaterialPengawasPage";
import PengaturanPengawasPage from "./pages/pengawas/PengaturanPengawasPage";

// ===== HALAMAN MANDOR =====
import MandorLayout from "./layouts/MandorLayout";
import DashboardMandor from "./pages/mandor/DashboardMandor";
import ProyekAktifMandorPage from "./pages/mandor/ProyekAktifMandorPage";
import DetailProyekAktifMandorPage from "./pages/mandor/DetailProyekAktifMandorPage";
import TugasHarianMandorPage from "./pages/mandor/TugasHarianMandorPage";
import LaporanHarianMandorPage from "./pages/mandor/LaporanHarianMandorPage";
import RequestMaterialMandorPage from "./pages/mandor/RequestMaterialMandorPage";
import DokumentasiLapanganMandorPage from "./pages/mandor/DokumentasiLapanganMandorPage";
import KendalaLapanganMandorPage from "./pages/mandor/KendalaLapanganMandorPage";
import PengaturanMandorPage from "./pages/mandor/PengaturanMandorPage";

// ===== HALAMAN ARSITEK =====
import ArsitekLayout from "./layouts/ArsitekLayout";
import DashboardArsitek from "./pages/arsitek/DashboardArsitek";
import PermintaanDesainArsitekPage from "./pages/arsitek/PermintaanDesainArsitekPage";
import DetailPermintaanDesainArsitekPage from "./pages/arsitek/DetailPermintaanDesainArsitekPage";
import DesainAktifArsitekPage from "./pages/arsitek/DesainAktifArsitekPage";
import FileDesainArsitekPage from "./pages/arsitek/FileDesainArsitekPage";
import RevisiDesainArsitekPage from "./pages/arsitek/RevisiDesainArsitekPage";
import RiwayatDesainArsitekPage from "./pages/arsitek/RiwayatDesainArsitekPage";
import PengaturanArsitekPage from "./pages/arsitek/PengaturanArsitekPage";

import { SupervisorPersonaProvider } from "./context/SupervisorPersonaContext";
import { ForemanPersonaProvider } from "./context/ForemanPersonaContext";
import { ArchitectPersonaProvider } from "./context/ArchitectPersonaContext";
import { AdminPersonaProvider } from "./context/AdminPersonaContext";
import { SuperadminPersonaProvider } from "./context/SuperadminPersonaContext";

function App() {
  return (
    <Router>
      <DevAuthProvider>
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
            <Route path="/sign-in" element={<SignInPage />} />
          </Route>

          {/* ================== KONSUMEN LAYOUT ================== */}
          <Route 
            path="/konsumen" 
            element={
              <DevRouteGuard allowedRolePrefix="/konsumen">
                <KonsumenLayout />
              </DevRouteGuard>
            }
          >
            <Route path="TimelineProyek" element={<TimelineProyek />} />
            <Route path="TimelineProyek/:stageId" element={<DetailTimelineProyek />} />
            <Route path="proyek" element={<Proyek />} />
            <Route path="profil" element={<Profil />} />
          </Route>

          {/* ================== SUPER ADMIN LAYOUT ================== */}
          <Route 
            path="/superadmin" 
            element={
              <DevRouteGuard allowedRolePrefix="/superadmin">
                <SuperadminPersonaProvider>
                  <SuperadminLayout />
                </SuperadminPersonaProvider>
              </DevRouteGuard>
            }
          >
            <Route path="dashboard" element={<DashboardSuperadmin />} />
            <Route path="data-admin" element={<DataAdmin />} />
            <Route path="data-pengawas" element={<DataPengawas />} />
            <Route path="data-mandor" element={<DataMandor />} />
            
            {/* PLACEHOLDERS */}
            <Route path="data-arsitek" element={<PlaceholderPage title="Manajemen Arsitek" description="Halaman untuk mengelola data mitra arsitek dan desain proyek." />} />
            <Route path="data-konsumen" element={<PlaceholderPage title="Manajemen Konsumen" description="Halaman untuk mengelola data konsumen retail dan korporat." />} />
            <Route path="data-perusahaan" element={<PlaceholderPage title="Data Perusahaan & PIC" description="Halaman untuk mengelola data legalitas perusahaan dan PIC proyek." />} />
            <Route path="proyek" element={<PlaceholderPage title="Monitoring Proyek" description="Halaman monitoring status seluruh proyek konstruksi." />} />
            <Route path="progres-proyek" element={<PlaceholderPage title="Laporan Progres" description="Halaman monitoring progres lapangan dari seluruh proyek." />} />
            <Route path="rab" element={<PlaceholderPage title="Monitoring RAB" description="Halaman monitoring rencana anggaran biaya seluruh proyek." />} />
            <Route path="pembayaran/konsumen" element={<PlaceholderPage title="Tagihan Konsumen" description="Halaman monitoring invoice dan pembayaran dari konsumen." />} />
            <Route path="pembayaran/mandor" element={<PlaceholderPage title="Opname Mandor" description="Halaman monitoring pengajuan pembayaran dan opname mandor." />} />
            <Route path="pembayaran/arsitek" element={<PlaceholderPage title="Fee Arsitek" description="Halaman monitoring pembayaran fee desain untuk mitra arsitek." />} />
            <Route path="log-aktivitas" element={<LogAktivitas />} />
            <Route path="pengaturan" element={<PlaceholderPage title="Pengaturan Sistem" description="Halaman konfigurasi parameter sistem dan backup data." />} />
          </Route>

          {/* ================== ADMIN LAYOUT ================== */}
          <Route 
            path="/admin" 
            element={
              <DevRouteGuard allowedRolePrefix="/admin">
                <AdminPersonaProvider>
                  <AdminLayout />
                </AdminPersonaProvider>
              </DevRouteGuard>
            }
          >
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="proyek" element={<ProyekAdminPage />} />
            <Route path="proyek/create" element={<CreateProyekAdminPage />} />
            <Route path="proyek/:projectId" element={<DetailProyekAdminPage />} />
            <Route path="rab" element={<RabAdminPage />} />
            <Route path="rab/:projectId" element={<DetailRabAdminPage />} />
            <Route path="pembayaran" element={<PembayaranAdminPage />} />
            <Route path="penugasan-tim" element={<PenugasanTimAdminPage />} />
            <Route path="laporan-progress" element={<LaporanProgressAdminPage />} />
            <Route path="request-material" element={<RequestMaterialAdminPage />} />
            <Route path="pengaturan" element={<PengaturanAdminPage />} />
          </Route>

          {/* ================== PENGAWAS LAYOUT ================== */}
          <Route 
            path="/pengawas" 
            element={
              <DevRouteGuard allowedRolePrefix="/pengawas">
                <SupervisorPersonaProvider>
                  <PengawasLayout />
                </SupervisorPersonaProvider>
              </DevRouteGuard>
            }
          >
            <Route path="dashboard" element={<DashboardPengawas />} />
            <Route path="proyek" element={<ProyekDiawasiPengawasPage />} />
            <Route path="proyek/:projectId" element={<DetailProyekDiawasiPengawasPage />} />
            <Route path="verifikasi-progres" element={<VerifikasiProgresPengawasPage />} />
            <Route path="dokumentasi" element={<DokumentasiLapanganPengawasPage />} />
            <Route path="laporan-mingguan" element={<LaporanMingguanPengawasPage />} />
            <Route path="request-material" element={<RequestMaterialPengawasPage />} />
            <Route path="pengaturan" element={<PengaturanPengawasPage />} />
          </Route>

          {/* ================== MANDOR LAYOUT ================== */}
          <Route 
            path="/mandor" 
            element={
              <DevRouteGuard allowedRolePrefix="/mandor">
                <ForemanPersonaProvider>
                  <MandorLayout />
                </ForemanPersonaProvider>
              </DevRouteGuard>
            }
          >
            <Route path="dashboard" element={<DashboardMandor />} />
            <Route path="proyek-aktif" element={<ProyekAktifMandorPage />} />
            <Route path="proyek-aktif/:projectId" element={<DetailProyekAktifMandorPage />} />
            <Route path="tugas-harian" element={<TugasHarianMandorPage />} />
            <Route path="laporan-harian" element={<LaporanHarianMandorPage />} />
            <Route path="request-material" element={<RequestMaterialMandorPage />} />
            <Route path="dokumentasi" element={<DokumentasiLapanganMandorPage />} />
            <Route path="kendala-lapangan" element={<KendalaLapanganMandorPage />} />
            <Route path="pengaturan" element={<PengaturanMandorPage />} />
          </Route>

          {/* ================== ARSITEK LAYOUT ================== */}
          <Route 
            path="/arsitek" 
            element={
              <DevRouteGuard allowedRolePrefix="/arsitek">
                <ArchitectPersonaProvider>
                  <ArsitekLayout />
                </ArchitectPersonaProvider>
              </DevRouteGuard>
            }
          >
            <Route path="dashboard" element={<DashboardArsitek />} />
            <Route path="permintaan-desain" element={<PermintaanDesainArsitekPage />} />
            <Route path="permintaan-desain/:requestId" element={<DetailPermintaanDesainArsitekPage />} />
            <Route path="desain-aktif" element={<DesainAktifArsitekPage />} />
            <Route path="file-desain" element={<FileDesainArsitekPage />} />
            <Route path="revisi" element={<RevisiDesainArsitekPage />} />
            <Route path="riwayat" element={<RiwayatDesainArsitekPage />} />
            <Route path="pengaturan" element={<PengaturanArsitekPage />} />
          </Route>
        </Routes>
      </DevAuthProvider>
    </Router>
  );
}

export default App;
