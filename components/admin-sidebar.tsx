"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  Store,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const adminMenuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: Users,
    label: "Sellers",
    href: "/admin/sellers",
  },
  {
    icon: Store,
    label: "Vendors",
    href: "/admin/vendors",
  },
  {
    icon: ShoppingBag,
    label: "Products",
    href: "/admin/products",
  },
  {
    icon: TrendingUp,
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    icon: BarChart3,
    label: "Reports",
    href: "/admin/reports",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-40"
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:relative lg:z-0 lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="border-b border-sidebar-border p-6">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold hidden sm:inline">ASH MART</span>
            </Link>
            <p className="text-xs text-sidebar-foreground/60 mt-2">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {adminMenuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4 space-y-2">
            <div className="px-4 py-2 rounded-lg bg-sidebar-accent">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60">ashiq***@gmail.com</p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                localStorage.removeItem("ashmart-admin-auth")
                window.location.href = "/admin/login"
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
