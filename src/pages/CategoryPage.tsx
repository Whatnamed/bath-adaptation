import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ChevronRight,
  Armchair,
  Droplets,
  Sparkles,
  Lightbulb,
} from 'lucide-react'
import { productCategories, productOptions } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'
import { Button, PageHeader } from '../components'

/* ── 图标映射：根据类别 icon 字段选择对应的 lucide 图标 ── */
const iconMap: Record<string, React.ReactNode> = {
  toilet: <Armchair size={28} />,
  shower: <Droplets size={28} />,
  basin: <Sparkles size={28} />,
}

/* ── 改造类别选择页 ── */
export default function CategoryPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { selectedProducts, familyDetails } = useAppStage()

  /* 判断来源：从推荐方案页进来 or 从评估方式选择页的"自行选购"进来 */
  const fromSource = searchParams.get('from')

  /* 返回按钮：根据来源决定返回目标 */
  const handleBack = () => {
    if (fromSource === 'direct') {
      // 从"自行选购"进入，返回到评估方式选择页
      navigate('/assessment/choose')
    } else {
      // 从推荐方案页进入，返回到推荐方案
      navigate('/plan')
    }
  }

  /* 点击卡片跳转到对应类别的产品页，传递来源信息 */
  const handleCategoryClick = (id: string) => {
    navigate(`/products/${id}${fromSource ? `?from=${fromSource}` : ''}`)
  }

  /* 统计总共选了几个产品 */
  const totalSelectedCount = Object.values(selectedProducts).reduce(
    (acc, list) => acc + list.length,
    0
  )

  return (
    <div className="screen-frame">
      {/* ── 页面头部 ── */}
      <PageHeader title="选择改造类别" onBack={handleBack} />

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
        {/* ── 顶部说明 ── */}
        <div className="page-section" style={{ marginTop: 'var(--space-4)' }}>
          <div
            style={{
              fontSize: 'var(--text-section)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            为{familyDetails.elderName || '老人'}家选择改造项目
          </div>
          <div
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
            }}
          >
            {fromSource === 'direct'
              ? '浏览并选择您需要的适老化改造产品'
              : '根据评估结果，以下区域需要适老化改造'}
          </div>
        </div>

        {/* ── 三张类别卡片 ── */}
        <div className="page-section">
          {productCategories.map((cat) => {
            const selectedIds = selectedProducts[cat.id] || []
            const options = productOptions[cat.id] || []
            const selectedItems = options.filter((item) => selectedIds.includes(item.id))
            const hasSelected = selectedItems.length > 0

            return (
              <div
                key={cat.id}
                className="card card-interactive stagger-item"
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-3)',
                  border: hasSelected ? '1px solid var(--accent)' : '1px solid transparent',
                  background: hasSelected ? 'var(--accent-soft)' : 'var(--surface-card)',
                }}
              >
                {/* 圆形图标容器 */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    minWidth: 64,
                    borderRadius: '50%',
                    background: hasSelected ? 'var(--surface-card)' : 'var(--accent-soft)',
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

                  {/* 动态显示已选的产品列表 */}
                  {hasSelected ? (
                    <div
                      style={{
                        background: 'rgba(110, 158, 107, 0.15)',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: 'var(--text-caption)',
                        color: 'var(--accent-deep)',
                        fontWeight: 'var(--weight-medium)',
                        marginBottom: 'var(--space-2)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      已选：{selectedItems.map((item) => item.name).join('、')}
                    </div>
                  ) : null}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span className={`chip ${hasSelected ? 'chip-success' : 'chip-accent'}`}>
                      {hasSelected ? `已选 ${selectedItems.length} 款` : `${cat.count} 个产品可选`}
                    </span>
                    <ChevronRight
                      size={18}
                      style={{ color: 'var(--text-tertiary)' }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
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

      {/* ── 固定底部操作栏 ── */}
      <div className="fixed-bottom fixed-bottom-attached">
        <Button
          block
          size="lg"
          onClick={() => navigate('/plan/confirm')}
          disabled={totalSelectedCount <= 0}
          style={{
            opacity: totalSelectedCount > 0 ? 1 : 0.5,
            pointerEvents: totalSelectedCount > 0 ? 'auto' : 'none',
          }}
        >
          {totalSelectedCount > 0 ? `确认已选 ${totalSelectedCount} 项，进入下一步` : '请先选择改造产品'}
        </Button>
      </div>
    </div>
  )
}
