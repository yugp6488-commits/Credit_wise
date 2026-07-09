'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import MultiStepForm from '@/components/multi-step-form'
import ResultCard from '@/components/result-card'
import Header from '@/components/header'
import AnalyzingScreen from '@/components/analyzing-screen'
import LandingScreen from '@/components/landing-screen'
import LoanTypeSelection from '@/components/loan-type-selection'
import { RotateCcw } from 'lucide-react'

type FlowState = 'landing' | 'loan-type' | 'form' | 'analyzing' | 'result'

export default function Page() {
  const [flowState, setFlowState] = useState<FlowState>('landing')
  const [selectedLoanType, setSelectedLoanType] = useState<string>('')
  const [result, setResult] = useState<{ approved: boolean; confidence: number; tips?: string[] } | null>(null)

  const handlePrediction = async (formData: Record<string, any>) => {
    setFlowState('analyzing')
    setResult(null)
    
    // We simulate a minimum loading time so the user can see the analyzing screen
    const minLoadingPromise = new Promise(resolve => setTimeout(resolve, 3500))
    
    try {
      const responsePromise = fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const [response] = await Promise.all([responsePromise, minLoadingPromise])
      const data = await response.json()
      setResult(data)
      setFlowState('result')
    } catch (error) {
      console.error('Prediction error:', error)
      setResult({ approved: false, confidence: 0, tips: ["An unexpected error occurred while analyzing your application."] })
      setFlowState('result')
    }
  }

  const resetFlow = () => {
    setResult(null)
    setSelectedLoanType('')
    setFlowState('landing')
  }

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-x-hidden text-slate-900">
      {/* Optimized Background: Simple gradient blobs instead of heavy backdrop-blur images */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col py-8 px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto mt-8">
          {flowState === 'landing' && (
            <LandingScreen onStart={() => setFlowState('loan-type')} />
          )}

          {flowState === 'loan-type' && (
            <LoanTypeSelection onSelect={(type) => {
              setSelectedLoanType(type)
              setFlowState('form')
            }} />
          )}

          {flowState === 'form' && (
            <MultiStepForm 
              initialLoanType={selectedLoanType} 
              onPredict={handlePrediction} 
            />
          )}

          {flowState === 'analyzing' && (
            <AnalyzingScreen />
          )}

          {flowState === 'result' && result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultCard result={result} />
              <div className="flex justify-center">
                <Button 
                  onClick={resetFlow}
                  variant="outline"
                  className="bg-white hover:bg-gray-50 h-12 px-6 rounded-xl shadow-sm border-gray-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Start Another Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
