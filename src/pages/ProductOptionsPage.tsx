import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  Droplets,
  Armchair,
  Sparkles,
  CheckCircle,
} from 'lucide-react'
import { productOptions, productCategories } from '../data/mock'
import { productDetails } from '../data/productDetails'
import { useAppStage } from '../context/AppStageContext'
import { Button, FixedBottomBar, PageHeader, ProductCard } from '../components'

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

  /* 本地草稿：确认加入前不写回全局 Context */
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, string[]>>(() => selectedProducts)
  const selected = new Set(selectedByCategory[activeCategoryId] ?? selectedProducts[activeCategoryId] ?? [])

  /* 是否已确认加入（显示成功提示） */
  const [confirmed, setConfirmed] = useState(false)

  /* 切换选中 */
  const toggleItem = (id: string) => {
    setSelectedByCategory((prev) => {
      const next = new Set(prev[activeCategoryId] ?? selectedProducts[activeCategoryId] ?? [])
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return {
        ...prev,
        [activeCategoryId]: Array.from(next),
      }
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
    <div className="screen-frame screen-frame-overlay">
      {/* ── 页面头部 ── */}
      <PageHeader
        title={categoryName}
        backTo={`/products${fromSource ? `?from=${fromSource}` : ''}`}
      />

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content subpage-content-roomy">
        {/* ── 顶部引导 ── */}
        <div className="page-section product-category-lede">
          <div className="product-category-title">
            选择适合的{categoryName.replace('改造', '')}产品
          </div>
          <div className="product-category-subtitle">
            可多选，我们会根据实际情况推荐搭配方案
          </div>
        </div>

        {/* ── 产品选项卡片列表 ── */}
        <div className="page-section">
          {items.map((item) => {
            const isSelected = selected.has(item.id)

            return (
              <ProductCard
                key={item.id}
                name={item.name}
                desc={item.desc}
                image={productImages[item.id]}
                fallbackIcon={currentIcon}
                tag={item.tag}
                price={productDetails[item.id]?.price}
                selected={isSelected}
                onToggle={() => toggleItem(item.id)}
                onOpen={() => navigate(`/products/${activeCategoryId}/${item.id}${fromSource ? `?from=${fromSource}` : ''}`)}
              />
            )
          })}
        </div>
      </div>

      {/* ── 固定底部操作栏 ── */}
      <FixedBottomBar variant="floating">
        {/* 确认成功提示 */}
        {confirmed ? (
          <div className="bottom-bar-success">
            <CheckCircle size={20} />
            已加入方案，正在返回类别选择…
          </div>
        ) : (
          <>
            <div className="bottom-bar-summary">
              已选 {selected.size} 项产品
            </div>
            <Button
              block
              size="lg"
              disabled={selected.size === 0}
              onClick={handleAddToPlan}
            >
              加入改造方案
            </Button>
          </>
        )}
      </FixedBottomBar>
    </div>
  )
}
