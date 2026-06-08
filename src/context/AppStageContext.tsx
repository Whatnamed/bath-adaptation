import { createContext, useContext, useState, type ReactNode } from 'react'

/* ── 应用生命周期阶段 ── */
export type AppStage =
  | 'unbound'            // 未绑定家庭
  | 'idle'               // 已绑定，等待开始
  | 'assessment_pending' // 已申请专业评估，等待上门
  | 'self_assessing'     // 自行拍照评估中
  | 'plan_pending'       // 评估完成，方案待确认
  | 'plan_confirmed'     // 方案已确认，待安装
  | 'installing'         // 安装进行中
  | 'completed'          // 完工，售后阶段

/* 阶段中文名映射（侧栏切换器用） */
export const stageLabels: Record<AppStage, string> = {
  unbound: '未绑定家庭',
  idle: '已绑定 · 待开始',
  assessment_pending: '等待专业评估',
  self_assessing: '自行拍照评估中',
  plan_pending: '方案待确认',
  plan_confirmed: '方案已确认 · 待安装',
  installing: '安装进行中',
  completed: '已完工 · 售后',
}

/* 所有阶段有序列表（用于切换器下拉） */
export const allStages: AppStage[] = [
  'unbound',
  'idle',
  'assessment_pending',
  'self_assessing',
  'plan_pending',
  'plan_confirmed',
  'installing',
  'completed',
]

/* ── Context 定义 ── */
interface AppStageContextType {
  stage: AppStage
  setStage: (stage: AppStage) => void
}

const AppStageContext = createContext<AppStageContextType | null>(null)

/* ── Provider 组件 ── */
export function AppStageProvider({
  children,
  initialStage = 'unbound',
}: {
  children: ReactNode
  initialStage?: AppStage
}) {
  const [stage, setStage] = useState<AppStage>(initialStage)

  return (
    <AppStageContext.Provider value={{ stage, setStage }}>
      {children}
    </AppStageContext.Provider>
  )
}

/* ── Hook ── */
export function useAppStage() {
  const ctx = useContext(AppStageContext)
  if (!ctx) {
    throw new Error('useAppStage 必须在 AppStageProvider 内使用')
  }
  return ctx
}
