import { projectListContent } from '../../content/projects';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';

export default function PublicInformationBoundary() {
  const { informationBoundaries } = projectListContent;

  return (
    <PublicSection className="information-boundary-section" id="information-boundary" aria-labelledby="information-boundary-heading">
      <PublicContainer>
        <div className="boundary-card">
          <SectionHeading id="information-boundary-heading" title={informationBoundaries.heading} />
          <ul className="boundary-list">
            {informationBoundaries.items.map((item, index) => (
              <li key={index} className="boundary-item">{item}</li>
            ))}
          </ul>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
