import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  PhoneCall,
  Grip,
  Lightbulb,
  Droplets,
  CalendarClock,
  Wrench,
  ChevronRight,
  Phone,
} from 'lucide-react'

/* ── 维护与提醒页 ── */
export default function MaintenancePage() {
  const navigate = useNavigate()

  /* 设备列表数据 */
  const devices = [
    {
      icon: PhoneCall,
      iconBg: 'var(--success-soft)',
      iconColor: 'var(--success)',
      name: '紧急呼叫按钮',
      chipClass: 'chip chip-success',
      chipText: '运行正常',
      detail: '上次检测：5月20日',
    },
    {
      icon: Grip,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      name: '助力扶手（2处）',
      chipClass: 'chip chip-accent',
      chipText: '待复检',
      detail: '距下次复检：28天',
    },
    {
      icon: Lightbulb,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      name: '感应夜灯（3处）',
      chipClass: 'chip chip-success',
      chipText: '运行正常',
      detail: '已运行 45 天',
    },
    {
      icon: Droplets,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      name: '防滑地面处理',
      chipClass: 'chip chip-success',
      chipText: '正常',
      detail: '安装日期：2026-04-28',
    },
  ]

  /* 维护提醒数据 */
  const reminders = [
    {
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      title: '扶手半年复检',
      subtitle: '预计复检时间：6月19日',
    },
    {
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      title: '夜灯电池更换提醒',
      subtitle: '预计更换：8月',
    },
  ]

  return (
    <>
      {/* ── 页面头部 ── */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="page-header-title">维护与提醒</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content">
        {/* ── 设备状态 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">设备状态</span>
          </div>

          {devices.map((device, i) => {
            const Icon = device.icon
            return (
              <div className="device-card" key={i}>
                <div className="device-card-header">
                  {/* 图标 */}
                  <div
                    className="device-card-icon"
                    style={{ background: device.iconBg, color: device.iconColor }}
                  >
                    <Icon size={20} />
                  </div>

                  {/* 名称 */}
                  <div className="device-card-info">
                    <div className="device-card-name">{device.name}</div>
                  </div>

                  {/* 状态标签 */}
                  <div className="device-card-status">
                    <span className={device.chipClass}>{device.chipText}</span>
                  </div>
                </div>

                {/* 详情 */}
                <div className="device-card-detail">{device.detail}</div>
              </div>
            )
          })}
        </div>

        {/* ── 即将到来的维护 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">即将到来的维护</span>
          </div>

          <div className="card" style={{ padding: 'var(--space-3) var(--space-5)' }}>
          {reminders.map((item, i) => (
            <div className="reminder-item" key={i}>
              {/* 图标 */}
              <div
                className="reminder-icon"
                style={{ background: item.iconBg, color: item.iconColor }}
              >
                <CalendarClock size={20} />
              </div>

              {/* 内容 */}
              <div className="reminder-content">
                <div className="reminder-title">{item.title}</div>
                <div className="reminder-subtitle">{item.subtitle}</div>
              </div>

              {/* 箭头 */}
              <ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
            </div>
          ))}
          </div>
        </div>

        {/* ── 报修入口 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">需要维修？</span>
          </div>

          <div className="card-warm">
            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-3)' }}>
              <Wrench size={22} style={{ color: 'var(--text-secondary)' }} />
              <div>
                <div
                  style={{
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--weight-semibold)',
                    color: 'var(--text-primary)',
                  }}
                >
                  发起报修
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--text-secondary)',
                    marginTop: 2,
                  }}
                >
                  设备损坏或需要维修时，点击这里联系服务站
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn btn-primary btn-sm">发起报修</button>
              <button className="btn btn-secondary btn-sm">
                <Phone size={14} />
                联系服务站
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
