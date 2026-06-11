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

type Tone = 'accent' | 'warning' | 'danger' | 'info' | 'success' | 'neutral'
type IconBadgeSize = 'sm' | 'md' | 'lg'

interface IconBadgeProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  size?: IconBadgeSize
}

export function IconBadge({
  tone = 'accent',
  size = 'md',
  className = '',
  children,
  ...props
}: IconBadgeProps) {
  return (
    <div
      className={['icon-badge', `icon-badge-${tone}`, `icon-badge-${size}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

interface FixedBottomBarProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'attached' | 'floating'
}

export function FixedBottomBar({
  variant = 'attached',
  className = '',
  children,
  ...props
}: FixedBottomBarProps) {
  return (
    <div
      className={['fixed-bottom', `fixed-bottom-${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

interface InfoNoteProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  icon?: ReactNode
}

export function InfoNote({ tone = 'accent', icon, className = '', children, ...props }: InfoNoteProps) {
  return (
    <div className={['info-note', `info-note-${tone}`, className].filter(Boolean).join(' ')} {...props}>
      {icon && <span className="info-note-icon">{icon}</span>}
      <span className="info-note-text">{children}</span>
    </div>
  )
}
