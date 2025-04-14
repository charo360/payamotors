import Image from "next/image"
import { Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutTeam() {
  const team = [
    {
      name: "David Kamau",
      role: "Founder & CEO",
      bio: "With over 20 years in the automotive industry, David founded PayaMotors with a vision to transform car buying in Kenya.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      name: "Sarah Omondi",
      role: "Sales Director",
      bio: "Sarah leads our sales team with her extensive knowledge of the automotive market and commitment to customer satisfaction.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      name: "Michael Njoroge",
      role: "Operations Manager",
      bio: "Michael ensures that our operations run smoothly, from vehicle acquisition to delivery and after-sales service.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      name: "Grace Wanjiku",
      role: "Customer Relations",
      bio: "Grace is dedicated to ensuring every customer has an exceptional experience with PayaMotors from start to finish.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            The passionate professionals behind PayaMotors' success
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={member.social.linkedin} aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={member.social.twitter} aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={member.social.facebook} aria-label="Facebook">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
