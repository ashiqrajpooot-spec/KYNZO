"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Settings, BarChart3, Package, Home } from "lucide-react"

export function SellerBottomNavigation() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only show authenticated seller navigation on seller app routes.
  if (!pathname?.startsWith("/seller") || pathname === "/seller/register" || pathname === "/seller/login") {
    return null
  }

  if (!isClient) {
    return null
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ashmart-seller")
      window.location.href = "/seller/login"
    }
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/seller/dashboard" },
    { icon: Package, label: "Products", href: "/seller/products" },
    { icon: BarChart3, label: "Analytics", href: "/seller/analytics" },
    { icon: Settings, label: "Settings", href: "/seller/settings" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 transition-colors ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs text-center">{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={24} />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </nav>
  )
}

