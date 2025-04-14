"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CarFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [yearRange, setYearRange] = useState([2010, 2023])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by make, model..." />
        </div>

        <div className="space-y-2">
          <Label>Price Range (KES)</Label>
          <div className="pt-4">
            <Slider defaultValue={priceRange} max={10000000} step={100000} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">KES {priceRange[0].toLocaleString()}</span>
              <span className="text-sm">KES {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Year</Label>
          <div className="pt-4">
            <Slider defaultValue={yearRange} min={2000} max={2023} step={1} onValueChange={setYearRange} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">{yearRange[0]}</span>
              <span className="text-sm">{yearRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Select>
            <SelectTrigger id="make">
              <SelectValue placeholder="Any Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Make</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="audi">Audi</SelectItem>
              <SelectItem value="volkswagen">Volkswagen</SelectItem>
              <SelectItem value="nissan">Nissan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body-type">Body Type</Label>
          <Select>
            <SelectTrigger id="body-type">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="pickup">Pickup</SelectItem>
              <SelectItem value="van">Van</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select>
            <SelectTrigger id="transmission">
              <SelectValue placeholder="Any Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Transmission</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuel">Fuel Type</Label>
          <Select>
            <SelectTrigger id="fuel">
              <SelectValue placeholder="Any Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Fuel Type</SelectItem>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}
