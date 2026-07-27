import { Outlet } from 'react-router-dom';
import SkipLink from '../components/public/SkipLink';
import PublicHeader from '../components/public/PublicHeader';
import PublicFooter from '../components/public/PublicFooter';

export default function PublicAppShell() {
  return (
    <div className="app-shell">
      <SkipLink />
      <PublicHeader />
      <main id="main-content" className="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
