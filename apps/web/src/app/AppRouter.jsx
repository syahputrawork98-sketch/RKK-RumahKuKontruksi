import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PublicAppShell from '../layouts/PublicAppShell';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import UnavailablePage from '../pages/UnavailablePage';
import NotFoundPage from '../pages/NotFoundPage';
import WorkProcessPage from '../pages/WorkProcessPage';
import ServiceListPage from '../pages/ServiceListPage';
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicAppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/about" element={<Navigate to="/tentang" replace />} />
        <Route path="/cara-kerja" element={<WorkProcessPage />} />
        <Route path="/layanan" element={<ServiceListPage />} />
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
