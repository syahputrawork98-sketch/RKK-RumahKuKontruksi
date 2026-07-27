import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import ProcessPhaseCard from './ProcessPhaseCard';

export default function ProcessPhaseGroup({ content }) {
  return (
    <PublicSection bg="muted" className="phase-group">
      <PublicContainer>
        <div className="phase-group-header">
          <p className="phase-group-eyebrow">{content.eyebrow}</p>
          <h2 className="phase-group-title">{content.title}</h2>
          <p className="phase-group-desc">{content.description}</p>
        </div>
        
        <div className="phase-cards">
          {content.phases.map((phase) => (
            <ProcessPhaseCard key={phase.slug} phase={phase} />
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
