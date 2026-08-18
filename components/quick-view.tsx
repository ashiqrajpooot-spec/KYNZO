"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Truck, Heart, ShoppingCart, Minus, Plus, Share2, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatINR } from "@/lib/currency"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCoins } from "@/lib/coins-context"
import { toast } from "@/hooks/use-toast"

interface QuickViewProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { dollarsToCoins } = useCoins()

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const coinsEarned = dollarsToCoins(product.price * quantity)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
      })
    }
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name.slice(0, 40)}${product.name.length > 40 ? "..." : ""}`,
    })
    onOpenChange(false)
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} on ASH MART!`,
        url: window.location.href,
      })
    } catch {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                {product.badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="absolute right-3 top-3">
                -{discount}% OFF
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold leading-tight">{product.name}</h2>
            
            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-primary font-medium">
                {product.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <Separator className="my-4" />

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  You save {formatINR(product.originalPrice! - product.price)} ({discount}%)
                </p>
              )}
            </div>

            {/* Coins Reward */}
            <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
              <Coins className="h-5 w-5 text-amber-500" />
              <span className="text-sm">
                Earn <span className="font-bold text-amber-600">{coinsEarned}</span> ASH Coins with this purchase!
              </span>
            </div>

            {/* Prime */}
            {product.isPrime && (
              <div className="mt-3 flex items-center gap-2 text-primary">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-semibold">FREE Delivery Tomorrow</span>
              </div>
            )}

            <Separator className="my-4" />

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                In Stock - Ships within 24 hours
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                30-Day Money Back Guarantee
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                1-Year Warranty Included
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
