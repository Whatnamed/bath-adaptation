import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppStage, type FamilyDetails } from '../context/AppStageContext'

/* ── 步骤标签数据 ── */
const STEP_LABELS = ['基本信息', '居住地址', '确认提交'] as const

/* ── 进度指示器组件 ── */
function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div
      style={{
        padding: 'var(--space-3) 0 var(--space-5)',
      }}
    >
      {/* 步骤标签行 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-3)',
        }}
      >
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1
          const isDone = stepNum < current
          const isCurrent = stepNum === current
          const isPending = stepNum > current

          return (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                opacity: isPending ? 0.4 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              {/* 序号小圆 */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: isCurrent
                    ? 'var(--accent)'
                    : isDone
                    ? 'var(--accent-muted)'
                    : 'var(--border-light)',
                  color: isCurrent || isDone ? '#fff' : 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'var(--weight-semibold)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
              >
                {isDone ? '✓' : stepNum}
              </div>
              {/* 文字标签 */}
              <span
                style={{
                  fontSize: 'var(--text-caption)',
                  fontWeight: isCurrent
                    ? 'var(--weight-semibold)'
                    : 'var(--weight-regular)',
                  color: isCurrent
                    ? 'var(--accent-deep)'
                    : isDone
                    ? 'var(--text-secondary)'
                    : 'var(--text-tertiary)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* 连续进度条 */}
      <div
        style={{
          height: 3,
          borderRadius: 2,
          background: 'var(--border-light)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 2,
            background: 'var(--accent)',
            width: `${((current - 1) / (STEP_LABELS.length - 1)) * 100}%`,
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
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

export default function FamilyBindPage() {
  const navigate = useNavigate()
  const { setStage, familyDetails, setFamilyDetails } = useAppStage()
  const [step, setStep] = useState<1 | 2 | 3>(1)

  /* 本地表单状态，初始用全局数据填充，防止演示时需要手动输入 */
  const [form, setForm] = useState<FamilyDetails>({
    ...familyDetails
  })

  const updateForm = (key: keyof FamilyDetails, val: FamilyDetails[keyof FamilyDetails]) => {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  /* 确认绑定 */
  const handleConfirm = () => {
    setFamilyDetails(form)
    setStage('idle')
    navigate('/')
  }

  /* 手机号脱敏显示 */
  const formatMaskedPhone = (p: string) => {
    if (p.length >= 7) {
      return p.substring(0, 3) + '****' + p.substring(p.length - 4)
    }
    return p
  }

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button
          className="page-header-back"
          onClick={() => {
            if (step > 1) {
              setStep((step - 1) as 1 | 2 | 3)
            } else {
              navigate('/')
            }
          }}
        >
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

        {/* ── 步骤 1：老人与您的关系信息 ── */}
        {step === 1 && (
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
                value={form.elderName}
                onChange={(e) => updateForm('elderName', e.target.value)}
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
                value={form.elderAge || ''}
                onChange={(e) => updateForm('elderAge', parseInt(e.target.value) || 0)}
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
                    onClick={() => updateForm('gender', g)}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      borderRadius: 8,
                      border: `1.5px solid ${form.gender === g ? 'var(--accent)' : 'var(--border-light)'}`,
                      background: form.gender === g ? 'var(--accent-soft)' : 'var(--surface)',
                      color: form.gender === g ? 'var(--accent)' : 'var(--text-secondary)',
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

            {/* 您的关系 */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={labelStyle}>您的关系</div>
              <input
                type="text"
                placeholder="例如：儿子 / 女儿 / 孙子"
                value={form.relationship}
                onChange={(e) => updateForm('relationship', e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
              />
            </div>

            {/* 联系电话 */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={labelStyle}>联系电话</div>
              <input
                type="tel"
                placeholder="请输入联系电话"
                value={form.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
              />
            </div>
          </div>
        )}

        {/* ── 步骤 2：居住地址 ── */}
        {step === 2 && (
          <div className="page-section">
            <div
              style={{
                fontSize: 'var(--text-section)',
                fontWeight: 'var(--weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              居住地址信息
            </div>

            {/* 省市区 */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={labelStyle}>省/市/区</div>
              <input
                type="text"
                placeholder="例如：浙江省 杭州市 西湖区"
                value={form.provinceCityDistrict}
                onChange={(e) => updateForm('provinceCityDistrict', e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
              />
            </div>

            {/* 镇/街道 */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={labelStyle}>乡镇 / 街道</div>
              <input
                type="text"
                placeholder="例如：留下街道"
                value={form.townStreet}
                onChange={(e) => updateForm('townStreet', e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
              />
            </div>

            {/* 村/社区 */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={labelStyle}>村 / 社区</div>
              <input
                type="text"
                placeholder="例如：桂林村"
                value={form.villageCommunity}
                onChange={(e) => updateForm('villageCommunity', e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
              />
            </div>

            {/* 详细门牌号 */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={labelStyle}>门牌号 / 详细地址</div>
              <input
                type="text"
                placeholder="例如：142号 或 3栋1单元201室"
                value={form.houseNumber}
                onChange={(e) => updateForm('houseNumber', e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-light)')}
              />
            </div>
          </div>
        )}

        {/* ── 步骤 3：确认绑定 ── */}
        {step === 3 && (
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
                <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
                  老人
                </span>
                <span style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>
                  {form.elderName} · {form.elderAge}岁 · {form.gender}
                </span>
              </div>

              {/* 地址 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'cross-start',
                  marginBottom: 'var(--space-3)',
                  gap: 'var(--space-4)',
                }}
              >
                <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                  地址
                </span>
                <span
                  style={{
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--weight-medium)',
                    color: 'var(--text-primary)',
                    textAlign: 'right',
                    wordBreak: 'break-all',
                  }}
                >
                  {form.provinceCityDistrict} {form.townStreet} {form.villageCommunity} {form.houseNumber}
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
                <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
                  您的关系
                </span>
                <span style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>
                  {form.relationship}
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
                <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
                  联系电话
                </span>
                <span style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>
                  {formatMaskedPhone(form.phone)}
                </span>
              </div>
            </div>
          </div>
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
