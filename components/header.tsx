import { CreditCard } from 'lucide-react'

export default function Header() {
  return (
    <header className="mb-12 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-[#003366] to-[#10b981] p-2 rounded-lg">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-primary">Credit Wise</h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Intelligent loan approval prediction powered by AI. Get instant insights into your loan eligibility.
      </p>
    </header>
  )
}
