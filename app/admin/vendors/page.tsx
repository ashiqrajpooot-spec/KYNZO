"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  MoreHorizontal,
  Plus,
  Filter,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  CheckCircle,
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
import { vendors } from "@/lib/vendors"

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "verified" && vendor.verified) ||
      (filterStatus === "unverified" && !vendor.verified)
    return matchesSearch && matchesStatus
  })

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "products") return b.products - a.products
    if (sortBy === "followers") return b.followers - a.followers
    return 0
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vendors Management</h2>
          <p className="text-muted-foreground">
            Manage and monitor all vendor accounts on the platform
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Vendors stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verified Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter((v) => v.verified).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (vendors.filter((v) => v.verified).length / vendors.length) * 100
              )}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.reduce((sum, v) => sum + v.products, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg {(
                vendors.reduce((sum, v) => sum + v.products, 0) / vendors.length
              ).toFixed(0)} per vendor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length
              ).toFixed(1)}
            </div>
            <p className="text-xs text-yellow-600 flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Out of 5.0
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and search */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="rating">Sort by Rating</option>
              <option value="products">Sort by Products</option>
              <option value="followers">Sort by Followers</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors table */}
      <Card>
        <CardHeader>
          <CardTitle>All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full space-y-2">
              {sortedVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <Image
                      src={vendor.logo}
                      alt={vendor.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold truncate">{vendor.name}</h3>
                        {vendor.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {vendor.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {vendor.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{vendor.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {vendor.reviews} reviews
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{vendor.products}</div>
                        <p className="text-xs text-muted-foreground">products</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {(vendor.followers / 1000).toFixed(1)}k
                        </div>
                        <p className="text-xs text-muted-foreground">followers</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Badge
                        variant={vendor.verified ? "default" : "secondary"}
                        className="whitespace-nowrap"
                      >
                        {vendor.verified ? "Verified" : "Pending"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="whitespace-nowrap text-xs"
                      >
                        {vendor.responseRate}% Response
                      </Badge>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View Products</DropdownMenuItem>
                      <DropdownMenuItem>Contact Vendor</DropdownMenuItem>
                      {!vendor.verified && (
                        <DropdownMenuItem className="text-green-600">
                          Verify Vendor
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        Suspend Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}

              {sortedVendors.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No vendors found</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
