import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div
        className="h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
      >
        <div className="container relative z-20 flex h-full flex-col items-start justify-center gap-4 text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">Find Your Dream Car</h1>
          <p className="max-w-[600px] text-lg sm:text-xl md:text-2xl text-white/90">
            Browse our extensive collection of premium vehicles at competitive prices in Kenya.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/cars">Browse Cars</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
