"use client"

import { useState, FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSeller } from "@/lib/seller-context"
import { useApproval } from "@/lib/seller-approval-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Clock } from "lucide-react"
import Link from "next/link"

export function SellerLoginContent() {
  const router = useRouter()
  const { login, isAuthenticated } = useSeller()
  const { getApplicationByEmail, isPending, isApproved, isRejected } = useApproval()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/seller/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setStatusMessage("")
    setLoading(true)

    try {
      // Check approval status first
      const app = getApplicationByEmail(email)
      
      if (isPending(email)) {
        setStatusMessage("Your application is still being reviewed. Please check back soon.")
        setLoading(false)
        return
      }
      
      if (isRejected(email)) {
        const rejection = app?.rejectionReason || "Your application did not meet our requirements."
        setError(`Your application was rejected: ${rejection}. Please contact support for more information.`)
        setLoading(false)
        return
      }
      
      if (!isApproved(email)) {
        setError("You have not submitted a seller application. Please register first.")
        setLoading(false)
        return
      }

      // If approved, proceed with login
      await login(email, password)
      router.push("/seller/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Seller Login</h1>
          <p className="text-muted-foreground">Sign in to your seller account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}
              
              {statusMessage && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded flex gap-2">
                  <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>{statusMessage}</div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/seller/register" className="text-primary hover:underline font-medium">
                    Register here
                  </Link>
                </p>
                <Link href="/" className="text-sm text-primary hover:underline">
                  Back to shopping
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
