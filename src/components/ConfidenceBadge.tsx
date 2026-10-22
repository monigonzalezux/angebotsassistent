// Compact AI match-confidence badge for quotation line items and matching tables.
// high = strong product match, check = needs human review before the quote is sent,
// no-match = no confident match found.
export type ConfidenceStatus = 'high' | 'check' | 'no-match'

type ConfidenceBadgeProps = {
  status: ConfidenceStatus
}

// Full class names (not built from strings) so Tailwind can find them.
const variants: Record<ConfidenceStatus, { label: string; badge: string; dot: string }> = {
  high: { label: 'High', badge: 'bg-confidence-tint-high', dot: 'bg-confidence-high' },
  check: { label: 'Check', badge: 'bg-confidence-tint-check', dot: 'bg-confidence-check' },
  'no-match': { label: 'No match', badge: 'bg-confidence-tint-no-match', dot: 'bg-confidence-no-match' },
}

export function ConfidenceBadge({ status }: ConfidenceBadgeProps) {
  const { label, badge, dot } = variants[status]

  return (
    <span
      className={`inline-flex items-center gap-4 rounded-full px-8 py-4 text-xs font-medium whitespace-nowrap text-gray-900 ${badge}`}
    >
      <span aria-hidden="true" className={`size-[6px] shrink-0 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
