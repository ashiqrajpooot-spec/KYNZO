"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Coins,
  Crown,
  UserPlus,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  orders: number
  totalSpent: number
  coins: number
  tier: "bronze" | "silver" | "gold"
  joinDate: string
  lastOrder: string
}

const customers: Customer[] = [
  {
    id: "CUS-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    orders: 15,
    totalSpent: 1234.56,
    coins: 12340,
    tier: "gold",
    joinDate: "2023-01-15",
    lastOrder: "2024-01-15",
  },
  {
    id: "CUS-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    orders: 8,
    totalSpent: 567.89,
    coins: 5670,
    tier: "silver",
    joinDate: "2023-03-20",
    lastOrder: "2024-01-14",
  },
  {
    id: "CUS-003",
    name: "Bob Wilson",
    email: "bob@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Rd, Chicago, IL 60601",
    orders: 3,
    totalSpent: 234.56,
    coins: 2340,
    tier: "bronze",
    joinDate: "2023-06-10",
    lastOrder: "2024-01-10",
  },
  {
    id: "CUS-004",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, Houston, TX 77001",
    orders: 12,
    totalSpent: 890.12,
    coins: 8900,
    tier: "silver",
    joinDate: "2023-02-28",
    lastOrder: "2024-01-13",
  },
  {
    id: "CUS-005",
    name: "Charlie Davis",
    email: "charlie@example.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    orders: 25,
    totalSpent: 2345.67,
    coins: 23450,
    tier: "gold",
    joinDate: "2022-11-05",
    lastOrder: "2024-01-15",
  },
  {
    id: "CUS-006",
    name: "Diana Evans",
    email: "diana@example.com",
    phone: "+1 (555) 678-9012",
    address: "987 Cedar Ln, Philadelphia, PA 19101",
    orders: 2,
    totalSpent: 99.98,
    coins: 990,
    tier: "bronze",
    joinDate: "2024-01-01",
    lastOrder: "2024-01-12",
  },
]

function getTierBadge(tier: Customer["tier"]) {
  switch (tier) {
    case "bronze":
      return <Badge className="bg-orange-100 text-orange-700">Bronze</Badge>
    case "silver":
      return <Badge className="bg-gray-100 text-gray-700">Silver</Badge>
    case "gold":
      return <Badge className="bg-amber-100 text-amber-700"><Crown className="mr-1 h-3 w-3" />Gold</Badge>
  }
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: customers.length,
    gold: customers.filter((c) => c.tier === "gold").length,
    silver: customers.filter((c) => c.tier === "silver").length,
    bronze: customers.filter((c) => c.tier === "bronze").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer base and loyalty program.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gold Members
            </CardTitle>
            <Crown className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gold}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Silver Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.silver}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bronze Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bronze}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="text-center">Coins</TableHead>
                <TableHead className="text-center">Tier</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {customer.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      {customer.orders}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-600">
                      <Coins className="h-4 w-4" />
                      {customer.coins.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getTierBadge(customer.tier)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add Bonus Coins</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer profile dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>Customer Profile</DialogTitle>
                <DialogDescription>
                  Member since {selectedCustomer.joinDate}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {selectedCustomer.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getTierBadge(selectedCustomer.tier)}
                      <span className="text-sm text-muted-foreground">{selectedCustomer.id}</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                    <p className="text-sm">{selectedCustomer.email}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      Phone
                    </div>
                    <p className="text-sm">{selectedCustomer.phone}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Address
                    </div>
                    <p className="text-sm">{selectedCustomer.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">${selectedCustomer.totalSpent.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">{selectedCustomer.coins.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">ASH Coins</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">View Orders</Button>
                  <Button variant="outline" className="flex-1">Send Email</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
