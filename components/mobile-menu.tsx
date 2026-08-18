"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Search, ShoppingBag, Store, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: ShoppingBag, label: "Orders", href: "/orders" },
    { icon: Store, label: "Sellers", href: "/sellers" },
    { icon: User, label: "Account", href: "/account" },
  ]

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 bg-background border-b border-border">
          <div className="flex flex-col p-4 space-y-2">
            {menuItems.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href="/seller/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-colors"
            >
              <Store className="w-5 h-5" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
