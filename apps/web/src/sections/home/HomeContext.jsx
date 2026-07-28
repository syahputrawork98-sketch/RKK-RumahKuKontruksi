import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import secImageWebp from '../../assets/images/home/sec-s1.webp';

export default function HomeContext({ content }) {
  return (
    <PublicSection bg="white" id="konteks">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="editorial-split">
          <div className="editorial-visual">
             <img src={secImageWebp} alt="Arsitek merancang" width="500" height="333" loading="lazy" decoding="async" className="rounded-image" />
          </div>
          <div className="editorial-content">
            <div className="context-list">
              {content.points.map((point, index) => (
                <div className="context-list-item" key={index}>
                  <div className="card-marker">0{index + 1}</div>
                  <div className="context-list-text">
                    <h3 className="context-list-title">{point.title}</h3>
                    <p className="context-list-desc">{point.description}</p>
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
