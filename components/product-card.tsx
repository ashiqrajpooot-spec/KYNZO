"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Truck, Heart, Eye, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCoins } from "@/lib/coins-context"
import { Product } from "@/lib/products"
import { toast } from "@/hooks/use-toast"
import { formatINR } from "@/lib/currency"
import { QuickView } from "./quick-view"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { rupeesToCoins } = useCoins()
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const coinsEarned = rupeesToCoins(product.price * 278)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    })
    toast({
      title: "Added to Cart",
      description: `${product.name.slice(0, 50)}${product.name.length > 50 ? "..." : ""} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleWishlist(product)
    toast({
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: inWishlist
        ? "Item removed from your wishlist"
        : "Item saved to your wishlist",
    })
  }

  return (
    <>
      <Link href={`/product/${product.id}`}>
        <Card className="group overflow-hidden border-border/50 transition-all hover:shadow-lg hover:border-border cursor-pointer">
          <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.badge && (
            <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground">
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute right-2 top-2"
            >
              -{discount}%
            </Badge>
          )}
          
          {/* Hover Actions */}
          <div className="absolute right-2 top-12 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full shadow-md"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${
                  inWishlist ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full shadow-md"
              onClick={() => setQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight text-foreground">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Coins Earned */}
          <div className="mt-1 flex items-center gap-1 text-amber-600">
            <Coins className="h-3 w-3" />
            <span className="text-xs font-medium">Earn {coinsEarned} coins</span>
          </div>

          {/* Prime Badge */}
          {product.isPrime && (
            <div className="mt-2 flex items-center gap-1 text-primary">
              <Truck className="h-4 w-4" />
              <span className="text-xs font-semibold">FREE Delivery</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="mt-3 w-full bg-accent text-accent-foreground hover:bg-accent/90"
            size="sm"
          >
            Add to Cart
          </Button>
          </CardContent>
        </Card>
      </Link>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  )
}
