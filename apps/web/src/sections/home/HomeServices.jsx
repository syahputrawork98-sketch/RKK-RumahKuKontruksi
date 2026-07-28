import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import ActionLink from '../../components/ui/ActionLink';
import PublicIcon from '../../components/icons/PublicIcon';

export default function HomeServices({ content }) {
  return (
    <PublicSection bg="muted" id="layanan">
      <PublicContainer>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="services-hold-state">
          <div className="hold-icon-wrapper">
            <PublicIcon name="lock" size={32} />
          </div>
          <h3 className="hold-title">Layanan Segera Hadir</h3>
          <p className="hold-desc">Kami sedang mempersiapkan katalog layanan yang dapat Anda lihat secara transparan.</p>
          <div className="hold-actions">
             <ActionLink to={content.action.href} variant="outline">{content.action.label}</ActionLink>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
