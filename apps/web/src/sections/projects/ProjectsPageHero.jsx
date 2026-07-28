import { projectListContent } from '../../content/projects';
import ActionLink from '../../components/ui/ActionLink';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';

export default function ProjectsPageHero() {
  const { hero } = projectListContent;
  
  return (
    <PublicSection className="projects-hero-section" id="projects-hero" aria-labelledby="projects-hero-heading">
      <PublicContainer>
        <div className="projects-hero-content">
          <p className="projects-hero-eyebrow" aria-hidden="true">{hero.eyebrow}</p>
          <h1 className="projects-hero-heading" id="projects-hero-heading">{hero.title}</h1>
          <p className="projects-hero-description">{hero.description}</p>
          <div className="projects-hero-actions">
            <ActionLink to={hero.primaryCTA.href} variant="primary">{hero.primaryCTA.label}</ActionLink>
            <ActionLink to={hero.secondaryCTA.href} variant="outline">{hero.secondaryCTA.label}</ActionLink>
          </div>
        </div>
        
        {/* Visual abstrak berbasis HTML/CSS */}
        <div className="projects-hero-visual" aria-hidden="true">
          <div className="abstract-frame"></div>
          <div className="abstract-panel"></div>
          <div className="abstract-checkpoint"></div>
          <div className="abstract-line"></div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
