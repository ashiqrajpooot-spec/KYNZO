import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Membership Tiers</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to Membership Tiers. This page is coming soon with more information.
        </p>
      </main>
      <Footer />
    </div>
  )
}
