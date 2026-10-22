import { Button } from './Button'
import { ConfidenceBadge } from './ConfidenceBadge'

// One quote line item: what the customer asked for, the product the AI suggests,
// how confident the match is, and what the user can do about it.
// "error" means the line itself couldn't be read (e.g. missing quantity), so no match was attempted.

type Product = {
  name: string
  sku: string
}

type SuggestionRowProps = {
  request: string
  position?: string
  quantity?: number | null
  unit?: string
} & (
  | {
      confidence: 'high' | 'check'
      suggestion: Product
      onAccept?: () => void
      onChange?: () => void
    }
  | {
      confidence: 'no-match'
      onSearch?: () => void
    }
  | {
      confidence: 'error'
      error: string
      onEdit?: () => void
    }
)

export function SuggestionRow(props: SuggestionRowProps) {
  const isError = props.confidence === 'error'
  // e.g. "01.0010 · 500 Stk · Sechskantschraube M8 x 40"
  const details = [props.position, props.quantity != null && `${props.quantity} ${props.unit ?? ''}`.trim(), props.request]
    .filter(Boolean)
    .join(' · ')

  return (
    <div
      className={`flex flex-wrap items-center gap-16 border-b border-gray-200 px-16 py-12 ${isError ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <p className="text-xs text-gray-600">{details}</p>
        {props.confidence === 'error' ? (
          <p className="text-sm font-medium text-gray-900">Fehler: {props.error}</p>
        ) : props.confidence === 'no-match' ? (
          <p className="text-sm text-gray-600">Kein passendes Produkt gefunden</p>
        ) : (
          <p className="text-sm text-gray-900">
            <span className="font-medium">{props.suggestion.name}</span>{' '}
            <span className="text-gray-600">· Art.-Nr. {props.suggestion.sku}</span>
          </p>
        )}
      </div>

      {/* No badge for errors: the line couldn't be read, so there is no match confidence. */}
      {props.confidence !== 'error' && <ConfidenceBadge status={props.confidence} />}

      {/* aria-labels name the item, since every row has buttons with the same text. */}
      <div className="flex gap-8">
        {props.confidence === 'error' ? (
          <Button size="sm" onClick={props.onEdit} aria-label={`Zeile bearbeiten: ${props.request}`}>
            Zeile bearbeiten
          </Button>
        ) : props.confidence === 'no-match' ? (
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
