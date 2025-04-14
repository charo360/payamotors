import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall, Car } from "lucide-react"

export function AboutCta() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 shadow-lg text-primary-foreground text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experience the PayaMotors Difference</h2>
          <p className="text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
            Visit our showroom today and discover why we're Kenya's premier car dealership. Our team is ready to help
            you find your perfect vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/contact" className="flex items-center">
                <PhoneCall className="h-5 w-5" />
                <span className="ml-2">Contact Us</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
              <Link href="/cars" className="flex items-center">
                <Car className="h-5 w-5" />
                <span className="ml-2">Browse Inventory</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
