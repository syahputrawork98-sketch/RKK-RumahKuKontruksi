import ActionLink from '../../components/ui/ActionLink';
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
            <ActionLink to={content.primaryAction.href} variant="primary">
              {content.primaryAction.label}
            </ActionLink>
            <ActionLink to={content.secondaryAction.href} variant="outline">
              {content.secondaryAction.label}
            </ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
