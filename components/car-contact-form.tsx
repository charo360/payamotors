"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { CheckCircle2, Phone, Mail, MessageCircle } from "lucide-react"

interface CarContactFormProps {
  carId: string
}

export function CarContactForm({ carId }: CarContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      })
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-6">
        <div className="rounded-full bg-primary/10 p-2 text-primary mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-4">
          Your message has been sent successfully. Our team will get back to you shortly.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Direct contact options */}
      <div className="space-y-3 border-b pb-6">
        <h3 className="text-sm font-medium">Contact us directly:</h3>

        <div className="grid grid-cols-1 gap-2">
          <Button asChild className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700">
            <a
              href={`https://wa.me/254745290484?text=Hello, I'm interested in car ID: ${carId} listed on your website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span>WhatsApp +254745290484</span>
            </a>
          </Button>

          <Button asChild className="w-full flex items-center justify-center">
            <a href="tel:+254745290484" className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>Call +254745290484</span>
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full flex items-center justify-center">
            <a
              href={`mailto:sales@payamotors.co.ke?subject=Inquiry about Car ID: ${carId}&body=Hello, I'm interested in car ID: ${carId} listed on your website.`}
              className="flex items-center"
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>Email sales@payamotors.co.ke</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Contact form */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Or fill out this form:</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="carId" value={carId} />

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={`I'm interested in car ID: ${carId} and would like more information.`}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  )
}
