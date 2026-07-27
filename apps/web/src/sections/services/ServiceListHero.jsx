import { Link } from 'react-router-dom';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import { serviceListContent } from '../../content/services';

export default function ServiceListHero() {
  const content = serviceListContent.hero;

  return (
    <PublicSection className="service-hero">
      <PublicContainer>
        <div className="service-hero-content">
          <p className="service-hero-eyebrow">{content.eyebrow}</p>
          <h1 className="service-hero-title">{content.title}</h1>
          <p className="service-hero-description">{content.description}</p>
          
          <div className="service-hero-actions">
            <Link to={content.primaryAction.href} className="btn-primary">
              {content.primaryAction.label}
            </Link>
            <Link to={content.secondaryAction.href} className="btn-secondary">
              {content.secondaryAction.label}
            </Link>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
