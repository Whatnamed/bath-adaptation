import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export interface MenuGroupItem {
  icon: ReactNode
  iconBg?: string
  iconColor?: string
  label: string
  desc?: string
  onClick?: () => void
}

interface MenuGroupProps {
  items: MenuGroupItem[]
}

export function MenuGroup({ items }: MenuGroupProps) {
  return (
    <div className="menu-group">
      {items.map((item) => (
        <button className="menu-item" key={item.label} onClick={item.onClick}>
          <div
            className="menu-item-icon"
            style={{ background: item.iconBg, color: item.iconColor }}
          >
            {item.icon}
          </div>
          <div className="menu-item-content">
            <div className="menu-item-label">{item.label}</div>
            {item.desc && <div className="menu-item-desc">{item.desc}</div>}
          </div>
          <ChevronRight size={16} color="var(--text-tertiary)" />
        </button>
      ))}
    </div>
  )
}
