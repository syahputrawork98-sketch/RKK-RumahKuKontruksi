import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function AboutPlatform({ content }) {
  return (
    <PublicSection id="about-platform" bg="white">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="platform-relationship">
          {content.relationship.map((rel, index) => (
            <div key={index} className="relationship-layer">
              <div className="layer-title">{rel.title}</div>
              <div className="layer-label">{rel.label}</div>
              {index < content.relationship.length - 1 && (
                <div className="layer-connector" aria-hidden="true"></div>
              )}
            </div>
          ))}
        </div>

        <div className="platform-functions">
          <p className="functions-framing">{content.functions.framing}</p>
          <ul className="functions-list">
            {content.functions.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="claim-boundary">
          <h3 className="boundary-title">{content.claimBoundary.title}</h3>
          <ul className="boundary-list">
            {content.claimBoundary.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
