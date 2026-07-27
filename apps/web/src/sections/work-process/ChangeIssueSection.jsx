import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function ChangeIssueSection({ content }) {
  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="steps-list">
          {content.steps.map((step, idx) => (
            <div key={idx} className="step-item">
              <span className="step-icon">{idx + 1}.</span>
              <span>{step}</span>
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
