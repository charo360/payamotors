import Link from "next/link"
import { AdminLoginForm } from "@/components/admin-login-form"

export default function AdminLoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access the admin dashboard</p>
        </div>
        <AdminLoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Authorized personnel only. Contact your administrator for access.
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Looking for customer login?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Customer Login
          </Link>
        </p>
      </div>
    </div>
  )
}
