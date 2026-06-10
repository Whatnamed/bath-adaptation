import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Camera,
  ShoppingBag,
  Shield,
} from 'lucide-react'
import { useAppStage } from '../context/AppStageContext'

/* ── 选项卡片数据 ── */
interface ChoiceOption {
  icon: React.ReactNode
  iconBg: string
  title: string
  desc: string
  chip?: string
  onClick: () => void
}

/* ── 评估方式选择页 ── */
export default function AssessmentChoicePage() {
  const navigate = useNavigate()
  const { setStage } = useAppStage()

  const options: ChoiceOption[] = [
    {
      icon: <UserCheck size={28} />,
      iconBg: 'var(--accent-soft)',
      title: '申请专业评估',
      desc: '由评估员上门实地检查，出具专业评估报告',
      chip: '免费',
      onClick: () => navigate('/assessment/apply'),
    },
    {
      icon: <Camera size={28} />,
      iconBg: '#E8F0FE',
      title: '自行拍照评估',
      desc: '拍摄卫浴现场照片，系统智能分析安全风险',
      chip: '快速',
      onClick: () => navigate('/assessment/self'),
    },
    {
      icon: <ShoppingBag size={28} />,
      iconBg: '#FFF3E0',
      title: '我已了解需求，直接选购',
      desc: '跳过评估，直接浏览和选择改造产品',
      onClick: () => {
        setStage('plan_pending')
        navigate('/products?from=direct')
      },
    },
  ]

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">选择评估方式</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
        {/* ── 说明文字 ── */}
        <div className="page-section">
          <div
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            选择一种方式，让我们了解您家的卫浴情况
          </div>
        </div>

        {/* ── 三张选项卡片 ── */}
        <div className="page-section">
          {options.map((opt, i) => (
            <div
              key={i}
              className="card"
              onClick={opt.onClick}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-3)',
              }}
            >
              {/* 圆形图标容器 */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  minWidth: 56,
                  borderRadius: '50%',
                  background: opt.iconBg,
                  color: opt.iconBg === 'var(--accent-soft)' ? 'var(--accent)' : opt.iconBg === '#E8F0FE' ? '#1A73E8' : '#E65100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {opt.icon}
              </div>

              {/* 右侧文字区 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {opt.title}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                    marginBottom: opt.chip ? 'var(--space-2)' : 0,
                  }}
                >
                  {opt.desc}
                </div>
                {opt.chip && (
                  <span className="chip chip-accent">{opt.chip}</span>
                )}
              </div>

              {/* 右侧箭头 */}
              <ChevronRight
                size={18}
                style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}
              />
            </div>
          ))}
        </div>

        {/* ── 底部安全提示 ── */}
        <div className="page-section">
          <div
            style={{
              background: 'var(--accent-soft)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-2)',
            }}
          >
            <Shield
              size={16}
              style={{
                color: 'var(--accent)',
                marginTop: 2,
                minWidth: 16,
              }}
            />
            <span
              style={{
                fontSize: 'var(--text-caption)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              无论选择哪种方式，我们都会确保方案的安全性和专业性
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
