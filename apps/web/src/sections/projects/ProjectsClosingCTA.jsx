import { projectListContent } from '../../content/projects';
import ActionLink from '../../components/ui/ActionLink';
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
            <ActionLink to={closingCTA.primaryCTA.href} variant="primary">{closingCTA.primaryCTA.label}</ActionLink>
            <ActionLink to={closingCTA.secondaryCTA.href} variant="outline">{closingCTA.secondaryCTA.label}</ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
