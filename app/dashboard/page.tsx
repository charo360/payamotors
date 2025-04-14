"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-medium">Account Type:</span> {user.role === "admin" ? "Administrator" : "Customer"}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Saved Cars</CardTitle>
            <CardDescription>Cars you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You haven't saved any cars yet.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/cars")}>Browse Cars</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inquiries</CardTitle>
            <CardDescription>Your recent inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You haven't made any inquiries yet.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/contact")}>Contact Us</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}
