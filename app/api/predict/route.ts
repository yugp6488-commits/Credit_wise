import { NextRequest, NextResponse } from 'next/server'

// Simple loan approval prediction logic based on key metrics
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Extract key metrics
    const applicantIncome = parseFloat(formData.applicant_income) || 0
    const coapplicantIncome = parseFloat(formData.coapplicant_income) || 0
    const creditScore = parseFloat(formData.credit_score) || 0
    const dtiRatio = parseFloat(formData.dti_ratio) || 0
    const existingLoans = parseFloat(formData.existing_loans) || 0
    const loanAmount = parseFloat(formData.loan_amount) || 0
    const collateralValue = parseFloat(formData.collateral_value) || 0
    const savings = parseFloat(formData.savings) || 0

    // Calculate total income
    const totalIncome = applicantIncome + coapplicantIncome

    // Calculate approval score (0-1)
    // Starting from a lower base score so applicants must "earn" approval
    let approvalScore = 0.2
    const tips: string[] = []

    // 1. Credit score impact (Max +0.3)
    if (creditScore >= 750) approvalScore += 0.30
    else if (creditScore >= 700) approvalScore += 0.20
    else if (creditScore >= 650) approvalScore += 0.10
    else if (creditScore >= 600) {
      tips.push("Your credit score is borderline. Paying down existing debts will boost your score and chances.")
    }
    else if (creditScore > 0) {
      approvalScore -= 0.20 // Heavy penalty for poor credit
      tips.push("Your credit score is significantly below our minimum requirement. Focus on building consistent payment history.")
    }

    // 2. Income vs Loan Amount (Max +0.2)
    // How much are they asking for compared to what they make?
    if (totalIncome > 0 && loanAmount > 0) {
      if (loanAmount <= totalIncome * 2) approvalScore += 0.20
      else if (loanAmount <= totalIncome * 4) approvalScore += 0.10
      else if (loanAmount > totalIncome * 8) {
        approvalScore -= 0.30
        tips.push("The requested loan amount is excessively high compared to your total income.")
      }
      else if (loanAmount > totalIncome * 5) {
        approvalScore -= 0.10
        tips.push("The requested loan amount is quite large for your income bracket. Requesting a smaller amount would help.")
      }
    } else if (totalIncome === 0) {
       approvalScore -= 0.50
       tips.push("A verifiable source of income is required for loan approval.")
    }

    // 3. DTI Ratio impact (Max +0.2)
    if (dtiRatio > 0 && dtiRatio <= 0.25) approvalScore += 0.20
    else if (dtiRatio <= 0.35) approvalScore += 0.10
    else if (dtiRatio > 0.5) {
      approvalScore -= 0.30 // Heavy penalty
      tips.push("Your Debt-to-Income (DTI) ratio is dangerously high. You must lower your monthly obligations before taking on more debt.")
    }
    else if (dtiRatio > 0.4) {
      approvalScore -= 0.10
      tips.push("Your DTI ratio is high. Consider consolidating or paying off existing loans.")
    }

    // 4. Collateral impact (Max +0.15)
    if (collateralValue > 0 && loanAmount > 0) {
      if (collateralValue >= loanAmount) approvalScore += 0.15
      else if (collateralValue >= loanAmount * 0.5) approvalScore += 0.05
      else {
        tips.push("The value of your collateral is weak compared to the requested loan amount.")
      }
    }

    // 5. Savings impact (Max +0.15)
    if (savings > 0 && loanAmount > 0) {
      if (savings >= loanAmount * 0.2) approvalScore += 0.15
      else if (savings >= loanAmount * 0.1) approvalScore += 0.05
      else {
        tips.push("Your liquid savings are low. Having at least 10-20% of the loan amount saved up significantly strengthens your profile.")
      }
    }

    // 6. Existing loans penalty
    if (existingLoans >= 4) {
      approvalScore -= 0.20
      tips.push("You have too many active loans. Lenders consider this a high risk.")
    }
    else if (existingLoans >= 2) {
      approvalScore -= 0.05
    }

    // Auto-rejection checks (Critical Failures)
    if (creditScore > 0 && creditScore < 550) {
       approvalScore = Math.min(approvalScore, 0.4) // Cap score
    }
    if (dtiRatio > 0.6) {
       approvalScore = Math.min(approvalScore, 0.4) // Cap score
    }

    // Normalize score between 0 and 1
    approvalScore = Math.max(0, Math.min(1, approvalScore))

    // New Stricter Approval threshold: 0.65
    const approved = approvalScore >= 0.65

    return NextResponse.json({
      approved,
      confidence: approvalScore,
      tips,
    })
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: 'Failed to process prediction' },
      { status: 500 }
    )
  }
}
