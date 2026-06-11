import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

/* ── 全局状态 ── */
import { AppStageProvider, useAppStage, allStages, stageLabels } from './context/AppStageContext'

/* ── 页面组件 ── */
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ProfilePage from './pages/ProfilePage'
import PlanPage from './pages/PlanPage'
import PlanConfirmPage from './pages/PlanConfirmPage'
import ProgressPage from './pages/ProgressPage'
import MaintenancePage from './pages/MaintenancePage'
import AssessmentPage from './pages/AssessmentPage'
import CategoryPage from './pages/CategoryPage'
import ProductOptionsPage from './pages/ProductOptionsPage'
import FamilyBindPage from './pages/FamilyBindPage'
import AssessmentChoicePage from './pages/AssessmentChoicePage'
import ApplyAssessmentPage from './pages/ApplyAssessmentPage'
import SelfAssessmentPage from './pages/SelfAssessmentPage'
import NotificationsPage from './pages/NotificationsPage'
import { HomeIndicator, PhoneShell, StatusBar } from './components'

/* ── 侧栏页面导航数据 ── */
const sidebarPages = [
  { group: 'Tab 页面', items: [
    { path: '/', label: '首页' },
    { path: '/services', label: '服务' },
    { path: '/profile', label: '我的' },
  ]},
  { group: '流程页面', items: [
    { path: '/bind', label: '绑定家庭' },
    { path: '/assessment/choose', label: '评估方式选择' },
    { path: '/assessment/apply', label: '申请专业评估' },
    { path: '/assessment/self', label: '自行拍照评估' },
  ]},
  { group: '方案与产品', items: [
    { path: '/plan', label: '推荐方案' },
    { path: '/plan/confirm', label: '方案确认 / 费用' },
    { path: '/products', label: '改造类别选择' },
    { path: '/products/toilet', label: '马桶产品选项' },
    { path: '/products/shower', label: '淋浴产品选项' },
    { path: '/products/basin', label: '洗漱台产品选项' },
  ]},
  { group: '服务与售后', items: [
    { path: '/progress', label: '服务进度详情' },
    { path: '/maintenance', label: '维护与提醒' },
    { path: '/assessment', label: '评估结果' },
    { path: '/notifications', label: '消息通知' },
  ]},
]

const primaryTabPaths = new Set(['/', '/services', '/profile'])

/* ── 侧栏组件 ── */
function PageSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { stage, setStage } = useAppStage()

  return (
    <aside className="page-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">页面导航</div>
      </div>
      <div className="sidebar-scroll">
        {sidebarPages.map((group) => (
          <div className="sidebar-group" key={group.group}>
            <div className="sidebar-group-label">{group.group}</div>
            {group.items.map((item) => (
              <button
                key={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="sidebar-item-dot" />
                {item.label}
              </button>
            ))}
          </div>
        ))}

        {/* ── 阶段切换器 ── */}
        <div className="sidebar-group sidebar-stage-group">
          <div className="sidebar-group-label">阶段切换（演示）</div>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as typeof stage)}
            className="sidebar-stage-select"
          >
            {allStages.map((s) => (
              <option key={s} value={s}>
                {stageLabels[s]}
              </option>
            ))}
          </select>
          <div className="sidebar-stage-help">
            切换阶段后首页和服务页将联动变化
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ── 动画页面路由 ── */
interface AnimatedRoutesProps {
  onOpenImagePreview: (src: string) => void
}

function AnimatedRoutes({ onOpenImagePreview }: AnimatedRoutesProps) {
  const location = useLocation()
  const isPrimaryTabPage = primaryTabPaths.has(location.pathname)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={isPrimaryTabPage ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={isPrimaryTabPage ? undefined : { opacity: 0, x: -20 }}
        transition={isPrimaryTabPage ? { duration: 0 } : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="route-frame"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/plan/confirm" element={<PlanConfirmPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/products" element={<CategoryPage />} />
          <Route path="/products/:categoryId" element={<ProductOptionsPage />} />
          {/* 新增流程页面 */}
          <Route path="/bind" element={<FamilyBindPage />} />
          <Route path="/assessment/choose" element={<AssessmentChoicePage />} />
          <Route path="/assessment/apply" element={<ApplyAssessmentPage />} />
          <Route path="/assessment/self" element={<SelfAssessmentPage onOpenImagePreview={onOpenImagePreview} />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

interface PhoneImagePreviewProps {
  src: string
  onClose: () => void
}

function PhoneImagePreview({ src, onClose }: PhoneImagePreviewProps) {
  return (
    <button className="phone-image-preview" onClick={onClose} aria-label="关闭图片预览">
      <img className="phone-image-preview-img" src={src} alt="预览" />
    </button>
  )
}

/* ── 全局 Toast 提示组件 ── */
function GlobalToast() {
  const { toast } = useAppStage()

  if (!toast) return null

  return (
    <div className="global-toast">
      <div className="global-toast-dot" />
      <div className="global-toast-text">{toast}</div>
    </div>
  )
}

/* ── 主应用 ── */
export default function App() {
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  return (
    <AppStageProvider initialStage="unbound">
      <BrowserRouter>
        <div className="preview-container">
          <PageSidebar />
          <PhoneShell>
            <StatusBar />
            <GlobalToast />
            <AnimatedRoutes onOpenImagePreview={setPreviewImg} />
            <HomeIndicator />
            {previewImg && (
              <PhoneImagePreview
                src={previewImg}
                onClose={() => setPreviewImg(null)}
              />
            )}
          </PhoneShell>
        </div>
      </BrowserRouter>
    </AppStageProvider>
  )
}
