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
import DesignRequestCustomerPage from "./pages/konsumen/DesignRequestCustomerPage";
import Proyek from "./pages/konsumen/Proyek";
import Profil from "./pages/konsumen/Profil";
import DashboardKonsumen from "./pages/konsumen/DashboardKonsumen";
import PlaceholderKonsumenPage from "./pages/konsumen/PlaceholderKonsumenPage";

// ===== HALAMAN SUPER ADMIN =====
import SuperadminLayout from "./layouts/SuperAdminLayout";
import DashboardSuperadmin from "./pages/superadmin/DashboardSuperadmin";
import DataAdmin from "./pages/superadmin/DataAdminPage";
import DataPengawas from "./pages/superadmin/DataPengawasPage";
import DataMandor from "./pages/superadmin/DataMandorPage";
import DataSuperadmin from "./pages/superadmin/DataSuperadminPage";
import DataKonsumen from "./pages/superadmin/DataKonsumenPage";
import DataArsitek from "./pages/superadmin/DataArsitekPage";
import DataPengajuanDesain from "./pages/superadmin/DataPengajuanDesainPage";
import MonitoringProyekGlobal from "./pages/superadmin/MonitoringProyekGlobalPage";
import LaporanProgresGlobal from "./pages/superadmin/LaporanProgresGlobalPage";
import RelasiAdminProyek from "./pages/superadmin/RelasiAdminProyekPage";
import KapasitasAdmin from "./pages/superadmin/KapasitasAdminPage";
import MonitoringMaterialGlobal from "./pages/superadmin/MonitoringMaterialGlobalPage";
import AuditLaporanPengawas from "./pages/superadmin/AuditLaporanPengawasPage";
import SuperadminHoldState from "./pages/superadmin/SuperadminHoldStatePage";
import AdminHoldState from "./pages/admin/AdminHoldStatePage";
import LogAktivitas from "./pages/superadmin/LogAktivitasPage";
import PlaceholderPage from "./components/ui/PlaceholderPage";

// ===== HALAMAN ADMIN =====
import AdminLayout from "./layouts/AdminLayout";
import LaporanMingguanPengawasAdminPage from "./pages/admin/LaporanMingguanPengawasAdminPage";
import DetailLaporanMingguanPengawasAdminPage from "./pages/admin/DetailLaporanMingguanPengawasAdminPage";
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
import CustomerAdminPage from "./pages/admin/CustomerAdminPage";
import DesignRequestAdminPage from "./pages/admin/DesignRequestAdminPage";
import AktivasiProyekAdminPage from "./pages/admin/AktivasiProyekAdminPage";
import PublikasiKonsumenAdminPage from "./pages/admin/PublikasiKonsumenAdminPage";

