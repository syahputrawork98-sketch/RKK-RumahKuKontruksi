import React from 'react';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectOutcomes({ outcomes }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(outcomes) || outcomes.length === 0) {
    return null;
  }

  return (
    <section className="project-outcomes">
      <h2 className="section-title">{labels.outcomesTitle}</h2>
      <div className="outcomes-grid">
        {outcomes.map((item, index) => (
          <div key={index} className="outcome-card">
            <h3 className="outcome-title">{item.title}</h3>
            {item.description && <p className="outcome-description">{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
