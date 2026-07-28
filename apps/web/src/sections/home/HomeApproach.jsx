import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import InfoCard from '../../components/ui/InfoCard';
import PublicIcon from '../../components/icons/PublicIcon';

const icons = ['map', 'shield-check', 'eye', 'check-circle'];

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
              icon={<PublicIcon name={icons[index % icons.length]} />}
            />
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
