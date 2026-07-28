import React from 'react';
import { Link } from 'react-router-dom';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectBreadcrumb({ title }) {
  const { labels } = projectDetailContent.published;

  return (
    <nav aria-label="Breadcrumb" className="project-breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/">{labels.breadcrumbHome}</Link>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">/</li>
        <li className="breadcrumb-item">
          <Link to="/proyek">{labels.breadcrumbProjects}</Link>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">/</li>
        <li className="breadcrumb-item active">
          <span aria-current="page">{title}</span>
        </li>
      </ol>
    </nav>
  );
}
