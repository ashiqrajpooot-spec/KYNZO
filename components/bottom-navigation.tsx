"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Package, User, Store } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't show on seller routes
  if (pathname?.startsWith("/seller") || pathname?.startsWith("/admin")) {
    return null
  }

  if (!isClient) {
    return null
  }

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname?.startsWith(path)
  }

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ShoppingBag, label: "Categories", href: "/search" },
    { icon: Package, label: "Orders", href: "/orders" },
    { icon: Store, label: "Sell", href: "/sell" },
    { icon: User, label: "Account", href: "/account" },
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
      </div>
    </nav>
  )
}
