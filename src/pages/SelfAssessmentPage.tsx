import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Armchair,
  Camera,
  CheckCircle,
  ChevronLeft,
  Droplets,
  Home,
} from 'lucide-react'
import { useAppStage } from '../context/AppStageContext'
import selfOverall from '../assets/images/03_assessment_scenes/self_photo/self_01_bathroom_overall.png'
import selfToilet from '../assets/images/03_assessment_scenes/self_photo/self_02_squat_toilet_area.png'
import selfShower from '../assets/images/03_assessment_scenes/self_photo/self_03_shower_wash_area.png'

interface PhotoArea {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  guideImg: string
}

interface SelfAssessmentPageProps {
  onOpenImagePreview?: (src: string) => void
}

const PHOTO_AREAS: PhotoArea[] = [
  {
    id: 'area_overall',
    icon: <Home size={22} style={{ color: 'var(--accent)' }} />,
    title: '卫生间整体',
    description: '在门口拍摄卫生间全景，展示整体布局',
    guideImg: selfOverall,
  },
  {
    id: 'area_toilet',
    icon: <Armchair size={22} style={{ color: 'var(--accent)' }} />,
    title: '马桶/蹲便器区域',
    description: '拍摄马桶或蹲便器及周围空间',
    guideImg: selfToilet,
  },
  {
    id: 'area_shower',
    icon: <Droplets size={22} style={{ color: 'var(--accent)' }} />,
    title: '淋浴/洗浴区域',
    description: '拍摄淋浴区域，包含地面和墙面',
    guideImg: selfShower,
  },
]

const SelfAssessmentPage: React.FC<SelfAssessmentPageProps> = ({ onOpenImagePreview }) => {
  const navigate = useNavigate()
  const { stage, setStage } = useAppStage()

  const [uploaded, setUploaded] = useState<Set<string>>(new Set())
  const doneCount = uploaded.size
  const canSubmit = doneCount === 3

  const handleUpload = (areaId: string) => {
    if (uploaded.has(areaId)) return

    if (stage !== 'self_assessing') {
      setStage('self_assessing')
    }

    setUploaded((prev) => {
      const next = new Set(prev)
      next.add(areaId)
      return next
    })
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setStage('plan_pending')
    navigate('/')
  }

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <header className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-header-title">拍照评估</h1>
      </header>

      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--space-4)' }}>
        <div style={{ marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <h2 style={{
            fontSize: 'var(--text-body)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)',
            margin: '0 0 var(--space-1)',
          }}>
            拍摄卫浴现场照片
          </h2>
          <p style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            margin: 0,
          }}>
            请按以下指引拍摄3个区域的照片，我们将智能分析安全风险
          </p>
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <p style={{
            fontSize: 'var(--text-caption)',
            color: 'var(--text-secondary)',
            fontWeight: 'var(--weight-medium)',
            margin: '0 0 var(--space-2)',
          }}>
            已完成 {doneCount} / 3 个区域
          </p>
          <div style={{
            height: '4px',
            borderRadius: '2px',
            background: 'var(--border-light)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(doneCount / 3) * 100}%`,
              background: 'var(--accent)',
              borderRadius: '2px',
              transition: 'width .3s ease',
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {PHOTO_AREAS.map((area) => {
            const done = uploaded.has(area.id)
            return (
              <div className="card" key={area.id} style={{ padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  {area.icon}
                  <span style={{
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 'var(--weight-semibold)',
                    color: 'var(--text-primary)',
                  }}>
                    {area.title}
                  </span>
                </div>
                <p style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--text-tertiary)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: '0 0 var(--space-3)',
                }}>
                  {area.description}
                </p>

                {done ? (
                  <div
                    onClick={() => onOpenImagePreview?.(area.guideImg)}
                    style={{
                      height: '140px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={area.guideImg}
                      alt={area.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'var(--accent)',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <CheckCircle size={14} color="#fff" />
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
                      padding: '16px 12px 8px',
                      color: '#fff',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 'var(--weight-medium)',
                    }}>
                      已上传 · 点击查看大图
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleUpload(area.id)}
                    style={{
                      width: '100%',
                      height: '120px',
                      borderRadius: '12px',
                      border: '2px dashed var(--border-light)',
                      background: 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--space-1)',
                      cursor: 'pointer',
                      transition: 'border-color .2s',
                    }}
                  >
                    <Camera size={24} style={{ color: 'var(--text-tertiary)' }} />
                    <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
                      点击拍照上传
                    </span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
        <p style={{
          textAlign: 'center',
          fontSize: 'var(--text-caption)',
          color: 'var(--text-secondary)',
          margin: '0 0 var(--space-2)',
        }}>
          已上传 {doneCount} 个区域
        </p>
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={handleSubmit}
          style={{
            opacity: canSubmit ? 1 : 0.5,
            pointerEvents: canSubmit ? 'auto' : 'none',
          }}
        >
          提交照片，生成评估报告
        </button>
      </div>
    </div>
  )
}

export default SelfAssessmentPage
