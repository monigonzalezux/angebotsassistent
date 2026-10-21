import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfidenceBadge } from './ConfidenceBadge'

const meta = {
  title: 'Components/ConfidenceBadge',
  component: ConfidenceBadge,
  argTypes: {
    status: { control: 'inline-radio', options: ['high', 'check', 'no-match'] },
  },
} satisfies Meta<typeof ConfidenceBadge>

export default meta
type Story = StoryObj<typeof meta>

export const High: Story = {
  args: { status: 'high' },
}

export const Check: Story = {
  args: { status: 'check' },
}

export const NoMatch: Story = {
  args: { status: 'no-match' },
}

export const AllVariants: Story = {
  args: { status: 'high' },
  render: () => (
    <div className="flex gap-16">
      <ConfidenceBadge status="high" />
      <ConfidenceBadge status="check" />
      <ConfidenceBadge status="no-match" />
    </div>
  ),
}
