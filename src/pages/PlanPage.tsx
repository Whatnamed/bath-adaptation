import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  AlertTriangle,
  Lightbulb,
  PhoneCall,
  ChevronRight,
} from 'lucide-react'
import { riskFindings, planItems } from '../data/mock'

/* 导入图片资源 */
import antislipImg from '../assets/images/antislip.png'
import handrailImg from '../assets/images/handrail.png'
import nightlightImg from '../assets/images/02_recommendation_cards/recommend_motion_led_night_light.png'
import callbuttonImg from '../assets/images/02_recommendation_cards/recommend_emergency_call_button.png'

/* ── 推荐方案页 ── */
export default function PlanPage() {
  const navigate = useNavigate()

  /* 推荐项目（priority === 'recommended'） */
  const recommendedItems = planItems.filter((item) => item.priority === 'recommended')
  /* 可选项目 */
  const optionalItems = planItems.filter((item) => item.priority === 'optional')

  /* 图片映射：每个 imageKey 对应的图片 */
  const imageMap: Record<string, React.ReactNode> = {
    antislip: <img src={antislipImg} alt="防滑地面" />,
    handrail: <img src={handrailImg} alt="扶手安装" />,
    nightlight: <img src={nightlightImg} alt="感应夜灯" />,
    callbutton: <img src={callbuttonImg} alt="紧急呼叫按钮" />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ── 页面头部 ── */}
      <div className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate('/')}>
          <ChevronLeft size={22} />
        </button>
        <span className="page-header-title">推荐方案</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--space-4)' }}>
        {/* ── 说明文字 ── */}
        <p
          className="page-section"
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            margin: 0,
            marginBottom: 'var(--space-6)',
            marginTop: 'var(--space-4)',
          }}
        >
          根据评估结果，建议优先处理以下项目
        </p>

        {/* ── 重点风险 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">重点风险</span>
          </div>
          {riskFindings.map((risk) => (
            <div className="plan-risk-item" key={risk.id}>
              <AlertTriangle size={18} color="var(--warning)" />
              <span
                style={{
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--text-primary)',
                }}
              >
                {risk.title}
              </span>
            </div>
          ))}
        </div>

        {/* ── 优先建议 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">优先建议</span>
          </div>
          {recommendedItems.map((item) => (
            <div className="plan-item-card" key={item.id}>
              <div className="plan-item-image">
                {imageMap[item.imageKey]}
              </div>
              <div className="plan-item-body">
                <div className="plan-item-name">{item.name}</div>
                <div className="plan-item-desc">{item.desc}</div>
                <div className="plan-item-tag">
                  <span className="chip chip-accent">推荐</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 可选补充 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">可选补充</span>
          </div>
          {optionalItems.map((item) => (
            <div className="plan-item-card" key={item.id}>
              <div className="plan-item-image">
                {imageMap[item.imageKey]}
              </div>
              <div className="plan-item-body">
                <div className="plan-item-name">{item.name}</div>
                <div className="plan-item-desc">{item.desc}</div>
                <div className="plan-item-tag">
                  <span className="chip chip-accent">可选</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 查看评估链接 ── */}
        <div className="page-section">
          <button
            onClick={() => navigate('/assessment')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 'var(--weight-medium)',
              color: 'var(--text-accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            查看完整评估报告 <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── 固定底部 CTA ── */}
      <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={() => navigate('/products')}
        >
          定制改造产品
        </button>
        <button
          onClick={() => navigate('/plan/confirm')}
          style={{
            background: 'none',
            border: 'none',
            width: '100%',
            padding: 'var(--space-3) 0 0',
            fontSize: 'var(--text-caption)',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          跳过，由服务站推荐方案
        </button>
      </div>
    </div>
  )
}
