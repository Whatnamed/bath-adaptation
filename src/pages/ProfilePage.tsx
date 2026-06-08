import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  ClipboardList,
  User,
  UserCheck,
  Users,
  MapPin,
  FileText,
  Bell,
  HelpCircle,
  Info,
  ChevronRight,
} from 'lucide-react'
import { stationInfo } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'

/* ── 我的页面 ── */
export default function ProfilePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { familyDetails } = useAppStage()

  /* 手机号脱敏显示 */
  const formatMaskedPhone = (p: string) => {
    if (p && p.length >= 7) {
      return p.substring(0, 3) + '****' + p.substring(p.length - 4)
    }
    return p || '未填写'
  }

  const fullAddress = `${familyDetails.provinceCityDistrict} ${familyDetails.townStreet} ${familyDetails.villageCommunity} ${familyDetails.houseNumber}`

  /* 菜单项数据 */
  const familyMenu = [
    {
      icon: <UserCheck size={20} />,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      label: '老人信息',
      desc: `${familyDetails.elderName} · ${familyDetails.elderAge}岁`,
    },
    {
      icon: <Home size={20} />,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      label: '房屋信息',
      desc: fullAddress,
    },
    {
      icon: <Users size={20} />,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      label: '联系人',
      desc: '3 位响应联系人',
    },
  ]

  const serviceMenu = [
    {
      icon: <MapPin size={20} />,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      label: '服务站',
      desc: stationInfo.name,
    },
    {
      icon: <FileText size={20} />,
      iconBg: 'var(--accent-soft)',
      iconColor: 'var(--accent)',
      label: '服务记录',
      desc: '1 条记录',
    },
  ]

  const otherMenu = [
    {
      icon: <Bell size={20} />,
      iconBg: '#f3f3f5',
      iconColor: 'var(--text-secondary)',
      label: '通知设置',
      desc: '',
    },
    {
      icon: <HelpCircle size={20} />,
      iconBg: '#f3f3f5',
      iconColor: 'var(--text-secondary)',
      label: '帮助与反馈',
      desc: '',
    },
    {
      icon: <Info size={20} />,
      iconBg: '#f3f3f5',
      iconColor: 'var(--text-secondary)',
      label: '关于',
      desc: '',
    },
  ]

  /* 渲染菜单组 */
  const renderMenuGroup = (items: typeof familyMenu) => (
    <div className="menu-group">
      {items.map((item) => (
        <div className="menu-item" key={item.label}>
          <div
            className="menu-item-icon"
            style={{ background: item.iconBg, color: item.iconColor }}
          >
            {item.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div className="menu-item-label">{item.label}</div>
            {item.desc && <div className="menu-item-desc">{item.desc}</div>}
          </div>
          <ChevronRight size={16} color="var(--text-tertiary)" />
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* ── 页面内容 ── */}
      <div className="page-content">
        {/* 用户卡片 */}
        <div className="profile-header page-section" style={{ marginTop: 'var(--space-4)' }}>
          <div
            className="avatar avatar-lg"
            style={{ background: 'var(--accent-soft)' }}
          >
            <User size={32} color="#fff" />
          </div>
          <div>
            <div className="profile-name">张建国</div>
            <div className="profile-phone">{formatMaskedPhone(familyDetails.phone)}</div>
            <span className="chip chip-accent">{familyDetails.relationship}</span>
          </div>
        </div>

        {/* 家庭档案 */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">家庭档案</span>
          </div>
          {renderMenuGroup(familyMenu)}
        </div>

        {/* 服务信息 */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">服务信息</span>
          </div>
          {renderMenuGroup(serviceMenu)}
        </div>

        {/* 其他 */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">其他</span>
          </div>
          {renderMenuGroup(otherMenu)}
        </div>
      </div>

      {/* ── 底部导航 ── */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <Home size={24} />
          <span className="bottom-nav-label">首页</span>
        </button>
        <button
          className={`bottom-nav-item ${location.pathname === '/services' ? 'active' : ''}`}
          onClick={() => navigate('/services')}
        >
          <ClipboardList size={24} />
          <span className="bottom-nav-label">服务</span>
        </button>
        <button
          className={`bottom-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <User size={24} />
          <span className="bottom-nav-label">我的</span>
        </button>
      </nav>
    </>
  )
}
