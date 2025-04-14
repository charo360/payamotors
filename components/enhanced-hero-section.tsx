"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EnhancedHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=800&width=1600",
      title: "Find Your Dream Car",
      subtitle: "Premium vehicles at competitive prices in Kenya",
    },
    {
      image: "/placeholder.svg?height=800&width=1600",
      title: "Luxury & Performance",
      subtitle: "Discover our collection of high-end vehicles",
    },
    {
      image: "/placeholder.svg?height=800&width=1600",
      title: "Affordable Options",
      subtitle: "Quality cars that fit your budget",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10" />
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-20 flex h-full flex-col items-start justify-center">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90">{slides[currentSlide].subtitle}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/cars">Browse Inventory</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact" className="flex items-center">
                <span>Contact Us</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Search */}
        <div className="mt-12 w-full max-w-4xl rounded-lg bg-background/95 backdrop-blur-sm p-6 shadow-lg">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Quick Search</h2>
            <p className="text-muted-foreground">Find your perfect car in seconds</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Make</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Model</SelectItem>
                  <SelectItem value="land-cruiser">Land Cruiser</SelectItem>
                  <SelectItem value="c-class">C-Class</SelectItem>
                  <SelectItem value="x5">X5</SelectItem>
                  <SelectItem value="q7">Q7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Price</SelectItem>
                  <SelectItem value="1000000-3000000">KES 1M - 3M</SelectItem>
                  <SelectItem value="3000000-5000000">KES 3M - 5M</SelectItem>
                  <SelectItem value="5000000-10000000">KES 5M - 10M</SelectItem>
                  <SelectItem value="10000000+">KES 10M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button className="w-full h-10">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
