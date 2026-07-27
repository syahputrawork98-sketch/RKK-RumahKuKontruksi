import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';

export default function HomePrinciples({ content }) {
  return (
    <PublicSection bg="white">
      <PublicContainer>
        <div className="split-layout">
          <div className="split-main">
            <SectionHeading 
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.intro}
            />
          </div>
          <div className="split-list">
            {content.items.map((item, index) => (
              <InfoCard 
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
