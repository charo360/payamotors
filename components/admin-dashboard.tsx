"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, Grid, Users, Settings, LogOut } from "lucide-react"
import { AdminCarList } from "@/components/admin-car-list"
import { AdminCarUpload } from "@/components/admin-car-upload"
import { AdminSettings } from "@/components/admin-settings"
import { AdminUsers } from "@/components/admin-users"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("cars")
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!user) {
      router.push("/admin/login")
    } else if (!isAdmin()) {
      toast({
        title: "Access denied",
        description: "You do not have admin privileges",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [user, router, isAdmin])

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Car className="h-6 w-6" />
              <div className="flex flex-col">
                <span className="font-bold">PayaMotors Admin</span>
                {user && <span className="text-xs text-muted-foreground">{user.email}</span>}
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "cars"} onClick={() => setActiveTab("cars")}>
                  <button>
                    <Car />
                    <span>Cars</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "upload"} onClick={() => setActiveTab("upload")}>
                  <button>
                    <Grid />
                    <span>Upload Car</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "users"} onClick={() => setActiveTab("users")}>
                  <button>
                    <Users />
                    <span>Users</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
                  <button>
                    <Settings />
                    <span>Settings</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => {
                  logout().then(() => {
                    router.push("/admin/login")
                    toast({
                      title: "Logged out",
                      description: "You have been logged out successfully",
                    })
                  })
                }}>
                  <button>
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your car listings and website settings</p>
            </div>

            <div className="space-y-6">
              {activeTab === "cars" && <AdminCarList />}
              {activeTab === "upload" && <AdminCarUpload />}
              {activeTab === "users" && <AdminUsers />}
              {activeTab === "settings" && <AdminSettings />}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
