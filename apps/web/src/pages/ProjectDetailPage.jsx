import React from 'react';
import { useParams } from 'react-router-dom';
import { projectCatalog } from '../content/projects';
import { resolvePublishedProjectDetailBySlug } from '../content/project-detail';
import { ProjectDetailUnavailableState } from '../sections/project-detail/ProjectDetailUnavailableState';
import { PublishedProjectDetail } from '../sections/project-detail/PublishedProjectDetail';

export default function ProjectDetailPage({
  catalog = projectCatalog,
  now,
}) {
  const { slug = '' } = useParams();

  const resolution = resolvePublishedProjectDetailBySlug(
    catalog,
    slug,
    { now }
  );

  return (
    <div className="page-project-detail">
      {resolution.status !== 'PUBLISHED' ? (
        <ProjectDetailUnavailableState />
      ) : (
        <PublishedProjectDetail project={resolution.project} />
      )}
    </div>
  );
}
