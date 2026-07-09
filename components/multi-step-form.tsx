'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import FormInput from './form-input'
import FormSelect from './form-select'
import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react'

interface MultiStepFormProps {
  onPredict: (formData: Record<string, any>) => void
  initialLoanType?: string
}

const steps = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Employment & Income' },
  { id: 3, title: 'Financial Metrics' },
  { id: 4, title: 'Loan Details' },
]

export default function MultiStepForm({ onPredict, initialLoanType = '' }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    age: '',
    gender: '',
    marital_status: '',
    dependents: '',
    education_level: '',
    // Step 2
    employment_status: '',
    employer_category: '',
    applicant_income: '',
    coapplicant_income: '',
    // Step 3
    credit_score: '',
    existing_loans: '',
    dti_ratio: '',
    savings: '',
    // Step 4
    loan_amount: '',
    loan_term: '',
    loan_purpose: initialLoanType,
    collateral_value: '',
    property_area: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict(formData)
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 sm:p-12 relative overflow-hidden">
      {/* Progress Indicator */}
      <div className="mb-10 relative">
        <div className="flex justify-between relative z-10">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 shadow-sm ${
                  step.id === currentStep
                    ? 'bg-primary text-white scale-110 shadow-primary/30'
                    : step.id < currentStep
                    ? 'bg-[#0a6b4f] text-white'
                    : 'bg-white text-gray-400 border border-gray-200'
                }`}
              >
                {step.id < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step.id}
              </div>
              <span className={`hidden sm:block text-xs font-medium ${step.id === currentStep ? 'text-primary' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-0 rounded-full transform -translate-y-1/2">
          <div
            className="h-full bg-gradient-to-r from-[#0a6b4f] to-primary transition-all duration-500 rounded-full"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Tell us about yourself</h2>
              <p className="text-muted-foreground mt-2">Let's start with some basic information.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Age (years)" name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder="e.g. 35" />
              <FormSelect
                label="Gender" name="gender" value={formData.gender} onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select gender' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
              />
              <FormSelect
                label="Marital Status" name="marital_status" value={formData.marital_status} onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select status' },
                  { value: 'Married', label: 'Married' },
                  { value: 'Single', label: 'Single' },
                ]}
              />
              <FormInput label="Dependents" name="dependents" type="number" value={formData.dependents} onChange={handleInputChange} placeholder="e.g. 2" />
              <FormSelect
                label="Education Level" name="education_level" value={formData.education_level} onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select education' },
                  { value: 'Graduate', label: 'Graduate' },
                  { value: 'Not Graduate', label: 'Not Graduate' },
                ]}
              />
            </div>
          </div>
        )}

        {/* Step 2: Employment & Income */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Employment & Income</h2>
              <p className="text-muted-foreground mt-2">We need this to understand your earning capacity.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                label="Employment Status" name="employment_status" value={formData.employment_status} onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select status' },
                  { value: 'Salaried', label: 'Salaried' },
                  { value: 'Self-employed', label: 'Self-employed' },
                  { value: 'Contract', label: 'Contract' },
                  { value: 'Unemployed', label: 'Unemployed' },
                ]}
              />
              <FormSelect
                label="Employer Category" name="employer_category" value={formData.employer_category} onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select category' },
                  { value: 'Private', label: 'Private' },
                  { value: 'Government', label: 'Government' },
                  { value: 'MNC', label: 'MNC' },
                  { value: 'Business', label: 'Business' },
                  { value: 'Unemployed', label: 'Unemployed' },
                ]}
              />
              <FormInput label="Applicant Income ($)" name="applicant_income" type="number" value={formData.applicant_income} onChange={handleInputChange} placeholder="e.g. 60000" />
              <FormInput label="Co-applicant Income ($)" name="coapplicant_income" type="number" value={formData.coapplicant_income} onChange={handleInputChange} placeholder="e.g. 30000" />
            </div>
          </div>
        )}

        {/* Step 3: Financial Metrics */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Financial Health</h2>
              <p className="text-muted-foreground mt-2">A quick look at your credit and savings.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Credit Score" name="credit_score" type="number" value={formData.credit_score} onChange={handleInputChange} placeholder="e.g. 720" />
              <FormInput label="Existing Loans" name="existing_loans" type="number" value={formData.existing_loans} onChange={handleInputChange} placeholder="e.g. 1" />
              <FormInput label="DTI Ratio (0.0 - 1.0)" name="dti_ratio" type="number" step="0.01" value={formData.dti_ratio} onChange={handleInputChange} placeholder="e.g. 0.35" />
              <FormInput label="Savings ($)" name="savings" type="number" value={formData.savings} onChange={handleInputChange} placeholder="e.g. 15000" />
            </div>
          </div>
        )}

        {/* Step 4: Loan Details */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Loan Requirements</h2>
              <p className="text-muted-foreground mt-2">Final step! What kind of loan do you need?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Loan Amount ($)" name="loan_amount" type="number" value={formData.loan_amount} onChange={handleInputChange} placeholder="e.g. 250000" />
              <FormInput label="Loan Term (months)" name="loan_term" type="number" value={formData.loan_term} onChange={handleInputChange} placeholder="e.g. 60" />
              <FormInput label="Collateral Value ($)" name="collateral_value" type="number" value={formData.collateral_value} onChange={handleInputChange} placeholder="e.g. 300000" />
              <FormSelect
                label="Loan Purpose" name="loan_purpose" value={formData.loan_purpose} onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select purpose' },
                  { value: 'Home', label: 'Home' },
                  { value: 'Car', label: 'Car' },
                  { value: 'Business', label: 'Business' },
                  { value: 'Personal', label: 'Personal' },
                  { value: 'Education', label: 'Education' },
                ]}
              />
              <FormSelect
                label="Property Area" name="property_area" value={formData.property_area} onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select area' },
                  { value: 'Urban', label: 'Urban' },
                  { value: 'Semiurban', label: 'Semiurban' },
                  { value: 'Rural', label: 'Rural' },
                ]}
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`h-12 px-6 rounded-xl font-medium transition-all ${
              currentStep === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={handleNext}
              className="h-12 px-8 rounded-xl bg-primary hover:bg-[#0a6b4f] text-white font-semibold transition-all shadow-lg shadow-primary/30"
            >
              Next Step <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-[#0a6b4f] hover:from-[#0a6b4f] hover:to-[#074d39] text-white font-semibold transition-all shadow-lg shadow-primary/40 animate-pulse"
            >
              Submit Application <Send className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
