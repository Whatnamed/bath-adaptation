import {
  Home,
  UserCheck,
  Users,
  MapPin,
  FileText,
  Bell,
  HelpCircle,
  Info,
} from 'lucide-react'
import { stationInfo } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'
import { BottomNav, Chip, MenuGroup, SectionHeader } from '../components'
import type { MenuGroupItem } from '../components'

/* 图片素材导入 */
import userAvatar from '../assets/images/00_brand/avatar_user_default.png'

/* ── 我的页面 ── */
export default function ProfilePage() {
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
  const familyMenu: MenuGroupItem[] = [
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

  const serviceMenu: MenuGroupItem[] = [
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

  const otherMenu: MenuGroupItem[] = [
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

  return (
    <>
      {/* ── 页面内容 ── */}
      <div className="page-content">
        {/* 用户卡片 */}
        <div className="profile-header page-section mt-4">
          <div className="avatar avatar-lg">
            <img src={userAvatar} alt="用户头像" className="avatar-image" />
          </div>
          <div>
            <div className="profile-name">张建国</div>
            <div className="profile-phone">{formatMaskedPhone(familyDetails.phone)}</div>
            <Chip>{familyDetails.relationship}</Chip>
          </div>
        </div>

        {/* 家庭档案 */}
        <div className="page-section">
          <SectionHeader title="家庭档案" />
          <MenuGroup items={familyMenu} />
        </div>

        {/* 服务信息 */}
        <div className="page-section">
          <SectionHeader title="服务信息" />
          <MenuGroup items={serviceMenu} />
        </div>

        {/* 其他 */}
        <div className="page-section">
          <SectionHeader title="其他" />
          <MenuGroup items={otherMenu} />
        </div>
      </div>

      {/* ── 底部导航 ── */}
      <BottomNav />
    </>
  )
}
