import { useNavigate } from 'react-router-dom'
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
  ShieldCheck,
  CalendarClock,
  Heart,
  Camera,
  Clock,
  Wrench,
  Sparkles,
} from 'lucide-react'
import { reminders, stageSteps, stageCards } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'
import { BottomNav, Card, Chip, SectionHeader, Stepper } from '../components'

/* 图片素材导入 */
import logoImg from '../assets/images/00_brand/logo_anyu_flat_icon.png'
import elderAvatar from '../assets/images/00_brand/avatar_elder_default.png'

/* ── 首页 ── */
export default function HomePage() {
  const navigate = useNavigate()
  const { stage, familyDetails } = useAppStage()

  /* 当前阶段的配置数据 - 动态将 '张奶奶' 替换为用户填写的真实姓名 */
  const rawCard = stageCards[stage]
  const card = rawCard
    ? {
        ...rawCard,
        title: rawCard.title.replace('张奶奶', familyDetails.elderName),
        desc: rawCard.desc.replace('张奶奶', familyDetails.elderName),
      }
    : null

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
    assessment_pending: <Clock size={24} color="var(--warning)" />,
    self_assessing: <Camera size={24} color="var(--accent)" />,
    assessment_complete: <ClipboardCheck size={24} color="var(--accent)" />,
    plan_pending: <ClipboardCheck size={24} color="var(--accent)" />,
    plan_confirmed: <CalendarDays size={24} color="var(--info)" />,
    installing: <Wrench size={24} color="var(--accent)" />,
    completed: <CheckCircle size={24} color="var(--accent)" />,
  }

  return (
    <>
      {/* ── App Header ── */}
      <div className="app-header">
        <div className="app-header-brand">
          <img src={logoImg} alt="安浴到家" className="app-header-logo" />
          <span className="app-header-title">安浴到家</span>
          <span className="app-header-subtitle">让父母洗浴更安全，子女更安心</span>
        </div>
        <div className="app-header-actions">
          <button className="app-header-btn" onClick={() => navigate('/notifications')}>
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
          <div className="family-selector page-section" onClick={() => navigate('/bind')}>
            <div className="avatar">
              <img src={elderAvatar} alt="老人头像" className="avatar-image" />
            </div>
            <div className="family-selector-info">
              <span className="family-selector-name">
                {familyDetails.elderName}家 · {familyDetails.villageCommunity}
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
              <span className="highlight-number highlight-number-large pop-in">1</span>
              {' '}项服务
            </div>
            <div className="task-summary-subtitle">及时处理，让改造更快落地</div>
          </div>
        )}

        {/* ── 状态卡片（核心：根据 stage 变化） ── */}
        {card && (
          <div
            className={`task-card task-card-clickable task-card-${card.variant} page-section page-enter`}
            onClick={() => navigate(card.ctaRoute)}
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
                  <Chip>{card.badge}</Chip>
                </div>
              )}
            </div>
            <button
              className="task-card-cta"
              onClick={(event) => {
                event.stopPropagation()
                navigate(card.ctaRoute)
              }}
            >
              {card.cta} <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ── 服务进度（unbound/idle 不显示） ── */}
        {showProgress && (
          <div className="page-section">
            <SectionHeader
              title="服务进度"
              action={
              <button className="section-action" onClick={() => navigate('/progress')}>
                查看全部 <ChevronRight size={14} />
              </button>
              }
            />

            <Card>
              <Stepper steps={steps} icons={stepIcons} />
            </Card>
          </div>
        )}

        {/* ── 贴心提醒（仅完工阶段显示） ── */}
        {showReminders && (
          <div className="page-section">
            <SectionHeader
              title="贴心提醒"
              action={
              <button className="section-action" onClick={() => navigate('/maintenance')}>
                全部提醒 <ChevronRight size={14} />
              </button>
              }
            />

            <Card className="card-compact-y">
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
            </Card>
          </div>
        )}

        {/* ── unbound 阶段的欢迎介绍区域 ── */}
        {stage === 'unbound' && (
          <div className="page-section">
            <SectionHeader title="我们的服务" />
            <Card>
              {[
                { icon: <ShieldCheck size={20} color="var(--accent)" />, title: '安全评估', desc: '专业人员上门或自行拍照，全面评估卫浴安全隐患' },
                { icon: <Wrench size={20} color="var(--accent)" />, title: '适老改造', desc: '防滑、扶手、恒温花洒等适老化产品安装' },
                { icon: <CalendarClock size={20} color="var(--accent)" />, title: '长期维护', desc: '设备定期检查和维护，确保持续安全' },
              ].map((item) => (
                <div key={item.title} className="service-list-item">
                  <div className="service-list-icon">
                    {item.icon}
                  </div>
                  <div>
                    <div className="service-list-title">{item.title}</div>
                    <div className="service-list-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>

      {/* ── 底部导航 ── */}
      <BottomNav />
    </>
  )
}
