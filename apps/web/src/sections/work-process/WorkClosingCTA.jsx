import ActionLink from '../../components/ui/ActionLink';
import PublicContainer from '../../components/ui/PublicContainer';

export default function WorkClosingCTA({ content }) {
  return (
    <section className="closing-cta-section">
      <PublicContainer>
        <div className="closing-cta-content">
          <h2 className="closing-title">{content.title}</h2>
          <p className="closing-desc">{content.description}</p>
          
          <div className="closing-actions">
            <ActionLink to={content.primaryAction.href} variant="primary">
              {content.primaryAction.label}
            </ActionLink>
            <ActionLink to={content.secondaryAction.href} variant="outline">
              {content.secondaryAction.label}
            </ActionLink>
          </div>
          
          <p className="closing-notice">{content.notice}</p>
        </div>
      </PublicContainer>
    </section>
  );
}
