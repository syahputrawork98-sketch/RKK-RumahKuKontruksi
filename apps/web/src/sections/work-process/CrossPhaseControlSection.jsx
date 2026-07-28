import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';

const controlIcons = ['layers', 'shield-check', 'file-text', 'check-circle', 'info', 'refresh-cw', 'target', 'pen-tool', 'search-check'];

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
          {content.items.map((item, idx) => {
            const iconName = controlIcons[idx % controlIcons.length];
            return (
              <div key={idx} className="grid-item control-card">
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
      </PublicContainer>
    </PublicSection>
  );
}
