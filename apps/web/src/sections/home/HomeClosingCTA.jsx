import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import HoldAction from '../../components/ui/HoldAction';
import ActionLink from '../../components/ui/ActionLink';

export default function HomeClosingCTA({ content }) {
  return (
    <PublicSection bg="muted" className="closing-section">
      <PublicContainer>
        <div className="closing-panel">
          <h2 className="hero-title">{content.title}</h2>
          <p className="hero-desc">
            {content.description}
          </p>
          
          <div className="hero-actions">
            <HoldAction 
              reason={content.primaryAction.reason} 
              variant="primary"
            >
              {content.primaryAction.label}
            </HoldAction>
            <ActionLink 
              to={content.secondaryAction.href} 
              variant="outline"
            >
              {content.secondaryAction.label}
            </ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
