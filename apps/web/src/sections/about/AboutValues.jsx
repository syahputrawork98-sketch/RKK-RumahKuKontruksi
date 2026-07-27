import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';

export default function AboutValues({ content }) {
  return (
    <PublicSection id="about-values" bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="core-values-grid">
          {content.coreValues.map((val, index) => (
            <InfoCard 
              key={index}
              title={val.title}
              description={val.description}
              className="value-card"
            />
          ))}
        </div>

        <div className="dna-section">
          <h3 className="dna-heading">DNA Rumahku Konstruksi</h3>
          <ol className="dna-list">
            {content.dna.map((dnaItem, index) => (
              <li key={index} className="dna-item">
                {dnaItem}
              </li>
            ))}
          </ol>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
