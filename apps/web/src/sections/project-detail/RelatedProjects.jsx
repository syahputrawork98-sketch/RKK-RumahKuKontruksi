import React from 'react';
import { Link } from 'react-router-dom';
import { projectDetailContent } from '../../content/project-detail';

export function RelatedProjects({ projects }) {
  const { labels } = projectDetailContent.published;

  if (!Array.isArray(projects) || projects.length === 0) {
    return null;
  }

  return (
    <section className="related-projects">
      <h2 className="section-title">{labels.relatedProjectsTitle}</h2>
      <div className="projects-grid">
        {projects.map((proj, index) => (
          <Link key={index} to={proj.href} className="related-project-card">
            <span className="project-category">{proj.category}</span>
            <h3 className="project-title">{proj.title}</h3>
            {proj.summary && <p className="project-summary">{proj.summary}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
