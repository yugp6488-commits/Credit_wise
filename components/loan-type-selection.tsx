import { Home, Car, Briefcase, User, GraduationCap } from 'lucide-react'

interface LoanTypeSelectionProps {
  onSelect: (type: string) => void
}

const loanTypes = [
  { id: 'Home', icon: Home, title: 'Home Loan', desc: 'Buy or build your dream house' },
  { id: 'Car', icon: Car, title: 'Car Loan', desc: 'Finance your next vehicle' },
  { id: 'Business', icon: Briefcase, title: 'Business Loan', desc: 'Expand your enterprise' },
  { id: 'Personal', icon: User, title: 'Personal Loan', desc: 'Fund personal expenses' },
  { id: 'Education', icon: GraduationCap, title: 'Education Loan', desc: 'Invest in your future' },
]

export default function LoanTypeSelection({ onSelect }: LoanTypeSelectionProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground">What type of loan are you looking for?</h2>
        <p className="text-muted-foreground mt-3 text-lg">Select a category to customize your application.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loanTypes.map((loan) => {
          const Icon = loan.icon
          return (
            <button
              key={loan.id}
              onClick={() => onSelect(loan.id)}
              className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl border-2 border-transparent shadow-sm hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-slate-50 group-hover:bg-primary/10 p-4 rounded-full mb-4 transition-colors">
                <Icon className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{loan.title}</h3>
              <p className="text-sm text-gray-500">{loan.desc}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
