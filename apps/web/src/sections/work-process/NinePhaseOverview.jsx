import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function NinePhaseOverview({ content }) {
  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <ol className="overview-list">
          {content.phases.map((phase, index) => (
            <li key={index} className="overview-item">
              {phase}
            </li>
          ))}
        </ol>
      </PublicContainer>
    </PublicSection>
  );
}
