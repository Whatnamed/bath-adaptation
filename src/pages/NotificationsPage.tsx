import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

/* 空状态插画导入 */
import emptyNotifications from '../assets/images/04_empty_states/empty_no_notifications.png'

/* ── 消息通知页 ── */
export default function NotificationsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ── 页面头部 ── */}
      <div className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">消息通知</span>
      </div>

      {/* ── 页面内容 ── */}
      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto' }}>
        <div
          className="page-enter"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 0',
            gap: '16px',
          }}
        >
          <img
            src={emptyNotifications}
            alt="暂无通知"
            style={{ width: 140, height: 140, objectFit: 'contain' }}
          />
          <span
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 'var(--weight-medium)',
            }}
          >
            暂无消息通知
          </span>
          <span
            style={{
              color: 'var(--text-tertiary)',
              fontSize: 'var(--text-caption)',
              textAlign: 'center',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '240px',
            }}
          >
            服务进度更新、维护提醒等消息将在这里显示
          </span>
        </div>
      </div>
    </div>
  )
}
