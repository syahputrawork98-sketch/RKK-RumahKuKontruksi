import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function AboutVision({ content }) {
  return (
    <PublicSection id="about-vision" bg="white">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="vision-statement-panel">
          <div className="vision-label">{content.statement.label}</div>
          <blockquote className="vision-quote">
            "{content.statement.quote}"
          </blockquote>
          <p className="vision-note">{content.statement.note}</p>
        </div>

        <div className="vision-pillars">
          {content.pillars.map((pillar, index) => (
            <div key={index} className="pillar-item">
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="mission-groups-section">
          <h3 className="mission-groups-heading">Ringkasan Misi</h3>
          <div className="mission-groups">
            {content.missionGroups.map((group, index) => (
              <div key={index} className="mission-group">
                <h4 className="mission-title">{group.title}</h4>
                <p className="mission-desc">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
