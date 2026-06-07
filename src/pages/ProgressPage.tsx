import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Phone,
  ClipboardCheck,
  ChevronRight,
} from 'lucide-react'
import { serviceOrder, serviceTimeline, contacts } from '../data/mock'

/* ── 服务进度详情页 ── */
export default function ProgressPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={22} />
        </button>
        <span className="page-header-title">服务进度</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
        {/* ── 当前阶段卡片 ── */}
        <div className="card page-section">
          <div
            className="flex items-center"
            style={{ justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}
          >
            <span
              style={{
                fontSize: 'var(--text-caption)',
                color: 'var(--text-tertiary)',
              }}
            >
              服务单号：{serviceOrder.id}
            </span>
            <span className="chip chip-accent">{serviceOrder.statusText}</span>
          </div>
          <div
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            当前处于 <strong style={{ color: 'var(--accent-deep)' }}>方案确认</strong> 阶段，请查看推荐改造方案并确认
          </div>
        </div>

        {/* ── 时间线 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">进度时间线</span>
          </div>

          <div className="card">
          <div className="timeline">
            {serviceTimeline.map((item, i) => {
              /* 节点样式 */
              const dotClass =
                item.status === 'done'
                  ? 'timeline-dot-done'
                  : item.status === 'current'
                  ? 'timeline-dot-current'
                  : 'timeline-dot-pending'

              /* 标题颜色 */
              const titleStyle: React.CSSProperties =
                item.status === 'pending'
                  ? { color: 'var(--text-tertiary)' }
                  : {}

              return (
                <div className="timeline-item" key={i}>
                  <div className={`timeline-dot ${dotClass}`} />
                  <div className="timeline-header">
                    <span className="timeline-title" style={titleStyle}>
                      {item.step}
                    </span>
                    <span className="timeline-date">{item.date}</span>
                  </div>
                  <div className="timeline-desc">{item.desc}</div>
                  {item.person && (
                    <div
                      className="chip chip-accent"
                      style={{ marginTop: 'var(--space-2)' }}
                    >
                      {item.person}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          </div>
        </div>

        {/* ── 服务协同 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">服务协同</span>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {contacts.map((person, i) => (
              <div
                className="list-row"
                key={i}
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  borderBottom:
                    i < contacts.length - 1
                      ? '1px solid var(--border-light)'
                      : 'none',
                }}
              >
                {/* 头像 */}
                <div
                  className="avatar avatar-sm"
                  style={{
                    background: 'var(--accent-soft)',
                    width: 40,
                    height: 40,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-label)',
                      fontWeight: 'var(--weight-semibold)',
                      color: 'var(--accent-deep)',
                    }}
                  >
                    {person.name.slice(-1)}
                  </span>
                </div>

                {/* 信息 */}
                <div className="list-row-content">
                  <div
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {person.name}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-tertiary)',
                      marginTop: 1,
                    }}
                  >
                    {person.role} · {person.phone}
                  </div>
                </div>

                {/* 电话按钮 */}
                <div className="list-row-accessory">
                  <div
                    className="icon-circle icon-circle-md"
                    style={{
                      background: 'var(--accent-soft)',
                      color: 'var(--accent)',
                      cursor: 'pointer',
                    }}
                  >
                    <Phone size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 底部 CTA ── */}
        <div className="fixed-bottom">
          <button
            className="btn btn-primary btn-block btn-lg"
            onClick={() => navigate('/plan')}
          >
            <ClipboardCheck size={20} />
            查看推荐方案
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  )
}
