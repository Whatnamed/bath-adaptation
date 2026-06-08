import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppStage } from '../context/AppStageContext'

/* ── 进度指示器组件 ── */
function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [1, 2, 3] as const
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        padding: 'var(--space-4) 0 var(--space-2)',
      }}
    >
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
          {/* 圆点 */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: s <= current ? 'var(--accent)' : 'var(--surface-muted)',
              color: s <= current ? '#fff' : 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-caption)',
              fontWeight: 'var(--weight-semibold)',
              transition: 'all 0.3s ease',
            }}
          >
            {s}
          </div>
          {/* 连接线（最后一个不需要） */}
          {i < steps.length - 1 && (
            <div
              style={{
                width: 48,
                height: 2,
                background: s < current ? 'var(--accent)' : 'var(--border-light)',
                transition: 'background 0.3s ease',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── 统一的输入框样式 ── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: '1px solid var(--border-light)',
  fontSize: 'var(--text-body)',
  color: 'var(--text-primary)',
  background: 'var(--surface)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
}

/* ── 输入项标签样式 ── */
const labelStyle: React.CSSProperties = {
  fontSize: 'var(--text-body-sm)',
  color: 'var(--text-secondary)',
  marginBottom: 'var(--space-2)',
  fontWeight: 'var(--weight-medium)',
}

/* ── 绑定家庭页 ── */
export default function FamilyBindPage() {
  const navigate = useNavigate()
  const { setStage } = useAppStage()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [gender, setGender] = useState<'男' | '女'>('女')

  /* 确认绑定 */
  const handleConfirm = () => {
    setStage('idle')
    navigate('/')
  }

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">绑定家庭</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
        {/* 进度指示器 */}
        <div className="page-section">
          <StepIndicator current={step} />
        </div>

        {/* ── 步骤 1：老人基本信息 ── */}
        {step === 1 && (
          <>
            <div className="page-section">
              <div
                style={{
                  fontSize: 'var(--text-section)',
                  fontWeight: 'var(--weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                老人基本信息
              </div>

              {/* 姓名 */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={labelStyle}>姓名</div>
                <input
                  type="text"
                  placeholder="请输入老人姓名"
                  defaultValue=""
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
                />
              </div>

              {/* 年龄 */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={labelStyle}>年龄</div>
                <input
                  type="number"
                  placeholder="请输入年龄"
                  defaultValue=""
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
                />
              </div>

              {/* 性别 */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={labelStyle}>性别</div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  {(['男', '女'] as const).map((g) => (
                    <div
                      key={g}
                      onClick={() => setGender(g)}
                      style={{
                        flex: 1,
                        padding: '10px 0',
                        borderRadius: 8,
                        border: `1.5px solid ${gender === g ? 'var(--accent)' : 'var(--border-light)'}`,
                        background: gender === g ? 'var(--accent-soft)' : 'var(--surface)',
                        color: gender === g ? 'var(--accent)' : 'var(--text-secondary)',
                        fontWeight: 'var(--weight-medium)',
                        fontSize: 'var(--text-body)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── 步骤 2：居住地址 ── */}
        {step === 2 && (
          <>
            <div className="page-section">
              <div
                style={{
                  fontSize: 'var(--text-section)',
                  fontWeight: 'var(--weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                居住地址
              </div>

              {/* 村/社区名称 */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={labelStyle}>村/社区名称</div>
                <input
                  type="text"
                  placeholder="请输入村或社区名称"
                  defaultValue=""
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
                />
              </div>

              {/* 门牌号 */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={labelStyle}>门牌号</div>
                <input
                  type="text"
                  placeholder="请输入门牌号"
                  defaultValue=""
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
                />
              </div>
            </div>
          </>
        )}

        {/* ── 步骤 3：确认绑定 ── */}
        {step === 3 && (
          <>
            <div className="page-section">
              <div
                style={{
                  fontSize: 'var(--text-section)',
                  fontWeight: 'var(--weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                确认信息
              </div>

              {/* 信息预览卡片 */}
              <div className="card">
                {/* 老人信息 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    老人
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    张奶奶 · 78岁 · 女
                  </span>
                </div>

                {/* 地址 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    地址
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    桂林村 142 号
                  </span>
                </div>

                {/* 关系 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    您的关系
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    儿子
                  </span>
                </div>

                {/* 联系电话 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    联系电话
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    139****8823
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── 底部按钮 ── */}
      <div className="fixed-bottom">
        {step < 3 ? (
          <button
            className="btn btn-primary btn-block btn-lg"
            onClick={() => setStep((step + 1) as 1 | 2 | 3)}
          >
            下一步
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            className="btn btn-primary btn-block btn-lg"
            onClick={handleConfirm}
          >
            确认绑定
          </button>
        )}
      </div>
    </>
  )
}
