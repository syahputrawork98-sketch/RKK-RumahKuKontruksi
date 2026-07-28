import ActionLink from '../../components/ui/ActionLink';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import ServicePublicationGateIllustration from '../../components/illustrations/ServicePublicationGateIllustration';
import { serviceListContent } from '../../content/services';

export default function ServiceListEmptyState() {
  const content = serviceListContent.emptyState;

  return (
    <PublicSection className="service-empty-state">
      <PublicContainer>
        <div className="empty-state-content">
          <div className="empty-state-illustration-wrapper">
            <ServicePublicationGateIllustration size={200} />
          </div>
          <div>
            <span className="empty-state-label">{content.statusLabel}</span>
            <h2 className="empty-state-title">{content.title}</h2>
          </div>
          <p className="empty-state-desc">{content.description}</p>
          <p className="empty-state-available">{content.availableNow}</p>
          
          <div className="empty-state-actions">
            <ActionLink to={content.primaryAction.href} variant="primary">
              {content.primaryAction.label}
            </ActionLink>
            <ActionLink to={content.secondaryAction.href} variant="outline">
              {content.secondaryAction.label}
            </ActionLink>
          </div>
          
          <p className="empty-state-notice">{content.notice}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
