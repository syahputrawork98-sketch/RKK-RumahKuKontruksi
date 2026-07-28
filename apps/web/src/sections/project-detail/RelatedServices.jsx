import React from 'react';
import { Link } from 'react-router-dom';
import { projectDetailContent } from '../../content/project-detail';

export function RelatedServices({ services }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(services) || services.length === 0) {
    return null;
  }

  return (
    <section className="related-services">
      <h2 className="section-title">{labels.relatedServicesTitle}</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <Link key={index} to={service.href} className="related-service-card">
            <span className="service-title">{service.title}</span>
            <span className="service-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
