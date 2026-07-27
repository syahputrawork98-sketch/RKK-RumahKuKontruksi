import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import { serviceListContent } from '../../content/services';

export default function ServicePublicationGate() {
  const content = serviceListContent.publicationGate;

  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="service-gate-grid">
          {content.groups.map((group) => (
            <article key={group.key} className="gate-card">
              <h3 className="gate-title">{group.title}</h3>
              <p className="gate-description">{group.description}</p>
            </article>
          ))}
        </div>
        
        <div className="gate-notice">
          <p>{content.notice}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
