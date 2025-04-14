"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Trash2, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

export function AdminCarList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteCarId, setDeleteCarId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // This would normally come from a database
  const cars = [
    {
      id: "1",
      title: "Toyota Land Cruiser",
      year: 2022,
      price: 8500000,
      location: "Nairobi",
      status: "Available",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "2",
      title: "Mercedes-Benz C200",
      year: 2021,
      price: 5200000,
      location: "Mombasa",
      status: "Available",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "3",
      title: "BMW X5",
      year: 2020,
      price: 6800000,
      location: "Nairobi",
      status: "Sold",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "4",
      title: "Audi Q7",
      year: 2021,
      price: 7200000,
      location: "Nairobi",
      status: "Available",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "5",
      title: "Volkswagen Tiguan",
      year: 2020,
      price: 3800000,
      location: "Kisumu",
      status: "Available",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteCar = (id: string) => {
    setDeleteCarId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the car from the database
    toast({
      title: "Car deleted",
      description: `Car ID: ${deleteCarId} has been deleted.`,
    })
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Car Listings</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Car
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Price (KES)</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <div className="relative h-16 w-24">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{car.title}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.price.toLocaleString()}</TableCell>
                <TableCell>{car.location}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      car.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {car.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteCar(car.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this car?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the car listing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
