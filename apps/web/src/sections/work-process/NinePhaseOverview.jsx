import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';
import { workProcessPhaseIcons } from './workProcessVisuals';

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
            const [number, ...titleParts] = phase.split(' ');
            const title = titleParts.join(' ');
            const iconName = workProcessPhaseIcons[number] || 'compass';

            return (
              <li
                key={number}
                className="overview-item process-node"
                data-phase={number}
                data-icon={iconName}
              >
                <div className="node-marker">
                  <span className="node-number">{number}</span>
                  <span className="node-icon" aria-hidden="true">
                    <PublicIcon name={iconName} size={18} />
                  </span>
                </div>
                {' '}
                <span className="node-title">{title}</span>

                {index < content.phases.length - 1 && (
                  <span className="node-connector" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </PublicContainer>
    </PublicSection>
  );
}
