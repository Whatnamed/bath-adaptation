import { Clock } from 'lucide-react'
import { Chip } from './primitives'

interface ServiceCardProps {
  id: string
  title: string
  chipText: string
  items: string[]
  date: string
  onClick?: () => void
}

export function ServiceCard({ id, title, chipText, items, date, onClick }: ServiceCardProps) {
  return (
    <div className="service-card card-interactive" onClick={onClick}>
      <div className="service-card-header">
        <span className="service-card-id">{id}</span>
        <Chip>{chipText}</Chip>
      </div>

      <div className="service-card-title">{title}</div>

      <div className="chip-list">
        {items.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </div>

      <div className="service-card-meta">
        <Clock size={14} />
        {date}
      </div>
    </div>
  )
}
