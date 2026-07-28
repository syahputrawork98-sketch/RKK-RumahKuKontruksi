import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import ActionLink from '../../components/ui/ActionLink';
import PublicIcon from '../../components/icons/PublicIcon';

export default function WorkHero({ content }) {
  const groups = [
    { title: 'Fase 01–03: Inisiasi & Perencanaan', icon: 'compass', desc: 'Identifikasi, pemeriksaan, dan perencanaan awal' },
    { title: 'Fase 04–06: Kesepakatan & Pelaksanaan', icon: 'clipboard-list', desc: 'Kesepakatan, kesiapan, dan pelaksanaan fisik/teknis' },
    { title: 'Fase 07–09: Serah Terima & Evaluasi', icon: 'shield-check', desc: 'Verifikasi, serah terima, dan evaluasi hasil' }
  ];

  return (
    <PublicSection className="work-hero-section">
      <PublicContainer>
        <div className="work-hero-grid">
          <div className="work-hero-content">
            <span className="eyebrow-text">{content.eyebrow}</span>
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-subtitle">{content.description}</p>
            <div className="work-hero-actions">
              <ActionLink to={content.primaryAction.href} variant="primary">
                {content.primaryAction.label}
              </ActionLink>
              <ActionLink to={content.secondaryAction.href} variant="outline">
                {content.secondaryAction.label}
              </ActionLink>
            </div>
            <div className="work-hero-notice">
              <p>{content.notice}</p>
            </div>
          </div>

          <div className="work-hero-map" data-visual="process-map">
            <div className="process-map-title">Peta Alur Sembilan Fase</div>
            <div className="process-map-groups">
              {groups.map((group, index) => (
                <div key={index} className="process-map-node">
                  <div className="process-map-icon-box">
                    <PublicIcon name={group.icon} size={20} />
                  </div>
                  <div className="process-map-info">
                    <span className="process-map-node-title">{group.title}</span>
                    <span className="process-map-node-desc">{group.desc}</span>
                  </div>
                  {index < groups.length - 1 && (
                    <div className="process-map-connector" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
