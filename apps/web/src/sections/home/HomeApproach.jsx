import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';

export default function HomeApproach({ content }) {
  return (
    <PublicSection bg="muted" id="pendekatan">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="approach-grid">
          {content.items.map((item, index) => (
            <InfoCard 
              key={index}
              title={item.title}
              description={item.description}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              }
            />
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
