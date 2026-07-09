'use client'

import { useEffect, useState } from 'react'
import { Loader2, CheckCircle, Search, ShieldCheck, Cpu } from 'lucide-react'

const steps = [
  { icon: Search, text: 'Scanning financial profile...' },
  { icon: ShieldCheck, text: 'Verifying income details...' },
  { icon: Cpu, text: 'Running risk assessment algorithms...' },
  { icon: CheckCircle, text: 'Finalizing approval metrics...' },
]

export default function AnalyzingScreen() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 800) // Change step every 800ms

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 min-h-[400px]">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-6 animate-pulse">
        Analyzing Application
      </h2>

      <div className="w-full max-w-md space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <div
              key={index}
              className={`flex items-center gap-4 transition-all duration-500 ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : isCompleted
                  ? 'opacity-60 translate-x-0'
                  : 'opacity-0 translate-x-4'
              }`}
            >
              <div
                className={`p-2 rounded-full transition-colors duration-500 ${
                  isCompleted
                    ? 'bg-green-100 text-green-600'
                    : isActive
                    ? 'bg-primary/20 text-primary'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span
                className={`font-medium transition-colors duration-500 ${
                  isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {step.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
