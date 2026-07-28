import React from 'react';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectApproach({ approach }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(approach) || approach.length === 0) {
    return null;
  }

  return (
    <section className="project-approach">
      <h2 className="section-title">{labels.approachTitle}</h2>
      <ol className="approach-list">
        {approach.map((step, index) => (
          <li key={index} className="approach-item">
            <div className="step-number">{step.order || index + 1}</div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              {step.description && <p className="step-description">{step.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
