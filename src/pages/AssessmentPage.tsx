import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
  ShieldAlert,
  UserCheck,
} from 'lucide-react'
import { assessmentResult, riskFindings } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'
import { Button, Card, FixedBottomBar, InfoNote, PageHeader, SectionHeader } from '../components'
import resultFloor from '../assets/images/03_assessment_scenes/result/result_01_floor_slippery.png'
import resultToilet from '../assets/images/03_assessment_scenes/result/result_02_squat_toilet_no_grabbar.png'
import resultNight from '../assets/images/03_assessment_scenes/result/result_03_night_path_dark.png'
import selfOverall from '../assets/images/03_assessment_scenes/self_photo/self_01_bathroom_overall.png'

function SpaceRiskMap() {
  const risks = [
    { id: 1, title: '门槛较高', desc: '夜间进出容易绊倒' },
    { id: 2, title: '蹲厕缺少借力点', desc: '起身时需要扶墙' },
    { id: 3, title: '淋浴湿区防滑不足', desc: '出浴转身容易打滑' },
    { id: 4, title: '照明覆盖不足', desc: '夜间动线不清楚' },
  ]

  return (
    <Card className="assessment-map-card">
      <SectionHeader title="空间风险示意（待复核）" action={<ShieldAlert size={18} />} />
      <div className="assessment-map-replace-note">平面布局素材预留位</div>
      <div className="assessment-layout-map">
        <svg viewBox="0 0 320 210" aria-label="卫生间空间布局示意图">
          <rect className="map-room" x="28" y="22" width="264" height="162" rx="12" />
          <path className="map-door" d="M135 184v-36q40 0 58 36" />
          <text className="map-label" x="128" y="176">门</text>

          <rect className="map-zone" x="52" y="46" width="76" height="54" rx="8" />
          <text className="map-label" x="90" y="78">蹲厕区</text>

          <rect className="map-zone map-zone-soft" x="188" y="46" width="72" height="54" rx="8" />
          <text className="map-label" x="224" y="78">淋浴区</text>

          <rect className="map-zone" x="54" y="124" width="72" height="30" rx="8" />
          <text className="map-label" x="90" y="144">洗手区</text>

          <path className="map-route" d="M158 160C148 128 154 94 188 72" />
          <text className="map-route-label" x="164" y="124">夜间动线</text>

          <circle className="map-risk" cx="154" cy="164" r="13" />
          <circle className="map-risk" cx="128" cy="70" r="13" />
          <circle className="map-risk" cx="214" cy="100" r="13" />
          <circle className="map-risk" cx="198" cy="66" r="13" />
          <text className="map-risk-text" x="154" y="169">1</text>
          <text className="map-risk-text" x="128" y="75">2</text>
          <text className="map-risk-text" x="214" y="105">3</text>
          <text className="map-risk-text" x="198" y="71">4</text>
        </svg>
      </div>
      <div className="assessment-map-risks">
        {risks.map((risk) => (
          <div key={risk.id} className="assessment-map-risk-row">
            <span>{risk.id}</span>
            <div>
              <strong>{risk.title}</strong>
              <em>{risk.desc}</em>
            </div>
          </div>
        ))}
      </div>
      <InfoNote icon={<ImageIcon size={16} />}>
        当前为风险位置示意，不作为施工图。后续可替换为正式平面布局素材，最终以上门复核为准。
      </InfoNote>
    </Card>
  )
}

export default function AssessmentPage() {
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

        <SpaceRiskMap />

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
