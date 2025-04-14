import Link from "next/link"
import { Calendar, MapPin, Fuel, GitFork, Gauge, Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CarContactForm } from "@/components/car-contact-form"
import { CarImageGallery } from "@/components/car-image-gallery"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  // This would normally come from a database
  const car = {
    id: params.id,
    title: "Toyota Land Cruiser",
    description:
      "The Toyota Land Cruiser is a series of four-wheel drive vehicles produced by the Japanese automobile manufacturer Toyota. It is Toyota's longest running series of models and the second longest-running SUV in production.",
    year: 2022,
    price: 8500000,
    mileage: 15000,
    location: "Nairobi",
    transmission: "Automatic",
    fuel: "Diesel",
    engine: "4.5L V8 Twin-Turbo",
    color: "Pearl White",
    interiorColor: "Black Leather",
    features: [
      "360-degree camera",
      "Adaptive cruise control",
      "Blind spot monitoring",
      "Lane departure warning",
      "Sunroof",
      "Navigation system",
      "Heated seats",
      "Bluetooth",
      "Apple CarPlay",
      "Android Auto",
      "Keyless entry",
      "Push button start",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    seller: {
      name: "PayaMotors",
      phone: "+254745290484",
      email: "sales@payamotors.co.ke",
    },
  }

  // Format price in KES with commas
  const formattedPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(car.price)

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
          <p className="text-muted-foreground mb-6">ID: {car.id}</p>

          <CarImageGallery images={car.images} />

          <Tabs defaultValue="details" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{car.transmission}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium">{car.fuel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Engine</p>
                  <p className="font-medium">{car.engine}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p className="font-medium">{car.color}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Interior Color</p>
                  <p className="font-medium">{car.interiorColor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{car.location}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="p-4 border rounded-md mt-2">
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="description" className="p-4 border rounded-md mt-2">
              <p>{car.description}</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-primary">{formattedPrice}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="h-5 w-5 text-muted-foreground" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                    <span>{car.fuel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{car.location}</span>
                </div>
                <div className="pt-4 space-y-3">
                  <p className="text-sm font-medium text-center">Contact PayaMotors:</p>

                  <Button asChild className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700">
                    <a
                      href={`https://wa.me/${car.seller.phone.replace(/[^0-9]/g, '')}?text=Hello, I'm interested in the ${car.title} (ID: ${car.id}) listed on your website.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      <span>WhatsApp</span>
                    </a>
                  </Button>

                  <Button asChild className="w-full flex items-center justify-center">
                    <a href={`tel:${car.seller.phone}`} className="flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>Call {car.seller.phone}</span>
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full flex items-center justify-center">
                    <a href={`mailto:${car.seller.email}?subject=Inquiry about ${car.title} (ID: ${car.id})&body=Hello, I'm interested in the ${car.title} (ID: ${car.id}) listed on your website.`} className="flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>Email {car.seller.email}</span>
                    </a>
                  </Button>

                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <Link href={`/contact?car=${car.id}`} className="flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>Contact Form</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
              <CarContactForm carId={car.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
