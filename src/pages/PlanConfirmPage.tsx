import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Check,
  Info,
  MapPin,
  Clock,
} from 'lucide-react'
import { productOptions } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'

/* 产品缩略图导入 */
import prodT1 from '../assets/images/01_products/toilet/product_toilet_t1_squat_to_seat_adapter.png'
import prodT2 from '../assets/images/01_products/toilet/product_toilet_t2_raised_height_toilet.png'
import prodT3 from '../assets/images/01_products/toilet/product_toilet_t3_smart_toilet.png'
import prodT4 from '../assets/images/01_products/toilet/product_toilet_t4_toilet_with_support_rails.png'
import prodS1 from '../assets/images/01_products/shower/product_shower_s1_wall_mounted_folding_seat.png'
import prodS2 from '../assets/images/01_products/shower/product_shower_s2_thermostatic_digital_shower.png'
import prodS3 from '../assets/images/01_products/shower/product_shower_s3_anti_slip_floor_sample.png'
import prodS4 from '../assets/images/01_products/shower/product_shower_s4_shower_partition_glass.png'
import prodB1 from '../assets/images/01_products/basin/product_basin_b1_rounded_anti_bump_basin.png'
import prodB2 from '../assets/images/01_products/basin/product_basin_b2_basin_with_support_rails.png'
import prodB3 from '../assets/images/01_products/basin/product_basin_b3_wall_mounted_accessible_basin.png'
import prodB4 from '../assets/images/01_products/basin/product_basin_b4_floating_elderly_washstand.png'
import handrailImg from '../assets/images/handrail.png'
import nightlightImg from '../assets/images/02_recommendation_cards/recommend_motion_led_night_light.png'
import callbuttonImg from '../assets/images/02_recommendation_cards/recommend_emergency_call_button.png'

/* 产品缩略图映射 */
const productThumbs: Record<string, string> = {
  t1: prodT1, t2: prodT2, t3: prodT3, t4: prodT4,
  s1: prodS1, s2: prodS2, s3: prodS3, s4: prodS4,
  b1: prodB1, b2: prodB2, b3: prodB3, b4: prodB4,
  default1: nightlightImg, default2: prodT4,
  default3: handrailImg, default4: prodS1,
  default5: callbuttonImg,
}

/* ── 产品价格映射（模拟价格数据） ── */
const productPrices: Record<string, number> = {
  /* 马桶类 */
  t1: 580,
  t2: 720,
  t3: 1680,
  t4: 1280,
  /* 淋浴类 */
  s1: 360,
  s2: 480,
  s3: 380,
  s4: 220,
  /* 洗漱台类 */
  b1: 450,
  b2: 560,
  b3: 380,
  b4: 680,
}

