import { Button } from './Button'
import { ConfidenceBadge } from './ConfidenceBadge'

// One quote line item: what the customer asked for, the product the AI suggests,
// how confident the match is, and what the user can do about it.

type Product = {
  name: string
  sku: string
}

type SuggestionRowProps =
  | {
      request: string
      confidence: 'high' | 'check'
      suggestion: Product
      onAccept?: () => void
      onChange?: () => void
    }
  | {
      request: string
      confidence: 'no-match'
      onSearch?: () => void
    }

export function SuggestionRow(props: SuggestionRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-16 border-b border-gray-200 bg-white px-16 py-12">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <p className="text-xs text-gray-600">{props.request}</p>
        {props.confidence === 'no-match' ? (
          <p className="text-sm text-gray-600">Kein passendes Produkt gefunden</p>
        ) : (
          <p className="text-sm text-gray-900">
            <span className="font-medium">{props.suggestion.name}</span>{' '}
            <span className="text-gray-600">· Art.-Nr. {props.suggestion.sku}</span>
          </p>
        )}
      </div>

      <ConfidenceBadge status={props.confidence} />

      {/* aria-labels name the item, since every row has buttons with the same text. */}
      <div className="flex gap-8">
        {props.confidence === 'no-match' ? (
          <Button size="sm" onClick={props.onSearch} aria-label={`Produkt suchen für: ${props.request}`}>
            Produkt suchen
          </Button>
        ) : (
          <>
            <Button size="sm" onClick={props.onAccept} aria-label={`${props.suggestion.name} übernehmen`}>
              Übernehmen
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={props.onChange}
              aria-label={`${props.suggestion.name} ändern`}
            >
              Ändern
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
