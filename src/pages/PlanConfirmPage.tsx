import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Check,
  Info,
  MapPin,
  Clock,
} from 'lucide-react'
import { planItems, costBreakdown } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'

/* ── 方案确认 / 费用说明页 ── */
export default function PlanConfirmPage() {
  const navigate = useNavigate()
  const { setStage } = useAppStage()

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
          </div>
          <div className="card">
            {planItems.map((item) => (
              <div
                className="list-row"
                key={item.id}
                style={{ minHeight: 44 }}
              >
                {/* 左侧绿色对勾 */}
                <div
                  className="icon-circle icon-circle-sm"
                  style={{
                    background: 'var(--accent-soft)',
                    color: 'var(--accent)',
                  }}
                >
                  <Check size={16} />
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
              <span className="cost-value">
                ¥{costBreakdown.items.reduce((sum, i) => sum + i.value, 0)}
              </span>
            </div>

            {/* 安装服务费 */}
            <div className="cost-row">
              <span className="cost-label">安装服务费</span>
              <span className="cost-value">¥{costBreakdown.serviceFee}</span>
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
                {costBreakdown.subsidy}
              </span>
            </div>

            {/* 合计 */}
            <div className="cost-total">
              <span className="cost-total-label">预计合计</span>
              <span className="cost-total-value">¥{costBreakdown.total}</span>
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
            <span>{costBreakdown.note}</span>
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
                  协调服务站
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 'var(--weight-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  桂林镇便民服务站
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 固定底部 CTA ── */}
      <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
        <button
          className="btn btn-primary btn-block btn-lg"
          onClick={() => {
            setStage('plan_confirmed')
            navigate('/')
          }}
        >
          确认方案并预约安装
        </button>
      </div>
    </div>
  )
}
