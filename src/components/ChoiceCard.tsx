import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Chip, IconBadge } from './primitives'

interface ChoiceCardProps {
  icon: ReactNode
  title: string
  desc: string
  chip?: string
  tone?: 'accent' | 'warning' | 'info' | 'success' | 'neutral'
  onClick: () => void
}

export function ChoiceCard({ icon, title, desc, chip, tone = 'accent', onClick }: ChoiceCardProps) {
  return (
    <button className="choice-card card-interactive" onClick={onClick}>
      <IconBadge size="lg" tone={tone}>
        {icon}
      </IconBadge>
      <div className="choice-card-content">
        <div className="choice-card-title">{title}</div>
        <div className="choice-card-desc">{desc}</div>
        {chip && <Chip>{chip}</Chip>}
      </div>
      <ChevronRight size={18} className="choice-card-arrow" />
    </button>
  )
}
