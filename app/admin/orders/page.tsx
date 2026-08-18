"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  DollarSign,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Order {
  id: string
  customer: string
  email: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "refunded"
  date: string
  address: string
}

const initialOrders: Order[] = [
  {
    id: "ASH-001234",
    customer: "John Doe",
    email: "john@example.com",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 79.99 },
      { name: "USB-C Cable", quantity: 2, price: 12.99 },
    ],
    total: 105.97,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-01-15",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "ASH-001235",
    customer: "Jane Smith",
    email: "jane@example.com",
    items: [{ name: "Smart Watch", quantity: 1, price: 299.99 }],
    total: 299.99,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-15",
    address: "456 Oak Ave, Los Angeles, CA 90001",
  },
  {
    id: "ASH-001236",
    customer: "Bob Wilson",
    email: "bob@example.com",
    items: [
      { name: "Laptop Stand", quantity: 1, price: 49.99 },
      { name: "Mechanical Keyboard", quantity: 1, price: 159.99 },
    ],
    total: 209.98,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-14",
    address: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "ASH-001237",
    customer: "Alice Brown",
    email: "alice@example.com",
    items: [{ name: "Air Fryer", quantity: 1, price: 79.99 }],
    total: 79.99,
    status: "pending",
    paymentStatus: "pending",
    date: "2024-01-14",
    address: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ASH-001238",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    items: [{ name: "Gaming Mouse", quantity: 2, price: 29.99 }],
    total: 59.98,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-13",
    address: "654 Maple Dr, Phoenix, AZ 85001",
  },
  {
    id: "ASH-001239",
    customer: "Diana Evans",
    email: "diana@example.com",
    items: [
      { name: "Yoga Mat", quantity: 1, price: 29.99 },
      { name: "Resistance Bands", quantity: 1, price: 19.99 },
    ],
    total: 49.98,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-01-12",
    address: "987 Cedar Ln, Philadelphia, PA 19101",
  },
]

function getStatusBadge(status: Order["status"]) {
  switch (status) {
    case "pending":
      return <Badge className="bg-yellow-500/10 text-yellow-600"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
    case "processing":
      return <Badge className="bg-blue-500/10 text-blue-600"><Package className="mr-1 h-3 w-3" />Processing</Badge>
    case "shipped":
      return <Badge className="bg-purple-500/10 text-purple-600"><Truck className="mr-1 h-3 w-3" />Shipped</Badge>
    case "delivered":
      return <Badge className="bg-green-500/10 text-green-600"><CheckCircle className="mr-1 h-3 w-3" />Delivered</Badge>
    case "cancelled":
      return <Badge className="bg-red-500/10 text-red-600"><XCircle className="mr-1 h-3 w-3" />Cancelled</Badge>
  }
}

function getPaymentBadge(status: Order["paymentStatus"]) {
  switch (status) {
    case "paid":
      return <Badge variant="outline" className="border-green-500 text-green-600">Paid</Badge>
    case "pending":
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>
    case "refunded":
      return <Badge variant="outline" className="border-red-500 text-red-600">Refunded</Badge>
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0),
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage and track customer orders.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Transit
            </CardTitle>
            <Truck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shipped}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Payment</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{order.customer}</span>
                      <span className="text-xs text-muted-foreground">{order.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getPaymentBadge(order.paymentStatus)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                          Mark as Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "shipped")}>
                          Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                          Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                        >
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order details dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Placed on {selectedOrder.date}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex gap-4">
                  {getStatusBadge(selectedOrder.status)}
                  {getPaymentBadge(selectedOrder.paymentStatus)}
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Customer</h4>
                    <p className="text-sm">{selectedOrder.customer}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-sm text-muted-foreground">{selectedOrder.address}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
