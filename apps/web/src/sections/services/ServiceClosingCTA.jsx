import { Link } from 'react-router-dom';
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
            <Link to={content.primaryAction.href} className="btn-primary">
              {content.primaryAction.label}
            </Link>
            <Link to={content.secondaryAction.href} className="btn-secondary">
              {content.secondaryAction.label}
            </Link>
          </div>
          
          <p className="closing-notice">{content.notice}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
