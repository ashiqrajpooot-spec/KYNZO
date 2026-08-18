"use client"

import { useState, FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSeller } from "@/lib/seller-context"
import { useApproval } from "@/lib/seller-approval-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function SellerRegisterContent() {
  const router = useRouter()
  const { isAuthenticated } = useSeller()
  const { addApplication, getApplicationByEmail } = useApproval()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    category: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/seller/dashboard")
    }
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!formData.email || !formData.password || !formData.businessName) {
        throw new Error("Please fill in all required fields")
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Check if already applied
      const existing = getApplicationByEmail(formData.email)
      if (existing) {
        throw new Error("You have already submitted an application. Please wait for approval.")
      }

      // Submit application for admin approval instead of auto-registering
      addApplication({
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        category: formData.category,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      })

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted for admin approval. You'll receive an email once approved.",
      })

      setSubmitted(true)
      setTimeout(() => {
        router.push("/seller/login")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Start Selling on ASH MART</h1>
          <p className="text-muted-foreground">Create your seller account and reach millions of customers</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Seller Registration</CardTitle>
            <CardDescription>
              {submitted
                ? "Application Submitted!"
                : "Fill in your business details to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-4 text-center py-8">
                <div className="text-green-600 text-5xl">✓</div>
                <h3 className="text-lg font-semibold text-foreground">Application Submitted Successfully!</h3>
                <p className="text-muted-foreground">
                  Our admin team will review your application and send you an email with a decision within 24-48 hours.
                </p>
                <p className="text-sm text-muted-foreground">Redirecting to login...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Business Name *</label>
                  <Input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your Business Name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Password *</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password *</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="toys">Toys & Games</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City</label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State</label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="12345"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Creating Account..." : "Create Seller Account"}
              </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/seller/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
