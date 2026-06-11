import { ClipboardList, Home, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface BottomNavItem {
  path: string
  label: string
  icon: ReactNode
}

const defaultItems: BottomNavItem[] = [
  { path: '/', label: '首页', icon: <Home size={24} /> },
  { path: '/services', label: '服务', icon: <ClipboardList size={24} /> },
  { path: '/profile', label: '我的', icon: <User size={24} /> },
]

interface BottomNavProps {
  items?: BottomNavItem[]
}

export function BottomNav({ items = defaultItems }: BottomNavProps) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
