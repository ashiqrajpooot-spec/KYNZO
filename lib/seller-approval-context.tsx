"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

export interface SellerApplication {
  id: string
  email: string
  businessName: string
  category: string
  phoneNumber: string
  address: string
  city: string
  state: string
  zipCode: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  approvedAt?: Date
  rejectionReason?: string
  password?: string
}

interface ApprovalContextType {
  applications: SellerApplication[]
  addApplication: (app: Omit<SellerApplication, "id" | "createdAt" | "status">) => void
  approveApplication: (id: string) => void
  rejectApplication: (id: string, reason: string) => void
  getApplicationById: (id: string) => SellerApplication | undefined
  getApplicationByEmail: (email: string) => SellerApplication | undefined
  isApproved: (email: string) => boolean
  isPending: (email: string) => boolean
  isRejected: (email: string) => boolean
}

const ApprovalContext = createContext<ApprovalContextType | undefined>(undefined)

export function ApprovalProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<SellerApplication[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ashmart-seller-applications")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setApplications(
            parsed.map((app: any) => ({
              ...app,
              createdAt: new Date(app.createdAt),
              approvedAt: app.approvedAt ? new Date(app.approvedAt) : undefined,
            }))
          )
        } catch (e) {
          console.error("[v0] Failed to parse seller applications:", e)
        }
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage when applications change
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem("ashmart-seller-applications", JSON.stringify(applications))
    }
  }, [applications, isHydrated])

  const addApplication = (app: Omit<SellerApplication, "id" | "createdAt" | "status">) => {
    const newApp: SellerApplication = {
      ...app,
      id: `app_${Date.now()}`,
      status: "pending",
      createdAt: new Date(),
    }
    setApplications((prev) => [newApp, ...prev])
  }

  const approveApplication = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "approved",
              approvedAt: new Date(),
            }
          : app
      )
    )
  }

  const rejectApplication = (id: string, reason: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "rejected",
              rejectionReason: reason,
            }
          : app
      )
    )
  }

  const getApplicationById = (id: string) => {
    return applications.find((app) => app.id === id)
  }

  const getApplicationByEmail = (email: string) => {
    return applications.find((app) => app.email.toLowerCase() === email.toLowerCase())
  }

  const isApproved = (email: string) => {
    const app = getApplicationByEmail(email)
    return app?.status === "approved"
  }

  const isPending = (email: string) => {
    const app = getApplicationByEmail(email)
    return app?.status === "pending"
  }

  const isRejected = (email: string) => {
    const app = getApplicationByEmail(email)
    return app?.status === "rejected"
  }

  if (!isHydrated) {
    return <>{children}</>
  }

  return (
    <ApprovalContext.Provider
      value={{
        applications,
        addApplication,
        approveApplication,
        rejectApplication,
        getApplicationById,
        getApplicationByEmail,
        isApproved,
        isPending,
        isRejected,
      }}
    >
      {children}
    </ApprovalContext.Provider>
  )
}

export function useApproval() {
  const context = useContext(ApprovalContext)
  if (!context) {
    throw new Error("useApproval must be used within an ApprovalProvider")
  }
  return context
}
