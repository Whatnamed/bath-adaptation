/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

/* ── 应用生命周期阶段 ── */
export type AppStage =
  | 'unbound'            // 未绑定家庭
  | 'idle'               // 已绑定，等待开始
  | 'assessment_pending' // 已申请专业评估，等待上门
  | 'self_assessing'     // 自助评估分析中
  | 'assessment_complete' // 评估完成，等待查看结果
  | 'plan_pending'       // 方案待确认
  | 'plan_confirmed'     // 方案已确认，待安装
  | 'installing'         // 安装进行中
  | 'completed'          // 完工，售后阶段

export type AssessmentSource =
  | 'professional'
  | 'photo_initial'
  | 'space_initial'
  | 'complete_self'
  | null

/* 阶段中文名映射（侧栏切换器用） */
export const stageLabels: Record<AppStage, string> = {
  unbound: '未绑定家庭',
  idle: '已绑定 · 待开始',
  assessment_pending: '等待专业评估',
  self_assessing: '自助评估分析中',
  assessment_complete: '评估结果已生成',
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
  'assessment_complete',
  'plan_pending',
  'plan_confirmed',
  'installing',
  'completed',
]

/* ── 家庭及老人详细信息接口 ── */
export interface FamilyDetails {
  elderName: string
  elderAge: number
  gender: '男' | '女'
  provinceCityDistrict: string // 省市区
  townStreet: string           // 镇/街道
  villageCommunity: string     // 村/社区
  houseNumber: string          // 门牌号/详细地址
  relationship: string         // 您的关系
  phone: string                // 联系电话
}

export const defaultFamilyDetails: FamilyDetails = {
  elderName: '张奶奶',
  elderAge: 78,
  gender: '女',
  provinceCityDistrict: '浙江省 杭州市 西湖区',
  townStreet: '留下街道',
  villageCommunity: '桂林村',
  houseNumber: '142号',
  relationship: '儿子',
  phone: '13988888823',
}

/* ── Context 定义 ── */
interface AppStageContextType {
  stage: AppStage
  setStage: (stage: AppStage) => void
  assessmentSource: AssessmentSource
  setAssessmentSource: (source: AssessmentSource) => void
  familyDetails: FamilyDetails
  setFamilyDetails: (details: FamilyDetails) => void
  selectedProducts: Record<string, string[]> // categoryId -> productIds
  setSelectedProducts: (selected: Record<string, string[]>) => void
  toast: string | null
  showToast: (msg: string) => void
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
  const [assessmentSource, setAssessmentSource] = useState<AssessmentSource>(null)
  const [familyDetails, setFamilyDetails] = useState<FamilyDetails>(defaultFamilyDetails)
  const [selectedProducts, setSelectedProducts] = useState<Record<string, string[]>>({
    toilet: [],
    shower: [],
    basin: [],
  })
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    // 4秒后自动关闭
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current))
    }, 4500)
  }

  /* ── 演示流程自动推进器 ── */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (stage === 'assessment_pending') {
      // 等待专业评估，8秒后自动生成评估结果
      timer = setTimeout(() => {
        setStage('assessment_complete')
        showToast('【演示模拟】评估员王建华师傅已录入上门评估结果，请先查看卫浴风险报告。')
      }, 8000)
    } else if (stage === 'self_assessing') {
      // 自助评估资料提交后，等待系统分析再生成评估结果
      timer = setTimeout(() => {
        setStage('assessment_complete')
        const sourceToast =
          assessmentSource === 'photo_initial'
            ? '照片初评资料已分析完成，初步风险建议已生成。'
            : assessmentSource === 'space_initial'
              ? '空间信息已分析完成，可安装性初判结果已生成。'
              : '自助评估资料已分析完成，卫浴风险评估结果已生成。'
        showToast(`【演示模拟】${sourceToast}`)
      }, 6000)
    } else if (stage === 'plan_confirmed') {
      // 方案已确认，8秒后自动推进到安装进行中
      timer = setTimeout(() => {
        setStage('installing')
        showToast('【演示模拟】安装师傅李师傅已到达现场，开始进行无障碍改造设备安装。')
      }, 8000)
    } else if (stage === 'installing') {
      // 安装中，8秒后推进到已完工
      timer = setTimeout(() => {
        setStage('completed')
        showToast('【演示模拟】无障碍改造项目已全部完工，师傅已完成安全使用教学！')
      }, 8000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [assessmentSource, stage])

  return (
    <AppStageContext.Provider
      value={{
        stage,
        setStage,
        assessmentSource,
        setAssessmentSource,
        familyDetails,
        setFamilyDetails,
        selectedProducts,
        setSelectedProducts,
        toast,
        showToast,
      }}
    >
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
