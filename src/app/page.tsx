import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection, CasesSection, PricingSection, ProcessSection, AdminSection, FaqSection } from '@/components/sections/Sections';
import { ProjectQuizSection } from '@/components/sections/ProjectQuizSection';
import { ContactSection, PrivacySection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { ProgressBar, FloatCta } from '@/components/ui/ProgressBar';
import { TechTicker } from '@/components/ui/TechTicker';
import { StatsSection } from '@/components/sections/StatsSection';
import { ProjectQuoteProvider } from '@/lib/project-quote-context';

export default function Home() {
  return (
    <ProjectQuoteProvider>
      <ProgressBar />
      <FloatCta />
      <Navbar />
      <main>
        <HeroSection />
        <TechTicker />
        <StatsSection />
        <ServicesSection />
        <CasesSection />
        <ProjectQuizSection />
        <PricingSection />
        <ProcessSection />
        <AdminSection />
        <FaqSection />
        <ContactSection />
        <PrivacySection />
      </main>
      <Footer />
    </ProjectQuoteProvider>
  );
}
