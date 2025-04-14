import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Fuel, GitFork } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CarCardProps {
  car: {
    id: string
    title: string
    year: number
    price: number
    mileage: number
    location: string
    transmission: string
    fuel: string
    image: string
  }
}

export function CarCard({ car }: CarCardProps) {
  // Format price in KES with commas
  const formattedPrice = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(car.price)

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[4/3]">
        <Badge className="absolute top-2 right-2 z-10">Featured</Badge>
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-xl line-clamp-1">{car.title}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{car.year}</span>
          </div>
          <p className="text-2xl font-bold text-primary">{formattedPrice}</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{car.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/cars/${car.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" className="flex-1">
          <Link href={`/contact?car=${car.id}`}>Inquire</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
