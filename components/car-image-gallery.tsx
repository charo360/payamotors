"use client"

import { useState } from "react"
import Image from "next/image"

interface CarImageGalleryProps {
  images: string[]
}

export function CarImageGallery({ images }: CarImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg border">
        <Image src={mainImage || "/placeholder.svg"} alt="Car" fill className="object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-video overflow-hidden rounded-md border ${
              mainImage === image ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image src={image || "/placeholder.svg"} alt={`Car view ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
