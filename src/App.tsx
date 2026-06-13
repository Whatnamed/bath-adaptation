import { useCallback, useEffect, useRef, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { toBlob, toPng } from 'html-to-image'
import { AnimatePresence, motion } from 'motion/react'

import { AppStageProvider, useAppStage } from './context/AppStageContext'
import { HomeIndicator, PhoneShell, StatusBar } from './components'
import logoImg from './assets/images/00_brand/logo_anyu_flat_icon.png'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ProfilePage from './pages/ProfilePage'
import PlanPage from './pages/PlanPage'
import PlanConfirmPage from './pages/PlanConfirmPage'
import ProgressPage from './pages/ProgressPage'
import MaintenancePage from './pages/MaintenancePage'
import AssessmentPage from './pages/AssessmentPage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductOptionsPage from './pages/ProductOptionsPage'
import FamilyBindPage from './pages/FamilyBindPage'
import AssessmentChoicePage from './pages/AssessmentChoicePage'
import ApplyAssessmentPage from './pages/ApplyAssessmentPage'
import SelfAssessmentPage from './pages/SelfAssessmentPage'
import NotificationsPage from './pages/NotificationsPage'

const primaryTabPaths = new Set(['/', '/services', '/profile'])
const phoneWidth = 430
const phoneHeight = 932
const splashStorageKey = 'anyu-splash-seen'

interface SaveWritable {
  write: (data: Blob) => Promise<void> | void
  close: () => Promise<void> | void
}

interface SaveFileHandle {
  createWritable: () => Promise<SaveWritable>
}

type SaveFilePicker = (options: {
  suggestedName: string
  types: Array<{
    description: string
    accept: Record<string, string[]>
  }>
}) => Promise<SaveFileHandle>

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
          <Route path="/products/:categoryId/:productId" element={<ProductDetailPage />} />
          <Route path="/products/:categoryId" element={<ProductOptionsPage />} />
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

function hasSplashParam() {
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.get('splash') === '1') return true

  const hashQueryStart = window.location.hash.indexOf('?')
  if (hashQueryStart === -1) return false

  const hashParams = new URLSearchParams(window.location.hash.slice(hashQueryStart + 1))
  return hashParams.get('splash') === '1'
}

function BrandSplash() {
  const [visible, setVisible] = useState(() => {
    if (hasSplashParam()) return true
    return sessionStorage.getItem(splashStorageKey) !== '1'
  })

  const handleEnter = () => {
    sessionStorage.setItem(splashStorageKey, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="brand-splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="brand-splash-content"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <img className="brand-splash-logo" src={logoImg} alt="" />
            <div className="brand-splash-title">安浴到家</div>
            <div className="brand-splash-subtitle">让父母洗浴更安全，子女更安心</div>
            <div className="brand-splash-desc">农村卫浴适老化微改造服务系统</div>
            <div className="brand-splash-flow">先评估风险｜再匹配方案｜安装后持续维护</div>
          </motion.div>
          <motion.button
            type="button"
            className="brand-splash-button"
            onClick={handleEnter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            进入服务
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function getPreviewFileName(pathname: string) {
  const safePath = pathname === '/' ? 'home' : pathname.replace(/^\/+/, '').replace(/[/?#&=]+/g, '-')
  return `anyu-preview-${safePath}-${phoneWidth}x${phoneHeight}.png`
}

async function writeFileHandle(fileHandle: SaveFileHandle, blob: Blob) {
  const writable = await fileHandle.createWritable()
  await writable.write(blob)
  await writable.close()
}

function downloadBlob(blob: Blob, fileName: string) {
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.download = fileName
  link.href = url
  link.rel = 'noopener'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

async function dataUrlToBlob(dataUrl: string) {
  const response = await fetch(dataUrl)
  return response.blob()
}

async function saveCurrentPhonePreview(pathname: string, fileHandle?: SaveFileHandle | null) {
  const source = document.querySelector<HTMLElement>('.phone-shell')
  if (!source) throw new Error('Phone preview not found')

  const captureOptions = {
    width: phoneWidth,
    height: phoneHeight,
    canvasWidth: phoneWidth,
    canvasHeight: phoneHeight,
    pixelRatio: 1,
    cacheBust: true,
    skipFonts: true,
  }

  let blob = await toBlob(source, captureOptions)
  if (!blob) {
    const dataUrl = await toPng(source, captureOptions)
    blob = await dataUrlToBlob(dataUrl)
  }
  if (!blob) throw new Error('Failed to create PNG blob')

  if (fileHandle) {
    await writeFileHandle(fileHandle, blob)
    return
  }

  downloadBlob(blob, getPreviewFileName(pathname))
}

function PreviewShortcuts() {
  const location = useLocation()
  const savingRef = useRef(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = useCallback(async () => {
    if (savingRef.current) return

    savingRef.current = true
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      const fileName = getPreviewFileName(location.pathname)
      const picker = (window as Window & { showSaveFilePicker?: SaveFilePicker }).showSaveFilePicker
      let fileHandle: SaveFileHandle | null = null

      if (picker) {
        try {
          fileHandle = await picker.call(window, {
            suggestedName: fileName,
            types: [
              {
                description: 'PNG image',
                accept: { 'image/png': ['.png'] },
              },
            ],
          })
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return
          throw error
        }
      }

      await saveCurrentPhonePreview(location.pathname, fileHandle)
      setSaveStatus('success')
    } catch (error) {
      console.error('Failed to save preview image', error)
      setSaveStatus('error')
    } finally {
      savingRef.current = false
      setIsSaving(false)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const isSaveShortcut =
        (event.ctrlKey || event.metaKey) &&
        (event.key.toLowerCase() === 's' || event.code === 'KeyS')

      if (isSaveShortcut) {
        event.preventDefault()
        event.stopPropagation()
        if (event.repeat) return
        void handleSave()
      }
    }

    document.addEventListener('keydown', handleShortcut, true)
    return () => document.removeEventListener('keydown', handleShortcut, true)
  }, [handleSave])

  useEffect(() => {
    if (saveStatus === 'idle') return undefined

    const timer = window.setTimeout(() => setSaveStatus('idle'), 1800)
    return () => window.clearTimeout(timer)
  }, [saveStatus])

  if (!isSaving && saveStatus === 'idle') return null

  const label = isSaving ? '生成中' : saveStatus === 'success' ? '已保存' : '保存失败'

  return <div className={`preview-save-status ${saveStatus === 'error' ? 'is-error' : ''}`}>{label}</div>
}

export default function App() {
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  return (
    <AppStageProvider initialStage="unbound">
      <HashRouter>
        <div className="preview-container">
          <PreviewShortcuts />
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
            <BrandSplash />
          </PhoneShell>
        </div>
      </HashRouter>
    </AppStageProvider>
  )
}
