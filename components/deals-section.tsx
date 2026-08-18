"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, Coins, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "./product-card"
import { dealProducts } from "@/lib/products"
import { useCoins } from "@/lib/coins-context"

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds -= 1
        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }
        if (minutes < 0) {
          minutes = 59
          hours -= 1
        }
        if (hours < 0) {
          hours = 23
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return `${String(timeLeft.hours).padStart(2, "0")}:${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`
}

export function DealsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const countdown = useCountdown()
  const { coins } = useCoins()

  const memberTier = coins < 1000 ? "Bronze" : coins < 5000 ? "Silver" : "Gold"
  const tierColor = coins < 1000 ? "bg-orange-100 text-orange-700" : coins < 5000 ? "bg-gray-100 text-gray-700" : "bg-amber-100 text-amber-700"

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="deals" className="bg-card py-8">
      <div className="mx-auto max-w-[1500px] px-4">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold text-foreground">
              Today&apos;s Deals
            </h2>
            <div className="flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-destructive">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Ends in {countdown}</span>
            </div>
            <Badge className={`${tierColor} flex items-center gap-1`}>
              <Sparkles className="h-3 w-3" />
              {memberTier} Member - 2x Coins on Deals!
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {dealProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] max-w-[200px] flex-shrink-0 sm:min-w-[240px] sm:max-w-[240px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
