import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import ActionLink from '../../components/ui/ActionLink';

export default function AboutHero({ content }) {
  return (
    <PublicSection id="about-hero" bg="white" className="about-hero">
      <PublicContainer>
        <div className="about-hero-grid">
          <div className="about-hero-content">
            <div className="hero-eyebrow">{content.eyebrow}</div>
            <h1 className="hero-title">{content.headline}</h1>
            <p className="hero-desc">{content.supportingCopy}</p>
            
            <div className="hero-actions">
              <ActionLink to={content.primaryCTA.target} variant="primary">
                {content.primaryCTA.label}
              </ActionLink>
              <ActionLink to={content.secondaryCTA.target} variant="outline">
                {content.secondaryCTA.label}
              </ActionLink>
            </div>
          </div>
          
          <div className="about-hero-visual" aria-hidden="true">
            <div className="process-stages">
              {content.stages.map((stage, index) => (
                <div key={index} className="process-stage">
                  <span className="stage-name">{stage}</span>
                  {index < content.stages.length - 1 && (
                    <span className="stage-connector"></span>
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
