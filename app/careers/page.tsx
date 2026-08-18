import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Careers at ASH MART</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Join our team and help us revolutionize e-commerce in Pakistan.
        </p>
        
        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Senior Software Engineer</h2>
            <p className="text-muted-foreground mb-4">Karachi, Pakistan</p>
            <p className="mb-4">We're looking for experienced software engineers to join our growing team.</p>
            <Button>Apply Now</Button>
          </div>
          
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Product Manager</h2>
            <p className="text-muted-foreground mb-4">Lahore, Pakistan</p>
            <p className="mb-4">Lead product strategy and drive innovation across our platform.</p>
            <Button>Apply Now</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
