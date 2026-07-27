import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';

export default function AboutProblems({ content }) {
  return (
    <PublicSection id="about-problems" bg="white">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="problems-grid">
          {content.items.map((item, index) => (
            <InfoCard 
              key={index}
              marker={item.number}
              title={item.title}
              description={item.description}
              className="problem-card"
            />
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
