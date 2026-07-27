import { projectListContent } from '../../content/projects';
import { Link } from 'react-router-dom';
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
            <Link to={hero.primaryCTA.href} className="btn-primary">{hero.primaryCTA.label}</Link>
            <Link to={hero.secondaryCTA.href} className="btn-secondary">{hero.secondaryCTA.label}</Link>
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
