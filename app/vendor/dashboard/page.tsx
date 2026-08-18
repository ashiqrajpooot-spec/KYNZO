"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DollarSign,
  ShoppingCart,
  Star,
  TrendingUp,
  BarChart3,
  Package,
  Settings,
  LogOut,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function VendorDashboard() {
  const [vendor] = useState({
    name: "Tech Innovations Co.",
    id: "VENDOR_001",
    email: "contact@techinnovations.pk",
    rating: 4.8,
    reviews: 1247,
    products: 156,
    followers: 8500,
    verified: true,
    commission: 2.5,
  })

  const stats = [
    {
      title: "Total Revenue",
      value: "Rs 2,847,500",
      change: "+12.5%",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.2%",
      positive: true,
      icon: ShoppingCart,
    },
    {
      title: "Avg Rating",
      value: vendor.rating.toFixed(1),
      change: "+0.2",
      positive: true,
      icon: Star,
    },
    {
      title: "Active Products",
      value: vendor.products.toString(),
      change: "+15",
      positive: true,
      icon: Package,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {vendor.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Link href="/">
              <Button variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>

        {/* Verification Badge */}
        {vendor.verified && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">Verified Vendor</Badge>
                <p className="text-sm text-green-700">
                  Your account is verified and can sell on ASH MART
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positive ? '+' : ''}{stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Orders
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Payouts
              </Button>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "ORD001", product: "Wireless Headphones", amount: "Rs 4,500", status: "Pending" },
                    { id: "ORD002", product: "Smart Watch", amount: "Rs 18,500", status: "Shipped" },
                    { id: "ORD003", product: "USB-C Cable", amount: "Rs 1,200", status: "Delivered" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded">
                      <div>
                        <p className="font-medium text-sm">{order.product}</p>
                        <p className="text-xs text-muted-foreground">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{order.amount}</p>
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vendor Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Store Name</p>
                <p className="font-medium">{vendor.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{vendor.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-medium">{vendor.rating}/5.0 ({vendor.reviews} reviews)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Commission Rate</p>
                <p className="font-medium">{vendor.commission}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
