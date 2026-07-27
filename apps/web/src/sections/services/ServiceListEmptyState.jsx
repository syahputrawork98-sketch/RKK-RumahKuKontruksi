import { Link } from 'react-router-dom';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import { serviceListContent } from '../../content/services';

export default function ServiceListEmptyState() {
  const content = serviceListContent.emptyState;

  return (
    <PublicSection className="service-empty-state">
      <PublicContainer>
        <div className="empty-state-content">
          <div>
            <span className="empty-state-label">{content.statusLabel}</span>
            <h2 className="empty-state-title">{content.title}</h2>
          </div>
          <p className="empty-state-desc">{content.description}</p>
          <p className="empty-state-available">{content.availableNow}</p>
          
          <div className="empty-state-actions">
            <Link to={content.primaryAction.href} className="btn-primary">
              {content.primaryAction.label}
            </Link>
            <Link to={content.secondaryAction.href} className="btn-secondary">
              {content.secondaryAction.label}
            </Link>
          </div>
          
          <p className="empty-state-notice">{content.notice}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
