import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function HomeContext({ content }) {
  return (
    <PublicSection bg="white" id="konteks">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <div className="home-context-list">
          {content.points.map((point, index) => (
            <div className="home-context-item" key={index}>
              <div className="home-context-marker">0{index + 1}</div>
              <div className="home-context-content">
                <h3 className="home-context-title">{point.title}</h3>
                <p className="home-context-desc">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
