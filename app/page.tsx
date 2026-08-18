"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedCards } from "@/components/featured-cards"
import { DealsSection } from "@/components/deals-section"
import { ProductGrid } from "@/components/product-grid"
import { PromoBanner } from "@/components/promo-banner"
import { Footer } from "@/components/footer"
import { FlashSaleBanner } from "@/components/flash-sale-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { WelcomeReward } from "@/components/welcome-reward"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Flash Sale Banner */}
      <FlashSaleBanner />
      
      <main className="pb-24 md:pb-0">
        {/* Hero Carousel */}
        <HeroCarousel />
        
        {/* Featured Cards - Overlapping the hero */}
        <div className="-mt-24 relative z-10">
          <FeaturedCards />
        </div>
        
        {/* Shop Stats */}
        <StatsSection />
        
        {/* Category Grid */}
        <CategoryGrid onCategorySelect={handleCategorySelect} />
        
        {/* Promo Banner */}
        <PromoBanner />
        
        {/* Deals Section */}
        <DealsSection />
        
        {/* Product Grid */}
        <ProductGrid 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory}
        />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top */}
      <ScrollToTop />
      
      {/* Welcome Reward Popup */}
      <WelcomeReward />
    </div>
  )
}
