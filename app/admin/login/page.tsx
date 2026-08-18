"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Admin credentials - Your email with secure password
    // In production, passwords should be hashed on backend using bcrypt or similar
    const validCredentials = {
      email: "ASHIQRAJPOOOT@GMAIL.COM",
      password: "35202ASif", // This should be hashed on the backend, never stored plain text
    }

    if (email.toUpperCase() === validCredentials.email && password === validCredentials.password) {
      localStorage.setItem("ashmart-admin-auth", "true")
      localStorage.setItem("ashmart-admin-email", email.toUpperCase())
      toast({
        title: "Login Successful",
        description: "Welcome to ASH MART Admin Panel",
      })
      router.push("/admin")
    } else {
      toast({
        title: "Login Failed",
        description: `Invalid email or password. Try ASHIQRAJPOOOT@GMAIL.COM with your password.`,
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to access the ASH MART admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ASHIQRAJPOOOT@GMAIL.COM"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-400 text-center">
                <span className="font-semibold text-amber-400">Admin Credentials:</span>
                <br />
                Email: ASHIQRAJPOOOT@GMAIL.COM
                <br />
                Password: ••••••••••
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-500 text-sm mt-6">
          ASH MART Admin Panel v1.0
        </p>
      </div>
    </div>
  )
}
