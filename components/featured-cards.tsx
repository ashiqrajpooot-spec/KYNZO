"use client"

import Image from "next/image"
import Link from "next/link"
import { Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredCards = [
  {
    title: "Gaming Accessories",
    subtitle: "Level up your setup",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop",
    link: "/?category=electronics",
    bonus: "2x Coins",
  },
  {
    title: "Spring Fashion",
    subtitle: "New arrivals daily",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    link: "/?category=fashion",
    bonus: "Earn 50+",
  },
  {
    title: "Home Refresh",
    subtitle: "Update your space",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop",
    link: "/?category=home-kitchen",
    bonus: "Extra 100",
  },
  {
    title: "Fitness Goals",
    subtitle: "Gear for every workout",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    link: "/?category=sports",
    bonus: "Bonus Deal",
  },
]

export function FeaturedCards() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1500px] px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCards.map((card) => (
            <Link key={card.title} href={card.link}>
              <Card className="group overflow-hidden border-border/50 transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {card.title}
                    </h3>
                    <Badge className="bg-amber-100 text-amber-700 text-xs flex items-center gap-1">
                      <Coins className="h-3 w-3" />
                      {card.bonus}
                    </Badge>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-primary hover:underline">
                    {card.subtitle}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
