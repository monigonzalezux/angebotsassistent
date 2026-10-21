import type { Meta, StoryObj } from '@storybook/react-vite'

// Token names as defined in src/index.css. Values are read from the CSS at runtime,
// so this page always shows what the app actually uses.
const colorGroups = [
  { title: 'Neutral', tokens: ['gray-50', 'gray-100', 'gray-200', 'gray-400', 'gray-600', 'gray-900'] },
  { title: 'Brand', tokens: ['brand-primary'] },
  { title: 'Confidence', tokens: ['confidence-high', 'confidence-check', 'confidence-no-match'] },
  {
    title: 'Confidence tints — badge backgrounds only, not statuses',
    tokens: ['confidence-tint-high', 'confidence-tint-check', 'confidence-tint-no-match'],
  },
]

const spacingTokens = ['4', '8', '12', '16', '24']

function readToken(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

function ColorSwatch({ name }: { name: string }) {
  const variable = `--color-${name}`
  return (
    <div className="w-[160px] overflow-hidden rounded-lg ring-1 ring-gray-200">
      <div className="h-[56px]" style={{ background: `var(${variable})` }} />
      <div className="p-12">
        <p className="text-xs font-medium text-gray-900">{name}</p>
        <p className="font-mono text-xs text-gray-600">{readToken(variable)}</p>
        <p className="font-mono text-xs text-gray-400">bg-{name}</p>
      </div>
    </div>
  )
}

function SpacingRow({ name }: { name: string }) {
  const variable = `--spacing-${name}`
  return (
    <div className="flex items-center gap-16">
      <p className="w-[96px] text-xs font-medium text-gray-900">spacing-{name}</p>
      <p className="w-[48px] font-mono text-xs text-gray-600">{readToken(variable)}</p>
      <div className="bg-brand-primary h-[16px] rounded-sm" style={{ width: `var(${variable})` }} />
      <p className="font-mono text-xs text-gray-400">p-{name}, gap-{name}, m-{name}</p>
    </div>
  )
}

function TokensPage() {
  return (
    <div className="flex flex-col gap-24 p-24 font-sans">
      <section className="flex flex-col gap-24">
        <h2 className="text-xl font-semibold text-gray-900">Colors</h2>
        {colorGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-8">
            <h3 className="text-xs font-medium text-gray-600">{group.title}</h3>
            <div className="flex flex-wrap gap-16">
              {group.tokens.map((name) => (
                <ColorSwatch key={name} name={name} />
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-16">
        <h2 className="text-xl font-semibold text-gray-900">Spacing</h2>
        <div className="flex flex-col gap-12">
          {spacingTokens.map((name) => (
            <SpacingRow key={name} name={name} />
          ))}
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: 'Foundations/Tokens',
  component: TokensPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TokensPage>

export default meta
type Story = StoryObj<typeof meta>

export const AllTokens: Story = {}
