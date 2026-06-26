import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection, CasesSection, PricingSection, ProcessSection, AdminSection, FaqSection } from '@/components/sections/Sections';
import { ContactSection, PrivacySection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { ProgressBar, FloatCta } from '@/components/ui/ProgressBar';

export default function Home() {
  return (
    <>
      <ProgressBar />
      <FloatCta />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <CasesSection />
        <PricingSection />
        <ProcessSection />
        <AdminSection />
        <FaqSection />
        <ContactSection />
        <PrivacySection />
      </main>
      <Footer />
    </>
  );
}
