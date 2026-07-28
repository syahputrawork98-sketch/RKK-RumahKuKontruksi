import ActionLink from '../../components/ui/ActionLink';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import { serviceListContent } from '../../content/services';

export default function ServiceClosingCTA() {
  const content = serviceListContent.closing;

  return (
    <PublicSection className="service-closing-section">
      <PublicContainer>
        <div className="closing-content">
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
    </PublicSection>
  );
}
