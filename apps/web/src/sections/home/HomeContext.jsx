import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';

export default function HomeContext({ content }) {
  return (
    <PublicSection bg="white" id="konteks">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="context-grid">
          {content.points.map((point, index) => (
            <InfoCard 
              key={index}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
