import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

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

/* ── 侧栏页面导航数据 ── */
const sidebarPages = [
  { group: 'Tab 页面', items: [
    { path: '/', label: '首页' },
    { path: '/services', label: '服务' },
    { path: '/profile', label: '我的' },
  ]},
  { group: '子页面', items: [
    { path: '/plan', label: '推荐方案' },
    { path: '/plan/confirm', label: '方案确认 / 费用' },
    { path: '/products', label: '改造类别选择' },
    { path: '/products/shower', label: '淋浴产品选项' },
    { path: '/progress', label: '服务进度详情' },
    { path: '/maintenance', label: '维护与提醒' },
    { path: '/assessment', label: '入户评估结果' },
  ]},
]

/* ── 侧栏组件 ── */
function PageSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

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
      </div>
    </aside>
  )
}

/* ── 状态栏组件 ── */
function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-bar-time">9:41</span>
      <div className="status-bar-icons">
        {/* 信号图标 */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor"/>
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor"/>
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill="currentColor"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor"/>
        </svg>
        {/* WiFi 图标 */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="currentColor" transform="translate(0, -2)"/>
          <path d="M5 9a4.24 4.24 0 0 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, -2)"/>
          <path d="M2.5 6.5a7.78 7.78 0 0 1 11 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, -2)"/>
          <path d="M0.5 4A11.31 11.31 0 0 1 15.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, -2)"/>
        </svg>
        {/* 电池图标 */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="2" stroke="currentColor" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="19" height="8" rx="1" fill="currentColor"/>
          <path d="M24 4v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

/* ── Home Indicator ── */
function HomeIndicator() {
  return <div className="home-indicator" />
}

/* ── 动画页面路由 ── */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}
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
          <Route path="/products/shower" element={<ProductOptionsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── 主应用 ── */
export default function App() {
  return (
    <BrowserRouter>
      <div className="preview-container">
        <PageSidebar />
        <div className="phone-shell">
          <div className="phone-inner">
            <StatusBar />
            <AnimatedRoutes />
            <HomeIndicator />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
