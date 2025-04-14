export function AboutHistory() {
  const milestones = [
    {
      year: "2008",
      title: "Humble Beginnings",
      description:
        "PayaMotors was founded with just 5 cars in a small lot in Nairobi, focusing on quality Japanese imports.",
    },
    {
      year: "2012",
      title: "Expansion",
      description:
        "Opened our first proper showroom in Nairobi CBD and expanded our inventory to include European luxury vehicles.",
    },
    {
      year: "2015",
      title: "Growth & Recognition",
      description:
        "Recognized as one of Kenya's fastest-growing car dealerships and opened a second location in Mombasa.",
    },
    {
      year: "2018",
      title: "Digital Transformation",
      description:
        "Launched our online platform, allowing customers to browse our inventory and schedule test drives online.",
    },
    {
      year: "2023",
      title: "Market Leader",
      description:
        "Celebrated 15 years in business and became Kenya's premier dealership with over 500 vehicles sold annually.",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Our Journey</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            From humble beginnings to becoming Kenya's premier car dealership
          </p>
        </div>

        <div className="relative border-l-2 border-primary/30 pl-8 ml-4 md:ml-8 space-y-12">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <span className="h-3 w-3 rounded-full bg-primary-foreground"></span>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  {milestone.year}
                </span>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
