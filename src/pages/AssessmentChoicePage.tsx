import { useNavigate } from 'react-router-dom'
import {
  Camera,
  Ruler,
  Shield,
  UserCheck,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { ChoiceCard, InfoNote, PageHeader } from '../components'

interface ChoiceOption {
  icon: ReactNode
  tone: 'accent' | 'warning' | 'info'
  title: string
  details: string[]
  chip?: string
  onClick: () => void
}

export default function AssessmentChoicePage() {
  const navigate = useNavigate()

  const options: ChoiceOption[] = [
    {
      icon: <UserCheck size={26} />,
      tone: 'accent',
      title: '工作人员上门评估',
      details: [
        '适合：不确定怎么改、老人不方便拍照',
        '会做：测量空间并记录卫浴风险',
      ],
      chip: '免费',
      onClick: () => navigate('/assessment/apply'),
    },
    {
      icon: <Camera size={26} />,
      tone: 'info',
      title: '先拍照片做初步评估',
      details: [
        '适合：子女不在家，想先了解风险',
        '会做：先给照片风险建议，再补尺寸',
      ],
      chip: '快速',
      onClick: () => navigate('/assessment/self?start=photo'),
    },
    {
      icon: <Ruler size={26} />,
      tone: 'warning',
      title: '我已有尺寸或草图',
      details: [
        '适合：已经量过，或有手绘平面图',
        '会做：先判断可安装性，再补现场照片',
      ],
      onClick: () => navigate('/assessment/self?start=space'),
    },
  ]

  return (
    <>
      <PageHeader title="选择评估方式" onBack={() => navigate(-1)} />

      <div className="subpage-content">
        <div className="page-section assessment-choice-lede">
          照片用于识别风险，尺寸和草图用于判断产品是否适合安装。
        </div>

        <div className="page-section assessment-choice-list">
          {options.map((opt) => (
            <ChoiceCard
              key={opt.title}
              icon={opt.icon}
              tone={opt.tone}
              title={opt.title}
              details={opt.details}
              chip={opt.chip}
              onClick={opt.onClick}
            />
          ))}
        </div>

        <div className="page-section">
          <InfoNote icon={<Shield size={16} />}>
            最终方案都会经过上门复核，确认尺寸、墙面和安装安全性。
          </InfoNote>
        </div>
      </div>
    </>
  )
}
