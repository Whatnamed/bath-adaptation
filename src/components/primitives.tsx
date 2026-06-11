import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    loading ? 'btn-loading' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

type CardTone = 'default' | 'soft' | 'warm' | 'accent'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone
  interactive?: boolean
}

export function Card({ tone = 'default', interactive = false, className = '', children, ...props }: CardProps) {
  const baseClass = tone === 'default' ? 'card' : `card-${tone}`
  const classes = [baseClass, interactive ? 'card-interactive' : '', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

type ChipTone = 'accent' | 'warning' | 'danger' | 'info' | 'success'

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone
}

export function Chip({ tone = 'accent', className = '', children, ...props }: ChipProps) {
  return (
    <span className={['chip', `chip-${tone}`, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </span>
  )
}

interface SectionHeaderProps {
  title: ReactNode
  action?: ReactNode
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="section-title">{title}</span>
      {action}
    </div>
  )
}
