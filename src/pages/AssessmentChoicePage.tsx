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
  desc: string
  chip?: string
  onClick: () => void
}

export default function AssessmentChoicePage() {
  const navigate = useNavigate()

  const options: ChoiceOption[] = [
    {
      icon: <UserCheck size={28} />,
      tone: 'accent',
      title: '让工作人员上门看一看',
      desc: '适合不确定怎么改、家里情况复杂、老人不方便拍照的家庭。预约后工作人员会上门测量空间并记录风险。',
      chip: '免费',
      onClick: () => navigate('/assessment/apply'),
    },
    {
      icon: <Camera size={28} />,
      tone: 'info',
      title: '我先拍照片做初步评估',
      desc: '适合子女不在家、想先了解大概风险的情况。按指引拍摄卫生间照片，系统先生成初步建议。',
      chip: '快速',
      onClick: () => navigate('/assessment/self?start=photo'),
    },
    {
      icon: <Ruler size={28} />,
      tone: 'warning',
      title: '我已有尺寸或草图',
      desc: '适合已经量过尺寸，或有手绘平面图的家庭。上传草图或填写关键尺寸，更快匹配改造方案。',
      onClick: () => navigate('/assessment/self?start=space'),
    },
  ]

  return (
    <>
      <PageHeader title="选择评估方式" onBack={() => navigate(-1)} />

      <div className="subpage-content">
        <div className="page-section assessment-choice-lede">
          选择最适合当前情况的方式。照片用于识别风险，尺寸和草图用于判断产品是否适合安装。
        </div>

        <div className="page-section">
          {options.map((opt) => (
            <ChoiceCard
              key={opt.title}
              icon={opt.icon}
              tone={opt.tone}
              title={opt.title}
              desc={opt.desc}
              chip={opt.chip}
              onClick={opt.onClick}
            />
          ))}
        </div>

        <div className="page-section">
          <InfoNote icon={<Shield size={16} />}>
            无论选择哪种方式，最终方案都会经过上门复核，确保安全性和可安装性。
          </InfoNote>
        </div>
      </div>
    </>
  )
}
