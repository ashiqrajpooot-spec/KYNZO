"use client"

import {
  Smartphone,
  Shirt,
  Home,
  BookOpen,
  Dumbbell,
  Sparkles,
  Gamepad2,
  Car,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categoryIcons: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="h-8 w-8" />,
  shirt: <Shirt className="h-8 w-8" />,
  home: <Home className="h-8 w-8" />,
  book: <BookOpen className="h-8 w-8" />,
  dumbbell: <Dumbbell className="h-8 w-8" />,
  sparkles: <Sparkles className="h-8 w-8" />,
  "gamepad-2": <Gamepad2 className="h-8 w-8" />,
  car: <Car className="h-8 w-8" />,
}

const categories = [
  { name: "Electronics", icon: "smartphone", slug: "electronics", color: "bg-blue-500/10 text-blue-600" },
  { name: "Fashion", icon: "shirt", slug: "fashion", color: "bg-pink-500/10 text-pink-600" },
  { name: "Home & Kitchen", icon: "home", slug: "home-kitchen", color: "bg-amber-500/10 text-amber-600" },
  { name: "Books", icon: "book", slug: "books", color: "bg-emerald-500/10 text-emerald-600" },
  { name: "Sports", icon: "dumbbell", slug: "sports", color: "bg-red-500/10 text-red-600" },
  { name: "Beauty", icon: "sparkles", slug: "beauty", color: "bg-purple-500/10 text-purple-600" },
  { name: "Toys & Games", icon: "gamepad-2", slug: "toys", color: "bg-orange-500/10 text-orange-600" },
  { name: "Automotive", icon: "car", slug: "automotive", color: "bg-slate-500/10 text-slate-600" },
]

interface CategoryGridProps {
  onCategorySelect?: (category: string) => void
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const handleCategoryClick = (slug: string) => {
    if (onCategorySelect) {
      onCategorySelect(slug)
    }
    // Scroll to products section
    const productsSection = document.getElementById("products")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1500px] px-4">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className="text-left"
            >
              <Card className="group cursor-pointer border-border/50 transition-all hover:border-primary hover:shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div
                    className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full ${category.color} transition-transform group-hover:scale-110`}
                  >
                    {categoryIcons[category.icon]}
                  </div>
                  <span className="text-center text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
