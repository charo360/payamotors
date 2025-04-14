import { CarFeaturedSection } from "@/components/car-featured-section"
import { CarListingSection } from "@/components/car-listing-section"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { CtaSection } from "@/components/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedHeroSection />
      <main className="flex-1">
        <StatsSection />
        <CarFeaturedSection />
        <FeaturesSection />
        <CarListingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </div>
  )
}
