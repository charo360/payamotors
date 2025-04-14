import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  // Server-side authentication check
  // This is a simple check - in a real app, you would verify the session token with Firebase Admin SDK
  const cookieStore = cookies()
  const authCookie = cookieStore.get('firebase-auth-token')

  // If no auth cookie is present, redirect to login
  if (!authCookie) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
