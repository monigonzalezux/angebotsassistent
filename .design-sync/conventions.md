# Angebotsassistent design system: how to build with it

A small React design system for an AI quotation assistant (German B2B tenders). Components: `Button`, `ConfidenceBadge`, `SuggestionRow`, all on `window.Angebotsassistent`. UI copy is German.

## Setup
- No provider or theme wrapper. Components work as soon as `styles.css` is loaded (it imports `_ds_bundle.css`, which holds every token and the component styles).
- Read `styles.css` / `_ds_bundle.css` and each component's `.prompt.md` and `.d.ts` before styling.

## Styling idiom: tokens as CSS variables
The stylesheet is compiled Tailwind and contains **only the classes the components use**, so arbitrary Tailwind classes (e.g. `p-16`, `gap-6`, `bg-red-500`) will not resolve. For your own layout glue, use inline styles with the token variables below. They are always defined.

| Family | Variables |
|---|---|
| Neutral | `--color-gray-50`, `--color-gray-100`, `--color-gray-200`, `--color-gray-400`, `--color-gray-600`, `--color-gray-900`, `--color-white` |
| Brand | `--color-brand-primary` |
| Confidence (status) | `--color-confidence-high`, `--color-confidence-check`, `--color-confidence-no-match` |
| Confidence tints (badge backgrounds only, never a status color on their own) | `--color-confidence-tint-high`, `--color-confidence-tint-check`, `--color-confidence-tint-no-match` |
| Spacing (px-named: `--spacing-16` = 16px) | `--spacing-4`, `--spacing-8`, `--spacing-12`, `--spacing-16`, `--spacing-24` |
| Text size | `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px), `--text-xl`, `--text-4xl` |
| Weight | `--font-weight-medium` (500), `--font-weight-semibold` (600), `--font-weight-bold` |

Rules:
- Only these spacing steps exist. Don't invent 6, 10 or 20px gaps.
- Text: `--color-gray-900` for primary text, `--color-gray-600` for secondary text. Lines and dividers: `--color-gray-200`. Page or row background for emphasis: `--color-gray-50`.
- `--color-brand-primary` is for primary actions and focus. There is **no red/error color**: show errors in words ("Fehler: …"), not color.
- Shapes are pills (`border-radius: 9999px`) for buttons and badges.

## Components
- `Button`: `variant` `"primary" | "secondary"`, `size` `"sm" | "md" | "lg"` (24/36/48px tall), text as children, all native button props (`disabled`, `type`, `aria-label`). One primary button per area; secondary for the alternative action.
- `ConfidenceBadge`: `status` `"high" | "check" | "no-match"`. High = strong product match, Check = needs human review before the quote is sent, No match = nothing found.
- `SuggestionRow`: one tender line. `request` (what the customer asked for), optional `position`, `quantity`, `unit`, and `confidence`:
  - `"high"` / `"check"` need `suggestion: { name, sku }`, plus `onAccept` / `onChange`.
  - `"no-match"`: `onSearch`.
  - `"error"`: `error` message and `onEdit`, for lines that couldn't be read.

  Stack rows directly; each row draws its own bottom divider.

## Example
```jsx
const { Button, SuggestionRow } = window.Angebotsassistent

<section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', padding: 'var(--spacing-24)', background: 'var(--color-white)' }}>
  <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-gray-900)' }}>Angebot prüfen</h2>
  <div style={{ borderTop: '1px solid var(--color-gray-200)' }}>
    <SuggestionRow position="01.0010" quantity={500} unit="Stk" request="Sechskantschraube M8 x 40, verzinkt"
      confidence="high" suggestion={{ name: 'Sechskantschraube DIN 933 M8 x 40, verzinkt', sku: '933-0840-VZ' }} />
    <SuggestionRow position="03.0060" quantity={null} unit="m" request="Leerrohr flexibel M25, grau"
      confidence="error" error="Menge fehlt in der Ausschreibung" />
  </div>
  <div style={{ display: 'flex', gap: 'var(--spacing-8)', justifyContent: 'flex-end' }}>
    <Button variant="secondary">Abbrechen</Button>
    <Button>Angebot erstellen</Button>
  </div>
</section>
```
