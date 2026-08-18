"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Filter,
  X,
  ChevronDown,
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { products, categories } from "@/lib/products"
import { vendors, getVendorById } from "@/lib/vendors"
import { formatINR } from "@/lib/currency"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = query === "" || 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      
      const matchesVendor = selectedVendors.length === 0 || 
        (product.vendorId && selectedVendors.includes(product.vendorId))
      
      return matchesQuery && matchesPrice && matchesVendor
    })
  }, [query, priceRange, selectedVendors])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.reverse()
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const toggleVendor = (vendorId: string) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    )
  }

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="mx-auto max-w-[1500px] px-4 py-4">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Search Results
          </h1>
          <p className="text-muted-foreground">
            {query && `Results for "${query}"`} • {sortedProducts.length} products found
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar - Filters */}
          <div
            className={`lg:col-span-1 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="space-y-6">
              {/* Close button for mobile */}
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Price Range */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Min</label>
                    <Input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Max</label>
                    <Input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Vendor Filter */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Vendors</h3>
                <div className="space-y-2">
                  {vendors.map((vendor) => (
                    <label
                      key={vendor.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedVendors.includes(vendor.id)}
                        onChange={() => toggleVendor(vendor.id)}
                        className="rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {vendor.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {vendor.rating}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedVendors.length > 0 ||
                priceRange.min !== 0 ||
                priceRange.max !== 1000) && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedVendors([])
                    setPriceRange({ min: 0, max: 1000 })
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Button
                variant="outline"
                className="lg:hidden gap-2"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => {
                  const vendor = product.vendorId
                    ? getVendorById(product.vendorId)
                    : null

                  return (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/product/${product.id}`}>
                        <div className="relative h-48 bg-muted overflow-hidden group">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                          {product.badge && (
                            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                              {product.badge}
                            </Badge>
                          )}
                          {product.isPrime && (
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                              Prime
                            </Badge>
                          )}
                        </div>
                      </Link>

                      <div className="p-4 space-y-3">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Vendor Info */}
                        {vendor && (
                          <Link
                            href={`/vendor/${vendor.id}`}
                            className="flex items-center gap-2 text-xs hover:text-primary"
                          >
                            <Image
                              src={vendor.logo}
                              alt={vendor.name}
                              width={20}
                              height={20}
                              className="h-5 w-5 rounded"
                            />
                            <span className="truncate">{vendor.name}</span>
                            {vendor.verified && (
                              <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                            )}
                          </Link>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">
                            {formatINR(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatINR(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your criteria
                </p>
                <Button variant="outline">Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
