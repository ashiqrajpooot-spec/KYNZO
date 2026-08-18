"use client"

import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 12500, orders: 145 },
  { month: "Feb", revenue: 14200, orders: 168 },
  { month: "Mar", revenue: 15800, orders: 189 },
  { month: "Apr", revenue: 13600, orders: 156 },
  { month: "May", revenue: 17200, orders: 205 },
  { month: "Jun", revenue: 19500, orders: 234 },
  { month: "Jul", revenue: 21000, orders: 251 },
  { month: "Aug", revenue: 18700, orders: 223 },
  { month: "Sep", revenue: 22400, orders: 267 },
  { month: "Oct", revenue: 25100, orders: 298 },
  { month: "Nov", revenue: 28900, orders: 342 },
  { month: "Dec", revenue: 32500, orders: 386 },
]

const categoryData = [
  { name: "Electronics", value: 35, color: "#3b82f6" },
  { name: "Fashion", value: 25, color: "#10b981" },
  { name: "Home & Kitchen", value: 20, color: "#f59e0b" },
  { name: "Sports", value: 12, color: "#ef4444" },
  { name: "Others", value: 8, color: "#8b5cf6" },
]

const coinsData = [
  { month: "Jan", earned: 125000, spent: 45000 },
  { month: "Feb", earned: 142000, spent: 52000 },
  { month: "Mar", earned: 158000, spent: 61000 },
  { month: "Apr", earned: 136000, spent: 48000 },
  { month: "May", earned: 172000, spent: 72000 },
  { month: "Jun", earned: 195000, spent: 85000 },
]

const topProducts = [
  { name: "Wireless Headphones Pro", sales: 1234, revenue: 98500 },
  { name: "Smart Watch Series 5", sales: 987, revenue: 148050 },
  { name: "Air Fryer 5.8Qt", sales: 876, revenue: 70080 },
  { name: "Gaming Mouse RGB", sales: 654, revenue: 19620 },
  { name: "Yoga Mat Premium", sales: 543, revenue: 16290 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Track your store performance and customer insights.
          </p>
        </div>
        <Select defaultValue="12months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs 67,109,200</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +12.5% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,864</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +8.2% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +15.3% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs 23,407</div>
            <div className="flex items-center gap-1 text-xs text-red-600">
              <ArrowDownRight className="h-3 w-3" />
              -2.1% from last year
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              <span className="text-sm text-muted-foreground">Revenue:</span>
                              <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <span className="font-bold">{payload[0].name}: {payload[0].value}%</span>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm">{category.name}</span>
                  <span className="ml-auto text-sm font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ASH Coins Analytics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              ASH Coins Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coinsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid gap-2">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                <span className="text-sm">Earned:</span>
                                <span className="font-bold">{payload[0].value?.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm">Redeemed:</span>
                                <span className="font-bold">{payload[1].value?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="earned" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spent" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm">Coins Earned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm">Coins Redeemed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Selling Products</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.revenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
