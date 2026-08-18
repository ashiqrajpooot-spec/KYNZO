export interface Vendor {
  id: string
  name: string
  email: string
  rating: number
  reviews: number
  products: number
  followers: number
  joinDate: Date
  logo: string
  description: string
  category: string
  city: string
  verified: boolean
  responseRate: number
  positiveRating: number
}

export const vendors: Vendor[] = [
  {
    id: "vendor-001",
    name: "TechElite Store",
    email: "contact@techelite.com",
    rating: 4.8,
    reviews: 2543,
    products: 156,
    followers: 12400,
    joinDate: new Date("2023-01-15"),
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=techelite",
    description: "Premium electronics and gadgets with fast shipping",
    category: "Electronics",
    city: "New York",
    verified: true,
    responseRate: 98,
    positiveRating: 96,
  },
  {
    id: "vendor-002",
    name: "Fashion Forward",
    email: "sales@fashionforward.com",
    rating: 4.6,
    reviews: 1823,
    products: 234,
    followers: 8900,
    joinDate: new Date("2023-03-20"),
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=fashionforward",
    description: "Latest fashion trends and designer collections",
    category: "Fashion",
    city: "Los Angeles",
    verified: true,
    responseRate: 95,
    positiveRating: 94,
  },
  {
    id: "vendor-003",
    name: "Home Essentials Pro",
    email: "support@homeessentialspro.com",
    rating: 4.7,
    reviews: 3421,
    products: 187,
    followers: 15600,
    joinDate: new Date("2022-11-10"),
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=homeessentials",
    description: "Complete home and kitchen solutions",
    category: "Home & Kitchen",
    city: "Chicago",
    verified: true,
    responseRate: 99,
    positiveRating: 97,
  },
  {
    id: "vendor-004",
    name: "Sports Gear Hub",
    email: "info@sportsgear.com",
    rating: 4.5,
    reviews: 1654,
    products: 98,
    followers: 7200,
    joinDate: new Date("2023-05-05"),
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sportsgear",
    description: "Professional sports equipment and apparel",
    category: "Sports",
    city: "Denver",
    verified: true,
    responseRate: 92,
    positiveRating: 93,
  },
  {
    id: "vendor-005",
    name: "Beauty & Wellness",
    email: "hello@beautywell.com",
    rating: 4.9,
    reviews: 2134,
    products: 145,
    followers: 11200,
    joinDate: new Date("2023-02-14"),
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=beautywell",
    description: "Authentic beauty and wellness products",
    category: "Beauty",
    city: "Miami",
    verified: true,
    responseRate: 97,
    positiveRating: 98,
  },
  {
    id: "vendor-006",
    name: "Books & Media Store",
    email: "service@booksmedia.com",
    rating: 4.4,
    reviews: 987,
    products: 567,
    followers: 5600,
    joinDate: new Date("2023-07-22"),
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=booksmedia",
    description: "Wide selection of books, movies, and media",
    category: "Books",
    city: "Seattle",
    verified: true,
    responseRate: 90,
    positiveRating: 91,
  },
]

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id)
}

export function getVendorsByCategory(category: string): Vendor[] {
  return vendors.filter((v) => v.category.toLowerCase() === category.toLowerCase())
}

export function getTopRatedVendors(limit: number = 5): Vendor[] {
  return [...vendors].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function getVendorStats() {
  return {
    totalVendors: vendors.length,
    averageRating: (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1),
    totalProducts: vendors.reduce((sum, v) => sum + v.products, 0),
    totalFollowers: vendors.reduce((sum, v) => sum + v.followers, 0),
  }
}
