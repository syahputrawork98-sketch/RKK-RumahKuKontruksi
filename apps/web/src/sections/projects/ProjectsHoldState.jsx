import { projectListContent } from '../../content/projects';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function ProjectsHoldState() {
  const { holdState } = projectListContent;

  return (
    <PublicSection className="projects-hold-state-section" id="projects-hold-state" aria-labelledby="projects-hold-state-heading">
      <PublicContainer>
        <div className="hold-state-card">
          <SectionHeading id="projects-hold-state-heading" title={holdState.title} />
          <p className="hold-state-description">{holdState.description}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
