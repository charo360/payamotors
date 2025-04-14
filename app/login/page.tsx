import Link from "next/link"
import { UserLoginForm } from "@/components/user-login-form"

export default function UserLoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login to Your Account</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <UserLoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Register
          </Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Dealership staff?{" "}
          <Link href="/admin/login" className="underline underline-offset-4 hover:text-primary">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  )
}
