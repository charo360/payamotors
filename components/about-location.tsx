import { MapPin, Clock, Phone, Mail } from "lucide-react"

export function AboutLocation() {
  const locations = [
    {
      name: "Nairobi Showroom",
      address: "123 Mombasa Road, Nairobi, Kenya",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM",
      phone: "+254 700 123 456",
      email: "nairobi@payamotors.co.ke",
      mapUrl: "https://maps.google.com",
    },
    {
      name: "Mombasa Branch",
      address: "456 Nyali Road, Mombasa, Kenya",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM",
      phone: "+254 700 789 012",
      email: "mombasa@payamotors.co.ke",
      mapUrl: "https://maps.google.com",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Visit Our Showrooms</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Experience our premium selection of vehicles in person
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {locations.map((location, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.277444357776!2d36.8222!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d8eeeaee15%3A0xd82a0f93a0d97d6f!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.name}`}
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{location.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{location.hours}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{location.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
