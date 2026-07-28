import ActionLink from './ActionLink';
import PortalUnavailableIllustration from '../illustrations/PortalUnavailableIllustration';
import NotFoundRouteIllustration from '../illustrations/NotFoundRouteIllustration';

export default function PageState({ title, description, label }) {
  const is404 = label === '404' || (title && title.toLowerCase().includes('tidak ditemukan'));

  return (
    <div className={`page-state ${is404 ? 'page-state-404' : 'page-state-unavailable'}`}>
      <div className="page-state-illustration-wrapper">
        {is404 ? (
          <NotFoundRouteIllustration size={200} />
        ) : (
          <PortalUnavailableIllustration size={200} />
        )}
      </div>
      {label && <span className="state-label">{label}</span>}
      <h1 className="state-title">{title}</h1>
      <p className="state-description">{description}</p>
      <div className="state-actions">
        <ActionLink to="/" variant="primary">
          Kembali ke Beranda
        </ActionLink>
      </div>
    </div>
  );
}
