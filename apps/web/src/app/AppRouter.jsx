import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PublicAppShell from '../layouts/PublicAppShell';
import HomePage from '../pages/HomePage';
import UnavailablePage from '../pages/UnavailablePage';
import NotFoundPage from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicAppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tentang"
          element={<UnavailablePage title="Halaman Tentang sedang disiapkan." description="Informasi mengenai kedudukan, arah, dan identitas RKK akan ditampilkan setelah paket kontennya siap untuk implementasi." />}
        />
        <Route
          path="/cara-kerja"
          element={<UnavailablePage title="Halaman Cara Kerja sedang disiapkan." description="Gambaran ringkas tersedia di Beranda. Detail tahapan akan ditampilkan setelah struktur dan istilah proses disahkan." />}
        />
        <Route
          path="/sign-in"
          element={<UnavailablePage title="Akses akun belum tersedia pada tahap ini." description="PLAN-001 tidak menyediakan login simulasi, akses demo, atau autentikasi sementara." />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
