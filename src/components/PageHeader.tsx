import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: ReactNode
  onBack?: () => void
  backTo?: string
  iconSize?: number
}

export function PageHeader({ title, onBack, backTo, iconSize = 20 }: PageHeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    if (backTo) {
      navigate(backTo)
      return
    }
    navigate(-1)
  }

  return (
    <header className="page-header">
      <button className="page-header-back" onClick={handleBack}>
        <ChevronLeft size={iconSize} />
      </button>
      <h1 className="page-header-title">{title}</h1>
    </header>
  )
}
