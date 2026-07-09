'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import FormInput from './form-input'
import FormSelect from './form-select'
import { Loader2 } from 'lucide-react'

interface LoanApplicationFormProps {
  onPredict: (formData: Record<string, any>) => void
  isLoading: boolean
}

export default function LoanApplicationForm({ onPredict, isLoading }: LoanApplicationFormProps) {
  const [formData, setFormData] = useState({
    applicant_income: '',
    coapplicant_income: '',
    employment_status: '',
    age: '',
    marital_status: '',
    dependents: '',
    credit_score: '',
    existing_loans: '',
    dti_ratio: '',
    savings: '',
    collateral_value: '',
    loan_amount: '',
    loan_term: '',
    loan_purpose: '',
    property_area: '',
    education_level: '',
    gender: '',
    employer_category: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict(formData)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Income Section */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-accent rounded"></span>
            Income Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Applicant Income ($)"
              name="applicant_income"
              type="number"
              value={formData.applicant_income}
              onChange={handleInputChange}
              placeholder="50000"
            />
            <FormInput
              label="Co-applicant Income ($)"
              name="coapplicant_income"
              type="number"
              value={formData.coapplicant_income}
              onChange={handleInputChange}
              placeholder="30000"
            />
          </div>
        </div>

        {/* Employment Section */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-accent rounded"></span>
            Employment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Employment Status"
              name="employment_status"
              value={formData.employment_status}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select employment status' },
                { value: 'Salaried', label: 'Salaried' },
                { value: 'Self-employed', label: 'Self-employed' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Unemployed', label: 'Unemployed' },
              ]}
            />
            <FormSelect
              label="Employer Category"
              name="employer_category"
              value={formData.employer_category}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select category' },
                { value: 'Private', label: 'Private' },
                { value: 'Government', label: 'Government' },
                { value: 'MNC', label: 'MNC' },
                { value: 'Business', label: 'Business' },
                { value: 'Unemployed', label: 'Unemployed' },
              ]}
            />
          </div>
        </div>

        {/* Personal Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-accent rounded"></span>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Age (years)"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="35"
            />
            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select gender' },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
            <FormSelect
              label="Marital Status"
              name="marital_status"
              value={formData.marital_status}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select status' },
                { value: 'Married', label: 'Married' },
                { value: 'Single', label: 'Single' },
              ]}
            />
            <FormInput
              label="Dependents"
              name="dependents"
              type="number"
              value={formData.dependents}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        </div>

        {/* Credit & Financial Section */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-accent rounded"></span>
            Credit & Financial Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Credit Score"
              name="credit_score"
              type="number"
              value={formData.credit_score}
              onChange={handleInputChange}
              placeholder="700"
            />
            <FormInput
              label="Existing Loans"
              name="existing_loans"
              type="number"
              value={formData.existing_loans}
              onChange={handleInputChange}
              placeholder="2"
            />
            <FormInput
              label="DTI Ratio"
              name="dti_ratio"
              type="number"
              step="0.01"
              value={formData.dti_ratio}
              onChange={handleInputChange}
              placeholder="0.35"
            />
            <FormInput
              label="Savings ($)"
              name="savings"
              type="number"
              value={formData.savings}
              onChange={handleInputChange}
              placeholder="10000"
            />
          </div>
        </div>

        {/* Loan Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-accent rounded"></span>
            Loan Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Loan Amount ($)"
              name="loan_amount"
              type="number"
              value={formData.loan_amount}
              onChange={handleInputChange}
              placeholder="200000"
            />
            <FormInput
              label="Loan Term (months)"
              name="loan_term"
              type="number"
              value={formData.loan_term}
              onChange={handleInputChange}
              placeholder="60"
            />
            <FormInput
              label="Collateral Value ($)"
              name="collateral_value"
              type="number"
              value={formData.collateral_value}
              onChange={handleInputChange}
              placeholder="150000"
            />
            <FormSelect
              label="Loan Purpose"
              name="loan_purpose"
              value={formData.loan_purpose}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select purpose' },
                { value: 'Home', label: 'Home' },
                { value: 'Car', label: 'Car' },
                { value: 'Business', label: 'Business' },
                { value: 'Personal', label: 'Personal' },
                { value: 'Education', label: 'Education' },
              ]}
            />
          </div>
        </div>

        {/* Property & Education Section */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-accent rounded"></span>
            Property & Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Property Area"
              name="property_area"
              value={formData.property_area}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select area' },
                { value: 'Urban', label: 'Urban' },
                { value: 'Semiurban', label: 'Semiurban' },
                { value: 'Rural', label: 'Rural' },
              ]}
            />
            <FormSelect
              label="Education Level"
              name="education_level"
              value={formData.education_level}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select education' },
                { value: 'Graduate', label: 'Graduate' },
                { value: 'Not Graduate', label: 'Not Graduate' },
              ]}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-border">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-[#0a6b4f] hover:from-primary hover:to-[#0a6b4f] text-white font-semibold h-12 text-lg rounded-lg transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Your Application...
              </>
            ) : (
              'Predict Loan Approval'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
