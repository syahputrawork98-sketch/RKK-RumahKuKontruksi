import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';

export default function HomePrinciples({ content }) {
  return (
    <PublicSection bg="white">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
        />
        
        <div className="approach-grid">
          {content.items.map((item, index) => (
            <InfoCard 
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
