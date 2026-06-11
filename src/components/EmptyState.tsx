import type { ReactNode } from 'react'

interface EmptyStateProps {
  image: string
  alt: string
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  size?: 'md' | 'lg'
  className?: string
}

export function EmptyState({
  image,
  alt,
  title,
  description,
  action,
  size = 'lg',
  className = '',
}: EmptyStateProps) {
  return (
    <div className={['empty-state', `empty-state-${size}`, className].filter(Boolean).join(' ')}>
      <img className="empty-state-image" src={image} alt={alt} />
      {title && <span className="empty-state-title">{title}</span>}
      {description && <span className="empty-state-desc">{description}</span>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}
