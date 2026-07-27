import { Link } from 'react-router-dom';
import PublicContainer from '../../components/ui/PublicContainer';

export default function WorkClosingCTA({ content }) {
  return (
    <section className="closing-cta-section">
      <PublicContainer>
        <div className="closing-cta-content">
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
    </section>
  );
}
