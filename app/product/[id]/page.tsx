"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { products } from "@/lib/products"
import { formatINR } from "@/lib/currency"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, Zap, ArrowRight } from "lucide-react"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addItem } = useCart()
  const { addItem: addWishlist, removeItem: removeWishlist, items: wishlistItems } = useWishlist()
  
  const product = products.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(wishlistItems.some((w) => w.id === product?.id))

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
    })
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      removeWishlist(product.id)
    } else {
      addWishlist(product)
    }
    setIsWishlisted(!isWishlisted)
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8 text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/search?q=${product.category}`} className="hover:text-foreground">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    {product.badge}
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                    -{discount}%
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="relative aspect-square bg-muted rounded-lg overflow-hidden hover:ring-2 ring-primary"
                  >
                    <Image
                      src={product.image}
                      alt={`View ${i}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">{formatINR(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xl line-through text-muted-foreground">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-lg font-semibold text-green-600">Save {discount}%</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 py-4 border-y">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Flash Deal Active</p>
                    <p className="text-xs text-muted-foreground">Limited time offer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over ₹4,175</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">100% Authentic</p>
                    <p className="text-xs text-muted-foreground">Seller certified</p>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">ASH MART Official Store</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">4.9 seller rating</span>
                      </div>
                    </div>
                    <Link href="/seller/123">
                      <Button variant="outline" size="sm">View Store</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-muted"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleWishlist}
                    variant={isWishlisted ? "default" : "outline"}
                    size="lg"
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t pt-12">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((prod) => (
                  <Link key={prod.id} href={`/product/${prod.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative aspect-square">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <p className="font-semibold text-sm line-clamp-2 mb-2">{prod.name}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-primary">{formatINR(prod.price)}</span>
                          {prod.originalPrice && (
                            <span className="text-xs line-through text-muted-foreground">
                              {formatINR(prod.originalPrice)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
