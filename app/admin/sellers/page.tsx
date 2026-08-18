"use client"

import { useState } from "react"
import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const sellerApplications = [
  {
    id: "APP-001",
    name: "Tech Solutions Inc",
    email: "info@techsolutions.com",
    phone: "+1-555-0101",
    city: "New York",
    category: "Electronics",
    status: "pending",
    appliedDate: "2024-01-12",
    description: "Premium tech retailer with 5+ years experience",
  },
  {
    id: "APP-002",
    name: "Fashion Hub Co",
    email: "hello@fashionhub.com",
    phone: "+1-555-0102",
    city: "Los Angeles",
    category: "Fashion",
    status: "approved",
    appliedDate: "2024-01-10",
    description: "Leading fashion brand with international presence",
  },
  {
    id: "APP-003",
    name: "Home & Living Store",
    email: "contact@homestore.com",
    phone: "+1-555-0103",
    city: "Chicago",
    category: "Home & Kitchen",
    status: "pending",
    appliedDate: "2024-01-08",
    description: "Quality home furnishings and decor",
  },
  {
    id: "APP-004",
    name: "Beauty Paradise",
    email: "sales@beautyparadise.com",
    phone: "+1-555-0104",
    city: "Miami",
    category: "Beauty",
    status: "rejected",
    appliedDate: "2024-01-05",
    description: "Beauty and cosmetics retailer",
  },
  {
    id: "APP-005",
    name: "Sports Experts Ltd",
    email: "support@sportsexperts.com",
    phone: "+1-555-0105",
    city: "Denver",
    category: "Sports",
    status: "approved",
    appliedDate: "2024-01-03",
    description: "Professional sports equipment supplier",
  },
]

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedApp, setSelectedApp] = useState<(typeof sellerApplications)[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filtered = sellerApplications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
            Pending Review
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Seller Applications</h2>
          <p className="text-muted-foreground">
            Review and manage seller account applications
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellerApplications.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellerApplications.filter((a) => a.status === "pending").length}
            </div>
            <p className="text-xs text-yellow-600">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellerApplications.filter((a) => a.status === "approved").length}
            </div>
            <p className="text-xs text-green-600">Verified sellers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellerApplications.filter((a) => a.status === "rejected").length}
            </div>
            <p className="text-xs text-red-600">Not approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search seller applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Applications list */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {getStatusIcon(app.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{app.name}</h3>
                    <div className="text-xs text-muted-foreground space-y-1 mt-2">
                      <div className="flex items-center gap-1 truncate">
                        <Mail className="h-3 w-3 flex-shrink-0" />
                        {app.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        {app.city}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {app.category}
                    </Badge>
                    {getStatusBadge(app.status)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedApp(app)
                        setShowDetails(true)
                      }}
                    >
                      View Details
                    </DropdownMenuItem>
                    {app.status === "pending" && (
                      <>
                        <DropdownMenuItem className="text-green-600">
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No applications found matching your criteria
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedApp?.name}</DialogTitle>
            <DialogDescription>
              Application details and review information
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {selectedApp.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {selectedApp.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedApp.city}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedApp.category}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedApp.description}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                {selectedApp.status === "pending" && (
                  <>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Application
                    </Button>
                    <Button variant="destructive">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
                {selectedApp.status === "approved" && (
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                    Approved
                  </Badge>
                )}
                {selectedApp.status === "rejected" && (
                  <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
                    Rejected
                  </Badge>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
