import React from 'react';
import ActionLink from '../../components/ui/ActionLink';
import { PageMeta } from '../../components/ui/PageMeta';
import { projectDetailContent } from '../../content/project-detail';
import ProjectEmptyStateIllustration from '../../components/illustrations/ProjectEmptyStateIllustration';

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
          <div className="unavailable-illustration-wrapper">
            <ProjectEmptyStateIllustration size={200} />
          </div>
          <span className="unavailable-badge">{ui.label}</span>
          <h1 className="unavailable-title">{ui.title}</h1>
          <p className="unavailable-description">{ui.description}</p>
          <div className="unavailable-actions">
            <ActionLink to={ui.actions.backToProjects.href} variant="primary">
              {ui.actions.backToProjects.label}
            </ActionLink>
            <ActionLink to={ui.actions.backToHome.href} variant="outline">
              {ui.actions.backToHome.label}
            </ActionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
