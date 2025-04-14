import { AboutHero } from "@/components/about-hero"
import { AboutMission } from "@/components/about-mission"
import { AboutTeam } from "@/components/about-team"
import { AboutValues } from "@/components/about-values"
import { AboutHistory } from "@/components/about-history"
import { AboutLocation } from "@/components/about-location"
import { AboutCta } from "@/components/about-cta"

export const metadata = {
  title: "About Us | PayaMotors - Premium Car Dealership",
  description:
    "Learn about PayaMotors, Kenya's premier car dealership offering quality vehicles at competitive prices.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutHero />
      <main className="flex-1">
        <AboutMission />
        <AboutValues />
        <AboutHistory />
        <AboutTeam />
        <AboutLocation />
        <AboutCta />
      </main>
    </div>
  )
}
