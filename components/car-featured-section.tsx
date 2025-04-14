import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarCard } from "@/components/car-card"
import { ChevronRight } from "lucide-react"

export function CarFeaturedSection() {
  // This would normally come from a database
  const featuredCars = [
    {
      id: "1",
      title: "Toyota Land Cruiser",
      year: 2022,
      price: 8500000,
      mileage: 15000,
      location: "Nairobi",
      transmission: "Automatic",
      fuel: "Diesel",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "2",
      title: "Mercedes-Benz C200",
      year: 2021,
      price: 5200000,
      mileage: 25000,
      location: "Mombasa",
      transmission: "Automatic",
      fuel: "Petrol",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "3",
      title: "BMW X5",
      year: 2020,
      price: 6800000,
      mileage: 35000,
      location: "Nairobi",
      transmission: "Automatic",
      fuel: "Diesel",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "4",
      title: "Audi Q7",
      year: 2021,
      price: 7200000,
      mileage: 18000,
      location: "Nairobi",
      transmission: "Automatic",
      fuel: "Petrol",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Vehicles</h2>
            <p className="text-muted-foreground mt-2">Explore our handpicked selection of premium vehicles</p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/cars" className="flex items-center">
              View All Vehicles
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
