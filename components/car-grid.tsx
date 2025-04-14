import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { CarCard } from "@/components/car-card"

export function CarGrid() {
  // This would normally come from a database with filters applied
  const cars = [
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
    {
      id: "8",
      title: "Honda CR-V",
      year: 2019,
      price: 3200000,
      mileage: 48000,
      location: "Nakuru",
      transmission: "Automatic",
      fuel: "Petrol",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "9",
      title: "Subaru Forester",
      year: 2018,
      price: 2800000,
      mileage: 65000,
      location: "Eldoret",
      transmission: "Automatic",
      fuel: "Petrol",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">Showing {cars.length} cars</p>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  )
}
