import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button, Chip } from './primitives'

interface ProductCardProps {
  name: string
  desc: string
  image?: string
  fallbackIcon?: ReactNode
  tag?: string
  price?: number
  selected?: boolean
  onToggle?: () => void
  onOpen?: () => void
}

export function ProductCard({
  name,
  desc,
  image,
  fallbackIcon,
  tag,
  price,
  selected = false,
  onToggle,
  onOpen,
}: ProductCardProps) {
  return (
    <div
      className={`product-card stagger-item ${selected ? 'is-selected' : ''} ${onOpen ? 'is-clickable' : ''}`}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (!onOpen) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
    >
      {selected && (
        <div className="product-card-check">
          <Check size={14} color="#fff" strokeWidth={3} />
        </div>
      )}

      <div className="product-card-media">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="product-card-fallback">{fallbackIcon}</div>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-card-heading">
          <span className="product-card-name">{name}</span>
          {tag && <Chip>{tag}</Chip>}
        </div>
        <div className="product-card-desc">{desc}</div>
        <div className="product-card-footer">
          <div className="product-card-price">¥{price ?? '—'}</div>
          <Button
            type="button"
            variant={selected ? 'primary' : 'ghost'}
            className={`product-card-select ${selected ? 'is-selected' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              onToggle?.()
            }}
          >
            {selected ? (
              <>
                <Check size={14} /> 已选
              </>
            ) : (
              '选择'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
