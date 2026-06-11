import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ChevronLeft,
  Check,
  Droplets,
  Armchair,
  Sparkles,
  CheckCircle,
} from 'lucide-react'
import { productOptions, productCategories } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'

/* 产品图片导入 */
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

/* 产品图片映射 */
const productImages: Record<string, string> = {
  t1: prodT1, t2: prodT2, t3: prodT3, t4: prodT4,
  s1: prodS1, s2: prodS2, s3: prodS3, s4: prodS4,
  b1: prodB1, b2: prodB2, b3: prodB3, b4: prodB4,
}

/* ── 产品价格映射 ── */
const productPrices: Record<string, number> = {
  t1: 580, t2: 720, t3: 1680, t4: 1280,
  s1: 360, s2: 480, s3: 380, s4: 220,
  b1: 450, b2: 560, b3: 380, b4: 680,
}

/* ── 类别图标映射 ── */
const categoryIcons: Record<string, React.ReactNode> = {
  toilet: <Armchair size={36} style={{ color: 'var(--accent)', opacity: 0.6 }} />,
  shower: <Droplets size={36} style={{ color: 'var(--accent)', opacity: 0.6 }} />,
  basin: <Sparkles size={36} style={{ color: 'var(--accent)', opacity: 0.6 }} />,
}

/* ── 产品选项页（支持马桶/淋浴/洗漱台三大类别） ── */
export default function ProductOptionsPage() {
  const navigate = useNavigate()
  const { categoryId } = useParams<{ categoryId: string }>()
  const [searchParams] = useSearchParams()
  const fromSource = searchParams.get('from')
  const { selectedProducts, setSelectedProducts } = useAppStage()

  const activeCategoryId = categoryId ?? 'toilet'

  /* 获取当前类别信息 */
  const category = productCategories.find((c) => c.id === activeCategoryId)
  const categoryName = category?.name ?? '产品选择'

  /* 获取当前类别的产品列表 */
  const items = productOptions[activeCategoryId] ?? []

  /* 从全局状态读取初始选中项 */
  const [selected, setSelected] = useState<Set<string>>(new Set())

  useEffect(() => {
    const initialSelected = selectedProducts[activeCategoryId] || []
    setSelected(new Set(initialSelected))
  }, [activeCategoryId, selectedProducts])

  /* 是否已确认加入（显示成功提示） */
  const [confirmed, setConfirmed] = useState(false)

  /* 切换选中 */
  const toggleItem = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    /* 如果之前已确认，重新选择时清除确认状态 */
    if (confirmed) setConfirmed(false)
  }

  /* 加入改造方案：保存到全局 Context，显示成功提示，然后返回类别页 */
  const handleAddToPlan = () => {
    const selectedList = Array.from(selected)
    setSelectedProducts({
      ...selectedProducts,
      [activeCategoryId]: selectedList,
    })
    setConfirmed(true)
    /* 延迟 800ms 让用户看到成功提示，然后返回类别页继续选择其他类别 */
    setTimeout(() => {
      navigate(`/products${fromSource ? `?from=${fromSource}` : ''}`)
    }, 800)
  }

  /* 获取当前类别对应的图标 */
  const currentIcon = categoryIcons[activeCategoryId]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ── 页面头部 ── */}
      <div className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate(`/products${fromSource ? `?from=${fromSource}` : ''}`)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">{categoryName}</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--space-4)' }}>
        {/* ── 顶部引导 ── */}
        <div
          className="page-section"
          style={{ marginBottom: 'var(--space-5)', marginTop: 'var(--space-4)' }}
        >
          <div
            style={{
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            选择适合的{categoryName.replace('改造', '')}产品
          </div>
          <div
            style={{
              fontSize: 'var(--text-caption)',
              color: 'var(--text-secondary)',
            }}
          >
            可多选，我们会根据实际情况推荐搭配方案
          </div>
        </div>

        {/* ── 产品选项卡片列表 ── */}
        <div className="page-section">
          {items.map((item) => {
            const isSelected = selected.has(item.id)

            return (
              <div
                key={item.id}
                className="card stagger-item"
                style={{
                  marginBottom: 'var(--space-3)',
                  border: isSelected
                    ? '2px solid var(--accent)'
                    : '2px solid transparent',
                  background: isSelected ? '#F4F7F2' : undefined,
                  padding: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* 选中对勾 */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <Check size={14} color="#fff" strokeWidth={3} />
                  </div>
                )}

                {/* 产品图片 */}
                <div
                  style={{
                    background: '#f5f7f3',
                    overflow: 'hidden',
                  }}
                >
                  {productImages[item.id] ? (
                    <img
                      src={productImages[item.id]}
                      alt={item.name}
                      style={{ width: '100%', display: 'block' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 180 }}>
                      {currentIcon}
                    </div>
                  )}
                </div>

                {/* 卡片主体 */}
                <div style={{ padding: 'var(--space-4)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        fontWeight: 'var(--weight-semibold)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {item.name}
                    </span>
                    {item.tag && (
                      <span className="chip chip-accent">{item.tag}</span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {item.desc}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-2)' }}>
                    <div
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--accent-deep)',
                      }}
                    >
                      ¥{productPrices[item.id] ?? '—'}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleItem(item.id)
                      }}
                      style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        border: isSelected ? 'none' : '1.5px solid var(--accent)',
                        background: isSelected ? 'var(--accent)' : 'transparent',
                        color: isSelected ? '#fff' : 'var(--accent)',
                        fontSize: 'var(--text-caption)',
                        fontWeight: 'var(--weight-semibold)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {isSelected ? (
                        <><Check size={14} /> 已选</>
                      ) : (
                        '选择'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 固定底部操作栏 ── */}
      <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
        {/* 确认成功提示 */}
        {confirmed ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3)',
              color: 'var(--accent)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 'var(--weight-semibold)',
            }}
          >
            <CheckCircle size={20} />
            已加入方案，正在返回类别选择…
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-2)',
                textAlign: 'center',
              }}
            >
              已选 {selected.size} 项产品
            </div>
            <button
              className="btn btn-primary btn-block btn-lg"
              style={{
                opacity: selected.size === 0 ? 0.5 : 1,
                pointerEvents: selected.size === 0 ? 'none' : 'auto',
              }}
              onClick={handleAddToPlan}
            >
              加入改造方案
            </button>
          </>
        )}
      </div>
    </div>
  )
}
