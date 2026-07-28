import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../components/ui/PageMeta';
import { projectDetailContent } from '../../content/project-detail';

export function ProjectDetailUnavailableState() {
  const { meta, ui } = projectDetailContent.unavailable;

  return (
    <div className="project-detail-unavailable">
      <PageMeta
        title={meta.title}
        description={meta.description}
        path={meta.canonicalPath}
        robots={meta.robots}
      />
      <div className="public-container">
        <div className="unavailable-card">
          <span className="unavailable-badge">{ui.label}</span>
          <h1 className="unavailable-title">{ui.title}</h1>
          <p className="unavailable-description">{ui.description}</p>
          <div className="unavailable-actions">
            <Link to={ui.actions.backToProjects.href} className="btn btn-primary">
              {ui.actions.backToProjects.label}
            </Link>
            <Link to={ui.actions.backToHome.href} className="btn btn-secondary">
              {ui.actions.backToHome.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
