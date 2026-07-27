import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import { serviceListContent } from '../../content/services';

export default function ServiceConceptDifference() {
  const content = serviceListContent.conceptDifference;

  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="service-concept-grid">
          {content.items.map((item) => (
            <article key={item.key} className="concept-card">
              <h3 className="concept-title">{item.title}</h3>
              <p className="concept-description">{item.description}</p>
            </article>
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
