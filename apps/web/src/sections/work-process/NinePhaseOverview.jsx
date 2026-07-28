import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';

const phaseIcons = [
  'compass',
  'search-check',
  'pen-tool',
  'file-check',
  'check-circle',
  'hammer',
  'shield-check',
  'file-text',
  'target'
];

export default function NinePhaseOverview({ content }) {
  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <ol className="overview-list process-rail">
          {content.phases.map((phase, index) => {
            const numStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            const iconName = phaseIcons[index % phaseIcons.length];
            return (
              <li key={index} className="overview-item process-node" data-phase={numStr}>
                <div className="node-icon" aria-hidden="true">
                  <PublicIcon name={iconName} size={18} />
                </div>
                <span>{phase}</span>
                {index < content.phases.length - 1 && (
                  <div className="node-connector" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </PublicContainer>
    </PublicSection>
  );
}
