"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

export interface SellerProfile {
  id: string
  email: string
  businessName: string
  category: string
  phoneNumber: string
  address: string
  city: string
  state: string
  zipCode: string
  bankAccount?: string
  taxId?: string
}

export interface SellerStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  averageRating: number
  successRate: number
}

interface SellerContextType {
  seller: SellerProfile | null
  stats: SellerStats | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: Partial<SellerProfile> & { password: string }) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<SellerProfile>) => void
}

const SellerContext = createContext<SellerContextType | undefined>(undefined)

export function SellerProvider({ children }: { children: ReactNode }) {
  const [seller, setSeller] = useState<SellerProfile | null>(null)
  const [stats, setStats] = useState<SellerStats | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSeller = localStorage.getItem("ashmart-seller")
      if (savedSeller) {
        try {
          const sellerData = JSON.parse(savedSeller)
          setSeller(sellerData)
          setIsAuthenticated(true)
          
          // Load seller stats
          const savedStats = localStorage.getItem(`ashmart-seller-stats-${sellerData.id}`)
          if (savedStats) {
            setStats(JSON.parse(savedStats))
          } else {
            // Initialize with default stats
            setStats({
              totalProducts: 0,
              totalOrders: 0,
              totalRevenue: 0,
              averageRating: 4.5,
              successRate: 98,
            })
          }
        } catch (e) {
          console.error("[v0] Failed to parse saved seller:", e)
        }
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // In production, this would call an API
    // For now, we'll simulate a successful login
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const sellerData: SellerProfile = {
      id: `seller-${Date.now()}`,
      email,
      businessName: "",
      category: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    }

    setSeller(sellerData)
    setIsAuthenticated(true)
    setStats({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      averageRating: 4.5,
      successRate: 98,
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("ashmart-seller", JSON.stringify(sellerData))
      localStorage.setItem(`ashmart-seller-stats-${sellerData.id}`, JSON.stringify(stats))
    }
  }

  const register = async (data: Partial<SellerProfile> & { password: string }) => {
    // Validate required fields
    if (!data.email || !data.password || !data.businessName) {
      throw new Error("Email, password, and business name are required")
    }

    const sellerData: SellerProfile = {
      id: `seller-${Date.now()}`,
      email: data.email,
      businessName: data.businessName,
      category: data.category || "",
      phoneNumber: data.phoneNumber || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
    }

    setSeller(sellerData)
    setIsAuthenticated(true)
    setStats({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      averageRating: 4.5,
      successRate: 98,
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("ashmart-seller", JSON.stringify(sellerData))
      localStorage.setItem(`ashmart-seller-stats-${sellerData.id}`, JSON.stringify(stats))
    }
  }

  const logout = () => {
    setSeller(null)
    setStats(null)
    setIsAuthenticated(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem("ashmart-seller")
    }
  }

  const updateProfile = (data: Partial<SellerProfile>) => {
    if (seller) {
      const updatedSeller = { ...seller, ...data }
      setSeller(updatedSeller)
      if (typeof window !== "undefined") {
        localStorage.setItem("ashmart-seller", JSON.stringify(updatedSeller))
      }
    }
  }

  return (
    <SellerContext.Provider value={{ seller, stats, isAuthenticated, login, register, logout, updateProfile }}>
      {children}
    </SellerContext.Provider>
  )
}

export function useSeller() {
  const context = useContext(SellerContext)
  if (context === undefined) {
    throw new Error("useSeller must be used within a SellerProvider")
  }
  return context
}
