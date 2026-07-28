import React from 'react';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectFacts({ facts }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(facts) || facts.length === 0) {
    return null;
  }

  return (
    <section className="project-facts">
      <h2 className="section-title">{labels.factsTitle}</h2>
      <dl className="facts-grid">
        {facts.map((fact, index) => (
          <div key={index} className="fact-item">
            <dt className="fact-label">{fact.label}</dt>
            <dd className="fact-value">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
