import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  ClipboardList,
  User,
  ChevronRight,
  Package,
  Clock,
} from 'lucide-react'
import { serviceHistory } from '../data/mock'

/* ── 服务页面 ── */
export default function ServicesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current')

  /* Tab 按钮通用样式 */
  const tabBaseStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: '8px 0',
    marginRight: '24px',
    fontSize: 'var(--text-body-sm)',
    fontWeight: 'var(--weight-medium)',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    paddingBottom: '12px',
  }

  /* 选中 / 未选中样式 */
  const tabActiveStyle: React.CSSProperties = {
    color: 'var(--accent-deep)',
    borderBottomColor: 'var(--accent)',
  }
  const tabInactiveStyle: React.CSSProperties = {
    color: 'var(--text-tertiary)',
  }

  return (
    <>
      {/* ── 页面内容 ── */}
      <div className="page-content">
        {/* 页面标题 */}
        <div style={{ padding: '4px 0 16px' }}>
          <h1
            style={{
              fontSize: 'var(--text-title)',
              fontWeight: 'var(--weight-semibold)',
            }}
          >
            服务
          </h1>
        </div>

        {/* Tab 切换器 */}
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <button
            style={{
              ...tabBaseStyle,
              ...(activeTab === 'current' ? tabActiveStyle : tabInactiveStyle),
            }}
            onClick={() => setActiveTab('current')}
          >
            当前服务
          </button>
          <button
            style={{
              ...tabBaseStyle,
              ...(activeTab === 'history' ? tabActiveStyle : tabInactiveStyle),
            }}
            onClick={() => setActiveTab('history')}
          >
            历史记录
          </button>
        </div>

        {/* ── 当前服务 tab ── */}
        {activeTab === 'current' && (
          <div className="page-section">
            {serviceHistory
              .filter((s) => s.status === 'in_progress')
              .map((service) => (
                <div
                  className="service-card"
                  key={service.id}
                  onClick={() => navigate('/progress')}
                  style={{ cursor: 'pointer' }}
                >
                  {/* 卡片头部 */}
                  <div className="service-card-header">
                    <span className="service-card-id">{service.id}</span>
                    <span className="chip chip-accent">进行中</span>
                  </div>

                  {/* 标题 */}
                  <div className="service-card-title">{service.title}</div>

                  {/* 改造项标签 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {service.items.map((item) => (
                      <span className="chip chip-accent" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* 日期 */}
                  <div className="service-card-meta">
                    <Clock size={14} />
                    {service.date}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* ── 历史记录 tab ── */}
        {activeTab === 'history' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 0',
              gap: '16px',
            }}
          >
            <Package size={48} color="var(--text-tertiary)" />
            <span
              style={{
                color: 'var(--text-tertiary)',
                fontSize: 'var(--text-body-sm)',
              }}
            >
              暂无历史服务记录
            </span>
          </div>
        )}
      </div>

      {/* ── 底部导航 ── */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <Home size={24} />
          <span className="bottom-nav-label">首页</span>
        </button>
        <button
          className={`bottom-nav-item ${location.pathname === '/services' ? 'active' : ''}`}
          onClick={() => navigate('/services')}
        >
          <ClipboardList size={24} />
          <span className="bottom-nav-label">服务</span>
        </button>
        <button
          className={`bottom-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <User size={24} />
          <span className="bottom-nav-label">我的</span>
        </button>
      </nav>
    </>
  )
}
