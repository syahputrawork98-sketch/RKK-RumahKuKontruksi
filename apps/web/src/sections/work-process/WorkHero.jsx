import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import ActionLink from '../../components/ui/ActionLink';
import PublicIcon from '../../components/icons/PublicIcon';
import { workProcessGroupIcons } from './workProcessVisuals';

export default function WorkHero({ content, groups = [] }) {
  return (
    <PublicSection className="work-hero-section">
      <PublicContainer>
        <div className="work-hero-grid">
          <div className="work-hero-content">
            <span className="eyebrow-text">{content.eyebrow}</span>
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-subtitle">{content.description}</p>
            <div className="work-hero-actions">
              <ActionLink to={content.primaryAction.href} variant="primary">
                {content.primaryAction.label}
              </ActionLink>
              <ActionLink to={content.secondaryAction.href} variant="outline">
                {content.secondaryAction.label}
              </ActionLink>
            </div>
            <div className="work-hero-notice">
              <p>{content.notice}</p>
            </div>
          </div>

          <div className="work-hero-map" data-visual="process-map">
            <div className="process-map-title">Peta Alur Sembilan Fase</div>
            <div className="process-map-groups">
              {groups.map((group, index) => {
                const iconName = workProcessGroupIcons[group.id] || 'compass';

                return (
                  <div
                    key={group.id}
                    className="process-map-node"
                    data-group={group.id}
                    data-icon={iconName}
                  >
                    <div className="process-map-icon-box">
                      <PublicIcon name={iconName} size={20} />
                    </div>

                    <div className="process-map-info">
                      <span className="process-map-group-eyebrow">
                        {group.eyebrow}
                      </span>
                      <span className="process-map-node-title">
                        {group.title}
                      </span>
                      <span className="process-map-node-desc">
                        {group.description}
                      </span>
                    </div>

                    {index < groups.length - 1 && (
                      <span
                        className="process-map-connector"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
