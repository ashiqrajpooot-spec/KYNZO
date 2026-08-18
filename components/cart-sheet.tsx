"use client"

import { ReactNode, useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Check, ArrowLeft, Coins, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useCart } from "@/lib/cart-context"
import { useCoins } from "@/lib/coins-context"
import { formatINR } from "@/lib/currency"

interface CartSheetProps {
  children: ReactNode
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart()
  const coinsData = useCoins()
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart")
  const [isProcessing, setIsProcessing] = useState(false)
  const [earnedCoins, setEarnedCoins] = useState(0)

  const discountAmount = coinsData.applyDiscount ? coinsData.getDiscountAmount(totalPrice) : 0
  const coinsToSpend = coinsData.dollarsToCoins(discountAmount)
  const finalPrice = totalPrice - discountAmount
  const coinsEarnedFromPurchase = coinsData.dollarsToCoins(finalPrice)

  const handleCheckout = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    if (coinsData.applyDiscount && coinsToSpend > 0) {
      coinsData.spendCoins(coinsToSpend)
      coinsData.addTransaction({
        type: "spent",
        amount: coinsToSpend,
        description: `Used for 10% discount on order`,
      })
    }
    
    coinsData.addCoins(coinsEarnedFromPurchase)
      coinsData.addTransaction({
        type: "earned",
        amount: coinsEarnedFromPurchase,
        description: `Earned from purchase of ${formatINR(finalPrice)}`,
      })
    
    setEarnedCoins(coinsEarnedFromPurchase)
    setIsProcessing(false)
    setCheckoutStep("success")
    clearCart()
    coinsData.setApplyDiscount(false)
  }

  const resetCheckout = () => {
    setCheckoutStep("cart")
  }

  return (
    <Sheet onOpenChange={(open) => !open && resetCheckout()}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg" title="Shopping Cart">
        {checkoutStep === "cart" && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Shopping Cart ({totalItems} items)
              </SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Add items to get started
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-4 py-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
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
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto h-7 w-7 text-destructive"
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
                  {coinsData.coins > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-amber-500" />
                          <div>
                            <p className="text-sm font-medium">Use ASH Coins</p>
                            <p className="text-xs text-muted-foreground">
                              You have {coinsData.coins.toLocaleString()} coins ({coinsData.coins >= coinsData.dollarsToCoins(totalPrice * 0.1) ? "Save 10%!" : `$${(coinsData.coins / 100).toFixed(2)} value`})
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={coinsData.applyDiscount}
                          onCheckedChange={coinsData.setApplyDiscount}
                        />
                      </div>
                      {coinsData.applyDiscount && discountAmount > 0 && (
                        <div className="mt-2 pt-2 border-t border-amber-200">
                          <p className="text-sm text-green-600 font-medium">
                            Using {coinsToSpend.toLocaleString()} coins for -${discountAmount.toFixed(2)} discount!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatINR(totalPrice)}</span>
                    </div>
                    {coinsData.applyDiscount && discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          Coins Discount (10%)
                        </span>
                        <span>-{formatINR(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-primary">FREE</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatINR(finalPrice)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <Sparkles className="h-3 w-3" />
                      <span>Earn {coinsEarnedFromPurchase} ASH Coins with this purchase!</span>
                    </div>
                  </div>
                  <Button 
                    className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => setCheckoutStep("checkout")}
                  >
                    Proceed to Checkout
                  </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Free shipping on orders over ₹2,088
              </p>
                </div>
              </>
            )}
          </>
        )}

        {checkoutStep === "checkout" && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 mr-1"
                  onClick={() => setCheckoutStep("cart")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CreditCard className="h-5 w-5" />
                Checkout
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Shipping Address</h3>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Method</h3>
                  <div className="grid gap-3">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items ({totalItems})</span>
                      <span>{formatINR(totalPrice)}</span>
                    </div>
                    {coinsData.applyDiscount && discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          ASH Coins Discount
                        </span>
                        <span>-{formatINR(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-primary">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatINR(finalPrice * 0.08)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Order Total</span>
                      <span>{formatINR(finalPrice * 1.08)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      <Gift className="h-3 w-3" />
                      <span>You&apos;ll earn {coinsEarnedFromPurchase} ASH Coins!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>Place Order - {formatINR(finalPrice * 1.08)}</>
                )}
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                By placing your order, you agree to ASH MART&apos;s terms and conditions
              </p>
            </div>
          </>
        )}

        {checkoutStep === "success" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center px-4">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Order Placed Successfully!</h3>
              <p className="text-muted-foreground">
                Thank you for shopping with ASH MART. Your order has been confirmed and will be shipped soon.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 w-full">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span className="font-semibold text-amber-700">Coins Earned!</span>
              </div>
              <p className="text-3xl font-bold text-amber-600">+{earnedCoins}</p>
              <p className="text-xs text-amber-600 mt-1">ASH Coins added to your account</p>
            </div>
            
            <div className="bg-muted rounded-lg p-4 w-full">
              <p className="text-sm font-medium">Order Number</p>
              <p className="text-lg font-mono font-bold text-primary">
                ASH-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetCheckout}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
