import React from 'react';
import { Link } from 'react-router-dom';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectDetailClosingCTA() {
  const { labels } = projectDetailContent.published;

  return (
    <section className="project-detail-closing-cta">
      <div className="closing-cta-content">
        <h2 className="closing-title">{labels.closingTitle}</h2>
        <div className="closing-actions">
          <Link to="/proyek" className="btn btn-primary">
            {labels.closingCtaProjects}
          </Link>
          <Link to="/cara-kerja" className="btn btn-secondary">
            {labels.closingCtaWorkProcess}
          </Link>
        </div>
      </div>
    </section>
  );
}
