"use client"

import { useState, useEffect } from "react"
import { Coins, Gift, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCoins } from "@/lib/coins-context"

export function WelcomeReward() {
  const [open, setOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { coins } = useCoins()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const hasSeenWelcome = localStorage.getItem("ashmart-welcome-seen")
    if (!hasSeenWelcome && coins === 500) {
      const timer = setTimeout(() => {
        setOpen(true)
        localStorage.setItem("ashmart-welcome-seen", "true")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [coins, isClient])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="sr-only">Welcome Bonus</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center animate-bounce">
            <Gift className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to ASH MART!</h2>
          <p className="text-muted-foreground mb-4">
            We&apos;ve gifted you a welcome bonus to get started!
          </p>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="h-8 w-8 text-amber-500" />
              <span className="text-4xl font-bold text-amber-600">500</span>
            </div>
            <p className="text-sm text-amber-700 font-medium">ASH Coins</p>
            <p className="text-xs text-muted-foreground mt-1">= Rs 1,390 value</p>
          </div>

          <div className="space-y-2 text-sm text-left bg-muted/50 rounded-lg p-4">
            <p className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              What you can do with ASH Coins:
            </p>
            <ul className="space-y-1 text-muted-foreground ml-6">
              <li>Get up to 10% off at checkout</li>
              <li>Redeem for free shipping</li>
              <li>Earn more coins with every purchase!</li>
            </ul>
          </div>

          <Button 
            className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => setOpen(false)}
          >
            Start Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
