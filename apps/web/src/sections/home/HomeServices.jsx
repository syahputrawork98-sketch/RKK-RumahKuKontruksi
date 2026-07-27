import { Link } from 'react-router-dom';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
export default function HomeServices({ content }) {
  return (
    <PublicSection bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
        />
        <div className="informative-panel">
          <span className="panel-status">{content.statusLabel}</span>
          <p className="panel-desc">{content.description}</p>
          <div className="panel-actions">
            <Link to={content.action.href} className="btn-secondary">
              {content.action.label}
            </Link>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
