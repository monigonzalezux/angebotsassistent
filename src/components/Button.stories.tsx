import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button, type ButtonSize, type ButtonVariant } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Neues Angebot', variant: 'primary', size: 'md', disabled: false, onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

// Variant × size

export const PrimarySmall: Story = { args: { variant: 'primary', size: 'sm' } }
export const PrimaryMedium: Story = { args: { variant: 'primary', size: 'md' } }
export const PrimaryLarge: Story = { args: { variant: 'primary', size: 'lg' } }
export const SecondarySmall: Story = { args: { variant: 'secondary', size: 'sm', children: 'Abbrechen' } }
export const SecondaryMedium: Story = { args: { variant: 'secondary', size: 'md', children: 'Abbrechen' } }
export const SecondaryLarge: Story = { args: { variant: 'secondary', size: 'lg', children: 'Abbrechen' } }

// States, shown on both variants. Hover, pressed and focus are simulated by
// storybook-addon-pseudo-states, so they show without using the mouse or keyboard.

const BothVariants: Story['render'] = (args) => (
  <div className="flex gap-16">
    <Button {...args} variant="primary">Neues Angebot</Button>
    <Button {...args} variant="secondary">Abbrechen</Button>
  </div>
)

export const Hover: Story = { render: BothVariants, parameters: { pseudo: { hover: true } } }
export const Pressed: Story = { render: BothVariants, parameters: { pseudo: { active: true } } }
export const KeyboardFocus: Story = { render: BothVariants, parameters: { pseudo: { focusVisible: true } } }
export const Disabled: Story = { render: BothVariants, args: { disabled: true } }

// Every variant × size × state in one grid.

const variants: ButtonVariant[] = ['primary', 'secondary']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']
const states = ['default', 'hover', 'pressed', 'focus', 'disabled'] as const

export const AllCombinations: Story = {
  parameters: {
    pseudo: {
      hover: ['[data-state="hover"]'],
      active: ['[data-state="pressed"]'],
      focusVisible: ['[data-state="focus"]'],
    },
  },
  render: () => (
    <table className="border-separate border-spacing-16 text-left text-xs text-gray-600">
      <thead>
        <tr>
          <th />
          {states.map((state) => (
            <th key={state} className="font-medium capitalize">
              {state}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {variants.flatMap((variant) =>
          sizes.map((size) => (
            <tr key={`${variant}-${size}`}>
              <th className="font-medium">
                {variant} / {size}
              </th>
              {states.map((state) => (
                <td key={state}>
                  <Button variant={variant} size={size} disabled={state === 'disabled'} data-state={state}>
                    {variant === 'primary' ? 'Neues Angebot' : 'Abbrechen'}
                  </Button>
                </td>
              ))}
            </tr>
          )),
        )}
      </tbody>
    </table>
  ),
}
