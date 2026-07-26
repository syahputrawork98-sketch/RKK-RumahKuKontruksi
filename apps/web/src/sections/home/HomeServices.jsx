import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function HomeServices({ content }) {
  return (
    <PublicSection bg="muted">
      <PublicContainer>
        <SectionHeading 
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        {/* State: information/hold panel; tidak membuat kartu layanan dummy */}
        <div className="gate-panel">
          <p>Layanan akan dibuka secara bertahap.</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
