"use client"

import { ReactNode } from "react"
import { SellerProvider } from "@/lib/seller-context"
import { ApprovalProvider } from "@/lib/seller-approval-context"

export function SellerLayoutClient({ children }: { children: ReactNode }) {
  return (
    <ApprovalProvider>
      <SellerProvider>{children}</SellerProvider>
    </ApprovalProvider>
  )
}
