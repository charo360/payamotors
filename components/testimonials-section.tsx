import Image from "next/image"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Kamau",
      role: "Business Owner",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "PayaMotors made buying my Mercedes-Benz a seamless experience. Their team was professional and helped me find exactly what I was looking for.",
      rating: 5,
    },
    {
      name: "Sarah Ochieng",
      role: "Doctor",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "I was impressed by the quality of vehicles and the excellent customer service. The financing options they offered were very competitive.",
      rating: 5,
    },
    {
      name: "Michael Wanjiku",
      role: "Software Engineer",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "After visiting several dealerships, I found PayaMotors to be the most transparent and trustworthy. My BMW X5 has been running perfectly.",
      rating: 4,
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-muted-foreground flex-1">"{testimonial.content}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
