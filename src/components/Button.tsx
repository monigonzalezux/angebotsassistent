type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-brand-primary text-white hover:opacity-90'
      : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-16 py-8 font-medium transition ${styles}`}
    >
      {label}
    </button>
  )
}
