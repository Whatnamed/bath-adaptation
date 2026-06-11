import type { ReactNode } from 'react'

interface PhoneShellProps {
  children: ReactNode
}

export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="phone-shell">
      <div className="phone-inner">{children}</div>
    </div>
  )
}

export function HomeIndicator() {
  return <div className="home-indicator" />
}
