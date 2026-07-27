import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function ProcessReadingPrinciples({ content }) {
  return (
    <PublicSection bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="reading-principles-grid">
          {content.items.map((item, index) => (
            <div key={index} className="principle-card">
              <h3 className="principle-title">{item.title}</h3>
              <p className="principle-desc">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="principles-callout">
          <p>{content.callout}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
