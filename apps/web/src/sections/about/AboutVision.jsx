import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

import sec640Webp from '../../assets/images/about/about-supporting-planning-640.webp';
import sec960Webp from '../../assets/images/about/about-supporting-planning-960.webp';

export default function AboutVision({ content }) {
  return (
    <PublicSection id="about-vision" bg="white">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.intro}
        />
        
        <div className="vision-grid">
          <div className="vision-statement-panel">
            <div className="vision-label">{content.statement.label}</div>
            <blockquote className="vision-quote">
              "{content.statement.quote}"
            </blockquote>
            <p className="vision-note">{content.statement.note}</p>
          </div>

          <figure className="vision-image-wrapper">
            <img
              src={sec960Webp}
              srcSet={`${sec640Webp} 640w, ${sec960Webp} 960w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Pengawasan dan koordinasi teknis pekerjaan konstruksi"
              className="vision-supporting-img"
              width="960"
              height="640"
              loading="lazy"
            />
            <figcaption className="about-image-caption">
              Foto ilustrasi pengawasan dan koordinasi teknis pekerjaan konstruksi
            </figcaption>
          </figure>
        </div>

        <div className="vision-pillars">
          {content.pillars.map((pillar, index) => (
            <div key={index} className="pillar-item">
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="mission-groups-section">
          <h3 className="mission-groups-heading">Ringkasan Misi</h3>
          <div className="mission-groups">
            {content.missionGroups.map((group, index) => (
              <div key={index} className="mission-group">
                <h4 className="mission-title">{group.title}</h4>
                <p className="mission-desc">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
