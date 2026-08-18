"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  Coins,
  UserCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const stats = [
  {
    title: "Total Revenue",
    value: "Rs 12,574,462",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+15.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "ASH Coins Issued",
    value: "452,318",
    change: "+18.5%",
    trend: "up",
    icon: Coins,
  },
  {
    title: "Customers",
    value: "12,234",
    change: "+8.1%",
    trend: "up",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Wireless Headphones",
    amount: "Rs 36,137",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Smart Watch",
    amount: "Rs 83,397",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    email: "bob@example.com",
    product: "Laptop Stand",
    amount: "Rs 22,237",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    product: "Mechanical Keyboard",
    amount: "Rs 44,477",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-005",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    product: "USB-C Hub",
    amount: "Rs 13,897",
    status: "shipped",
    date: "2024-01-13",
  },
]

const topProducts = [
  { name: "Wireless Headphones Pro", sales: 1234, revenue: "Rs 44,480,000" },
  { name: "Smart Watch Series 5", sales: 987, revenue: "Rs 82,010,000" },
  { name: "Portable Bluetooth Speaker", sales: 876, revenue: "Rs 12,176,400" },
  { name: "4K Webcam", sales: 654, revenue: "Rs 21,684,000" },
  { name: "Ergonomic Mouse", sales: 543, revenue: "Rs 9,057,240" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Completed</Badge>
    case "processing":
      return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Processing</Badge>
    case "pending":
      return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>
    case "shipped":
      return <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20">Shipped</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your store.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/sellers">
            <Button variant="outline">
              <UserCheck className="mr-2 h-4 w-4" />
              Manage Sellers
            </Button>
          </Link>
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent orders */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-3"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} - {order.product}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top products */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Products</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-sm font-medium">{product.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
