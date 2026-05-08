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
import PlaceholderKonsumenPage from "./pages/konsumen/PlaceholderKonsumenPage";

// ===== HALAMAN SUPER ADMIN =====
import SuperadminLayout from "./layouts/SuperAdminLayout";
import DashboardSuperadmin from "./pages/superadmin/DashboardSuperadmin";
import DataAdmin from "./pages/superadmin/DataAdminPage";
import DataPengawas from "./pages/superadmin/DataPengawasPage";
import DataMandor from "./pages/superadmin/DataMandorPage";
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
                <KonsumenLayout />
              </DevRouteGuard>
            }
          >
            <Route index element={<PlaceholderKonsumenPage title="Dashboard Konsumen" description="Selamat datang di Customer Portal RKK. Di sini Anda dapat melihat ringkasan status seluruh proyek Anda." status="Planned" dos={["Melihat ringkasan progress", "Melihat notifikasi terbaru", "Akses cepat ke proyek aktif"]} donts={["Mengubah data teknis", "Melihat log internal pengawas"]} notes="Data yang ditampilkan adalah data yang telah divalidasi dan dipublish oleh Admin RKK." />} />
            <Route path="dashboard" element={<PlaceholderKonsumenPage title="Dashboard Konsumen" description="Selamat datang di Customer Portal RKK. Di sini Anda dapat melihat ringkasan status seluruh proyek Anda." status="Planned" dos={["Melihat ringkasan progress", "Melihat notifikasi terbaru", "Akses cepat ke proyek aktif"]} donts={["Mengubah data teknis", "Melihat log internal pengawas"]} notes="Data yang ditampilkan adalah data yang telah divalidasi dan dipublish oleh Admin RKK." />} />
            
            {/* Proyek & Timeline */}
            <Route path="proyek" element={<Proyek />} />
            <Route path="timeline-proyek" element={<TimelineProyek />} />
            <Route path="timeline-proyek/:stageId" element={<DetailTimelineProyek />} />
            
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
            <Route path="data-superadmin" element={<PlaceholderPage title="Data Master Superadmin" description="Manajemen akun superadmin dan hak akses sistem global." status="Planned" dos={["Melihat daftar superadmin", "Mengelola hak akses global"]} donts={["Menghapus akun utama", "Mengubah log audit"]} />} />
            <Route path="data-konsumen" element={<PlaceholderPage title="Manajemen Konsumen" description="Halaman untuk mengelola data konsumen retail dan korporat." status="Partial" dos={["Melihat data konsumen", "Validasi profil"]} donts={["Menghapus data transaksi", "Mengubah saldo/tagihan secara manual"]} />} />
            <Route path="data-pengawas" element={<DataPengawas />} />
            <Route path="data-mandor" element={<DataMandor />} />
            <Route path="data-arsitek" element={<PlaceholderPage title="Manajemen Arsitek" description="Halaman untuk mengelola data mitra arsitek dan desain proyek." status="Partial" dos={["Melihat data arsitek", "Monitoring kapasitas desain"]} donts={["Mengambil keputusan desain", "Memberi instruksi teknis langsung"]} />} />
            <Route path="data-perusahaan" element={<PlaceholderPage title="Data Perusahaan & PIC" description="Halaman untuk mengelola data legalitas perusahaan dan PIC proyek." status="Planned" dos={["Melihat data legalitas", "Mengelola PIC internal"]} donts={["Mengubah struktur organisasi resmi", "Menghapus dokumen legal yang sudah aktif"]} />} />
            
            {/* PROYEK GLOBAL */}
            <Route path="proyek" element={<PlaceholderPage title="Monitoring Proyek Global" description="Halaman monitoring status seluruh proyek konstruksi di sistem." status="Partial" dos={["Melihat status global", "Filter proyek per admin"]} donts={["Mengubah progress teknis", "Mengintervensi jadwal lapangan"]} />} />
            <Route path="proyek/aktif" element={<PlaceholderPage title="Proyek Aktif Global" description="Daftar seluruh proyek yang sedang dalam masa konstruksi." status="Planned" />} />
            <Route path="proyek/relasi" element={<PlaceholderPage title="Relasi Admin-Proyek" description="Pemetaan penugasan Admin terhadap proyek-proyek aktif." status="Planned" />} />
            
            <Route path="kapasitas-admin" element={<PlaceholderPage title="Kapasitas Admin" description="Monitoring beban kerja Admin (maksimal 3 proyek aktif)." status="Planned" dos={["Melihat utilisasi admin", "Distribusi beban kerja"]} donts={["Menugaskan admin > 3 proyek aktif", "Mengabaikan overload alert"]} />} />

            {/* MONITORING GLOBAL */}
            <Route path="progres-proyek" element={<PlaceholderPage title="Laporan Progres Global" description="Halaman monitoring progres lapangan dari seluruh proyek." status="Partial" />} />
            <Route path="pembayaran" element={<PlaceholderPage title="Pembayaran Global" description="Monitoring arus kas global, tagihan konsumen, dan opname mandor." status="Planned" />} />
            <Route path="monitoring/material" element={<PlaceholderPage title="Monitoring Material Request" description="Audit global permintaan material dari seluruh proyek." status="Planned" />} />
            <Route path="monitoring/laporan-pengawas" element={<PlaceholderPage title="Audit Laporan Pengawas" description="Review global terhadap konsistensi laporan mingguan pengawas." status="Planned" />} />
            
            <Route path="eskalasi" element={<PlaceholderPage title="Eskalasi & Koreksi Data" description="Pusat penanganan kendala yang tidak bisa diselesaikan Admin." status="Planned" dos={["Koreksi data salah input", "Override status macet"]} donts={["Menghapus bukti audit", "Mengubah nilai kontrak tanpa addendum"]} />} />
            <Route path="log-aktivitas" element={<LogAktivitas />} />
            <Route path="pengaturan" element={<PlaceholderPage title="Pengaturan Sistem" description="Halaman konfigurasi parameter sistem dan backup data." status="Planned" />} />
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
            <Route path="konsumen/pengajuan-desain" element={<PlaceholderPage title="Pengajuan Desain" description="Drafting dan verifikasi permintaan desain baru." status="Planned" />} />
            <Route path="konsumen/pengajuan-konstruksi" element={<PlaceholderPage title="Pengajuan Konstruksi" description="Proses konversi desain menjadi proyek konstruksi." status="Planned" />} />
            <Route path="konsumen/validasi" element={<PlaceholderPage title="Validasi Pengajuan" description="Checklist verifikasi administrasi pengajuan konsumen." status="Planned" />} />

            {/* MANAJEMEN PROYEK */}
            <Route path="proyek" element={<ProyekAdminPage />} />
            <Route path="proyek/create" element={<CreateProyekAdminPage />} />
            <Route path="proyek/aktivasi" element={<AktivasiProyekAdminPage />} />
            <Route path="proyek/:projectId" element={<DetailProyekAdminPage />} />
            <Route path="penugasan-tim" element={<PenugasanTimAdminPage />} />
            <Route path="proyek/penutupan" element={<PlaceholderPage title="Penutupan Proyek" description="Proses serah terima kunci dan penutupan administrasi proyek." status="Planned" />} />

            {/* DOKUMEN & RAB */}
            <Route path="rab" element={<RabAdminPage />} />
            <Route path="rab/:projectId" element={<DetailRabAdminPage />} />
            <Route path="dokumen/gambar-kerja" element={<PlaceholderPage title="Arsip Gambar Kerja" description="Manajemen file gambar kerja final untuk lapangan." status="Planned" />} />
            <Route path="dokumen/kontrak" element={<PlaceholderPage title="Manajemen Kontrak" description="Pusat dokumen kontrak konsumen dan mitra." status="Planned" />} />
            <Route path="dokumen/final" element={<PlaceholderPage title="Dokumen Final / BAST" description="Arsip Berita Acara Serah Terima dan dokumen legalitas akhir." status="Planned" />} />
            <Route path="dokumen/change-order" element={<PlaceholderPage title="Change Order (CO)" description="Pencatatan perubahan pekerjaan dan biaya selama proyek." status="Planned" dos={["Mencatat pekerjaan tambah/kurang", "Evaluasi dampak biaya"]} donts={["CO tanpa verifikasi pengawas", "CO tanpa persetujuan konsumen"]} />} />

            {/* MONITORING LAPANGAN */}
            <Route path="laporan-progress" element={<LaporanProgressAdminPage />} />
            <Route path="monitoring/jurnal-mandor" element={<PlaceholderPage title="Jurnal Mandor Approved" description="Daftar jurnal harian/mingguan mandor yang sudah diverifikasi pengawas." status="Planned" />} />
            <Route path="laporan-mingguan-pengawas" element={<LaporanMingguanPengawasAdminPage />} />
            <Route path="laporan-mingguan-pengawas/:reportId" element={<DetailLaporanMingguanPengawasAdminPage />} />
            <Route path="request-material" element={<RequestMaterialAdminPage />} />
            <Route path="monitoring/kendala" element={<PlaceholderPage title="Kendala & Eskalasi" description="Daftar kendala lapangan yang memerlukan keputusan Admin." status="Planned" />} />
            
            <Route path="publikasi" element={<PublikasiKonsumenAdminPage />} />

            {/* PEMBAYARAN */}
            <Route path="pembayaran/konsumen" element={<PlaceholderPage title="Pembayaran Konsumen" description="Monitoring invoice dan bukti bayar dari konsumen." status="Planned" />} />
            <Route path="pembayaran/mandor" element={<PlaceholderPage title="Pembayaran Mandor" description="Proses opname dan disbursement untuk mitra mandor." status="Planned" />} />
            <Route path="pembayaran/validasi" element={<PlaceholderPage title="Validasi Disbursement" description="Verifikasi akhir sebelum dana dicairkan ke mitra." status="Planned" />} />
            <Route path="pembayaran/riwayat" element={<PlaceholderPage title="Riwayat Pembayaran" description="Arsip seluruh transaksi keuangan proyek." status="Planned" />} />
            <Route path="pembayaran" element={<PembayaranAdminPage />} /> {/* Legacy mapping */}

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
