import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
  UserCheck,
} from 'lucide-react'
import { assessmentResult, riskFindings } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'
import { Button, Card, FixedBottomBar, LayoutPlanPreview, PageHeader, SectionHeader } from '../components'
import resultFloor from '../assets/images/03_assessment_scenes/result/result_01_floor_slippery.png'
import resultToilet from '../assets/images/03_assessment_scenes/result/result_02_squat_toilet_no_grabbar.png'
import resultNight from '../assets/images/03_assessment_scenes/result/result_03_night_path_dark.png'
import selfOverall from '../assets/images/03_assessment_scenes/self_photo/self_01_bathroom_overall.png'
import layoutRiskAssessment from '../assets/images/03_assessment_scenes/layout/layout_risk_assessment.png'

interface AssessmentPageProps {
  onOpenImagePreview?: (src: string) => void
}

export default function AssessmentPage({ onOpenImagePreview }: AssessmentPageProps) {
  const navigate = useNavigate()
  const { familyDetails, stage, setStage } = useAppStage()

  const photos = [
    { src: resultFloor, desc: '卫生间地面（湿滑）' },
    { src: resultToilet, desc: '蹲厕旁（缺少扶手）' },
    { src: resultNight, desc: '走廊夜间照明' },
  ]

  const fullAddress = `${familyDetails.provinceCityDistrict} ${familyDetails.townStreet} ${familyDetails.villageCommunity} ${familyDetails.houseNumber}`
  const summary = assessmentResult.summary.replace('桂林村 142 号', `${familyDetails.villageCommunity} ${familyDetails.houseNumber}`)
  const handleOpenPlan = () => {
    if (stage === 'assessment_complete') {
      setStage('plan_pending')
    }
    navigate('/plan')
  }

  return (
    <div className="screen-frame screen-frame-overlay">
      <PageHeader title="评估结果" onBack={() => navigate(-1)} />

      <div className="subpage-content subpage-content-roomy">
        <Card className="assessment-summary-card">
          <div className="assessment-meta-list">
            <span><Calendar size={16} />评估日期：{assessmentResult.date}</span>
            <span><UserCheck size={16} />评估员：{assessmentResult.assessor}</span>
            <span><MapPin size={16} />地点：{fullAddress}</span>
          </div>
          <div className="divider" />
          <p>{summary}</p>
        </Card>

        <LayoutPlanPreview
          title="空间风险示意（待复核）"
          description="基于照片与空间信息生成的现状示意，用于标注主要风险位置，最终以上门复核为准。"
          imageSrc={layoutRiskAssessment}
          imageAlt="现状卫生间空间风险平面图"
          points={riskFindings}
          note="这不是施工图，仅用于说明风险位置与后续方案匹配关系。"
          onOpenImagePreview={onOpenImagePreview}
        />

        <div className="page-section">
          <SectionHeader title="现场记录" />
          {photos.map((photo) => (
            <div className="assessment-photo-block" key={photo.desc}>
              <div className="assessment-photo">
                <img src={photo.src} alt={photo.desc} />
              </div>
              <div className="assessment-photo-caption">{photo.desc}</div>
            </div>
          ))}
        </div>

        <div className="page-section">
          <SectionHeader title="自助评估资料" />
          <p className="assessment-helper-text">
            已补充现场照片和空间信息，可用于生成初步方案；安装前仍会安排复核。
          </p>
          <div className="assessment-upload-row">
            <div className="assessment-upload-thumb">
              <img src={selfOverall} alt="浴室全景" />
              <span>浴室全景</span>
            </div>
            <div className="assessment-upload-placeholder">
              <ImageIcon size={22} />
              草图 / 尺寸
            </div>
          </div>
        </div>

        <div className="page-section">
          <SectionHeader title="发现的风险项" />
          {riskFindings.map((item) => (
            <div className="assessment-item" key={item.id}>
              <div className="assessment-item-number">{item.id}</div>
              <div className="assessment-item-content">
                <div className="assessment-item-title">{item.title}</div>
                <div className="assessment-item-location">位置：{item.location}</div>
                <div className="assessment-item-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FixedBottomBar variant="attached">
        <Button block size="lg" onClick={handleOpenPlan}>
          查看推荐方案
          <ChevronRight size={18} />
        </Button>
      </FixedBottomBar>
    </div>
  )
}
