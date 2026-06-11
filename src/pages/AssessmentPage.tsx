import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Calendar,
  UserCheck,
  MapPin,
  Camera,
  Upload,
  Image as ImageIcon,
  ChevronRight,
} from 'lucide-react'
import { assessmentResult, riskFindings } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'
import resultFloor from '../assets/images/03_assessment_scenes/result/result_01_floor_slippery.png'
import resultToilet from '../assets/images/03_assessment_scenes/result/result_02_squat_toilet_no_grabbar.png'
import resultNight from '../assets/images/03_assessment_scenes/result/result_03_night_path_dark.png'
import selfOverall from '../assets/images/03_assessment_scenes/self_photo/self_01_bathroom_overall.png'

/* ── 入户评估结果页 ── */
export default function AssessmentPage() {
  const navigate = useNavigate()
  const { familyDetails } = useAppStage()

  /* 照片区域配置 */
  const photos = [
    { src: resultFloor, desc: '卫生间地面（湿滑）' },
    { src: resultToilet, desc: '蹲厕旁（缺少扶手）' },
    { src: resultNight, desc: '走廊夜间照明' },
  ]

  const fullAddress = `${familyDetails.provinceCityDistrict} ${familyDetails.townStreet} ${familyDetails.villageCommunity} ${familyDetails.houseNumber}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ── 页面头部 ── */}
      <div className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">评估结果</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--space-4)' }}>
        {/* ── 评估概要卡片 ── */}
        <div className="card page-section" style={{ marginTop: 'var(--space-4)' }}>
          {/* 评估信息 */}
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-2)' }}>
            <Calendar size={16} style={{ color: 'var(--text-tertiary)' }} />
            <span
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-secondary)',
              }}
            >
              评估日期：{assessmentResult.date}
            </span>
          </div>
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-2)' }}>
            <UserCheck size={16} style={{ color: 'var(--text-tertiary)' }} />
            <span
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-secondary)',
              }}
            >
              评估员：{assessmentResult.assessor}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} style={{ color: 'var(--text-tertiary)' }} />
            <span
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-secondary)',
              }}
            >
              地点：{fullAddress}
            </span>
          </div>

          {/* 分割线 */}
          <div className="divider" />

          {/* 评估结论 */}
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              margin: 0,
            }}
          >
            {assessmentResult.summary.replace('桂林村 142 号', familyDetails.villageCommunity + ' ' + familyDetails.houseNumber)}
          </p>
        </div>

        {/* ── 现场记录 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">现场记录</span>
          </div>

          {photos.map((photo, i) => (
            <div key={i}>
              <div
                className="assessment-photo"
                style={{
                  overflow: 'hidden',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.desc}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                {photo.desc}
              </div>
            </div>
          ))}
        </div>

        {/* ── 自助评估上传 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">自助评估</span>
          </div>
          <p
            style={{
              fontSize: 'var(--text-caption)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              margin: 0,
              marginBottom: 'var(--space-4)',
            }}
          >
            您也可以自行拍照上传卫浴间现状，帮助我们更全面地了解改造需求
          </p>

          {/* 上传区域 */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
            }}
          >
            {/* 用户已上传的照片 */}
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <img
                src={selfOverall}
                alt="浴室全景"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  fontSize: 'var(--text-micro)',
                  color: '#fff',
                  fontWeight: 'var(--weight-medium)',
                  background: 'rgba(0,0,0,0.4)',
                  padding: '2px 0',
                  textAlign: 'center',
                }}
              >
                浴室全景
              </span>
            </div>

            {/* 添加照片按钮 */}
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-md)',
                border: '2px dashed var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-1)',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'border-color var(--duration-fast) var(--ease-out)',
              }}
            >
              <Upload size={22} style={{ color: 'var(--text-tertiary)' }} />
              <span
                style={{
                  fontSize: 'var(--text-micro)',
                  color: 'var(--text-tertiary)',
                }}
              >
                添加照片
              </span>
            </div>
          </div>

          {/* 提示文字 */}
          <div
            style={{
              marginTop: 'var(--space-3)',
              fontSize: 'var(--text-micro)',
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            <ImageIcon size={12} />
            <span>支持 JPG、PNG 格式，单张不超过 10MB</span>
          </div>
        </div>

        {/* ── 发现的风险项 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">发现的风险项</span>
          </div>

          {riskFindings.map((item) => (
            <div className="assessment-item" key={item.id}>
              {/* 序号 */}
              <div className="assessment-item-number">{item.id}</div>

              {/* 内容 */}
              <div className="assessment-item-content">
                <div className="assessment-item-title">{item.title}</div>
                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--text-tertiary)',
                    marginBottom: 2,
                  }}
                >
                  位置：{item.location}
                </div>
                <div className="assessment-item-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 底部 CTA ── */}
      <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={() => navigate('/plan')}
        >
          查看推荐方案
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
