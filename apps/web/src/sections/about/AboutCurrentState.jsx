import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function AboutCurrentState({ content }) {
  return (
    <PublicSection id="about-current-state" bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="current-state-grid">
          <div className="state-panel established-panel">
            <h3 className="state-panel-title">{content.established.title}</h3>
            <ul className="state-list">
              {content.established.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="state-panel held-panel">
            <h3 className="state-panel-title">{content.held.title}</h3>
            <ul className="state-list">
              {content.held.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
