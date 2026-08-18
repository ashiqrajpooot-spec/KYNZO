"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Plus, ArrowLeftRight, ShoppingCart, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatINR } from "@/lib/currency"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { Product, products } from "@/lib/products"
import { toast } from "@/hooks/use-toast"

export function CompareProducts() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const { addItem } = useCart()

  const addToCompare = (product: Product) => {
    if (selectedProducts.length >= 3) {
      toast({
        title: "Compare limit reached",
        description: "You can compare up to 3 products at a time",
        variant: "destructive",
      })
      return
    }
    if (selectedProducts.find((p) => p.id === product.id)) {
      return
    }
    setSelectedProducts((prev) => [...prev, product])
  }

  const removeFromCompare = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    })
    toast({
      title: "Added to Cart",
      description: `${product.name.slice(0, 40)}... added to cart`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 left-4 z-50 shadow-lg flex items-center gap-2"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Compare ({selectedProducts.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Compare Products
          </DialogTitle>
        </DialogHeader>

        {selectedProducts.length === 0 ? (
          <div className="py-12 text-center">
            <ArrowLeftRight className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No products to compare</p>
            <p className="text-sm text-muted-foreground mb-4">
              Browse products and click &quot;Compare&quot; to add them here
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-lg mx-auto">
              {products.slice(0, 4).map((product) => (
                <Button
                  key={product.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addToCompare(product)}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  {selectedProducts.map((product) => (
                    <th key={product.id} className="p-2 min-w-[200px]">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => removeFromCompare(product.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="relative h-32 w-full rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 text-sm font-medium">Name</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-2">
                      <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-2 text-sm font-medium">Price</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">
                          {formatINR(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatINR(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 text-sm font-medium">Rating</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-2">
                      <div className="flex items-center gap-1">
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
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-2 text-sm font-medium">Reviews</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-2 text-sm">
                      {product.reviews.toLocaleString()} reviews
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 text-sm font-medium">Category</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-2">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-2 text-sm font-medium">Free Delivery</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-2">
                      {product.isPrime ? (
                        <div className="flex items-center gap-1 text-primary">
                          <Truck className="h-4 w-4" />
                          <span className="text-sm font-medium">Yes</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2"></td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-2">
                      <Button
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
