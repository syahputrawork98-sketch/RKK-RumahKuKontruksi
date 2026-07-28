import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import secImageWebp from '../../assets/images/home/sec-s2.webp';
import PublicIcon from '../../components/icons/PublicIcon';

export default function HomePrinciples({ content }) {
  return (
    <PublicSection bg="white" id="prinsip">
      <PublicContainer>
        <div className="editorial-split reverse">
           <div className="editorial-visual">
             <img src={secImageWebp} alt="Prinsip kerja profesional" width="500" height="333" loading="lazy" decoding="async" className="rounded-image" />
           </div>
           <div className="editorial-content">
             <SectionHeading
                eyebrow={content.eyebrow}
                title={content.title}
                description={content.description}
             />
             <div className="principles-list">
                {content.items.map((item, index) => (
                  <div key={index} className="principle-row">
                    <div className="principle-icon">
                       <PublicIcon name="check-circle" size={20} />
                    </div>
                    <div className="principle-text">
                       <h4 className="principle-title">{item.title}</h4>
                       <p className="principle-desc">{item.description}</p>
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
