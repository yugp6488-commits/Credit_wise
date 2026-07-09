import { Button } from '@/components/ui/button'
import { Rocket, TrendingUp, ShieldCheck } from 'lucide-react'

interface LandingScreenProps {
  onStart: () => void
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 py-12">
      <div className="bg-primary/10 p-6 rounded-full mb-4">
        <Rocket className="w-16 h-16 text-primary" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
        Unlock Your Financial <span className="text-primary">Opportunities</span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Discover the best loan options tailored for your profile. Our intelligent algorithm analyzes your metrics to provide you with the highest approval chances and personalized insights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8 mb-12">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Smart Analysis</h3>
            <p className="text-sm text-gray-500">Get data-driven insights</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Secure & Private</h3>
            <p className="text-sm text-gray-500">Your data is fully protected</p>
          </div>
        </div>
      </div>

      <Button 
        onClick={onStart}
        className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-[#0a6b4f] text-white shadow-xl shadow-primary/30 transition-transform hover:scale-105"
      >
        Get Started Now
      </Button>
    </div>
  )
}
