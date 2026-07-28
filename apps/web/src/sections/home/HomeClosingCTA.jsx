import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import HoldAction from '../../components/ui/HoldAction';

export default function HomeClosingCTA({ content }) {
  return (
    <PublicSection bg="white" className="closing-section">
      <PublicContainer>
        <div className="closing-card">
          <h2 className="closing-title">{content.title}</h2>
          <p className="closing-desc">{content.description}</p>
          <div className="closing-actions">
            <HoldAction reason={content.primaryAction.reason} variant="primary">
              {content.primaryAction.label}
            </HoldAction>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
