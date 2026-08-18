"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { products, categories } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductGridProps {
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
}

export function ProductGrid({ selectedCategory, onCategoryChange }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || "all")
  const [visibleCount, setVisibleCount] = useState(12)

  // Sync with external selectedCategory prop
  useEffect(() => {
    if (selectedCategory && selectedCategory !== activeCategory) {
      setActiveCategory(selectedCategory)
      setVisibleCount(12)
    }
  }, [selectedCategory, activeCategory])

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug)
    setVisibleCount(12)
    if (onCategoryChange) {
      onCategoryChange(slug)
    }
  }

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory)

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  return (
    <section id="products" className="py-8">
      <div className="mx-auto max-w-[1500px] px-4">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {activeCategory === "all" 
              ? "Trending Products" 
              : categories.find(c => c.slug === activeCategory)?.name || "Products"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant="outline"
                size="sm"
                onClick={() => handleCategoryClick(category.slug)}
                className={cn(
                  "rounded-full",
                  activeCategory === category.slug &&
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                )}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => handleCategoryClick("all")}
            >
              View All Products
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                >
                  Load More Products
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
