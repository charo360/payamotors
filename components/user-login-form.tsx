"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { db, auth } from "@/lib/firebase"

export function UserLoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { signIn, user } = useAuth()

  // If user is already logged in, redirect to appropriate page
  if (user) {
    if (user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Sign in with Firebase
      const userCredential = await signIn(email, password)

      // Check user role
      const user = userCredential.user

      // Get user data from Firestore to check role
      const userDoc = doc(db, 'users', user.uid)
      const userSnapshot = await getDoc(userDoc)

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data()

        if (userData.role === 'admin') {
          // User is an admin, redirect to admin dashboard
          router.push('/admin')
        } else {
          // User is a regular user, redirect to user dashboard
          router.push('/dashboard')
        }

        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        })
      } else {
        // User exists in Auth but not in Firestore
        // Create a user document with default role
        await setDoc(userDoc, {
          email: user.email,
          role: 'user',
          createdAt: new Date().toISOString(),
        })

        router.push('/dashboard')
        toast({
          title: 'Login successful',
          description: 'Welcome to your account!',
        })
      }
    } catch (error: any) {
      setIsLoading(false)
      setError(error.message || 'Failed to login')
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid credentials',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</Button>
        </div>
      </form>
    </div>
  )
}
