import { useNavigate } from 'react-router-dom'
import { EmptyState, PageHeader } from '../components'

/* 空状态插画导入 */
import emptyNotifications from '../assets/images/04_empty_states/empty_no_notifications.png'

/* ── 消息通知页 ── */
export default function NotificationsPage() {
  const navigate = useNavigate()

  return (
    <div className="screen-frame">
      {/* ── 页面头部 ── */}
      <PageHeader title="消息通知" onBack={() => navigate(-1)} />

      {/* ── 页面内容 ── */}
      <div className="subpage-content">
        <EmptyState
          className="page-enter"
          size="md"
          image={emptyNotifications}
          alt="暂无通知"
          title="暂无消息通知"
          description="服务进度更新、维护提醒等消息将在这里显示"
        />
      </div>
    </div>
  )
}
