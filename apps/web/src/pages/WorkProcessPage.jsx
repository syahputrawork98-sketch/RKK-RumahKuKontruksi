import { workProcessContent } from '../content/workProcess';
import { PageMeta } from '../components/ui/PageMeta';
import WorkHero from '../sections/work-process/WorkHero';
import ProcessReadingPrinciples from '../sections/work-process/ProcessReadingPrinciples';
import NinePhaseOverview from '../sections/work-process/NinePhaseOverview';
import ProcessPhaseGroup from '../sections/work-process/ProcessPhaseGroup';
import DecisionGateSection from '../sections/work-process/DecisionGateSection';
import CrossPhaseControlSection from '../sections/work-process/CrossPhaseControlSection';
import ChangeIssueSection from '../sections/work-process/ChangeIssueSection';
import ProcessBoundarySection from '../sections/work-process/ProcessBoundarySection';
import WorkClosingCTA from '../sections/work-process/WorkClosingCTA';

export default function WorkProcessPage() {
  return (
    <>
      <PageMeta 
        title={workProcessContent.meta.title} 
        description={workProcessContent.meta.description} 
        path="/cara-kerja"
      />
      
      <div className="page-work-process">
        <WorkHero content={workProcessContent.hero} />
        <ProcessReadingPrinciples content={workProcessContent.readingPrinciples} />
        <NinePhaseOverview content={workProcessContent.overview} />
        
        {workProcessContent.groups.map(group => (
          <ProcessPhaseGroup key={group.id} content={group} />
        ))}
        
        <DecisionGateSection content={workProcessContent.decisionGates} />
        <CrossPhaseControlSection content={workProcessContent.crossPhaseControls} />
        <ChangeIssueSection content={workProcessContent.changesAndIssues} />
        <ProcessBoundarySection content={workProcessContent.boundaries} />
        <WorkClosingCTA content={workProcessContent.closing} />
      </div>
    </>
  );
}
