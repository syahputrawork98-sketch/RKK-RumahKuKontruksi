import { homeContent } from '../content/home';
import HomeHero from '../sections/home/HomeHero';
import HomeContext from '../sections/home/HomeContext';
import HomeApproach from '../sections/home/HomeApproach';
import HomeWorkflow from '../sections/home/HomeWorkflow';
import HomeServices from '../sections/home/HomeServices';
import HomePrinciples from '../sections/home/HomePrinciples';
import HomeClosingCTA from '../sections/home/HomeClosingCTA';

export default function HomePage() {
  return (
    <div className="home-page">
      <HomeHero content={homeContent.hero} />
      <HomeContext content={homeContent.context} />
      <HomeApproach content={homeContent.approach} />
      <HomeWorkflow content={homeContent.workflow} />
      <HomeServices content={homeContent.services} />
      <HomePrinciples content={homeContent.principles} />
      <HomeClosingCTA content={homeContent.closing} />
    </div>
  );
}
