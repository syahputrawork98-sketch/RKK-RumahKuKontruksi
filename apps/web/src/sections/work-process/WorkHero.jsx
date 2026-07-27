import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import { Link } from 'react-router-dom';

export default function WorkHero({ content }) {
  return (
    <PublicSection className="work-hero-section">
      <PublicContainer>
        <div className="work-hero-content">
          <p className="eyebrow-text">{content.eyebrow}</p>
          <h1 className="hero-title">{content.title}</h1>
          <p className="hero-subtitle">{content.description}</p>
          
          <div className="hero-actions">
            <Link to={content.primaryAction.href} className="btn-primary">
              {content.primaryAction.label}
            </Link>
            <Link to={content.secondaryAction.href} className="btn-secondary">
              {content.secondaryAction.label}
            </Link>
          </div>
          
          <div className="hero-notice">
            <p>{content.notice}</p>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
