import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
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
    request: 'Sechskantschraube M8 x 40, verzinkt, 500 Stück',
    confidence: 'high',
    suggestion: { name: 'Sechskantschraube DIN 933 M8 x 40, verzinkt', sku: '933-0840-VZ' },
    onAccept: fn(),
    onChange: fn(),
  },
}

export const Check: Story = {
  args: {
    request: 'Dübel für Beton, 10 mm, ca. 200 Stück',
    confidence: 'check',
    suggestion: { name: 'Universaldübel UX 10 x 60', sku: 'UX-1060' },
    onAccept: fn(),
    onChange: fn(),
  },
}

export const NoMatch: Story = {
  args: {
    request: 'Edelstahl-Winkel 90°, Sonderanfertigung nach Zeichnung',
    confidence: 'no-match',
    onSearch: fn(),
  },
}
