import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import ActionLink from '../../components/ui/ActionLink';

import hero640Webp from '../../assets/images/about/about-hero-planning-640.webp';
import hero960Webp from '../../assets/images/about/about-hero-planning-960.webp';
import hero1440Webp from '../../assets/images/about/about-hero-planning-1440.webp';

export default function AboutHero({ content }) {
  return (
    <PublicSection id="about-hero" bg="white" className="about-hero">
      <PublicContainer>
        <div className="about-hero-grid">
          <div className="about-hero-content">
            <div className="hero-eyebrow">{content.eyebrow}</div>
            <h1 className="hero-title">{content.headline}</h1>
            <p className="hero-desc">{content.supportingCopy}</p>
            
            <div className="hero-actions">
              <ActionLink to={content.primaryCTA.target} variant="primary">
                {content.primaryCTA.label}
              </ActionLink>
              <ActionLink to={content.secondaryCTA.target} variant="outline">
                {content.secondaryCTA.label}
              </ActionLink>
            </div>
          </div>
          
          <div className="about-hero-visual">
            <figure className="about-image-wrapper">
              <img
                src={hero1440Webp}
                srcSet={`${hero640Webp} 640w, ${hero960Webp} 960w, ${hero1440Webp} 1440w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Diskusi perencanaan arsitektur dan konstruksi"
                className="about-hero-img"
                width="1440"
                height="960"
                loading="eager"
              />
              <figcaption className="about-image-caption">
                Foto ilustrasi diskusi perencanaan arsitektur dan konstruksi
              </figcaption>
            </figure>
            {content.stages && (
              <div className="process-stages" aria-hidden="true" style={{ display: 'none' }}>
                {content.stages.map((stage, index) => (
                  <span key={index} className="stage-name">{stage}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
