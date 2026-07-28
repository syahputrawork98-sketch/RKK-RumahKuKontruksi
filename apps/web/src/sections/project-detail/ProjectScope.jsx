import React from 'react';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectScope({ scope }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(scope) || scope.length === 0) {
    return null;
  }

  return (
    <section className="project-scope">
      <h2 className="section-title">{labels.scopeTitle}</h2>
      <ul className="scope-list">
        {scope.map((item, index) => (
          <li key={index} className="scope-item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
