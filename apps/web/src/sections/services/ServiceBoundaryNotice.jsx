import React from 'react';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import { serviceListContent } from '../../content/services';

export default function ServiceBoundaryNotice() {
  const content = serviceListContent.boundaries;

  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        
        <ul className="service-boundary-list">
          {content.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </PublicContainer>
    </PublicSection>
  );
}
