"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Mail, Heart, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"

export default function VendorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  // Mock vendor data
  const vendor = {
    id: id,
    name: "Tech Innovations Co.",
    email: "contact@techinnovations.pk",
    city: "Karachi",
    rating: 4.8,
    reviews: 1247,
    followers: 8500,
    products: 156,
    responseTime: "2 hours",
    joinedDate: "2022",
    verified: true,
    description: "We provide high-quality electronics and tech gadgets with excellent customer service.",
  }

  // Get some products for this vendor
  const vendorProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Vendor Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Vendor Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {vendor.name.charAt(0)}
                </div>
              </div>

              {/* Vendor Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{vendor.name}</h1>
                      {vendor.verified && (
                        <Badge className="bg-green-600">Verified</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{vendor.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-muted-foreground">({vendor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{vendor.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">{(vendor.followers / 1000).toFixed(1)}k</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="text-2xl font-bold">{vendor.products}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold">{vendor.responseTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="text-2xl font-bold">{vendor.joinedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <a href={`mailto:${vendor.email}`} className="text-primary hover:underline">
                {vendor.email}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendorProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="aspect-square relative mb-4 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="font-medium text-sm line-clamp-2 mb-2">{product.name}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-primary">
                          Rs {Math.round(product.price * 278)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs line-through text-muted-foreground">
                            Rs {Math.round(product.originalPrice * 278)}
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="ghost">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ahmed Khan", rating: 5, comment: "Great seller, fast delivery!" },
                { name: "Fatima Ahmed", rating: 4, comment: "Good quality products" },
                { name: "Muhammad Ali", rating: 5, comment: "Excellent customer service" },
              ].map((review, index) => (
                <div key={index} className="pb-4 border-b last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{review.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
