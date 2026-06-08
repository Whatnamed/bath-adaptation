import { useNavigate, useLocation } from 'react-router-dom'
import {
  MessageSquare,
  Headphones,
  ChevronDown,
  ClipboardCheck,
  CheckCircle,
  Pencil,
  CalendarDays,
  UserCheck,
  ChevronRight,
  Home,
  ClipboardList,
  User,
  ShieldCheck,
  CalendarClock,
  Heart,
  Camera,
  Clock,
  Wrench,
  Sparkles,
} from 'lucide-react'
import { familyInfo, reminders, stageSteps, stageCards } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'

/* ── 首页 ── */
export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { stage } = useAppStage()

  /* 当前阶段的配置数据 */
  const card = stageCards[stage]
  const steps = stageSteps[stage]

  /* 是否显示家庭选择器 */
  const showFamilySelector = stage !== 'unbound'
  /* 是否显示待办摘要 */
  const showTaskSummary = stage === 'plan_pending'
  /* 是否显示服务进度 */
  const showProgress = steps.length > 0
  /* 是否显示贴心提醒 */
  const showReminders = stage === 'completed'

  /* 步骤节点对应的图标 */
  const stepIcons: Record<string, React.ReactNode> = {
    assessment: <ClipboardCheck size={16} />,
    plan: <Pencil size={16} />,
    install: <CalendarDays size={16} />,
    training: <UserCheck size={16} />,
  }

  /* 提醒图标映射 */
  const reminderIcons: Record<string, React.ReactNode> = {
    'shield-check': <ShieldCheck size={20} />,
    'calendar-clock': <CalendarClock size={20} />,
  }

  /* 提醒背景色映射 */
  const reminderBg: Record<string, string> = {
    success: 'var(--success-soft)',
    info: 'var(--info-soft)',
  }
  const reminderColor: Record<string, string> = {
    success: 'var(--success)',
    info: 'var(--info)',
  }

  /* 状态卡片图标映射 */
  const cardIcons: Record<string, React.ReactNode> = {
    unbound: <Heart size={24} color="var(--accent)" />,
    idle: <Sparkles size={24} color="var(--accent)" />,
    assessment_pending: <Clock size={24} color="#E8A317" />,
    self_assessing: <Camera size={24} color="var(--accent)" />,
    plan_pending: <ClipboardCheck size={24} color="var(--accent)" />,
    plan_confirmed: <CalendarDays size={24} color="#4A90D9" />,
    installing: <Wrench size={24} color="var(--accent)" />,
    completed: <CheckCircle size={24} color="var(--accent)" />,
  }

  /* 状态卡片背景色映射 */
  const cardBgs: Record<string, string> = {
    welcome: '#EAF3E5',
    action: '#EAF3E5',
    waiting: '#FFF8E7',
    success: '#E8F5E9',
  }

  /* 底部导航数据 */
  const tabs = [
    { path: '/', label: '首页', icon: <Home size={24} /> },
    { path: '/services', label: '服务', icon: <ClipboardList size={24} /> },
    { path: '/profile', label: '我的', icon: <User size={24} /> },
  ]

  return (
    <>
      {/* ── App Header ── */}
      <div className="app-header">
        <div className="app-header-brand">
          <span className="app-header-title">安浴到家</span>
          <span className="app-header-subtitle">让父母洗浴更安全，子女更安心</span>
        </div>
        <div className="app-header-actions">
          <button className="app-header-btn" onClick={() => navigate('/maintenance')}>
            <MessageSquare size={22} />
            <span className="app-header-btn-label">消息</span>
          </button>
          <button className="app-header-btn" onClick={() => navigate('/services')}>
            <Headphones size={22} />
            <span className="app-header-btn-label">服务站</span>
          </button>
        </div>
      </div>

      {/* ── 页面可滚动内容区域 ── */}
      <div className="page-content">
        {/* ── 家庭选择器（未绑定时不显示） ── */}
        {showFamilySelector && (
          <div className="family-selector page-section">
            <div
              className="avatar"
              style={{ background: 'var(--accent-soft)' }}
            >
              <User size={22} color="var(--accent)" />
            </div>
            <div className="family-selector-info">
              <span className="family-selector-name">
                {familyInfo.elderName}家 · {familyInfo.village}
              </span>
            </div>
            <ChevronDown size={18} color="var(--text-tertiary)" />
          </div>
        )}

        {/* ── 待办摘要（仅方案待确认阶段显示） ── */}
        {showTaskSummary && (
          <div className="page-section task-summary-header">
            <div className="task-summary-title">
              今天需要处理{' '}
              <span className="highlight-number" style={{ fontSize: 32 }}>1</span>
              {' '}项服务
            </div>
            <div className="task-summary-subtitle">及时处理，让改造更快落地</div>
          </div>
        )}

        {/* ── 状态卡片（核心：根据 stage 变化） ── */}
        {card && (
          <div
            className="task-card page-section"
            style={{
              background: cardBgs[card.variant] ?? '#EAF3E5',
            }}
          >
            <div className="task-card-top">
              <div className="task-card-icon">
                {cardIcons[stage]}
              </div>
              <div className="task-card-info">
                <div className="task-card-title">{card.title}</div>
                <div className="task-card-desc">{card.desc}</div>
              </div>
              {card.badge && (
                <div className="task-card-badge">
                  <span className="chip chip-accent">{card.badge}</span>
                </div>
              )}
            </div>
            <button className="task-card-cta" onClick={() => navigate(card.ctaRoute)}>
              {card.cta} <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ── 服务进度（unbound/idle 不显示） ── */}
        {showProgress && (
          <div className="page-section">
            <div className="section-header">
              <span className="section-title">服务进度</span>
              <button className="section-action" onClick={() => navigate('/progress')}>
                查看全部 <ChevronRight size={14} />
              </button>
            </div>

            <div className="card">
              <div className="stepper">
                {steps.map((step, i) => {
                  /* 节点样式类名 */
                  const nodeClass =
                    step.status === 'done'
                      ? 'stepper-node-done'
                      : step.status === 'current'
                      ? 'stepper-node-current'
                      : 'stepper-node-pending'

                  /* 状态文本样式类名 */
                  const statusClass =
                    step.status === 'done'
                      ? 'stepper-status-done'
                      : step.status === 'current'
                      ? 'stepper-status-current'
                      : 'stepper-status-pending'

                  /* 连接线（最后一步不需要） */
                  const showLine = i < steps.length - 1
                  const nextStep = steps[i + 1]
                  const lineClass =
                    step.status === 'done' && nextStep?.status !== 'pending'
                      ? 'stepper-line-done'
                      : 'stepper-line-pending'

                  return (
                    <div className="stepper-step" key={step.key}>
                      <div className={`stepper-node ${nodeClass}`}>
                        {step.status === 'done' ? (
                          <CheckCircle size={18} />
                        ) : (
                          stepIcons[step.key]
                        )}
                      </div>
                      <span className="stepper-label">{step.label}</span>
                      <span className={`stepper-status ${statusClass}`}>{step.date}</span>
                      {showLine && (
                        <div className={`stepper-line ${lineClass}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── 贴心提醒（仅完工阶段显示） ── */}
        {showReminders && (
          <div className="page-section">
            <div className="section-header">
              <span className="section-title">贴心提醒</span>
              <button className="section-action" onClick={() => navigate('/maintenance')}>
                全部提醒 <ChevronRight size={14} />
              </button>
            </div>

            <div className="card" style={{ padding: 'var(--space-3) var(--space-5)' }}>
              {reminders.map((item) => (
                <div className="reminder-item" key={item.id}>
                  <div
                    className="reminder-icon"
                    style={{
                      background: reminderBg[item.type] ?? 'var(--surface-soft)',
                      color: reminderColor[item.type] ?? 'var(--text-secondary)',
                    }}
                  >
                    {reminderIcons[item.icon]}
                  </div>
                  <div className="reminder-content">
                    <div className="reminder-title">{item.title}</div>
                    <div className="reminder-subtitle">{item.subtitle}</div>
                  </div>
                  <ChevronRight size={16} color="var(--text-tertiary)" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── unbound 阶段的欢迎介绍区域 ── */}
        {stage === 'unbound' && (
          <div className="page-section">
            <div className="section-header">
              <span className="section-title">我们的服务</span>
            </div>
            <div className="card">
              {[
                { icon: <ShieldCheck size={20} color="var(--accent)" />, title: '安全评估', desc: '专业人员上门或自行拍照，全面评估卫浴安全隐患' },
                { icon: <Wrench size={20} color="var(--accent)" />, title: '适老改造', desc: '防滑、扶手、恒温花洒等适老化产品安装' },
                { icon: <CalendarClock size={20} color="var(--accent)" />, title: '长期维护', desc: '设备定期检查和维护，确保持续安全' },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3) 0',
                    borderBottom: '1px solid var(--border-light)',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      minWidth: 36,
                      borderRadius: '50%',
                      background: 'var(--accent-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 底部导航 ── */}
      <nav className="bottom-nav">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(tab.path)}
            >
              {tab.icon}
              <span className="bottom-nav-label">{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
