import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Check, Droplets } from 'lucide-react'
import { productOptions } from '../data/mock'

/* ── 产品子选项页（淋浴改造） ── */
export default function ProductOptionsPage() {
  const navigate = useNavigate()

  /* 淋浴类别的产品列表 */
  const items = productOptions['shower']

  /* 选中状态管理 */
  const [selected, setSelected] = useState<Set<string>>(new Set())

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
  }

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">淋浴改造</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content" style={{ paddingBottom: '140px' }}>
        {/* ── 顶部引导 ── */}
        <div
          className="page-section"
          style={{ marginBottom: 'var(--space-5)' }}
        >
          <div
            style={{
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            选择适合的淋浴产品
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
        {items.map((item) => {
          const isSelected = selected.has(item.id)

          return (
            <div
              key={item.id}
              className="card"
              onClick={() => toggleItem(item.id)}
              style={{
                cursor: 'pointer',
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

              {/* 产品占位图区域 */}
              <div
                style={{
                  height: 120,
                  background: 'var(--accent-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Droplets
                  size={36}
                  style={{ color: 'var(--accent)', opacity: 0.6 }}
                />
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
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── 固定底部操作栏 ── */}
      <div className="fixed-bottom">
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
          onClick={() => navigate('/plan/confirm')}
        >
          加入改造方案
        </button>
      </div>
    </>
  )
}
