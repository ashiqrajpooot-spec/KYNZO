"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Mail, DollarSign, Calendar, Check } from "lucide-react"

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(5560)
  const [customAmount, setCustomAmount] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [message, setMessage] = useState("")
  const [deliveryType, setDeliveryType] = useState("email")

  const presetAmounts = [2780, 5560, 11120, 27800, 55600]

  const handlePurchase = () => {
    if (!recipientEmail) {
      alert("Please enter recipient email")
      return
    }
    alert("Gift card purchase would be processed here")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 md:pb-0">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
          <div className="mx-auto max-w-[1500px] px-4">
            <div className="flex items-center gap-4">
              <Gift className="h-12 w-12 text-amber-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">ASH MART Gift Cards</h1>
                <p className="text-lg text-gray-600 mt-2">Give the gift of choice - any amount, any time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-[1500px] px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Gift Card Purchase Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase a Gift Card</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={deliveryType} onValueChange={setDeliveryType}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Email Delivery</TabsTrigger>
                      <TabsTrigger value="physical">Physical Card</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="space-y-6 mt-6">
                      {/* Select Amount */}
                      <div>
                        <label className="text-sm font-semibold mb-3 block">Select Amount</label>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                          {presetAmounts.map((amount) => (
                            <button
                              key={amount}
                              onClick={() => setSelectedAmount(amount)}
                              className={`p-3 rounded border-2 font-semibold transition-all ${
                                selectedAmount === amount
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-gray-300 hover:border-accent"
                              }`}
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Custom amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            min="1"
                            max="10000"
                            className="flex-1"
                          />
                          <Button onClick={() => setSelectedAmount(Number(customAmount))}>
                            Set
                          </Button>
                        </div>
                        <div className="mt-4 p-4 bg-accent/10 rounded">
                          <p className="text-sm text-muted-foreground">Amount to send:</p>
                          <p className="text-2xl font-bold text-accent">${selectedAmount}</p>
                        </div>
                      </div>

                      {/* Recipient Details */}
                      <div className="border-t pt-6">
                        <label className="text-sm font-semibold mb-3 block">Recipient Email</label>
                        <Input
                          type="email"
                          placeholder="recipient@example.com"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                        />
                      </div>

                      {/* Personal Message */}
                      <div>
                        <label className="text-sm font-semibold mb-3 block">Personal Message (Optional)</label>
                        <textarea
                          placeholder="Add a message to make it personal..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          maxLength={200}
                          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                          rows={4}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{message.length}/200</p>
                      </div>

                      <Button onClick={handlePurchase} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Purchase Gift Card - ${selectedAmount}
                      </Button>
                    </TabsContent>

                    <TabsContent value="physical" className="space-y-6 mt-6">
                      <div className="p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                        <p className="text-sm text-amber-900">
                          Physical gift cards are shipped within 1-2 business days. Shipping is free!
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-semibold mb-3 block">Select Amount</label>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                          {presetAmounts.map((amount) => (
                            <button
                              key={amount}
                              onClick={() => setSelectedAmount(amount)}
                              className={`p-3 rounded border-2 font-semibold transition-all ${
                                selectedAmount === amount
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-gray-300 hover:border-accent"
                              }`}
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold mb-3 block">Shipping Address</label>
                        <Input placeholder="Full Name" className="mb-2" />
                        <Input placeholder="Street Address" className="mb-2" />
                        <div className="grid grid-cols-3 gap-2">
                          <Input placeholder="City" />
                          <Input placeholder="State" />
                          <Input placeholder="ZIP" />
                        </div>
                      </div>

                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Order Physical Card - ${selectedAmount}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Instant Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Send via email instantly or schedule for later
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Any Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Choose from preset amounts or enter a custom amount
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    No Expiration
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Never expires - use it whenever you want
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Perfect Gift
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Great for any occasion, no returns needed
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">How do gift cards work?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>1. Choose your amount and delivery method</p>
                <p>2. Add a personal message (optional)</p>
                <p>3. Complete payment</p>
                <p>4. Gift card is sent to recipient</p>
                <p>5. Recipient can use it to shop anytime</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Can I earn ASH Coins?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Yes! Recipients earn ASH Coins on every purchase made with the gift card at the same rate as regular purchases. Plus, they get a welcome bonus when they first use it!
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
