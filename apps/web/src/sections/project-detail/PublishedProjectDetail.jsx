import React from 'react';
import { PageMeta } from '../../components/ui/PageMeta';
import { ProjectBreadcrumb } from './ProjectBreadcrumb';
import { ProjectDetailHero } from './ProjectDetailHero';
import { ProjectFacts } from './ProjectFacts';
import { ProjectOverview } from './ProjectOverview';
import { ProjectMediaGallery } from './ProjectMediaGallery';
import { ProjectScope } from './ProjectScope';
import { ProjectApproach } from './ProjectApproach';
import { ProjectOutcomes } from './ProjectOutcomes';
import { RelatedServices } from './RelatedServices';
import { RelatedProjects } from './RelatedProjects';
import { ProjectDetailClosingCTA } from './ProjectDetailClosingCTA';

export function PublishedProjectDetail({ project }) {
  const { meta } = project;

  return (
    <div className="published-project-detail">
      <PageMeta
        title={meta.title}
        description={meta.description}
        path={meta.canonicalPath}
        robots="index, follow"
      />
      <div className="public-container">
        <ProjectBreadcrumb title={project.title} />
        <ProjectDetailHero project={project} />
        <ProjectFacts facts={project.facts} />
        <ProjectOverview overview={project.overview} />
        <ProjectMediaGallery gallery={project.gallery} />
        <ProjectScope scope={project.scope} />
        <ProjectApproach approach={project.approach} />
        <ProjectOutcomes outcomes={project.outcomes} />
        <RelatedServices services={project.relatedServices} />
        <RelatedProjects projects={project.relatedProjects} />
        <ProjectDetailClosingCTA />
      </div>
    </div>
  );
}