// ===== HALAMAN PENGAWAS =====
import PengawasLayout from "./layouts/PengawasLayout";
import DashboardPengawas from "./pages/pengawas/DashboardPengawas";
import ProyekDiawasiPengawasPage from "./pages/pengawas/ProyekDiawasiPengawasPage";
import DetailProyekDiawasiPengawasPage from "./pages/pengawas/DetailProyekDiawasiPengawasPage";
import VerifikasiProgresPengawasPage from "./pages/pengawas/VerifikasiProgresPengawasPage";
import DokumentasiLapanganPengawasPage from "./pages/pengawas/DokumentasiLapanganPengawasPage";
import LaporanMingguanPengawasPage from "./pages/pengawas/LaporanMingguanPengawasPage";
import CreateLaporanMingguanPengawasPage from "./pages/pengawas/CreateLaporanMingguanPengawasPage";
import DetailLaporanMingguanPengawasPage from "./pages/pengawas/DetailLaporanMingguanPengawasPage";
import RequestMaterialPengawasPage from "./pages/pengawas/RequestMaterialPengawasPage";
import PengaturanPengawasPage from "./pages/pengawas/PengaturanPengawasPage";
import JurnalMandorPengawasPage from "./pages/pengawas/JurnalMandorPengawasPage";
import DetailJurnalMandorPengawasPage from "./pages/pengawas/DetailJurnalMandorPengawasPage";

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
import JurnalMingguanMandorPage from "./pages/mandor/JurnalMingguanMandorPage";
import CreateJurnalMingguanMandorPage from "./pages/mandor/CreateJurnalMingguanMandorPage";
import DetailJurnalMingguanMandorPage from "./pages/mandor/DetailJurnalMingguanMandorPage";

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
import { CustomerPersonaProvider } from "./context/CustomerPersonaContext";

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

          <Route 
            path="/konsumen" 
            element={
              <DevRouteGuard allowedRolePrefix="/konsumen">
                <CustomerPersonaProvider>
                  <KonsumenLayout />
                </CustomerPersonaProvider>
              </DevRouteGuard>
            }
          >
            <Route index element={<DashboardKonsumen />} />
            <Route path="dashboard" element={<DashboardKonsumen />} />
            
            {/* Proyek & Timeline */}
            <Route path="proyek" element={<Proyek />} />
            <Route path="timeline-proyek" element={<TimelineProyek />} />
            <Route path="timeline-proyek/:stageId" element={<DetailTimelineProyek />} />
            <Route path="permintaan-desain" element={<DesignRequestCustomerPage />} />
            
            {/* Alias Route Lama (Compatibility) */}
            <Route path="TimelineProyek" element={<TimelineProyek />} />
            <Route path="TimelineProyek/:stageId" element={<DetailTimelineProyek />} />
            <Route path="timeline" element={<TimelineProyek />} /> {/* Fix for mobile mismatch */}
            
            {/* Keuangan & Dokumen */}
            <Route path="pembayaran" element={<PlaceholderKonsumenPage title="Pembayaran & Termin" description="Halaman ini menampilkan jadwal termin dan status pembayaran resmi proyek Anda." status="Planned" dos={["Melihat jadwal termin", "Melihat riwayat pembayaran", "Download invoice/kwitansi resmi"]} donts={["Melakukan pembayaran ke rekening pribadi mitra", "Mengubah nilai kontrak tanpa addendum"]} notes="Pembayaran resmi hanya dilakukan ke rekening perusahaan RKK. Pembayaran tidak secara otomatis menciptakan progress proyek." />} />
            <Route path="dokumen" element={<PlaceholderKonsumenPage title="Pusat Dokumen" description="Akses ke seluruh dokumen legal, kontrak, dan gambar kerja yang telah disetujui." status="Planned" dos={["Download dokumen kontrak", "Melihat gambar kerja final", "Akses Berita Acara (BAST)"]} donts={["Mengedit dokumen yang sudah TTD", "Melihat draft internal yang belum dipublish"]} notes="Pastikan Anda menyimpan salinan digital untuk keperluan administrasi pribadi." />} />
            
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
            
            {/* DATA MASTER */}
            <Route path="data-admin" element={<DataAdmin />} />
            <Route path="data-superadmin" element={<DataSuperadmin />} />
            <Route path="data-konsumen" element={<DataKonsumen />} />
            <Route path="data-pengawas" element={<DataPengawas />} />
            <Route path="data-mandor" element={<DataMandor />} />
            <Route path="data-arsitek" element={<DataArsitek />} />
            <Route path="data-pengajuan-desain" element={<DataPengajuanDesain />} />
            <Route path="data-perusahaan" element={<SuperadminHoldState title="Data Perusahaan & PIC" description="Halaman untuk mengelola data legalitas perusahaan dan PIC proyek." />} />
            
            {/* PROYEK GLOBAL */}
            <Route path="proyek" element={<MonitoringProyekGlobal />} />
            <Route path="proyek/aktif" element={<MonitoringProyekGlobal mode="active" />} />
            <Route path="proyek/relasi" element={<RelasiAdminProyek />} />
            
            <Route path="kapasitas-admin" element={<KapasitasAdmin />} />

            {/* MONITORING GLOBAL */}
            <Route path="progres-proyek" element={<LaporanProgresGlobal />} />
            <Route path="pembayaran" element={<SuperadminHoldState title="Pembayaran Global" description="Monitoring arus kas global, tagihan konsumen, dan opname mandor." />} />
            <Route path="monitoring/material" element={<MonitoringMaterialGlobal />} />
            <Route path="monitoring/laporan-pengawas" element={<AuditLaporanPengawas />} />
            
            <Route path="eskalasi" element={<SuperadminHoldState title="Eskalasi & Koreksi Data" description="Pusat penanganan kendala yang tidak bisa diselesaikan Admin." />} />
            <Route path="log-aktivitas" element={<SuperadminHoldState title="Log Aktivitas Sistem" description="Pantau seluruh aktivitas operasional user dan sistem secara transparan (Audit Trail)." />} />
            <Route path="pengaturan" element={<SuperadminHoldState title="Pengaturan Sistem" description="Halaman konfigurasi parameter sistem dan backup data." />} />
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
            
            {/* KONSUMEN & PENGAJUAN */}
            <Route path="konsumen/data" element={<CustomerAdminPage />} />
            <Route path="konsumen/pengajuan-desain" element={<DesignRequestAdminPage />} />
            <Route path="konsumen/pengajuan-konstruksi" element={<AdminHoldState title="Pengajuan Konstruksi" description="Proses konversi desain menjadi proyek konstruksi." />} />
            <Route path="konsumen/validasi" element={<AdminHoldState title="Validasi Pengajuan" description="Checklist verifikasi administrasi pengajuan konsumen." />} />

            {/* MANAJEMEN PROYEK */}
            <Route path="proyek" element={<ProyekAdminPage />} />
            <Route path="proyek/create" element={<CreateProyekAdminPage />} />
            <Route path="proyek/aktivasi" element={<AktivasiProyekAdminPage />} />
            <Route path="proyek/:projectId" element={<DetailProyekAdminPage />} />
            <Route path="penugasan-tim" element={<PenugasanTimAdminPage />} />
            <Route path="proyek/penutupan" element={<AdminHoldState title="Penutupan Proyek" description="Proses serah terima kunci dan penutupan administrasi proyek." />} />

            {/* DOKUMEN & RAB */}
            <Route path="rab" element={<RabAdminPage />} />
            <Route path="rab/:projectId" element={<DetailRabAdminPage />} />
            <Route path="dokumen/gambar-kerja" element={<AdminHoldState title="Arsip Gambar Kerja" description="Manajemen file gambar kerja final untuk lapangan." />} />
            <Route path="dokumen/kontrak" element={<AdminHoldState title="Manajemen Kontrak" description="Pusat dokumen kontrak konsumen dan mitra." />} />
            <Route path="dokumen/final" element={<AdminHoldState title="Dokumen Final / BAST" description="Arsip Berita Acara Serah Terima dan dokumen legalitas akhir." />} />
            <Route path="dokumen/change-order" element={<AdminHoldState title="Change Order (CO)" description="Pencatatan perubahan pekerjaan dan biaya selama proyek." />} />

            {/* MONITORING LAPANGAN */}
            <Route path="laporan-progress" element={<LaporanProgressAdminPage />} />
            <Route path="monitoring/jurnal-mandor" element={<AdminHoldState title="Jurnal Mandor Approved" description="Daftar jurnal harian/mingguan mandor yang sudah diverifikasi pengawas." />} />
            <Route path="laporan-mingguan-pengawas" element={<LaporanMingguanPengawasAdminPage />} />
            <Route path="laporan-mingguan-pengawas/:reportId" element={<DetailLaporanMingguanPengawasAdminPage />} />
            <Route path="request-material" element={<RequestMaterialAdminPage />} />
            <Route path="monitoring/kendala" element={<AdminHoldState title="Kendala & Eskalasi" description="Daftar kendala lapangan yang memerlukan keputusan Admin." />} />
            
            <Route path="publikasi" element={<PublikasiKonsumenAdminPage />} />

            {/* PEMBAYARAN */}
            <Route path="pembayaran/konsumen" element={<AdminHoldState title="Pembayaran Konsumen" description="Monitoring invoice dan bukti bayar dari konsumen." />} />
            <Route path="pembayaran/mandor" element={<AdminHoldState title="Pembayaran Mandor" description="Proses opname dan disbursement untuk mitra mandor." />} />
            <Route path="pembayaran/validasi" element={<AdminHoldState title="Validasi Disbursement" description="Verifikasi akhir sebelum dana dicairkan ke mitra." />} />
            <Route path="pembayaran/riwayat" element={<AdminHoldState title="Riwayat Pembayaran" description="Arsip seluruh transaksi keuangan proyek." />} />
            <Route path="pembayaran" element={<AdminHoldState title="Manajemen Pembayaran" description="Modul validasi pembayaran konsumen dan monitoring termin proyek." />} />

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
            
            {/* DETAIL TEKNIS */}
            <Route path="teknis/gambar-kerja" element={<PlaceholderPage title="Gambar Kerja (Technical)" description="Akses gambar kerja terbaru untuk pengawasan lapangan." status="Planned" />} />
            <Route path="teknis/rab-baseline" element={<PlaceholderPage title="RAB & Scope Baseline" description="Acuan pekerjaan sesuai kontrak untuk verifikasi progress." status="Planned" />} />
            <Route path="teknis/jadwal" element={<PlaceholderPage title="Jadwal / Kurva S" description="Monitoring timeline dan deviasi waktu proyek." status="Planned" />} />
            
            <Route path="jurnal-mandor" element={<JurnalMandorPengawasPage />} />
            <Route path="jurnal-mandor/:journalId" element={<DetailJurnalMandorPengawasPage />} />
            <Route path="verifikasi-progres" element={<VerifikasiProgresPengawasPage />} />
            <Route path="laporan-mingguan" element={<LaporanMingguanPengawasPage />} />
            <Route path="laporan-mingguan/create" element={<CreateLaporanMingguanPengawasPage />} />
            <Route path="laporan-mingguan/:reportId" element={<DetailLaporanMingguanPengawasPage />} />
            <Route path="request-material" element={<RequestMaterialPengawasPage />} />
            <Route path="kendala" element={<PlaceholderPage title="Kendala & Rekomendasi" description="Pelaporan kendala teknis dan pemberian rekomendasi solusi." status="Planned" dos={["Melaporkan kendala teknis", "Memberi rekomendasi perbaikan"]} donts={["Menyetujui biaya tambahan", "Mengubah desain tanpa instruksi"]} />} />
            <Route path="dokumentasi" element={<DokumentasiLapanganPengawasPage />} />
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
            
            {/* INFORMASI KERJA */}
            <Route path="info/rab" element={<PlaceholderPage title="RAB & Scope Mandor" description="Daftar pekerjaan dan volume yang menjadi tanggung jawab Mandor." status="Planned" />} />
            <Route path="info/gambar-kerja" element={<PlaceholderPage title="Gambar Kerja Lapangan" description="Akses visual gambar kerja untuk panduan pengerjaan fisik." status="Planned" />} />
            <Route path="info/jadwal" element={<PlaceholderPage title="Jadwal Kerja Mandor" description="Target harian/mingguan yang harus dicapai di lapangan." status="Planned" />} />

            <Route path="jurnal-mingguan" element={<JurnalMingguanMandorPage />} />
            <Route path="jurnal-mingguan/create" element={<CreateJurnalMingguanMandorPage />} />
            <Route path="jurnal-mingguan/:journalId" element={<DetailJurnalMingguanMandorPage />} />
            <Route path="request-material" element={<RequestMaterialMandorPage />} />
            <Route path="kendala-lapangan" element={<KendalaLapanganMandorPage />} />
            <Route path="dokumentasi" element={<DokumentasiLapanganMandorPage />} />
            
            {/* PELUANG PROYEK */}
            <Route path="peluang/posting" element={<PlaceholderPage title="Project Posting" description="Daftar proyek baru yang mencari mitra mandor." status="Planned" />} />
            <Route path="peluang/penawaran" element={<PlaceholderPage title="Penawaran Saya" description="Daftar bidding/penawaran yang sedang diajukan ke RKK." status="Planned" />} />
            <Route path="peluang/riwayat" element={<PlaceholderPage title="Riwayat Penawaran" description="Arsip seluruh penawaran proyek yang pernah diikuti." status="Planned" />} />
            
            <Route path="pembayaran" element={<PlaceholderPage title="Status Pembayaran" description="Monitoring pengajuan opname dan status pembayaran dari RKK." status="Planned" dos={["Melihat riwayat bayar", "Cek status opname"]} donts={["Menagih langsung ke konsumen", "Memanipulasi progres untuk pembayaran"]} />} />

            <Route path="pengaturan" element={<PengaturanMandorPage />} />
            
            {/* DEPRECATED ROUTES */}
            <Route path="tugas-harian" element={<TugasHarianMandorPage />} />
            <Route path="laporan-harian" element={<LaporanHarianMandorPage />} />
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
            <Route path="brief-desain" element={<PermintaanDesainArsitekPage />} />
            <Route path="peluang-desain" element={<PermintaanDesainArsitekPage />} />
            <Route path="permintaan-desain" element={<PermintaanDesainArsitekPage />} /> {/* Legacy mapping */}
            <Route path="permintaan-desain/:requestId" element={<DetailPermintaanDesainArsitekPage />} />
            <Route path="desain-aktif" element={<DesainAktifArsitekPage />} />
            
            {/* TAHAPAN DESAIN */}
            <Route path="tahapan/konsep" element={<PlaceholderPage title="Tahapan: Konsep Awal" description="Eksplorasi ide dan konsep dasar sesuai brief konsumen." status="Planned" />} />
            <Route path="tahapan/denah" element={<PlaceholderPage title="Tahapan: Denah" description="Pembuatan denah ruang dan sirkulasi bangunan." status="Planned" />} />
            <Route path="tahapan/3d" element={<PlaceholderPage title="Tahapan: Tampak / 3D" description="Visualisasi 3D eksterior dan interior bangunan." status="Planned" />} />
            <Route path="tahapan/gambar-kerja" element={<PlaceholderPage title="Tahapan: Gambar Kerja" description="Pembuatan DED (Detail Engineering Design) untuk konstruksi." status="Planned" />} />
            
            <Route path="revisi" element={<RevisiDesainArsitekPage />} />
            <Route path="file-desain" element={<FileDesainArsitekPage />} />
            <Route path="final-approved" element={<PlaceholderPage title="Final Approved Design" description="Arsip desain yang sudah disetujui konsumen dan siap bangun." status="Planned" dos={["Melihat desain final", "Download paket dokumen"]} donts={["Mengubah desain yang sudah approved", "Menghapus history versi"]} />} />
            <Route path="evaluasi" element={<PlaceholderPage title="Evaluasi Teknis" description="Review kesesuaian desain dengan standar teknis RKK." status="Planned" />} />
            <Route path="riwayat" element={<RiwayatDesainArsitekPage />} />
            <Route path="pengaturan" element={<PengaturanArsitekPage />} />
          </Route>
        </Routes>
      </DevAuthProvider>
    </Router>
  );
}

export default App;
