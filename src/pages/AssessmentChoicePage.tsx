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
      title: '工作人员上门看一看',
      details: [
        '最省心、最准确，适合不确定怎么改的家庭',
        '上门测量空间，记录风险点和安装条件',
      ],
      chip: '免费',
      onClick: () => navigate('/assessment/apply'),
    },
    {
      icon: <Camera size={26} />,
      tone: 'info',
      title: '先拍照片做初步评估',
      details: [
        '先看哪里有风险，适合子女不在家时使用',
        '拍完三处照片后，先生成照片初评建议',
      ],
      chip: '快速',
      onClick: () => navigate('/assessment/self?start=photo'),
    },
    {
      icon: <Ruler size={26} />,
      tone: 'warning',
      title: '我已有尺寸或草图',
      details: [
        '先看能不能装，适合已经量过或画过草图',
        '填写尺寸、上传草图或选择相似布局即可初判',
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

        <div className="page-section assessment-choice-guide">
          <strong>怎么选</strong>
          <span>不确定怎么改：上门</span>
          <span>想先看风险：拍照</span>
          <span>已有尺寸：草图 / 尺寸</span>
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
