import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { ContactMap } from "@/components/contact-map"

export const metadata = {
  title: "Contact Us | PayaMotors - Premium Car Dealership",
  description: "Get in touch with PayaMotors. We're here to answer your questions and help you find your dream car.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContactHero />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ContactForm />
            <div className="space-y-12">
              <ContactInfo />
              <ContactMap />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
