import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PublicAppShell from '../layouts/PublicAppShell';
import AuthPageShell from '../layouts/AuthPageShell';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import WorkProcessPage from '../pages/WorkProcessPage';
import ServiceListPage from '../pages/ServiceListPage';
import ProjectListPage from '../pages/ProjectListPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import DemoAccessPage from '../pages/DemoAccessPage';
import SignInPage from '../pages/SignInPage';
import PortalPlaceholderPage from '../pages/PortalPlaceholderPage';
import PortalAccessBoundary from '../components/auth/PortalAccessBoundary';
import { DemoContextProvider } from '../context/DemoContext';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicAppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/about" element={<Navigate to="/tentang" replace />} />
        <Route path="/cara-kerja" element={<WorkProcessPage />} />
        <Route path="/layanan" element={<ServiceListPage />} />
        <Route path="/proyek" element={<ProjectListPage />} />
        <Route path="/proyek/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthPageShell />}>
        <Route path="/demo" element={<DemoAccessPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/portal"
          element={
            <PortalAccessBoundary>
              <PortalPlaceholderPage />
            </PortalAccessBoundary>
          }
        />
      </Route>
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <DemoContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DemoContextProvider>
  );
}
