import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { AnimatePresence, motion } from 'motion/react'

import { AppStageProvider, useAppStage } from './context/AppStageContext'
import { HomeIndicator, PhoneShell, StatusBar } from './components'
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

const primaryTabPaths = new Set(['/', '/services', '/profile'])
const phoneWidth = 430
const phoneHeight = 932

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

function getPreviewFileName(pathname: string) {
  const safePath = pathname === '/' ? 'home' : pathname.replace(/^\/+/, '').replace(/[/?#&=]+/g, '-')
  return `anyu-preview-${safePath}-${phoneWidth}x${phoneHeight}.png`
}

async function canvasToPngBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to create PNG blob'))
    }, 'image/png')
  })
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
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function saveCurrentPhonePreview(pathname: string, fileHandle?: SaveFileHandle | null) {
  const source = document.querySelector<HTMLElement>('.phone-shell')
  if (!source) throw new Error('Phone preview not found')

  const canvas = await html2canvas(source, {
    width: phoneWidth,
    height: phoneHeight,
    scale: 1,
    backgroundColor: null,
    useCORS: true,
    logging: false,
    scrollX: 0,
    scrollY: 0,
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
  })

  const blob = await canvasToPngBlob(canvas)
  if (fileHandle) {
    await writeFileHandle(fileHandle, blob)
    return
  }

  downloadBlob(blob, getPreviewFileName(pathname))
}

function PreviewShortcuts() {
  const location = useLocation()
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = useCallback(async () => {
    if (isSaving) return

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
    } catch {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }, [isSaving, location.pathname])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        void handleSave()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
      <BrowserRouter>
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
          </PhoneShell>
        </div>
      </BrowserRouter>
    </AppStageProvider>
  )
}
