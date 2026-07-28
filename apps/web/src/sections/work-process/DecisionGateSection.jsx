import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';

const gateIcons = ['shield-check', 'lock', 'search-check', 'file-check'];

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
          {content.items.map((item, idx) => {
            const iconName = gateIcons[idx % gateIcons.length];
            return (
              <div key={idx} className="grid-item gate-card">
                <div className="grid-item-icon">
                  <PublicIcon name={iconName} size={20} />
                </div>
                <div className="grid-item-content">
                  <h3 className="grid-item-title">{item.title}</h3>
                  <p className="grid-item-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="section-notice">
          <PublicIcon name="info" size={18} />
          <span>{content.notice}</span>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
