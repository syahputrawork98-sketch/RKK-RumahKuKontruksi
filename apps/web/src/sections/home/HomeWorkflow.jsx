import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';
import ActionLink from '../../components/ui/ActionLink';

const icons = ['message-circle', 'pen-tool', 'hammer', 'file-check'];

export default function HomeWorkflow({ content }) {
  return (
    <PublicSection bg="white" id="proses">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
        />
        
        <div className="timeline-grid home-workflow-timeline">
          {content.steps.map((step, index) => (
            <div key={index} className="home-workflow-step">
              <div className="home-workflow-marker-wrapper">
                <div className="home-workflow-icon-bg">
                  <PublicIcon name={icons[index % icons.length]} size={20} />
                </div>
                {index < content.steps.length - 1 && <div className="home-workflow-connector"></div>}
              </div>
              <div className="home-workflow-content">
                <span className="home-workflow-number">Tahap 0{index + 1}</span>
                <h3 className="home-workflow-title">{step.title}</h3>
                <p className="home-workflow-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="home-workflow-panel">
          <span className="home-workflow-panel-status">Catatan</span>
          <p className="home-workflow-panel-desc">{content.notice}</p>
          <div className="home-workflow-panel-actions">
            <ActionLink to={content.action.href} variant="outline">
              {content.action.label}
            </ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
