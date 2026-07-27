import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function AboutPositioning({ content }) {
  return (
    <PublicSection id="about-positioning" bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="positioning-quote-container">
          <blockquote className="positioning-quote">
            "{content.quote}"
          </blockquote>
        </div>

        <div className="positioning-values-grid">
          {content.values.map((value, index) => (
            <div key={index} className="positioning-value">
              <h3 className="value-title">{value.title}</h3>
              <p className="value-desc">{value.description}</p>
            </div>
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
