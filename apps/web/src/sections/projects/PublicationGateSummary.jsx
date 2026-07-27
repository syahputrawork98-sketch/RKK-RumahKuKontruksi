import { projectListContent } from '../../content/projects';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function PublicationGateSummary() {
  const { publicationGates } = projectListContent;

  return (
    <PublicSection className="publication-gates-section" id="publication-gates" aria-labelledby="publication-gates-heading">
      <PublicContainer>
        <SectionHeading id="publication-gates-heading" title={publicationGates.heading} />
        <p className="publication-gates-description">{publicationGates.description}</p>
        <ul className="gates-grid">
          {publicationGates.items.map((gate, index) => (
            <li key={gate.id} className="gate-card">
              <span className="gate-number" aria-hidden="true">{index + 1}</span>
              <h3 className="gate-title">{gate.title}</h3>
              <p className="gate-description">{gate.description}</p>
            </li>
          ))}
        </ul>
      </PublicContainer>
    </PublicSection>
  );
}
