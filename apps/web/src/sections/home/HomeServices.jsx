import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import ActionLink from '../../components/ui/ActionLink';
import PublicIcon from '../../components/icons/PublicIcon';

export default function HomeServices({ content }) {
  return (
    <PublicSection bg="muted" id="layanan">
      <PublicContainer>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
        />

        <div className="home-services-panel">
          <div className="home-services-status">
            <PublicIcon name="lock" size={20} />
            <span className="home-services-status-text">{content.statusLabel}</span>
          </div>
          <p className="home-services-desc">{content.description}</p>
          <div className="home-services-actions">
            <ActionLink to={content.action.href} variant="outline">
              {content.action.label}
            </ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
