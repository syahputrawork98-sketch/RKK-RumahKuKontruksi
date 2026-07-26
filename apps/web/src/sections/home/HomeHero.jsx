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
            {content.visualNodes.map((node, index) => (
              <div key={index} className="visual-node">
                {node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
