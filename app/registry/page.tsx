"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Search, Plus, Calendar, Users, Share2 } from "lucide-react"

const registryTypes = [
  { id: "wedding", name: "Wedding", icon: "💍", color: "bg-pink-100" },
  { id: "baby", name: "Baby", icon: "👶", color: "bg-blue-100" },
  { id: "birthday", name: "Birthday", icon: "🎂", color: "bg-yellow-100" },
  { id: "housewarming", name: "Housewarming", icon: "🏠", color: "bg-green-100" },
]

export default function RegistryPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [registries, setRegistries] = useState([
    {
      id: 1,
      name: "Sarah & John's Wedding",
      type: "wedding",
      owner: "Sarah Johnson",
      date: "June 15, 2024",
      progress: 65,
      items: 47,
    },
    {
      id: 2,
      name: "Baby Emma",
      type: "baby",
      owner: "Emily Davis",
      date: "April 2024",
      progress: 42,
      items: 32,
    },
  ])

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 md:pb-0">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
          <div className="mx-auto max-w-[1500px] px-4">
            <div className="flex items-center gap-4">
              <Heart className="h-12 w-12 text-pink-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">ASH MART Registry</h1>
                <p className="text-lg text-gray-600 mt-2">Create, share, and manage gift registries for any occasion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-[1500px] px-4 py-8">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Registries</TabsTrigger>
              <TabsTrigger value="manage">My Registries</TabsTrigger>
            </TabsList>

            {/* Browse Registries */}
            <TabsContent value="browse" className="space-y-6 mt-6">
              {/* Search */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search registries by name or registry ID..."
                        className="pl-9"
                      />
                    </div>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Registry Types */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Browse by Type</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {registryTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        selectedType === type.id
                          ? "border-accent bg-accent/10"
                          : `border-gray-200 ${type.color} hover:border-accent`
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <p className="font-semibold text-sm">{type.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Registries */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Featured Registries</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {registries.map((registry) => (
                    <Card key={registry.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{registry.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{registry.owner}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-semibold">{registry.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-accent h-2 rounded-full"
                              style={{ width: `${registry.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 text-sm text-muted-foreground">
                          <div>
                            <p className="text-2xl font-bold text-foreground">{registry.items}</p>
                            <p>Items</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">{registry.date}</p>
                            <p>Date</p>
                          </div>
                        </div>
                        <Button className="w-full" variant="outline">
                          View Registry
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* My Registries */}
            <TabsContent value="manage" className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Registries</h2>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Registry
                </Button>
              </div>

              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Registries Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first registry to get started sharing your wishlist with friends and family
                    </p>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Create Your First Registry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Info Section */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Share With Anyone
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Easily share your registry link with friends, family, and colleagues via email or social media.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Track Purchases
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                See which items have been purchased and by whom so there are no duplicates.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Easy Management
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Add, remove, or update items anytime. Your registry stays current and organized.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
