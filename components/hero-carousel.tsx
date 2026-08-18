"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Earn ASH Coins",
    subtitle: "Get 10 coins per Rs 278 spent. Use them for 10% off your next order!",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=400&fit=crop",
    cta: "Start Earning",
    bgColor: "from-amber-500/20 to-orange-500/5",
  },
  {
    id: 2,
    title: "New Electronics",
    subtitle: "Discover the latest tech gadgets + earn 2x coins",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&h=400&fit=crop",
    cta: "Explore",
    bgColor: "from-accent/20 to-accent/5",
  },
  {
    id: 3,
    title: "Member Rewards",
    subtitle: "Join ASH MART rewards - Bronze, Silver & Gold tiers!",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=400&fit=crop",
    cta: "Learn More",
    bgColor: "from-primary/20 to-primary/5",
  },
  {
    id: 4,
    title: "Flash Sale",
    subtitle: "Up to 50% off + double coins on all deals today!",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&h=400&fit=crop",
    cta: "Shop Deals",
    bgColor: "from-red-500/10 to-orange-500/10",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative">
      <div className="relative h-[300px] overflow-hidden md:h-[400px] lg:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}
            />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto max-w-[1500px] px-4 w-full">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-lg text-foreground/80 md:text-xl">
                    {slide.subtitle}
                  </p>
                  <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 bg-card/80 text-foreground hover:bg-card"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 bg-card/80 text-foreground hover:bg-card"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-6 bg-accent"
                : "bg-card/60 hover:bg-card"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Fade gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
