import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import { serviceListContent } from '../../content/services';

export default function PublicationGateVisual() {
  const { publicationFlow } = serviceListContent;

  return (
    <PublicSection className="service-publication-flow">
      <PublicContainer>
        <div aria-label={publicationFlow.ariaLabel}>
          <ol className="flow-list">
            {publicationFlow.steps.map((step, index) => (
              <li key={index} className="flow-item">
                <span>{index + 1}. {step}</span>
                {index < publicationFlow.steps.length - 1 && (
                  <span aria-hidden="true" className="flow-connector"></span>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="service-publication-notice">
          <p>{publicationFlow.notice}</p>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
