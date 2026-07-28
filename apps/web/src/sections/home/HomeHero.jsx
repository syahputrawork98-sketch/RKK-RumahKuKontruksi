import ActionLink from '../../components/ui/ActionLink';
import HoldAction from '../../components/ui/HoldAction';

import hero640Webp from '../../assets/images/home/home-hero-planning-640.webp';
import hero960Webp from '../../assets/images/home/home-hero-planning-960.webp';
import hero1440Webp from '../../assets/images/home/home-hero-planning-1440.webp';

export default function HomeHero({ content }) {
  return (
    <section className="home-hero">
      <div className="public-container">
        <div className="hero-grid">
          <div className="hero-content-col">
            <div className="hero-eyebrow">{content.eyebrow}</div>
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-desc">{content.description}</p>
            <div className="hero-actions">
              <HoldAction
                reason={content.primaryAction.reason}
                variant="primary"
              >
                {content.primaryAction.label}
              </HoldAction>
              <ActionLink
                to={content.secondaryAction.href}
                variant="outline"
              >
                {content.secondaryAction.label}
              </ActionLink>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-image-wrapper">
              <img
                src={hero1440Webp}
                srcSet={`${hero640Webp} 640w, ${hero960Webp} 960w, ${hero1440Webp} 1440w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Arsitek meninjau denah di lokasi konstruksi"
                width="1440"
                height="960"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="hero-image"
              />
              <figcaption className="home-hero-image-caption">
                Foto ilustrasi perencanaan konstruksi
              </figcaption>
              <div className="hero-overlay-system system-diagram" aria-hidden="true">
                {content.visualNodes.map((node, index) => (
                  <div key={index} className={`system-node node-${index + 1}`}>
                    <div className="node-icon"></div>
                    <div className="node-content">
                      <span className="node-stage">{node.stage}</span>
                      <span className="node-outcome">{node.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
