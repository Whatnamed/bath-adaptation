import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  Droplets,
  Armchair,
  Sparkles,
} from 'lucide-react'
import { productOptions, productCategories } from '../data/mock'
import { productDetails } from '../data/productDetails'
import { useAppStage } from '../context/AppStageContext'
import { Button, FixedBottomBar, PageHeader, ProductCard } from '../components'

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

const productImages: Record<string, string> = {
  t1: prodT1, t2: prodT2, t3: prodT3, t4: prodT4,
  s1: prodS1, s2: prodS2, s3: prodS3, s4: prodS4,
  b1: prodB1, b2: prodB2, b3: prodB3, b4: prodB4,
}

const categoryIcons: Record<string, React.ReactNode> = {
  toilet: <Armchair size={36} style={{ color: 'var(--accent)', opacity: 0.6 }} />,
  shower: <Droplets size={36} style={{ color: 'var(--accent)', opacity: 0.6 }} />,
  basin: <Sparkles size={36} style={{ color: 'var(--accent)', opacity: 0.6 }} />,
}

export default function ProductOptionsPage() {
  const navigate = useNavigate()
  const { categoryId } = useParams<{ categoryId: string }>()
  const [searchParams] = useSearchParams()
  const fromSource = searchParams.get('from')
  const { selectedProducts, setSelectedProducts } = useAppStage()

  const activeCategoryId = categoryId ?? 'toilet'
  const category = productCategories.find((c) => c.id === activeCategoryId)
  const categoryName = category?.name ?? '产品选择'
  const items = productOptions[activeCategoryId] ?? []
  const selected = new Set(selectedProducts[activeCategoryId] ?? [])

  const toggleItem = (id: string) => {
    const next = new Set(selectedProducts[activeCategoryId] ?? [])
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }

    setSelectedProducts({
      ...selectedProducts,
      [activeCategoryId]: Array.from(next),
    })
  }

  const handleDone = () => {
    navigate(`/products${fromSource ? `?from=${fromSource}` : ''}`)
  }

  const currentIcon = categoryIcons[activeCategoryId]

  return (
    <div className="screen-frame screen-frame-overlay">
      <PageHeader
        title={categoryName}
        backTo={`/products${fromSource ? `?from=${fromSource}` : ''}`}
      />

      <div className="subpage-content subpage-content-roomy">
        <div className="page-section product-category-lede">
          <div className="product-category-title">
            选择适合的{categoryName.replace('改造', '')}产品
          </div>
          <div className="product-category-subtitle">
            可多选。点击产品卡片查看尺寸和安装条件，选择状态会实时保留。
          </div>
        </div>

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

      <FixedBottomBar variant="floating">
        <div className="bottom-bar-summary">
          已选 {selected.size} 项产品
        </div>
        <Button
          block
          size="lg"
          disabled={selected.size === 0}
          onClick={handleDone}
        >
          完成当前类别选择
        </Button>
      </FixedBottomBar>
    </div>
  )
}
