import { useNavigate } from 'react-router-dom'
import {
  UserCheck,
  Camera,
  ShoppingBag,
  Shield,
} from 'lucide-react'
import { useAppStage } from '../context/AppStageContext'
import { ChoiceCard, InfoNote, PageHeader } from '../components'

/* ── 选项卡片数据 ── */
interface ChoiceOption {
  icon: React.ReactNode
  tone: 'accent' | 'warning' | 'info'
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
      tone: 'accent',
      title: '申请专业评估',
      desc: '由评估员上门实地检查，出具专业评估报告',
      chip: '免费',
      onClick: () => navigate('/assessment/apply'),
    },
    {
      icon: <Camera size={28} />,
      tone: 'info',
      title: '自行拍照评估',
      desc: '拍摄卫浴现场照片，系统智能分析安全风险',
      chip: '快速',
      onClick: () => navigate('/assessment/self'),
    },
    {
      icon: <ShoppingBag size={28} />,
      tone: 'warning',
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
      <PageHeader title="选择评估方式" onBack={() => navigate(-1)} />

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
            <ChoiceCard
              key={i}
              icon={opt.icon}
              tone={opt.tone}
              title={opt.title}
              desc={opt.desc}
              chip={opt.chip}
              onClick={opt.onClick}
            />
          ))}
        </div>

        {/* ── 底部安全提示 ── */}
        <div className="page-section">
          <InfoNote icon={<Shield size={16} />}>
              无论选择哪种方式，我们都会确保方案的安全性和专业性
          </InfoNote>
        </div>
      </div>
    </>
  )
}
