import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';

export default function AboutCompanyPosition({ content }) {
  return (
    <PublicSection id="about-company-position" bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="position-panels">
          {content.panels.map((panel, index) => (
            <InfoCard 
              key={index}
              title={panel.title}
              description={panel.description}
              className="position-panel"
            />
          ))}
        </div>

        <div className="boundary-callout">
          <h3 className="callout-title">{content.boundaryCallout.title}</h3>
          <p className="callout-desc">{content.boundaryCallout.description}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
