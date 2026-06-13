export function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-bar-time">9:41</span>
      <div className="status-bar-icons" aria-hidden="true">
        <span className="status-signal">
          <span />
          <span />
          <span />
          <span />
        </span>
        <svg className="status-wifi" viewBox="0 0 17 12" fill="none">
          <path d="M2.35 4.2a9 9 0 0 1 12.3 0" />
          <path d="M4.85 6.85a5.35 5.35 0 0 1 7.3 0" />
          <path d="M7.25 9.45a1.75 1.75 0 0 1 2.5 0" />
        </svg>
        <span className="status-battery">
          <span className="status-battery-fill" />
          <span className="status-battery-cap" />
        </span>
      </div>
    </div>
  )
}
