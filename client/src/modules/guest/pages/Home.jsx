// client/src/modules/guest/pages/Home.jsx

import HeroSlider from "../components/home/HeroSlider";
import AboutSection from "../components/home/AboutSection";
import FeaturesSection from "../components/home/FeaturesSection";
import PlanningSection from "../components/home/PlanningSection";
import ImplementationSection from "../components/home/ImplementationSection";
import ClosingCTA from "../components/home/ClosingCTA";

export default function Home() {
    return (
        <div className="bg-white text-gray-800 overflow-hidden">
            <HeroSlider />
            <AboutSection />
            <FeaturesSection />
            <PlanningSection />
            <ImplementationSection />
            <ClosingCTA />
        </div>
    );
}
