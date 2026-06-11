export function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-bar-time">9:41</span>
      <div className="status-bar-icons">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="currentColor" transform="translate(0, -2)" />
          <path d="M5 9a4.24 4.24 0 0 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, -2)" />
          <path d="M2.5 6.5a7.78 7.78 0 0 1 11 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, -2)" />
          <path d="M0.5 4A11.31 11.31 0 0 1 15.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, -2)" />
        </svg>
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="22" height="11" rx="2" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="2" y="2" width="19" height="8" rx="1" fill="currentColor" />
          <path d="M24 4v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
