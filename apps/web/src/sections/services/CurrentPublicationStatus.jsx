import React from 'react';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import { serviceListContent } from '../../content/services';

export default function CurrentPublicationStatus() {
  const content = serviceListContent.currentStatus;

  return (
    <PublicSection className="service-current-status">
      <PublicContainer>
        <div className="status-content">
          <div>
            <span className="status-label">{content.statusLabel}</span>
            <h2 className="status-title">{content.title}</h2>
          </div>
          <p className="status-description">{content.description}</p>
          <div className="status-notice">
            <p>{content.notice}</p>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}
