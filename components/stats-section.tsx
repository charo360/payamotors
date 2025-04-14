import { Car, Users, Award, Calendar } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Car,
      value: "500+",
      label: "Vehicles Sold",
    },
    {
      icon: Users,
      value: "1,200+",
      label: "Happy Customers",
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: Calendar,
      value: "24/7",
      label: "Customer Support",
    },
  ]

  return (
    <section className="py-8 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <stat.icon className="h-8 w-8 mb-2 opacity-80" />
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-primary-foreground/80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
