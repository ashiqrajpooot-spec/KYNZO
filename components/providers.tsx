"use client"

import { ReactNode } from "react"
import { CartProvider } from "@/lib/cart-context"
import { CoinsProvider } from "@/lib/coins-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { SellerProvider } from "@/lib/seller-context"
import { ApprovalProvider } from "@/lib/seller-approval-context"
import { Toaster } from "@/components/ui/toaster"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SellerBottomNavigation } from "@/components/seller-bottom-navigation"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApprovalProvider>
      <SellerProvider>
        <CoinsProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
              <BottomNavigation />
              <SellerBottomNavigation />
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </CoinsProvider>
      </SellerProvider>
    </ApprovalProvider>
  )
}
