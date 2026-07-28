import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import HoldAction from '../../components/ui/HoldAction';
import ActionLink from '../../components/ui/ActionLink';

export default function HomeClosingCTA({ content }) {
  return (
    <PublicSection bg="white" className="home-closing-section">
      <PublicContainer>
        <div className="home-closing-card">
          <h2 className="home-closing-title">{content.title}</h2>
          <p className="home-closing-desc">{content.description}</p>
          <div className="home-closing-actions">
            <HoldAction reason={content.primaryAction.reason} variant="primary">
              {content.primaryAction.label}
            </HoldAction>
            <ActionLink
              to={content.secondaryAction.href}
              variant="outline"
              className="home-closing-secondary"
            >
              {content.secondaryAction.label}
            </ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
