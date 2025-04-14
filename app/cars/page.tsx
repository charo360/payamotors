import { CarFilters } from "@/components/car-filters"
import { CarGrid } from "@/components/car-grid"

export default function CarsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Our Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CarFilters />
        </div>
        <div className="md:col-span-3">
          <CarGrid />
        </div>
      </div>
    </div>
  )
}