/* ── 方案确认 / 费用说明页 ── */
export default function PlanConfirmPage() {
  const navigate = useNavigate()
  const { setStage, selectedProducts, familyDetails } = useAppStage()
  const [submitting, setSubmitting] = useState(false)

  /* 从全局状态中获取用户已选产品，构建动态的费用清单 */
  const selectedItemsList: { id: string; name: string; price: number; category: string }[] = []

  Object.entries(selectedProducts).forEach(([categoryId, ids]) => {
    const options = productOptions[categoryId] || []
    ids.forEach((id) => {
      const product = options.find((p) => p.id === id)
      if (product) {
        selectedItemsList.push({
          id: product.id,
          name: product.name,
          price: productPrices[product.id] ?? 500,
          category: categoryId,
        })
      }
    })
  })

  /* 如果没有选择任何产品，使用默认推荐方案 */
  const hasCustomSelection = selectedItemsList.length > 0
  const displayItems = hasCustomSelection
    ? selectedItemsList
    : [
        { id: 'default1', name: '入口防滑与夜间提示', price: 320, category: 'shower' },
        { id: 'default2', name: '坐便辅助模块', price: 580, category: 'toilet' },
        { id: 'default3', name: '双侧助起扶手', price: 260, category: 'toilet' },
        { id: 'default4', name: '坐式淋浴模块', price: 740, category: 'shower' },
        { id: 'default5', name: '紧急呼叫拉绳', price: 120, category: 'basin' },
      ]

  /* 动态计算费用 */
  const productTotal = displayItems.reduce((sum, item) => sum + item.price, 0)
  const serviceFee = displayItems.length <= 2 ? 150 : 200
  const subsidy = Math.min(Math.round(productTotal * 0.15), 300) // 补贴最高300元
  const total = productTotal + serviceFee - subsidy

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ── 页面头部 ── */}
      <div className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={22} />
        </button>
        <span className="page-header-title">方案确认</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--space-4)' }}>
        {/* ── 已选项目摘要 ── */}
        <div className="page-section" style={{ marginTop: 'var(--space-4)' }}>
          <div className="section-header">
            <span className="section-title">已选改造项目</span>
            <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
              共 {displayItems.length} 项
            </span>
          </div>
          <div className="card">
            {displayItems.map((item) => (
              <div
                className="list-row"
                key={item.id}
                style={{ minHeight: 44 }}
              >
                {/* 产品缩略图 */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: '#f5f7f3',
                    flexShrink: 0,
                  }}
                >
                  {productThumbs[item.id] ? (
                    <img
                      src={productThumbs[item.id]}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={16} color="var(--accent)" />
                    </div>
                  )}
                </div>
                {/* 项目名 */}
                <div className="list-row-content">
                  <span
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                {/* 价格 */}
                <div className="list-row-accessory">
                  <span
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    ¥{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 费用明细 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">费用说明</span>
          </div>
          <div className="card">
            {/* 产品及材料费 */}
            <div className="cost-row">
              <span className="cost-label">产品及材料费</span>
              <span className="cost-value">¥{productTotal}</span>
            </div>

            {/* 安装服务费 */}
            <div className="cost-row">
              <span className="cost-label">安装服务费</span>
              <span className="cost-value">¥{serviceFee}</span>
            </div>

            {/* 入户评估费 */}
            <div className="cost-row">
              <span className="cost-label">入户评估费</span>
              <span className="cost-value" style={{ color: 'var(--accent)' }}>
                免费
              </span>
            </div>

            {/* 补贴抵扣 */}
            <div className="cost-row">
              <span className="cost-label">补贴抵扣</span>
              <span className="cost-value" style={{ color: 'var(--accent)' }}>
                -¥{subsidy}
              </span>
            </div>

            {/* 合计 */}
            <div className="cost-total">
              <span className="cost-total-label">预计合计</span>
              <span className="cost-total-value">¥{total}</span>
            </div>
          </div>
        </div>

        {/* ── 注意提示 ── */}
        <div className="page-section">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
              padding: 'var(--space-4)',
              background: 'var(--accent-soft)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-caption)',
              color: 'var(--accent)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            <Info size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>以上价格为预估参考价，最终价格以上门复核实际情况为准。政府补贴金额以实际批复为准。</span>
          </div>
        </div>

        {/* ── 服务安排 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">服务安排</span>
          </div>
          <div className="card">
            {/* 预计安装时间 */}
            <div
              className="flex items-center"
              style={{
                gap: 'var(--space-3)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <div
                className="icon-circle icon-circle-md"
                style={{
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                }}
              >
                <Clock size={18} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--text-tertiary)',
                    marginBottom: 2,
                  }}
                >
                  预计安装时间
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 'var(--weight-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  确认后 3-5 个工作日
                </div>
              </div>
            </div>

            {/* 协调服务站 */}
            <div
              className="flex items-center"
              style={{
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-3)',
              }}
            >
              <div
                className="icon-circle icon-circle-md"
                style={{
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--text-tertiary)',
                    marginBottom: 2,
                  }}
                >
                  服务地址
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 'var(--weight-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {familyDetails.villageCommunity} {familyDetails.houseNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 固定底部 CTA ── */}
      <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-3)',
        }}>
          <span style={{
            fontSize: 'var(--text-caption)',
            color: 'var(--text-secondary)',
          }}>
            合计
          </span>
          <span style={{
            fontSize: 'var(--text-title)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--accent-deep)',
          }}>
            ¥{total}
          </span>
        </div>
        <button
          className={`btn btn-primary btn-block btn-lg ${submitting ? 'btn-loading' : ''}`}
          disabled={submitting}
          onClick={() => {
            setSubmitting(true)
            setTimeout(() => {
              setStage('plan_confirmed')
              navigate('/')
            }, 800)
          }}
        >
          确认方案并预约安装
        </button>
      </div>
    </div>
  )
}
