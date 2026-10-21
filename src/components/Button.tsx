type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 font-medium transition-colors ${styles}`}
    >
      {label}
    </button>
  )
}
