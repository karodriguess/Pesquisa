const variants = {
  primary:
    'bg-brand text-white shadow-brand hover:bg-brand-dark disabled:bg-brand/30 disabled:shadow-none',
  ghost: 'bg-transparent text-muted hover:bg-surface hover:text-ink',
}

const sizes = {
  md: 'h-14 rounded-2xl px-6 text-base',
  sm: 'h-12 rounded-xl px-5 text-sm',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
