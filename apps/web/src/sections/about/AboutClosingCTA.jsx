import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import ActionLink from '../../components/ui/ActionLink';

export default function AboutClosingCTA({ content }) {
  return (
    <PublicSection id="about-closing-cta" bg="white" className="closing-cta-section">
      <PublicContainer>
        <div className="closing-cta-content">
          <h2 className="closing-title">{content.headline}</h2>
          <p className="closing-desc">{content.supportingCopy}</p>
          
          <div className="closing-actions">
            <ActionLink to={content.primaryCTA.target} variant="primary">
              {content.primaryCTA.label}
            </ActionLink>
            <ActionLink to={content.secondaryCTA.target} variant="outline">
              {content.secondaryCTA.label}
            </ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
