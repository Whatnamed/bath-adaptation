import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import { riskFindings, planItems } from '../data/mock'
import { Button, Chip, PageHeader, SectionHeader } from '../components'

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
    <div className="screen-frame">
      {/* ── 页面头部 ── */}
      <PageHeader title="推荐方案" backTo="/" iconSize={22} />

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
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
          <SectionHeader title="重点风险" />
          <div className="risk-chip-row">
            {riskFindings.map((risk) => (
              <div 
                key={risk.id}
                className="risk-chip"
              >
                <AlertTriangle size={14} color="var(--text-secondary)" />
                <span className="risk-chip-label">{risk.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 优先建议 ── */}
        <div className="page-section">
          <SectionHeader title="优先建议" />
          {recommendedItems.map((item) => (
            <div className="plan-item-card" key={item.id}>
              <div className="plan-item-image">
                {imageMap[item.imageKey]}
              </div>
              <div className="plan-item-body">
                <div className="plan-item-name">{item.name}</div>
                <div className="plan-item-desc">{item.desc}</div>
                <div className="plan-item-tag">
                  <Chip>推荐</Chip>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 可选补充 ── */}
        <div className="page-section">
          <SectionHeader title="可选补充" />
          {optionalItems.map((item) => (
            <div className="plan-item-card" key={item.id}>
              <div className="plan-item-image">
                {imageMap[item.imageKey]}
              </div>
              <div className="plan-item-body">
                <div className="plan-item-name">{item.name}</div>
                <div className="plan-item-desc">{item.desc}</div>
                <div className="plan-item-tag">
                  <Chip>可选</Chip>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 查看评估链接 ── */}
        <div className="page-section">
          <button
            onClick={() => navigate('/assessment')}
            className="btn-link"
          >
            查看完整评估报告 <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── 固定底部 CTA ── */}
      <div className="fixed-bottom fixed-bottom-attached">
        <Button
          block
          size="lg"
          onClick={() => navigate('/products')}
        >
          定制改造产品
        </Button>
        <button
          onClick={() => navigate('/plan/confirm')}
          className="btn-subtle-block"
        >
          跳过，由服务站推荐方案
        </button>
      </div>
    </div>
  )
}
