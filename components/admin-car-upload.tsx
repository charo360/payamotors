"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function AdminCarUpload() {
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Car uploaded successfully",
        description: "Your car listing has been published.",
      })
      // Reset form
      setImages([])
      e.currentTarget.reset()
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Upload New Car</h2>
        <p className="text-muted-foreground">Add a new car listing to your inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Car Images</h3>
            <p className="text-sm text-muted-foreground">Upload high-quality images of the car (maximum 10 images)</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-md border">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Car image ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {images.length < 10 && (
              <div className="flex aspect-video items-center justify-center rounded-md border border-dashed">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Upload</span>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Car Title</Label>
            <Input id="title" placeholder="e.g. Toyota Land Cruiser 2022" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (KES)</Label>
            <Input id="price" type="number" placeholder="e.g. 8500000" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Select required>
              <SelectTrigger id="make">
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="subaru">Subaru</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input id="model" placeholder="e.g. Land Cruiser" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" type="number" placeholder="e.g. 2022" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage (KM)</Label>
            <Input id="mileage" type="number" placeholder="e.g. 15000" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transmission">Transmission</Label>
            <Select required>
              <SelectTrigger id="transmission">
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel">Fuel Type</Label>
            <Select required>
              <SelectTrigger id="fuel">
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body-type">Body Type</Label>
            <Select required>
              <SelectTrigger id="body-type">
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="pickup">Pickup</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
                <SelectItem value="convertible">Convertible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Exterior Color</Label>
            <Input id="color" placeholder="e.g. Pearl White" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interior-color">Interior Color</Label>
            <Input id="interior-color" placeholder="e.g. Black Leather" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="engine">Engine</Label>
            <Input id="engine" placeholder="e.g. 4.5L V8 Twin-Turbo" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g. Nairobi" required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Detailed description of the car..." rows={5} required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              placeholder="360-degree camera
Adaptive cruise control
Blind spot monitoring
Lane departure warning
Sunroof
Navigation system"
              rows={5}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Car"}
        </Button>
      </form>
    </div>
  )
}
