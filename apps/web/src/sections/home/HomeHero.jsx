import ActionLink from '../../components/ui/ActionLink';
import HoldAction from '../../components/ui/HoldAction';

export default function HomeHero({ content }) {
  return (
    <section className="home-hero">
      <div className="public-container">
        <div className="hero-grid">
          <div>
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
          <div className="hero-visual" aria-hidden="true">
            <div className="system-diagram">
              <svg className="system-lines" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M 50,50 L 150,150 L 250,50 L 350,150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="stroke-primary" />
              </svg>
              {content.visualNodes.map((node, index) => (
                <div key={index} className={`system-node node-${index + 1}`}>
                  <div className="node-icon"></div>
                  <div className="node-label">{node}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
