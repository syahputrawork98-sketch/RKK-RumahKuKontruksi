import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function DecisionGateSection({ content }) {
  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="items-grid gates">
          {content.items.map((item, idx) => (
            <div key={idx} className="grid-item">
              <h3 className="grid-item-title">{item.title}</h3>
              <p className="grid-item-desc">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="section-notice">
          {content.notice}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
