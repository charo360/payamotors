import { Shield, Award, ThumbsUp, Clock } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every vehicle undergoes a comprehensive 150-point inspection before listing",
    },
    {
      icon: Award,
      title: "Certified Vehicles",
      description: "All our cars come with verified history reports and proper documentation",
    },
    {
      icon: ThumbsUp,
      title: "Customer Satisfaction",
      description: "We pride ourselves on exceptional service and after-sales support",
    },
    {
      icon: Clock,
      title: "Flexible Financing",
      description: "Competitive financing options tailored to fit your budget and needs",
    },
  ]

  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose PayaMotors</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            We're committed to providing the best car buying experience in Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
