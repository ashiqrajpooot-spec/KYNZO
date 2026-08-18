"use client"

import { products } from "@/lib/products"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Users, Package, Star } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Package,
      label: "Total Products",
      value: products.length,
      color: "text-blue-600",
    },
    {
      icon: Users,
      label: "Active Sellers",
      value: 124,
      color: "text-green-600",
    },
    {
      icon: ShoppingCart,
      label: "Happy Customers",
      value: "50K+",
      color: "text-orange-600",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "4.6",
      color: "text-yellow-600",
    },
  ]

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
