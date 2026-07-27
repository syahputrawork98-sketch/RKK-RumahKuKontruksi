import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function ProcessBoundarySection({ content }) {
  return (
    <PublicSection bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <ul className="boundaries-list">
          {content.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </PublicContainer>
    </PublicSection>
  );
}
