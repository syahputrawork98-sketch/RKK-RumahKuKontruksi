import React from 'react';
import PublicSection from '../../components/ui/PublicSection';
import PublicContainer from '../../components/ui/PublicContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import PublishedServiceGrid from './PublishedServiceGrid';
import ServiceListEmptyState from './ServiceListEmptyState';
import { serviceListContent } from '../../content/services';

export default function PublishedServiceSection({ services = [] }) {
  const content = serviceListContent.catalog;

  if (services.length === 0) {
    return <ServiceListEmptyState />;
  }

  return (
    <PublicSection>
      <PublicContainer>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <PublishedServiceGrid services={services} />
      </PublicContainer>
    </PublicSection>
  );
}
