import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { CourseBenefits } from "@/components/landing/CourseBenefits";
import { PlatformPreview } from "@/components/landing/PlatformPreview";
import { ModulesSection } from "@/components/landing/ModulesSection";
import { CitiesShowcase } from "@/components/landing/CitiesShowcase";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { TransparencySection } from "@/components/landing/TransparencySection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <CourseBenefits />
        <PlatformPreview />
        <ModulesSection />
        <CitiesShowcase />
        <ComparisonSection />
        <AudienceSection />
        <PricingSection />
        <FAQSection />
        <TransparencySection />
      </main>
      <LandingFooter />
      <MobileStickyCTA />
    </>
  );
}
