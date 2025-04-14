import Image from "next/image"

export function AboutMission() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At PayaMotors, our mission is to revolutionize the car buying experience in Kenya by providing exceptional
              quality vehicles, transparent pricing, and unmatched customer service.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We believe that purchasing a car should be an exciting and stress-free experience. That's why we've built
              our business around honesty, integrity, and a genuine passion for automobiles.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you're looking for a family SUV, a luxury sedan, or a reliable commuter vehicle, our team is
              dedicated to helping you find the perfect car that meets your needs and exceeds your expectations.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="PayaMotors showroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
