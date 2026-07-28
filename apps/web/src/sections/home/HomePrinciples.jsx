import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublicIcon from '../../components/icons/PublicIcon';

import sec640Webp from '../../assets/images/home/home-principles-planning-640.webp';
import sec960Webp from '../../assets/images/home/home-principles-planning-960.webp';

export default function HomePrinciples({ content }) {
  return (
    <PublicSection bg="white" id="prinsip">
      <PublicContainer>
        <div className="home-principles-split">
          <div className="home-principles-visual">
            <img
              src={sec960Webp}
              srcSet={`${sec640Webp} 640w, ${sec960Webp} 960w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Meja kerja arsitek dengan blueprint dan alat perencanaan"
              width="960"
              height="640"
              loading="lazy"
              decoding="async"
              className="home-principles-image"
            />
          </div>
          <div className="home-principles-content">
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.intro}
            />
            <div className="home-principles-list">
              {content.items.map((item, index) => (
                <div key={index} className="home-principle-row">
                  <div className="home-principle-icon">
                    <PublicIcon name="check-circle" size={20} />
                  </div>
                  <div className="home-principle-text">
                    <h3 className="home-principle-title">{item.title}</h3>
                    <p className="home-principle-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
