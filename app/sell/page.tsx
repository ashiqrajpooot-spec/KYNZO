"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, ShoppingCart, CreditCard, CheckCircle2, Zap } from "lucide-react"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 md:pb-0">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
          <div className="mx-auto max-w-[1500px] px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Sell on ASH MART
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Reach millions of customers and grow your business. Start selling today with our easy-to-use platform.
              </p>
              <div className="flex gap-4">
                <Link href="/seller/register">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-12 px-8">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg h-12 px-8">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-foreground text-background py-12">
          <div className="mx-auto max-w-[1500px] px-4">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">2M+</div>
                <p>Active Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500K+</div>
                <p>Sellers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$5B+</div>
                <p>Annual Sales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Sell Section */}
        <div className="py-16">
          <div className="mx-auto max-w-[1500px] px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Sell on ASH MART?</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Massive Audience
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Access to millions of active customers actively searching for products every day.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Easy Growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Use our marketing tools and analytics to grow your sales and reach more customers.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-accent" />
                    Simple Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Get started in minutes with our intuitive seller dashboard and product upload tools.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-accent" />
                    Fast Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Get paid quickly with our secure payment system. Funds deposited every 14 days.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    24/7 Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Our seller support team is available around the clock to help you succeed.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    Free Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Access advertising, inventory management, and analytics tools at no extra cost.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-muted py-16">
          <div className="mx-auto max-w-[1500px] px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: 1, title: "Create Account", desc: "Sign up and set up your seller profile" },
                { step: 2, title: "Add Products", desc: "Upload your product listings with photos" },
                { step: 3, title: "Start Selling", desc: "Customers browse and purchase your items" },
                { step: 4, title: "Get Paid", desc: "Receive payments every 14 days" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-16">
          <div className="mx-auto max-w-[1500px] px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Simple, Transparent Pricing</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Individual",
                  price: "$0",
                  features: [
                    "Unlimited products",
                    "0.99 per item sold",
                    "Basic seller tools",
                    "Standard support",
                  ],
                },
                {
                  name: "Professional",
                  price: "$39.99",
                  period: "/month",
                  features: [
                    "Unlimited products",
                    "0.49 per item sold",
                    "Advanced tools",
                    "Priority support",
                    "Marketing tools",
                  ],
                  highlighted: true,
                },
                {
                  name: "Premium",
                  price: "$99.99",
                  period: "/month",
                  features: [
                    "Unlimited products",
                    "0.25 per item sold",
                    "All tools included",
                    "24/7 VIP support",
                    "Ad credits",
                  ],
                },
              ].map((plan) => (
                <Card key={plan.name} className={plan.highlighted ? "border-accent border-2" : ""}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={
                        plan.highlighted
                          ? "w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          : "w-full"
                      }
                      variant={plan.highlighted ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/seller/register">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 py-16">
          <div className="mx-auto max-w-[1500px] px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful sellers on ASH MART. Start your journey today and reach millions of customers.
            </p>
            <Link href="/seller/register">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-12 px-8">
                Start Selling Now
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
