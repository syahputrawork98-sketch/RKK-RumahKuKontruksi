import { aboutContent } from '../content/about';
import { PageMeta } from '../components/ui/PageMeta';
import AboutHero from '../sections/about/AboutHero';
import AboutCompanyPosition from '../sections/about/AboutCompanyPosition';
import AboutProblems from '../sections/about/AboutProblems';
import AboutPositioning from '../sections/about/AboutPositioning';
import AboutVision from '../sections/about/AboutVision';
import AboutValues from '../sections/about/AboutValues';
import AboutPlatform from '../sections/about/AboutPlatform';
import AboutCurrentState from '../sections/about/AboutCurrentState';
import AboutClosingCTA from '../sections/about/AboutClosingCTA';

export default function AboutPage() {
  return (
    <>
      <PageMeta 
        title={aboutContent.meta.title} 
        description={aboutContent.meta.description} 
        path="/tentang"
      />
      
      <div className="page-about about-page">
        <AboutHero content={aboutContent.hero} />
        <AboutCompanyPosition content={aboutContent.companyPosition} />
        <AboutProblems content={aboutContent.problems} />
        <AboutPositioning content={aboutContent.positioning} />
        <AboutVision content={aboutContent.vision} />
        <AboutValues content={aboutContent.values} />
        <AboutPlatform content={aboutContent.platform} />
        <AboutCurrentState content={aboutContent.currentState} />
        <AboutClosingCTA content={aboutContent.closing} />
      </div>
    </>
  );
}
