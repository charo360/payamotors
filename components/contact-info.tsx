import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactInfo() {
  const locations = [
    {
      name: "PayaMotors Showroom",
      address: "Nairobi, Kenya",
      phone: "+254745290484",
      whatsapp: "+254745290484",
      email: "sales@payamotors.co.ke",
      hours: [
        { days: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
        { days: "Saturday", time: "9:00 AM - 5:00 PM" },
        { days: "Sunday", time: "By Appointment" },
      ],
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {locations.map((location, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{location.name}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <Link href={`tel:${location.phone}`} className="hover:underline">
                  {location.phone}
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <Link
                  href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, '')}?text=Hello, I'm interested in your cars.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp {location.whatsapp}
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <Link
                  href={`mailto:${location.email}`}
                  className="hover:underline"
                >
                  {location.email}
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {location.hours.map((schedule, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2">
                      <span className="font-medium">{schedule.days}</span>
                      <span>{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
