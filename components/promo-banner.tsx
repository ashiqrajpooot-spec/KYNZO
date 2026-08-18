"use client"

import { Truck, Shield, RefreshCw, Headphones, Coins, Gift } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $25",
  },
  {
    icon: Coins,
    title: "Earn ASH Coins",
    description: "10 coins per $1 spent",
  },
  {
    icon: Gift,
    title: "10% Coin Discount",
    description: "Use coins at checkout",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected",
  },
]

export function PromoBanner() {
  return (
    <section className="border-y border-border bg-muted/50 py-6">
      <div className="mx-auto max-w-[1500px] px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
