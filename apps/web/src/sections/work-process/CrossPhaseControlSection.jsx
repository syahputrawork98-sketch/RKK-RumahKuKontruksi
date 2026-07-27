import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function CrossPhaseControlSection({ content }) {
  return (
    <PublicSection bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="items-grid controls">
          {content.items.map((item, idx) => (
            <div key={idx} className="grid-item">
              <h3 className="grid-item-title">{item.title}</h3>
              <p className="grid-item-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
