import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  Check,
  ClipboardCheck,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { productCategories, productOptions } from '../data/mock'
import { productDetails } from '../data/productDetails'
import { useAppStage } from '../context/AppStageContext'
import { Button, Card, Chip, FixedBottomBar, InfoNote, PageHeader, SectionHeader } from '../components'

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

function DetailList({ items }: { items: string[] }) {
  return (
    <div className="product-detail-list">
      {items.map((item) => (
        <span key={item}>
          <Check size={13} />
          {item}
        </span>
      ))}
    </div>
  )
}

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const { categoryId = 'toilet', productId = '' } = useParams<{ categoryId: string; productId: string }>()
  const [searchParams] = useSearchParams()
  const fromSource = searchParams.get('from')
  const { selectedProducts, setSelectedProducts } = useAppStage()

  const category = productCategories.find((item) => item.id === categoryId)
  const product = (productOptions[categoryId] ?? []).find((item) => item.id === productId)
  const detail = productDetails[productId]
  const selected = Boolean(selectedProducts[categoryId]?.includes(productId))
  const backTo = `/products/${categoryId}${fromSource ? `?from=${fromSource}` : ''}`

  const handleAddToPlan = () => {
    if (!product || !detail) return

    if (!selected) {
      const current = new Set(selectedProducts[categoryId] ?? [])
      current.add(productId)
      setSelectedProducts({
        ...selectedProducts,
        [categoryId]: Array.from(current),
      })
    }

    navigate(backTo)
  }

  if (!product || !detail) {
    return (
      <div className="screen-frame">
        <PageHeader title="产品详情" backTo={backTo} />
        <div className="subpage-content">
          <Card className="product-detail-empty">
            当前产品信息暂不可用，请返回重新选择。
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="screen-frame screen-frame-overlay">
      <PageHeader title="产品详情" backTo={backTo} />

      <div className="subpage-content subpage-content-roomy">
        <div className="product-detail-hero">
          <img src={productImages[product.id]} alt={product.name} />
        </div>

        <div className="product-detail-title-block">
          <div>
            <div className="product-detail-category">{category?.name ?? '适老化产品'}</div>
            <h1>{product.name}</h1>
          </div>
          <div className="product-detail-price">¥{detail.price}</div>
        </div>

        <p className="product-detail-desc">{product.desc}</p>

        <Card className="product-detail-section">
          <SectionHeader title="解决什么风险" action={<ShieldCheck size={18} />} />
          <DetailList items={detail.risks} />
        </Card>

        <Card className="product-detail-section">
          <SectionHeader title="适合哪些家庭" action={<Sparkles size={18} />} />
          <DetailList items={detail.suitableFor} />
        </Card>

        <Card className="product-detail-section">
          <SectionHeader title="关键尺寸" action={<Ruler size={18} />} />
          <div className="product-dimension-table">
            {detail.dimensions.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card className="product-detail-section">
          <SectionHeader title="安装条件" action={<Wrench size={18} />} />
          <DetailList items={detail.installConditions} />
        </Card>

        <Card className="product-detail-section">
          <SectionHeader title="服务包含" action={<ClipboardCheck size={18} />} />
          <div className="product-service-tags">
            {detail.serviceIncludes.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </Card>

        <InfoNote icon={<Ruler size={16} />}>
          {detail.note}
        </InfoNote>
      </div>

      <FixedBottomBar variant="floating">
        <Button block size="lg" onClick={handleAddToPlan}>
          {selected ? '已加入方案，返回选择' : '加入改造方案'}
        </Button>
      </FixedBottomBar>
    </div>
  )
}
