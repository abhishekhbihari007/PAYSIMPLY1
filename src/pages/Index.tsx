import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSection from "@/components/TrustSection";
import ComparisonSection from "@/components/ComparisonSection";
import FeaturesSection from "@/components/FeaturesSection";

import PricingSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="pt-24">
        <HeroSection />
        <LogoMarquee />
        <ServicesSection />
        <TestimonialsSection />
        <TrustSection />
        <ComparisonSection />
        <FeaturesSection />
        <PricingSection />
        
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
