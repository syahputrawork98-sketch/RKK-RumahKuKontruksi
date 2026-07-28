import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';
import ActionLink from '../../components/ui/ActionLink';

const icons = ['message-circle', 'pen-tool', 'hammer', 'home'];

export default function HomeWorkflow({ content }) {
  return (
    <PublicSection bg="white" id="proses">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="timeline-grid editorial-timeline">
          {content.steps.map((step, index) => (
            <div key={index} className="timeline-step">
              <div className="timeline-marker-wrapper">
                <div className="timeline-icon-bg">
                   <PublicIcon name={icons[index % icons.length]} size={20} />
                </div>
                {index < content.steps.length - 1 && <div className="timeline-connector"></div>}
              </div>
              <div className="timeline-content">
                <span className="timeline-number">Tahap 0{index + 1}</span>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="informative-panel">
          <span className="panel-status">Catatan</span>
          <p className="panel-desc">{content.notice}</p>
          <div className="panel-actions">
            <ActionLink to={content.action.href} variant="outline">
              {content.action.label}
            </ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
