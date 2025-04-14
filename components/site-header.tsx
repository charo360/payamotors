"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Menu, ShoppingCart, User, LogIn, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Car className="h-6 w-6" />
          <span>PayaMotors</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex md:gap-4">
            <Link
              href="/"
              className={`text-sm font-medium ${pathname === "/" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
            >
              Home
            </Link>
            <Link
              href="/cars"
              className={`text-sm font-medium ${pathname === "/cars" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
            >
              Cars
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${pathname === "/about" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${pathname === "/contact" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
            >
              Contact
            </Link>
          </div>
          <ThemeToggle />

          {user ? (
            // User is logged in
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/favorites">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Favorites</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  await logout()
                  toast({
                    title: "Logged out",
                    description: "You have been logged out successfully",
                  })
                }}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : (
            // User is not logged in
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className={`text-sm font-medium ${pathname === "/" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                >
                  Home
                </Link>
                <Link
                  href="/cars"
                  className={`text-sm font-medium ${pathname === "/cars" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                >
                  Cars
                </Link>
                <Link
                  href="/about"
                  className={`text-sm font-medium ${pathname === "/about" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`text-sm font-medium ${pathname === "/contact" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                >
                  Contact
                </Link>

                {user ? (
                  // User is logged in - show dashboard/admin link
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
                  </Link>
                ) : (
                  // User is not logged in - show login link
                  <Link
                    href="/login"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Login / Register
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
