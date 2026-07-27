import { projectListContent } from '../../content/projects';
import { Link } from 'react-router-dom';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function ProjectsClosingCTA() {
  const { closingCTA } = projectListContent;

  return (
    <PublicSection className="projects-closing-cta-section" id="projects-closing-cta" aria-labelledby="projects-closing-cta-heading">
      <PublicContainer>
        <div className="closing-cta-content">
          <SectionHeading id="projects-closing-cta-heading" title={closingCTA.title} />
          <div className="projects-cta-actions">
            <Link to={closingCTA.primaryCTA.href} className="btn-primary">{closingCTA.primaryCTA.label}</Link>
            <Link to={closingCTA.secondaryCTA.href} className="btn-secondary">{closingCTA.secondaryCTA.label}</Link>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
