import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';
import { workProcessPrincipleIcons } from './workProcessVisuals';

export default function ProcessReadingPrinciples({ content }) {
  return (
    <PublicSection bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="reading-principles-grid">
          {content.items.map((item, index) => {
            const iconName = workProcessPrincipleIcons[index % workProcessPrincipleIcons.length];
            return (
              <div key={index} className="principle-card" data-icon={iconName}>
                <div className="principle-icon-box">
                  <PublicIcon name={iconName} size={24} />
                </div>
                <div className="principle-body">
                  <h3 className="principle-title">{item.title}</h3>
                  <p className="principle-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="principles-callout">
          <p>{content.callout}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
