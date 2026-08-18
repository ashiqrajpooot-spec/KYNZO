"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, ChevronUp, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  "Get to Know Us": [
    { id: "careers", label: "Careers", href: "/careers" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "about", label: "About ASH MART", href: "/about" },
    { id: "investor", label: "Investor Relations", href: "/investor" },
    { id: "devices", label: "ASH MART Devices", href: "/devices" },
    { id: "science", label: "ASH MART Science", href: "/science" },
  ],
  "Make Money with Us": [
    { id: "sell-products", label: "Sell products on ASH MART", href: "/sell" },
    { id: "sell-business", label: "Sell on ASH MART Business", href: "/seller/register" },
    { id: "sell-apps", label: "Sell apps on ASH MART", href: "/seller/register" },
    { id: "affiliate", label: "Become an Affiliate", href: "/affiliate" },
    { id: "advertise", label: "Advertise Your Products", href: "/advertise" },
    { id: "publish", label: "Self-Publish with Us", href: "/publish" },
  ],
  "ASH Coins Rewards": [
    { id: "earn-coins", label: "How to Earn Coins", href: "/coins" },
    { id: "redeem", label: "Redeem Your Coins", href: "/coins/redeem" },
    { id: "tiers", label: "Membership Tiers", href: "/membership" },
    { id: "discount", label: "10% Discount with Coins", href: "/deals" },
    { id: "refer", label: "Refer Friends for Coins", href: "/referral" },
    { id: "birthday", label: "Birthday Bonus", href: "/birthday" },
  ],
  "Let Us Help You": [
    { id: "account", label: "Your Account", href: "/account" },
    { id: "orders", label: "Your Orders", href: "/orders" },
    { id: "shipping", label: "Shipping Rates & Policies", href: "/shipping" },
    { id: "returns", label: "Returns & Replacements", href: "/returns" },
    { id: "content", label: "Manage Your Content and Devices", href: "/devices" },
    { id: "help", label: "Help", href: "/help" },
  ],
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="mt-8">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-sidebar/80 py-3 text-center text-sm text-sidebar-foreground hover:bg-sidebar/90"
      >
        <span className="flex items-center justify-center gap-1">
          <ChevronUp className="h-4 w-4" />
          Back to top
        </span>
      </button>

      {/* Main Footer */}
      <div className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto max-w-[1500px] px-4 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="mb-4 font-bold text-sidebar-foreground">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {links.map(({id, label, href}) => (
                    <li key={id}>
                      <Link
                        href={href}
                        className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sidebar-border">
          <div className="mx-auto max-w-[1500px] px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-1">
                <span className="text-2xl font-bold text-primary-foreground">
                  ASH
                </span>
                <span className="text-2xl font-bold text-accent">MART</span>
              </Link>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground hover:text-primary transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground hover:text-primary transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground hover:text-primary transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground hover:text-primary transition"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sidebar-border bg-sidebar/50">
          <div className="mx-auto max-w-[1500px] px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-sidebar-foreground/60">
              <Link href="/help" className="hover:text-sidebar-foreground transition">
                Conditions of Use
              </Link>
              <span>•</span>
              <Link href="/help" className="hover:text-sidebar-foreground transition">
                Privacy Notice
              </Link>
              <span>•</span>
              <Link href="/help" className="hover:text-sidebar-foreground transition">
                Consumer Health Data Privacy
              </Link>
              <span>•</span>
              <Link href="/help" className="hover:text-sidebar-foreground transition">
                Your Ads Privacy Choices
              </Link>
              <span className="w-full text-center">© 2026 ASH MART, Inc. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
