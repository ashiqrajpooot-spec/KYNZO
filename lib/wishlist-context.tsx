"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/lib/products"

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  toggleWishlist: (product: Product) => void
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("ashmart-wishlist")
      if (savedItems) {
        try {
          setItems(JSON.parse(savedItems))
        } catch (e) {
          console.error("[v0] Failed to parse saved wishlist:", e)
        }
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem("ashmart-wishlist", JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: string): boolean => {
    return items.some((item) => item.id === id)
  }

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const totalItems = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
