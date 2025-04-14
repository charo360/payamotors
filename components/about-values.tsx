import { Shield, Heart, Users, Lightbulb } from "lucide-react"

export function AboutValues() {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We operate with complete transparency and honesty in every interaction, ensuring our customers can trust us completely.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Our team shares a genuine passion for automobiles and delivering exceptional service to our customers.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "We put our customers at the center of everything we do, tailoring our services to meet their unique needs.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously seek new ways to improve our services and stay ahead of industry trends and technologies.",
    },
  ]

  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            The principles that guide everything we do at PayaMotors
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
