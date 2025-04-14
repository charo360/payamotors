import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall, Mail } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 shadow-lg text-primary-foreground">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Find Your Dream Car?</h2>
              <p className="text-primary-foreground/90 mb-6 text-lg">
                Visit our showroom or contact us today to explore our premium selection of vehicles at competitive
                prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="gap-2">
                  <Link href="/contact" className="flex items-center">
                    <PhoneCall className="h-5 w-5" />
                    <span className="ml-2">Contact Us</span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                  <Link href="/cars" className="flex items-center">
                    <Mail className="h-5 w-5" />
                    <span className="ml-2">Request Info</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: "url('/placeholder.svg?height=400&width=600')" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
