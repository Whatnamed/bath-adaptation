import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import { riskFindings, planItems } from '../data/mock'
import { Button, Chip, FixedBottomBar, LayoutPlanPreview, PageHeader, SectionHeader } from '../components'

/* 导入图片资源 */
import antislipImg from '../assets/images/antislip.png'
import handrailImg from '../assets/images/handrail.png'
import nightlightImg from '../assets/images/02_recommendation_cards/recommend_motion_led_night_light.png'
import callbuttonImg from '../assets/images/02_recommendation_cards/recommend_emergency_call_button.png'
import toiletAssistImg from '../assets/images/01_products/toilet/product_toilet_t4_toilet_with_support_rails.png'
import seatedShowerImg from '../assets/images/01_products/shower/product_shower_s1_wall_mounted_folding_seat.png'
import layoutRecommendedPlan from '../assets/images/03_assessment_scenes/layout/layout_recommended_plan.png'

interface PlanPageProps {
  onOpenImagePreview?: (src: string) => void
}

/* ── 推荐方案页 ── */
export default function PlanPage({ onOpenImagePreview }: PlanPageProps) {
  const navigate = useNavigate()

  /* 推荐项目（priority === 'recommended'） */
  const recommendedItems = planItems.filter((item) => item.priority === 'recommended')
  /* 可选项目 */
  const optionalItems = planItems.filter((item) => item.priority === 'optional')

  /* 图片映射：每个 imageKey 对应的图片 */
  const imageMap: Record<string, React.ReactNode> = {
    entrySafety: <img src={nightlightImg} alt="入口防滑与夜间提示" />,
    toiletAssist: <img src={toiletAssistImg} alt="坐便辅助模块" />,
    handrail: <img src={handrailImg} alt="双侧助起扶手" />,
    seatedShower: <img src={seatedShowerImg} alt="坐式淋浴模块" />,
    callbutton: <img src={callbuttonImg} alt="紧急呼叫拉绳" />,
    antislip: <img src={antislipImg} alt="防滑地面" />,
  }

  return (
    <div className="screen-frame">
      {/* ── 页面头部 ── */}
      <PageHeader title="推荐方案" backTo="/" iconSize={22} />

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
        {/* ── 说明文字 ── */}
        <p className="plan-lede">
          根据风险位置匹配改造模块，安装前仍会进行上门复核。
        </p>

        <LayoutPlanPreview
          title="推荐改造方案"
          description="方案优先解决如厕起身、淋浴湿滑、夜间进出和紧急求助问题。"
          imageSrc={layoutRecommendedPlan}
          imageAlt="推荐改造方案平面图"
          points={planItems}
          note="图中编号与评估页风险点一一对应，便于对照查看改造前后的变化。"
          onOpenImagePreview={onOpenImagePreview}
        />

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
        {optionalItems.length > 0 && (
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
        )}

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
      <FixedBottomBar>
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
      </FixedBottomBar>
    </div>
  )
}
