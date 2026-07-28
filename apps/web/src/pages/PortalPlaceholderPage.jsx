import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionLink from '../components/ui/ActionLink';
import { useDemoContext } from '../context/DemoContext';
import { getDemoCustomerProfile, getDemoProjectSummary } from '../data/demoData';

export default function PortalPlaceholderPage() {
  const navigate = useNavigate();
  const { demoContext, resetDemo, exitDemo } = useDemoContext();

  useEffect(() => {
    document.title = 'Customer Portal (Demo Boundary) — Rumahku Konstruksi';
  }, []);

  const customerProfile = getDemoCustomerProfile(demoContext?.customerReference);
  const projectSummary = getDemoProjectSummary(demoContext?.projectReferences?.[0]);

  const handleReset = () => {
    resetDemo({ persona: 'customer', returnPath: '/portal' });
  };

  const handleExit = () => {
    exitDemo();
    navigate('/demo');
  };

  return (
    <div className="access-page__container" style={{ maxWidth: '640px' }}>
      <div className="access-page__panel">
        <span className="access-page__badge">MODE DEMO — PRESENTASI PLAN-009</span>
        <h1 className="access-page__title">Customer Portal RKK (Akses Boundary)</h1>
        <p className="access-page__description">
          Anda berhasil masuk melalui <strong>Demo Access Gateway</strong>. Customer Portal Shell dan Beranda Konsumen interaktif akan dibangun secara penuh pada <strong>PLAN-010</strong>.
        </p>

        <div className="access-page__notice access-page__notice--info" style={{ marginBottom: '1.5rem' }}>
          <strong>Identitas Demo Sintetis Active:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            <li><strong>Nama:</strong> {demoContext?.displayName || customerProfile.displayName}</li>
            <li><strong>Ref Pelanggan:</strong> {demoContext?.customerReference || customerProfile.customerReference}</li>
            <li><strong>Ref Proyek Demo:</strong> {projectSummary.projectReference} ({projectSummary.title})</li>
            <li><strong>Sesi ID:</strong> <code>{demoContext?.sessionId}</code></li>
            <li><strong>Berlaku Sampai:</strong> {demoContext?.expiresAt ? new Date(demoContext.expiresAt).toLocaleTimeString('id-ID') : '-'}</li>
          </ul>
        </div>

        <div className="access-page__actions">
          <button type="button" className="btn btn-outline" onClick={handleReset}>
            Reset Sesi Demo
          </button>
          <button type="button" className="btn btn-outline" onClick={handleExit}>
            Keluar Mode Demo
          </button>
          <ActionLink href="/" variant="primary">
            Kembali ke Website
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
