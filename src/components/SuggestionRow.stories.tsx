import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { tenderLines } from '../data/tenderLines'
import { SuggestionRow } from './SuggestionRow'

const meta = {
  title: 'Components/SuggestionRow',
  component: SuggestionRow,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SuggestionRow>

export default meta
type Story = StoryObj<typeof meta>

export const High: Story = {
  args: {
    position: '01.0010',
    quantity: 500,
    unit: 'Stk',
    request: 'Sechskantschraube M8 x 40, verzinkt',
    confidence: 'high',
    suggestion: { name: 'Sechskantschraube DIN 933 M8 x 40, verzinkt', sku: '933-0840-VZ' },
    onAccept: fn(),
    onChange: fn(),
  },
}

export const Check: Story = {
  args: {
    position: '01.0050',
    quantity: 200,
    unit: 'Stk',
    request: 'Dübel für Beton, 10 mm, ca. 200 Stück',
    confidence: 'check',
    suggestion: { name: 'Universaldübel UX 10 x 60', sku: 'UX-1060' },
    onAccept: fn(),
    onChange: fn(),
  },
}

export const NoMatch: Story = {
  args: {
    position: '05.0040',
    quantity: 8,
    unit: 'Stk',
    request: 'Edelstahl-Winkel 90°, Sonderanfertigung nach Zeichnung',
    confidence: 'no-match',
    onSearch: fn(),
  },
}

// "ErrorLine" in code to avoid clashing with JavaScript's built-in Error.
export const ErrorLine: Story = {
  name: 'Error',
  args: {
    position: '03.0060',
    quantity: null,
    unit: 'm',
    request: 'Leerrohr flexibel M25, grau',
    confidence: 'error',
    error: 'Menge fehlt in der Ausschreibung',
    onEdit: fn(),
  },
}

// All 30 fake tender lines from src/data/tenderLines.ts as one list.
export const AllTenderLines: Story = {
  args: High.args as Story['args'],
  render: () => {
    const count = (confidence: string) => tenderLines.filter((line) => line.confidence === confidence).length
    return (
      <div className="flex flex-col gap-12 bg-white pt-12">
        <p className="text-xs text-gray-600">
          {tenderLines.length} Positionen · {count('high')} High · {count('check')} Check · {count('no-match')} No match ·{' '}
          {count('error')} Fehler
        </p>
        <div className="border-t border-gray-200">
          {tenderLines.map((line) => (
            <SuggestionRow key={line.position} {...line} />
          ))}
        </div>
      </div>
    )
  },
}
