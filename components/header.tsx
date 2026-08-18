"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Menu,
  User,
  Heart,
  X,
  Coins,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { categories, products } from "@/lib/products"
import { formatINR } from "@/lib/currency"
import { CartSheet } from "./cart-sheet"
import { CoinsDisplay } from "./coins-display"
import { WishlistSheet } from "./wishlist-sheet"

const locations = [
  "New York, NY 10001",
  "Los Angeles, CA 90001",
  "Chicago, IL 60601",
  "Houston, TX 77001",
  "Phoenix, AZ 85001",
  "Philadelphia, PA 19101",
  "San Antonio, TX 78201",
  "San Diego, CA 92101",
]

export function Header() {
  const router = useRouter()
  const { totalItems } = useCart()
  const { totalItems: wishlistItems } = useWishlist()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("Select location")
  const [locationOpen, setLocationOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = products.filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "All" || 
          product.category === categories.find(c => c.name === selectedCategory)?.slug
        return matchesQuery && matchesCategory
      })
      setSearchResults(filtered.slice(0, 6))
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchQuery, selectedCategory])

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearchResults(false)
    }
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto max-w-[1500px] px-4">
          <div className="flex h-14 items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-primary-foreground">
                  ASH
                </span>
                <span className="text-2xl font-bold text-accent">MART</span>
              </div>
            </Link>

            {/* Delivery Location - Now a Dialog */}
            <Dialog open={locationOpen} onOpenChange={setLocationOpen}>
              <DialogTrigger asChild>
                <button className="hidden items-center gap-1 text-sm hover:outline hover:outline-1 hover:outline-sidebar-foreground/50 p-1 rounded lg:flex">
                  <MapPin className="h-4 w-4 text-sidebar-foreground/70" />
                  <div className="text-left">
                    <div className="text-xs text-sidebar-foreground/70">
                      Deliver to
                    </div>
                    <div className="font-semibold text-sidebar-foreground">
                      {selectedLocation}
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Choose your location</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Delivery options and speeds may vary for different locations
                  </p>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location)
                          setLocationOpen(false)
                        }}
                        className={`w-full rounded-md border p-3 text-left text-sm transition-colors hover:bg-muted ${
                          selectedLocation === location ? "border-primary bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {location}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <Input placeholder="Enter ZIP code" className="mb-2" />
                    <Button className="w-full">Apply</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Search Bar with Results */}
            <div className="flex flex-1 items-center relative" ref={searchRef}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="hidden h-10 rounded-r-none border-r bg-secondary text-secondary-foreground hover:bg-secondary/80 sm:flex"
                  >
                    {selectedCategory}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {categories.map((cat) => (
                    <DropdownMenuItem
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      {cat.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search ASH MART"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                  className="h-10 w-full rounded-none border-0 bg-card text-card-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setShowSearchResults(false)
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                size="icon"
                onClick={handleSearch}
                className="h-10 w-12 rounded-l-none bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setShowSearchResults(false)
                        router.push(`/search?q=${encodeURIComponent(product.name)}`)
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted text-left border-b last:border-b-0"
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-sm text-primary font-semibold">{formatINR(product.price)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {showSearchResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50 p-4 text-center text-muted-foreground">
                  No products found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1">
              {/* ASH Coins */}
              <CoinsDisplay />

              {/* Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden h-auto flex-col items-start p-2 text-sidebar-foreground hover:outline hover:outline-1 hover:outline-sidebar-foreground/50 hover:bg-transparent lg:flex"
                  >
                    <span className="text-xs">Hello, sign in</span>
                    <span className="flex items-center font-semibold">
                      Account & Lists
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-3">
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/account">Sign In</Link>
                    </Button>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      New customer?{" "}
                      <Link href="/account" className="text-primary hover:underline">
                        Start here
                      </Link>
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/account">Your Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Your Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account#wishlist">Your Wish List</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/deals">Your Recommendations</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Returns & Orders - Now a Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden h-auto flex-col items-start p-2 text-sidebar-foreground hover:outline hover:outline-1 hover:outline-sidebar-foreground/50 hover:bg-transparent lg:flex"
                  >
                    <span className="text-xs">Returns</span>
                    <span className="font-semibold">& Orders</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Your Orders</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="text-center py-8">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sign in to view your orders and track your purchases
                      </p>
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/orders">View Orders</Link>
                      </Button>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold mb-3">Need to return an item?</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        ASH MART offers free returns within 30 days of delivery for most items.
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/returns">Start a Return</Link>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Wishlist */}
              <WishlistSheet>
                <Button
                  variant="ghost"
                  className="relative p-2 text-sidebar-foreground hover:bg-transparent hover:outline hover:outline-1 hover:outline-sidebar-foreground/50"
                >
                  <Heart className="h-6 w-6" />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {wishlistItems}
                    </span>
                  )}
                </Button>
              </WishlistSheet>

              {/* Cart */}
              <CartSheet>
                <Button
                  variant="ghost"
                  className="relative h-auto p-2 text-sidebar-foreground hover:bg-transparent hover:outline hover:outline-1 hover:outline-sidebar-foreground/50"
                >
                  <ShoppingCart className="h-7 w-7" />
                  <span className="absolute -top-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {totalItems}
                  </span>
                  <span className="hidden font-semibold sm:inline">Cart</span>
                </Button>
              </CartSheet>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-sidebar/90 text-sidebar-foreground">
        <div className="mx-auto max-w-[1500px] px-4">
          <div className="flex h-10 items-center gap-4 overflow-x-auto scrollbar-hide">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-sm font-semibold text-sidebar-foreground hover:bg-transparent hover:outline hover:outline-1 hover:outline-sidebar-foreground/50"
                >
                  <Menu className="h-5 w-5" />
                  All
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-card p-0" title="Navigation Menu">
                <div className="bg-sidebar p-4">
                  <div className="flex items-center gap-2 text-sidebar-foreground">
                    <User className="h-8 w-8 rounded-full bg-sidebar-accent p-1" />
                    <span className="text-lg font-semibold">
                      Hello, Sign In
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-3 font-semibold">Shop By Category</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/?category=${cat.slug}`}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link
              href="/deals"
              className="whitespace-nowrap text-sm hover:underline"
            >
              Today&apos;s Deals
            </Link>
            <Link
              href="/help"
              className="whitespace-nowrap text-sm hover:underline"
            >
              Customer Service
            </Link>
            <Link
              href="/registry"
              className="whitespace-nowrap text-sm hover:underline"
            >
              Registry
            </Link>
            <Link
              href="/gift-cards"
              className="whitespace-nowrap text-sm hover:underline"
            >
              Gift Cards
            </Link>
            <Link
              href="/sell"
              className="whitespace-nowrap text-sm hover:underline"
            >
              Sell
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
