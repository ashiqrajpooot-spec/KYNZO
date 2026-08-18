import { ReactNode } from "react"
import { SellerLayoutClient } from "@/components/seller-layout-client"

// Disable static pre-rendering for all seller pages  
export const dynamic = "force-dynamic"

export default function SellerLayout({
  children,
}: {
  children: ReactNode
}) {
  return <SellerLayoutClient>{children}</SellerLayoutClient>
}
