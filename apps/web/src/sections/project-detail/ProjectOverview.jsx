import React from 'react';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectOverview({ overview }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(overview) || overview.length === 0) {
    return null;
  }

  return (
    <section className="project-overview">
      <h2 className="section-title">{labels.overviewTitle}</h2>
      <div className="overview-body">
        {overview.map((paragraph, index) => (
          <p key={index} className="overview-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
