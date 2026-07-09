import { CheckCircle2, AlertCircle } from 'lucide-react'

interface ResultCardProps {
  result: {
    approved: boolean
    confidence: number
    tips?: string[]
  }
}

export default function ResultCard({ result }: ResultCardProps) {
  const confidence = Math.round(result.confidence * 100)
  
  return (
    <div className={`mt-8 rounded-xl overflow-hidden border-2 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 ${
      result.approved 
        ? 'border-accent bg-gradient-to-br from-white to-[#f0fdf4]' 
        : 'border-destructive bg-gradient-to-br from-white to-[#fef2f2]'
    }`}>
      <div className="p-8">
        <div className="flex items-start gap-4 mb-6">
          {result.approved ? (
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
          ) : (
            <div className="flex-shrink-0">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
          )}
          <div className="flex-1">
            <h3 className={`text-2xl font-bold mb-2 ${
              result.approved ? 'text-accent' : 'text-destructive'
            }`}>
              {result.approved ? 'Congratulations!' : 'Approval Status'}
            </h3>
            <p className={`text-lg font-medium ${
              result.approved ? 'text-[#0a6b4f]' : 'text-[#991b1b]'
            }`}>
              {result.approved 
                ? 'Your loan is highly likely to be approved.' 
                : 'Your application may require review. Please check your credit metrics.'}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-white bg-opacity-60 rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-foreground">Confidence Score</span>
            <span className={`text-2xl font-bold ${
              result.approved ? 'text-accent' : 'text-destructive'
            }`}>
              {confidence}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-700 rounded-full ${
                result.approved 
                  ? 'bg-gradient-to-r from-accent to-[#059669]' 
                  : 'bg-gradient-to-r from-destructive to-[#dc2626]'
              }`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`rounded-lg p-4 mb-4 ${
          result.approved 
            ? 'bg-[#ecfdf5] border border-[#d1fae5] text-[#065f46]' 
            : 'bg-[#fef2f2] border border-[#fee2e2] text-[#7f1d1d]'
        }`}>
          <p className="text-sm font-medium">
            {result.approved
              ? '✓ Your application has strong approval potential. We recommend proceeding with the next steps.'
              : '⚠ Please review the insights below before reapplying.'}
          </p>
        </div>

        {/* Tips / Insights */}
        {result.tips && result.tips.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm mt-4">
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Actionable Insights
            </h4>
            <ul className="space-y-3">
              {result.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
