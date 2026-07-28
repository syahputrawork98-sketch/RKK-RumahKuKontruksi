import ActionLink from '../../components/ui/ActionLink';
import HoldAction from '../../components/ui/HoldAction';
import heroImageWebp from '../../assets/images/home/hero-h1.webp';

export default function HomeHero({ content }) {
  return (
    <section className="home-hero">
      <div className="public-container">
        <div className="hero-grid">
          <div className="hero-content-col">
            <div className="hero-eyebrow">{content.eyebrow}</div>
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-desc">{content.description}</p>
            <div className="hero-actions">
              <HoldAction
                reason={content.primaryAction.reason}
                variant="primary"
              >
                {content.primaryAction.label}
              </HoldAction>
              <ActionLink
                to={content.secondaryAction.href}
                variant="outline"
              >
                {content.secondaryAction.label}
              </ActionLink>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src={heroImageWebp}
                alt="Arsitek meninjau denah di lokasi konstruksi"
                width="630"
                height="420"
                decoding="async"
                fetchPriority="high"
                className="hero-image"
              />
              <div className="hero-overlay-system system-diagram" aria-hidden="true">
                {content.visualNodes.map((node, index) => (
                  <div key={index} className={`system-node node-${index + 1}`}>
                    <div className="node-icon"></div>
                    <div className="node-content">
                      <span className="node-stage">{node.stage}</span>
                      <span className="node-outcome">{node.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
