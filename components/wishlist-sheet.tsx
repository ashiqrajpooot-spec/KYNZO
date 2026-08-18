"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { Heart, Trash2, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatINR } from "@/lib/currency"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

interface WishlistSheetProps {
  children: ReactNode
}

export function WishlistSheet({ children }: WishlistSheetProps) {
  const { items, removeItem, totalItems } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
    })
    toast({
      title: "Added to Cart",
      description: `${item.name.slice(0, 40)}... moved to cart`,
    })
  }

  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
      })
    })
    toast({
      title: "All Items Added",
      description: `${items.length} items moved to cart`,
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg" title="Wishlist">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            My Wishlist ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
              <p className="text-sm text-muted-foreground">
                Save items you love to buy them later
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="line-clamp-2 text-sm font-medium">
                        {item.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(item.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({item.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-semibold text-primary">
                          {formatINR(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatINR(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          className="flex-1"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleMoveAllToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
