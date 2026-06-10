import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ClipboardCheck,
  Clock,
  MapPin,
  Shield,
  Calendar,
  Check,
} from 'lucide-react'
import { useAppStage } from '../context/AppStageContext'

/* 可选时间段 */
const TIME_OPTIONS = [
  { id: 'jun15_am', label: '6月15日 周日上午' },
  { id: 'jun16_pm', label: '6月16日 周一下午' },
  { id: 'jun18_am', label: '6月18日 周三上午' },
]

const ApplyAssessmentPage: React.FC = () => {
  const navigate = useNavigate()
  const { setStage } = useAppStage()

  const [selectedTime, setSelectedTime] = useState<string>('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = selectedTime !== '' && !submitting

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitting(true)
    /* 模拟提交过程，给用户反馈 */
    setTimeout(() => {
      setStage('assessment_pending')
      navigate('/')
    }, 800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ---- 顶栏 ---- */}
      <header className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-header-title">申请专业评估</h1>
      </header>

      {/* ---- 可滚动主体 ---- */}
      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--space-4)' }}>
        {/* 评估说明卡片 */}
        <div className="card" style={{ padding: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          {/* 标题行 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <ClipboardCheck size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
              入户评估服务
            </span>
          </div>

          {/* 描述 */}
          <p style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            margin: '0 0 var(--space-4)',
          }}>
            评估员将上门检查卫浴环境，记录安全隐患并出具专业报告。全程约30分钟，完全免费。
          </p>

          {/* 信息行 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {[
              { icon: <Clock size={16} />, text: '预计时长 30分钟' },
              { icon: <MapPin size={16} />, text: '评估范围 卫浴 + 走廊' },
              { icon: <Shield size={16} />, text: '费用 免费' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ color: 'var(--text-tertiary)', display: 'flex' }}>{item.icon}</span>
                <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 选择期望上门时间 */}
        <div className="page-section">
          <div className="section-header">
            <h2 className="section-title">选择期望上门时间</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {TIME_OPTIONS.map((opt) => {
              const active = selectedTime === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTime(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: '12px',
                    border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border-light)'}`,
                    background: active ? 'var(--accent-soft)' : 'var(--bg-card, #fff)',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Calendar size={18} style={{ color: active ? 'var(--accent)' : 'var(--text-tertiary)' }} />
                    <span style={{
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 'var(--weight-medium)',
                      color: active ? 'var(--accent)' : 'var(--text-primary)',
                    }}>
                      {opt.label}
                    </span>
                  </div>
                  {active && <Check size={20} style={{ color: 'var(--accent)' }} />}
                </button>
              )
            })}
          </div>
        </div>

        {/* 补充说明 */}
        <div className="page-section">
          <div className="section-header">
            <h2 className="section-title">补充说明（选填）</h2>
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="如有特殊需求，请在此说明…"
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card, #fff)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: 'var(--leading-relaxed)',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* ---- 固定底部 ---- */}
      <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
        <button
          className={`btn btn-primary btn-block btn-lg ${submitting ? 'btn-loading' : ''}`}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          提交评估申请
        </button>
      </div>
    </div>
  )
}

export default ApplyAssessmentPage
