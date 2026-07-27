import { projectListContent } from '../content/projects';
import { PageMeta } from '../components/ui/PageMeta';
import ProjectsPageHero from '../sections/projects/ProjectsPageHero';
import PublicationStatusNotice from '../sections/projects/PublicationStatusNotice';
import PublicationGateSummary from '../sections/projects/PublicationGateSummary';
import ProjectsHoldState from '../sections/projects/ProjectsHoldState';
import PublicInformationBoundary from '../sections/projects/PublicInformationBoundary';
import ProjectsClosingCTA from '../sections/projects/ProjectsClosingCTA';

export default function ProjectListPage() {
  const { meta } = projectListContent;
  
  return (
    <div className="page-projects">
      <PageMeta 
        title={meta.title} 
        description={meta.description} 
        path={meta.path} 
      />
      <ProjectsPageHero />
      <PublicationStatusNotice />
      <PublicationGateSummary />
      <ProjectsHoldState />
      <PublicInformationBoundary />
      <ProjectsClosingCTA />
    </div>
  );
}
