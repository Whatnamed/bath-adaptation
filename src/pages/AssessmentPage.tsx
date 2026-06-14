import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
  UserCheck,
} from 'lucide-react'
import { assessmentResult, riskFindings } from '../data/mock'
import { useAppStage, type AssessmentSource } from '../context/AppStageContext'
import { Button, Card, FixedBottomBar, LayoutPlanPreview, PageHeader, SectionHeader } from '../components'
import resultFloor from '../assets/images/03_assessment_scenes/result/result_01_floor_slippery.png'
import resultToilet from '../assets/images/03_assessment_scenes/result/result_02_squat_toilet_no_grabbar.png'
import resultNight from '../assets/images/03_assessment_scenes/result/result_03_night_path_dark.png'
import selfOverall from '../assets/images/03_assessment_scenes/self_photo/self_01_bathroom_overall.png'
import layoutRiskAssessment from '../assets/images/03_assessment_scenes/layout/layout_risk_assessment.png'

interface AssessmentPageProps {
  onOpenImagePreview?: (src: string) => void
}

function getAssessmentCopy(source: AssessmentSource, defaultSummary: string) {
  if (source === 'professional') {
    return {
      pageTitle: '上门评估结果',
      assessor: assessmentResult.assessor,
      method: '工作人员上门看一看',
      summary: defaultSummary,
      materialTitle: '评估资料',
      materialDesc: '评估员已完成现场记录，可用于生成初步方案；安装前仍会进行尺寸和墙面复核。',
    }
  }

  if (source === 'photo_initial') {
    return {
      pageTitle: '照片初评结果',
      assessor: '系统初评',
      method: '先拍照片做初步评估',
      summary: '基于三处现场照片，空间存在入口进出湿滑、如厕起身困难、淋浴湿滑和缺少求助触点等风险；建议继续补充尺寸或草图，提高方案匹配准确度。',
      materialTitle: '照片初评资料',
      materialDesc: '已上传现场照片，可先查看初步风险位置；空间尺寸和草图后续仍建议补充，最终以上门复核为准。',
    }
  }

  if (source === 'space_initial') {
    return {
      pageTitle: '空间初判结果',
      assessor: '系统初判',
      method: '我已有尺寸或草图',
      summary: '基于尺寸、草图或相似布局模板，当前空间可先判断扶手、坐便辅助和坐式淋浴等模块的安装可能；仍建议补拍现场照片确认真实风险点。',
      materialTitle: '空间初判资料',
      materialDesc: '已收到空间信息，可先判断产品是否适合安装；现场照片后续仍建议补拍，最终以上门复核为准。',
    }
  }

  if (source === 'complete_self') {
    return {
      pageTitle: '自助评估结果',
      assessor: '系统初评',
      method: '照片 + 空间信息',
      summary: '已结合现场照片和空间信息生成初步评估，可用于匹配推荐改造模块；安装前仍会安排服务人员复核尺寸、墙面和安全条件。',
      materialTitle: '自助评估资料',
      materialDesc: '已补充现场照片和空间信息，可用于生成初步方案；安装前仍会安排复核。',
    }
  }

  return {
    pageTitle: '评估结果',
    assessor: assessmentResult.assessor,
    method: '综合评估',
    summary: defaultSummary,
    materialTitle: '评估资料',
    materialDesc: '已补充现场照片和空间信息，可用于生成初步方案；安装前仍会安排复核。',
  }
}

export default function AssessmentPage({ onOpenImagePreview }: AssessmentPageProps) {
  const navigate = useNavigate()
  const { familyDetails, stage, setStage, assessmentSource } = useAppStage()

  const photos = [
    { src: resultFloor, desc: '卫生间地面（湿滑）' },
    { src: resultToilet, desc: '蹲厕旁（缺少扶手）' },
    { src: resultNight, desc: '走廊夜间照明' },
  ]

  const fullAddress = `${familyDetails.provinceCityDistrict} ${familyDetails.townStreet} ${familyDetails.villageCommunity} ${familyDetails.houseNumber}`
  const summary = assessmentResult.summary.replace('桂林村 142 号', `${familyDetails.villageCommunity} ${familyDetails.houseNumber}`)
  const assessmentCopy = getAssessmentCopy(assessmentSource, summary)
  const handleOpenPlan = () => {
    if (stage === 'assessment_complete') {
      setStage('plan_pending')
    }
    navigate('/plan')
  }

  return (
    <div className="screen-frame screen-frame-overlay">
      <PageHeader title={assessmentCopy.pageTitle} onBack={() => navigate(-1)} />

      <div className="subpage-content subpage-content-roomy">
        <Card className="assessment-summary-card">
          <div className="assessment-meta-list">
            <span><Calendar size={16} />评估日期：{assessmentResult.date}</span>
            <span><UserCheck size={16} />评估方式：{assessmentCopy.method}</span>
            <span><UserCheck size={16} />评估来源：{assessmentCopy.assessor}</span>
            <span><MapPin size={16} />地点：{fullAddress}</span>
          </div>
          <div className="divider" />
          <p>{assessmentCopy.summary}</p>
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
          <SectionHeader title={assessmentCopy.materialTitle} />
          <p className="assessment-helper-text">
            {assessmentCopy.materialDesc}
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
