import React from 'react';
import PageMeta from '../components/ui/PageMeta';
import { serviceListContent, serviceCatalog, resolvePublishedServices } from '../content/services';
import ServiceListHero from '../sections/services/ServiceListHero';
import PublicationGateVisual from '../sections/services/PublicationGateVisual';
import CurrentPublicationStatus from '../sections/services/CurrentPublicationStatus';
import ServicePublicationGate from '../sections/services/ServicePublicationGate';
import PublishedServiceSection from '../sections/services/PublishedServiceSection';
import ServiceConceptDifference from '../sections/services/ServiceConceptDifference';
import ServiceBoundaryNotice from '../sections/services/ServiceBoundaryNotice';
import ServiceClosingCTA from '../sections/services/ServiceClosingCTA';

export default function ServiceListPage() {
  const publishedServices = resolvePublishedServices(serviceCatalog);

  return (
    <div className="page-services">
      <PageMeta 
        title={serviceListContent.meta.title} 
        description={serviceListContent.meta.description} 
        path="/layanan" 
      />
      <ServiceListHero />
      <CurrentPublicationStatus />
      <PublicationGateVisual />
      <ServicePublicationGate />
      <PublishedServiceSection services={publishedServices} />
      <ServiceConceptDifference />
      <ServiceBoundaryNotice />
      <ServiceClosingCTA />
    </div>
  );
}
