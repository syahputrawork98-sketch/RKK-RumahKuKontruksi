import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import ActionLink from '../../components/ui/ActionLink';

export default function HomeWorkflow({ content }) {
  return (
    <PublicSection bg="white">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
        />
        
        <div className="timeline-grid">
          {content.steps.map((step, index) => (
            <div key={index} className="process-step">
              <span className="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="gate-panel">
          <p>{content.notice}</p>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <ActionLink to={content.action.href}>
            {content.action.label}
          </ActionLink>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
