<a href=https://credit-wise-1.onrender.com>Credit_wise-A loan approval</a>

A modern fintech web application that predicts loan approval status using AI-powered analysis. Built with Next.js 16, React 19, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Comprehensive Loan Application Form** - Collects detailed financial and personal information
- **Real-time Prediction** - Instant loan approval status with confidence scores
- **Beautiful Result Cards** - Visual feedback for approval or denial with actionable recommendations
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### 💼 Form Fields Collected
- **Income Information**: Applicant and co-applicant income
- **Employment Details**: Employment status and employer category
- **Personal Information**: Age, gender, marital status, and dependents
- **Credit & Financial Metrics**: Credit score, existing loans, DTI ratio, and savings
- **Loan Details**: Loan amount, term, collateral value, and purpose
- **Property & Education**: Property area and education level

### 🎨 Design
- **Fintech Aesthetic**: Deep blue (#003366) primary color with emerald green (#10b981) accents
- **Trust-Focused**: Clean, professional layout with organized sections
- **Card-Based UI**: Modern card designs with shadow and border styling
- **Smooth Animations**: Fade-in animations for result cards
- **Accessibility**: Semantic HTML and proper ARIA labels

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19.2
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui Button, custom form components
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)
- **API**: Next.js API Routes

## Project Structure

```
/app
  /api
    /predict              # Prediction endpoint
      route.ts
  layout.tsx              # Root layout with theme colors
  page.tsx                # Main application page
  globals.css             # Theme configuration & styles

/components
  header.tsx              # Application header with logo
  loan-application-form.tsx  # Main form component
  form-input.tsx          # Reusable input component
  form-select.tsx         # Reusable select component
  result-card.tsx         # Result display component
  ui/
    button.tsx            # shadcn button component
```

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:3000
```

### Building for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## API Endpoint

### POST `/api/predict`

Predicts loan approval status based on applicant financial data.

**Request Body:**
```json
{
  "applicant_income": 60000,
  "coapplicant_income": 30000,
  "employment_status": "Salaried",
  "age": 35,
  "marital_status": "Married",
  "dependents": 2,
  "credit_score": 750,
  "existing_loans": 1,
  "dti_ratio": 0.35,
  "savings": 50000,
  "collateral_value": 300000,
  "loan_amount": 200000,
  "loan_term": 60,
  "loan_purpose": "Home",
  "property_area": "Urban",
  "education_level": "Graduate",
  "gender": "Male",
  "employer_category": "Private"
}
```

**Response:**
```json
{
  "approved": true,
  "confidence": 0.95
}
```

## Approval Algorithm

The prediction uses a weighted scoring system that evaluates:

1. **Credit Score** (0-0.25 weight)
   - 750+: 0.25
   - 700-749: 0.20
   - 650-699: 0.15
   - 600-649: 0.10
   - <600: 0.05

2. **Income Analysis** (0-0.20 weight)
   - >$100k: 0.20
   - >$75k: 0.15
   - >$50k: 0.10
   - >$30k: 0.05

3. **Debt-to-Income Ratio** (0-0.15 weight)
   - ≤0.3: 0.15
   - ≤0.4: 0.10
   - ≤0.5: 0.05
   - >0.5: -0.05

4. **Collateral** (0-0.15 weight)
   - ≥1.5x loan: 0.15
   - ≥1.0x loan: 0.10
   - ≥0.5x loan: 0.05

5. **Savings** (0-0.10 weight)
   - ≥50% of income: 0.10
   - ≥20% of income: 0.05

6. **Other Factors**
   - Existing loans penalty: -0.10 (>3 loans)
   - Loan-to-income ratio penalty: -0.05 to -0.10

**Approval Threshold**: Score ≥ 0.5 = Approved

## Color Scheme

- **Primary**: #003366 (Deep Blue) - Trust & Stability
- **Accent**: #10b981 (Emerald Green) - Success & Approval
- **Background**: #f8f9fb (Light Gray-Blue) - Clean, Professional
- **Surface**: #ffffff (White) - Cards & Content Areas
- **Text**: #1a1d23 (Dark Gray) - Primary text
- **Muted**: #6b7684 (Medium Gray) - Secondary text

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **First Contentful Paint (FCP)**: <1s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **Time to Interactive (TTI)**: <3s

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper ARIA labels for form fields
- ✅ Keyboard navigation support
- ✅ Color contrast compliance (WCAG AA)
- ✅ Screen reader friendly

## Future Enhancements

- [ ] Integration with real ML model for better predictions
- [ ] User authentication and saved applications
- [ ] Loan history tracking
- [ ] Document upload support
- [ ] Real-time interest rate calculation
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with credit bureaus

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
