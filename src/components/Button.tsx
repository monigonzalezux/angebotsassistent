import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

// Hover and pressed styles use "enabled:" so a disabled button doesn't react.
// Full class names (not built from strings) so Tailwind can find them.
const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white enabled:hover:bg-brand-primary/90 enabled:active:bg-brand-primary/80',
  secondary:
    'bg-white text-gray-900 ring-1 ring-inset ring-gray-200 enabled:hover:bg-gray-50 enabled:active:bg-gray-100',
}

// Heights: sm 24px, md 36px, lg 48px.
const sizes: Record<ButtonSize, string> = {
  sm: 'gap-4 px-12 py-4 text-xs',
  md: 'gap-8 px-16 py-8 text-sm',
  lg: 'gap-8 px-24 py-12 text-base',
}

export function Button({ variant = 'primary', size = 'md', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]}`}
      {...props}
    />
  )
}
