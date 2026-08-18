import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function RedeemCoinsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Redeem Your ASH Coins</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Convert your coins into store credit and discounts.
        </p>
        
        <div className="space-y-4">
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">100 Coins = Rs 100</h2>
            <p className="text-muted-foreground mb-4">Get store credit to use on any purchase</p>
            <Button>Redeem Now</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
