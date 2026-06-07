import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Armchair,
  Droplets,
  Sparkles,
  Lightbulb,
} from 'lucide-react'
import { productCategories, familyInfo } from '../data/mock'

/* ── 图标映射：根据类别 icon 字段选择对应的 lucide 图标 ── */
const iconMap: Record<string, React.ReactNode> = {
  toilet: <Armchair size={28} />,
  shower: <Droplets size={28} />,
  basin: <Sparkles size={28} />,
}

/* ── 改造类别选择页 ── */
export default function CategoryPage() {
  const navigate = useNavigate()

  /* 点击卡片跳转（目前统一到淋浴页） */
  const handleCategoryClick = (_id: string) => {
    navigate('/products/shower')
  }

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">选择改造类别</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
        {/* ── 顶部说明 ── */}
        <div className="page-section">
          <div
            style={{
              fontSize: 'var(--text-section)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            为{familyInfo.elderName}家选择改造项目
          </div>
          <div
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
            }}
          >
            根据评估结果，以下区域需要适老化改造
          </div>
        </div>

        {/* ── 三张类别卡片 ── */}
        <div className="page-section">
          {productCategories.map((cat) => (
            <div
              key={cat.id}
              className="card"
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-3)',
              }}
            >
              {/* 圆形图标容器 */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  minWidth: 64,
                  borderRadius: '50%',
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {iconMap[cat.icon]}
              </div>

              {/* 右侧文字区 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {cat.name}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {cat.desc}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span className="chip chip-accent">{cat.count} 个产品可选</span>
                  <ChevronRight
                    size={18}
                    style={{ color: 'var(--text-tertiary)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 底部提示 ── */}
        <div className="page-section">
          <div
            style={{
              background: 'var(--accent-soft)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-2)',
            }}
          >
            <Lightbulb
              size={16}
              style={{
                color: 'var(--accent)',
                marginTop: 2,
                minWidth: 16,
              }}
            />
            <span
              style={{
                fontSize: 'var(--text-caption)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              您也可以跳过产品选择，由服务站为您推荐最合适的方案
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
