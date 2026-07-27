import { projectListContent } from '../../content/projects';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function PublicationStatusNotice() {
  const { publicationStatus } = projectListContent;

  return (
    <PublicSection className="publication-status-section" id="publication-status" aria-labelledby="publication-status-heading">
      <PublicContainer>
        <div className="status-notice-card">
          <SectionHeading id="publication-status-heading" title={publicationStatus.title} />
          <p className="status-notice-description">{publicationStatus.description}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
