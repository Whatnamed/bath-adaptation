import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  ClipboardList,
  User,
  Package,
  Clock,
  Link as LinkIcon,
  Plus,
} from 'lucide-react'
import { serviceHistory } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'

/* ── 服务页面 ── */
export default function ServicesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { stage, familyDetails } = useAppStage()
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current')

  /* 判断是否有活跃服务（只有进入评估流程之后才有） */
  const hasActiveService = ![
    'unbound',
    'idle',
  ].includes(stage)

  /* 根据阶段动态确定状态文案和 chip */
  const stageStatusMap: Record<string, { text: string; chipText: string }> = {
    assessment_pending: { text: '等待评估', chipText: '等待中' },
    self_assessing: { text: '自行评估中', chipText: '进行中' },
    plan_pending: { text: '方案待确认', chipText: '进行中' },
    plan_confirmed: { text: '待安装', chipText: '已预约' },
    installing: { text: '安装中', chipText: '进行中' },
    completed: { text: '已完成', chipText: '已完成' },
  }

  const currentStatus = stageStatusMap[stage]

  /* Tab 按钮通用样式 */
  const tabBaseStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: '8px 0',
    marginRight: '24px',
    fontSize: 'var(--text-body-sm)',
    fontWeight: 'var(--weight-medium)',
    cursor: 'pointer',
    paddingBottom: '12px',
    borderBottom: '2px solid transparent',
    transition: 'color 0.2s ease, border-color 0.2s ease',
  }

  /* 选中样式 - 显示下划线 */
  const tabActiveStyle: React.CSSProperties = {
    color: 'var(--accent-deep)',
    borderBottom: '2px solid var(--accent)',
  }
  /* 未选中样式 - 无下划线 */
  const tabInactiveStyle: React.CSSProperties = {
    color: 'var(--text-tertiary)',
    borderBottom: '2px solid transparent',
  }

  return (
    <>
      {/* ── 页面内容 ── */}
      <div className="page-content">
        {/* 页面标题 */}
        <div style={{ padding: '4px 0 16px', marginTop: 'var(--space-4)' }}>
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
          <>
            {/* unbound 状态：提示绑定 */}
            {stage === 'unbound' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '60px 0',
                  gap: '16px',
                }}
              >
                <LinkIcon size={48} color="var(--text-tertiary)" />
                <span
                  style={{
                    color: 'var(--text-tertiary)',
                    fontSize: 'var(--text-body-sm)',
                    textAlign: 'center',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  绑定家庭后即可查看服务
                </span>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 'var(--space-2)' }}
                  onClick={() => navigate('/bind')}
                >
                  去绑定家庭
                </button>
              </div>
            )}

            {/* idle 状态：已绑定但没服务 */}
            {stage === 'idle' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '60px 0',
                  gap: '16px',
                }}
              >
                <Plus size={48} color="var(--text-tertiary)" />
                <span
                  style={{
                    color: 'var(--text-tertiary)',
                    fontSize: 'var(--text-body-sm)',
                    textAlign: 'center',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  尚无服务记录
                </span>
                <span
                  style={{
                    color: 'var(--text-tertiary)',
                    fontSize: 'var(--text-caption)',
                    textAlign: 'center',
                  }}
                >
                  开始评估后，服务记录将在此显示
                </span>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 'var(--space-2)' }}
                  onClick={() => navigate('/assessment/choose')}
                >
                  开始评估
                </button>
              </div>
            )}

            {/* 有活跃服务时：显示服务卡片 */}
            {hasActiveService && (
              <div className="page-section">
                {serviceHistory
                  .filter((s) => s.status === 'in_progress')
                  .map((service) => (
                    <div
                      className="service-card card-interactive"
                      key={service.id}
                      onClick={() => navigate('/progress')}
                    >
                      {/* 卡片头部 */}
                      <div className="service-card-header">
                        <span className="service-card-id">{service.id}</span>
                        <span className="chip chip-accent">
                          {currentStatus?.chipText ?? '进行中'}
                        </span>
                      </div>

                      {/* 标题 */}
                      <div className="service-card-title">
                        {service.title.replace('张奶奶', familyDetails.elderName)}
                      </div>

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
          </>
        )}

        {/* ── 历史记录 tab ── */}
        {activeTab === 'history' && (
          <div
            className="page-enter"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 0',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--surface-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-2)',
              }}
            >
              <Package size={32} color="var(--text-tertiary)" />
            </div>
            <span
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 'var(--weight-medium)',
              }}
            >
              暂无历史服务记录
            </span>
            <span
              style={{
                color: 'var(--text-tertiary)',
                fontSize: 'var(--text-caption)',
                textAlign: 'center',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '220px',
              }}
            >
              完成的服务订单将在这里显示，方便您随时查阅
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
