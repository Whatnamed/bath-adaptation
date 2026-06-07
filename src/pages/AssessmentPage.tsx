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

/* ── 入户评估结果页 ── */
export default function AssessmentPage() {
  const navigate = useNavigate()

  /* 照片占位区域配置 */
  const photos = [
    { bg: 'var(--accent-soft)', desc: '卫生间地面（湿滑）' },
    { bg: 'var(--surface-warm)', desc: '马桶旁（缺少扶手）' },
    { bg: 'var(--surface-muted)', desc: '走廊夜间照明' },
  ]

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">入户评估结果</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content" style={{ paddingBottom: '100px' }}>
        {/* ── 评估概要卡片 ── */}
        <div className="card page-section">
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
              地点：{assessmentResult.location}
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
            {assessmentResult.summary}
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
                  background: photo.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <Camera
                  size={32}
                  style={{ color: 'var(--text-tertiary)', opacity: 0.5 }}
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
            {/* 用户已上传的照片（示例占位） */}
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <Camera size={24} style={{ color: 'var(--accent)', opacity: 0.6 }} />
              <span
                style={{
                  position: 'absolute',
                  bottom: 4,
                  fontSize: 'var(--text-micro)',
                  color: 'var(--accent)',
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
      <div className="fixed-bottom">
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={() => navigate('/plan')}
        >
          查看推荐方案
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  )
}
