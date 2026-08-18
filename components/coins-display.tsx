"use client"

import { useState, useEffect } from "react"
import { Coins, Gift, History, ChevronRight, Sparkles, Trophy, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatINR } from "@/lib/currency"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useCoins } from "@/lib/coins-context"
import { ScrollArea } from "@/components/ui/scroll-area"

const rewards = [
  { name: "Free Shipping", coins: 200, icon: "🚚" },
  { name: "Rs 1,390 Off", coins: 500, icon: "💰" },
  { name: "Rs 2,780 Off", coins: 1000, icon: "💎" },
  { name: "Mystery Box", coins: 1500, icon: "🎁" },
  { name: "VIP Status", coins: 5000, icon: "👑" },
]

const dailyChallenges = [
  { name: "Browse 5 Products", coins: 10, progress: 3, total: 5 },
  { name: "Add item to wishlist", coins: 5, progress: 1, total: 1, completed: true },
  { name: "Share a product", coins: 15, progress: 0, total: 1 },
  { name: "Write a review", coins: 50, progress: 0, total: 1 },
]

export function CoinsDisplay() {
  const { coins, transactions, coinsToDollars, addCoins, addTransaction } = useCoins()
  const [redeemingReward, setRedeemingReward] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleRedeemReward = (reward: typeof rewards[0]) => {
    if (coins >= reward.coins) {
      setRedeemingReward(reward.name)
      setTimeout(() => {
        addCoins(-reward.coins)
        addTransaction({
          type: "spent",
          amount: reward.coins,
          description: `Redeemed: ${reward.name}`,
        })
        setRedeemingReward(null)
      }, 1000)
    }
  }

  const nextTier = coins < 1000 ? "Silver" : coins < 5000 ? "Gold" : "Platinum"
  const tierProgress = coins < 1000 ? (coins / 1000) * 100 : coins < 5000 ? ((coins - 1000) / 4000) * 100 : 100

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hidden h-auto flex-col items-start p-2 text-sidebar-foreground hover:outline hover:outline-1 hover:outline-sidebar-foreground/50 hover:bg-transparent lg:flex"
        >
          <span className="text-xs flex items-center gap-1">
            <Coins className="h-3 w-3 text-amber-400" />
            ASH Coins
          </span>
          <span className="font-semibold text-amber-400">{isHydrated ? coins.toLocaleString() : "500"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-amber-500" />
            ASH MART Rewards
          </DialogTitle>
        </DialogHeader>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Your Balance</p>
              <p className="text-3xl font-bold">{coins.toLocaleString()}</p>
              <p className="text-sm opacity-75">= {formatINR(coinsToDollars(coins))} value</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {coins < 1000 ? "Bronze" : coins < 5000 ? "Silver" : "Gold"} Member
                </span>
              </div>
              <div className="w-24">
                <Progress value={tierProgress} className="h-2 bg-white/30" />
              </div>
              <p className="text-xs opacity-75 mt-1">
                {coins < 5000 ? `${nextTier} at ${coins < 1000 ? "1,000" : "5,000"} coins` : "Max tier!"}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="earn" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earn">Earn</TabsTrigger>
            <TabsTrigger value="redeem">Redeem</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="earn" className="space-y-4 mt-4">
            {/* Daily Challenges */}
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                Daily Challenges
              </h4>
              <div className="space-y-3">
                {dailyChallenges.map((challenge) => (
                  <div
                    key={challenge.name}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      challenge.completed ? "bg-green-50 border-green-200" : "bg-muted/30"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{challenge.name}</span>
                        {challenge.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Done!
                          </Badge>
                        )}
                      </div>
                      {!challenge.completed && (
                        <Progress
                          value={(challenge.progress / challenge.total) * 100}
                          className="h-1.5 mt-2"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-600 font-semibold ml-4">
                      <Coins className="h-3.5 w-3.5" />
                      +{challenge.coins}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ways to Earn */}
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                More Ways to Earn
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl mb-1">🛒</p>
                  <p className="text-xs font-medium">Shop & Earn</p>
                  <p className="text-xs text-amber-600">10 coins/Rs 278</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl mb-1">⭐</p>
                  <p className="text-xs font-medium">Write Reviews</p>
                  <p className="text-xs text-amber-600">50 coins each</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl mb-1">👥</p>
                  <p className="text-xs font-medium">Refer Friends</p>
                  <p className="text-xs text-amber-600">200 coins each</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl mb-1">🎂</p>
                  <p className="text-xs font-medium">Birthday Bonus</p>
                  <p className="text-xs text-amber-600">500 coins</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="redeem" className="mt-4">
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div
                  key={reward.name}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    coins >= reward.coins ? "bg-card" : "bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{reward.icon}</span>
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <div className="flex items-center gap-1 text-sm text-amber-600">
                        <Coins className="h-3 w-3" />
                        {reward.coins.toLocaleString()} coins
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    disabled={coins < reward.coins || redeemingReward === reward.name}
                    onClick={() => handleRedeemReward(reward)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {redeemingReward === reward.name ? "..." : "Redeem"}
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Use coins at checkout for up to 10% off your order!
            </p>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          tx.type === "earned"
                            ? "bg-green-100 text-green-600"
                            : tx.type === "bonus"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {tx.type === "earned" ? (
                          <Coins className="h-4 w-4" />
                        ) : tx.type === "bonus" ? (
                          <Gift className="h-4 w-4" />
                        ) : (
                          <History className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tx.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        tx.type === "spent" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {tx.type === "spent" ? "-" : "+"}
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
