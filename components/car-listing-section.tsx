import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarCard } from "@/components/car-card"
import { ChevronRight } from "lucide-react"

export function CarListingSection() {
  // This would normally come from a database
  const latestCars = [
    {
      id: "5",
      title: "Volkswagen Tiguan",
      year: 2020,
      price: 3800000,
      mileage: 42000,
      location: "Kisumu",
      transmission: "Automatic",
      fuel: "Petrol",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "6",
      title: "Nissan X-Trail",
      year: 2019,
      price: 2900000,
      mileage: 55000,
      location: "Mombasa",
      transmission: "Automatic",
      fuel: "Diesel",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "7",
      title: "Toyota Prado",
      year: 2020,
      price: 6500000,
      mileage: 30000,
      location: "Nairobi",
      transmission: "Automatic",
      fuel: "Diesel",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Latest Arrivals</h2>
            <p className="text-muted-foreground mt-2">Check out our newest vehicles added to inventory</p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/cars" className="flex items-center">
              View All New Arrivals
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
