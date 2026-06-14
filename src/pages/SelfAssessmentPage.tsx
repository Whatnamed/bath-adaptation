import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Armchair,
  Camera,
  CheckCircle,
  Droplets,
  FileImage,
  Home,
  LayoutTemplate,
  Ruler,
  ShieldCheck,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useAppStage } from '../context/AppStageContext'
import { Button, Card, FixedBottomBar, IconBadge, InfoNote, PageHeader, SectionHeader } from '../components'
import selfOverall from '../assets/images/03_assessment_scenes/self_photo/self_01_bathroom_overall.png'
import selfToilet from '../assets/images/03_assessment_scenes/self_photo/self_02_squat_toilet_area.png'
import selfShower from '../assets/images/03_assessment_scenes/self_photo/self_03_shower_wash_area.png'

interface PhotoArea {
  id: string
  icon: ReactNode
  title: string
  description: string
  guideImg: string
}

interface LayoutOption {
  id: string
  title: string
  desc: string
  variant: 'narrow' | 'square' | 'squat-shower' | 'toilet-shower' | 'outside'
}

interface SelfAssessmentPageProps {
  onOpenImagePreview?: (src: string) => void
}

const photoAreas: PhotoArea[] = [
  {
    id: 'area_overall',
    icon: <Home size={22} />,
    title: '卫生间整体',
    description: '站在门口拍全景，尽量拍到门槛、如厕区和淋浴区。',
    guideImg: selfOverall,
  },
  {
    id: 'area_toilet',
    icon: <Armchair size={22} />,
    title: '马桶 / 蹲便区',
    description: '拍清楚两侧墙面、起身借力位置和周围空间。',
    guideImg: selfToilet,
  },
  {
    id: 'area_shower',
    icon: <Droplets size={22} />,
    title: '淋浴 / 洗浴区',
    description: '拍清楚地面、花洒、排水和出浴转身位置。',
    guideImg: selfShower,
  },
]

const dimensionFields = [
  { id: 'length', label: '卫生间长', placeholder: '如 2200', unit: 'mm' },
  { id: 'width', label: '卫生间宽', placeholder: '如 1600', unit: 'mm' },
  { id: 'doorWidth', label: '门宽', placeholder: '如 720', unit: 'mm' },
  { id: 'threshold', label: '门槛高', placeholder: '如 80', unit: 'mm' },
  { id: 'toiletWall', label: '如厕区到侧墙', placeholder: '如 350', unit: 'mm' },
  { id: 'showerWidth', label: '淋浴区宽', placeholder: '如 900', unit: 'mm' },
  { id: 'wall', label: '墙面材质', placeholder: '瓷砖 / 水泥 / 不确定', unit: '' },
  { id: 'power', label: '电源插座', placeholder: '有 / 无 / 不确定', unit: '' },
]

const layoutOptions: LayoutOption[] = [
  { id: 'narrow', title: '狭长型', desc: '门口到如厕 / 洗浴区距离较长', variant: 'narrow' },
  { id: 'square', title: '方形', desc: '空间较集中，设备分布在四周', variant: 'square' },
  { id: 'squat-shower', title: '蹲厕洗浴同区', desc: '蹲便和淋浴在同一湿区', variant: 'squat-shower' },
  { id: 'toilet-shower', title: '坐便洗浴同区', desc: '坐便器和淋浴区共用空间', variant: 'toilet-shower' },
  { id: 'outside', title: '院外 / 独立厕所', desc: '厕所与居住空间分离', variant: 'outside' },
]

function LayoutMini({ variant }: { variant: LayoutOption['variant'] }) {
  const isNarrow = variant === 'narrow'
  const width = isNarrow ? 54 : 68
  const height = isNarrow ? 88 : 68

  return (
    <svg className="layout-mini" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <rect x="4" y="4" width={width - 8} height={height - 8} rx="5" />
      <path d={`M${width / 2 - 8} ${height - 4}q8 -12 18 -12`} />
      {variant === 'outside' && <rect x="12" y="12" width={width - 24} height="18" rx="3" />}
      {variant !== 'outside' && <circle cx={width - 18} cy="20" r="8" />}
      {(variant === 'squat-shower' || variant === 'toilet-shower') && (
        <path d={`M12 ${height - 24}h${width - 24}`} />
      )}
      {variant === 'squat-shower' && <rect x="14" y="18" width="14" height="24" rx="4" />}
      {variant === 'toilet-shower' && <circle cx="22" cy="32" r="8" />}
      <path d={`M12 ${height - 18}h18m-9 -9v18`} />
    </svg>
  )
}

function InsightCard({ type }: { type: 'photo' | 'space' }) {
  const isPhoto = type === 'photo'

  return (
    <Card className="self-insight-card">
      <div className="self-insight-heading">
        <IconBadge tone={isPhoto ? 'info' : 'warning'} size="md">
          {isPhoto ? <Camera size={18} /> : <Ruler size={18} />}
        </IconBadge>
        <div>
          <div className="self-insight-title">
            {isPhoto ? '照片初步风险建议' : '空间可安装性初判'}
          </div>
          <div className="self-insight-desc">
            {isPhoto
              ? '已识别湿滑、起身借力不足和夜间照明风险。'
              : '已记录空间条件，可先判断扶手、坐浴椅等产品是否适配。'}
          </div>
        </div>
      </div>
      <div className="self-insight-list">
        {(isPhoto
          ? ['建议优先补充扶手和防滑处理', '安装前仍需补充尺寸或草图', '最终方案以上门复核为准']
          : ['墙面和门槛信息会影响安装方式', '仍需现场照片确认真实风险点', '完整方案需照片和空间信息共同生成']
        ).map((item) => (
          <span key={item}>
            <ShieldCheck size={13} />
            {item}
          </span>
        ))}
      </div>
    </Card>
  )
}

export default function SelfAssessmentPage({ onOpenImagePreview }: SelfAssessmentPageProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setStage } = useAppStage()
  const entryMode: 'photo' | 'space' = searchParams.get('start') === 'space' ? 'space' : 'photo'

  const [activeStep, setActiveStep] = useState<'photo' | 'space'>(entryMode)
  const [uploaded, setUploaded] = useState<Set<string>>(new Set())
  const [dimensionValues, setDimensionValues] = useState<Record<string, string>>({})
  const [dimensionSaved, setDimensionSaved] = useState(false)
  const [sketchUploaded, setSketchUploaded] = useState(false)
  const [selectedLayout, setSelectedLayout] = useState('')
  const [photoAdviceViewed, setPhotoAdviceViewed] = useState(false)
  const [spaceAdviceViewed, setSpaceAdviceViewed] = useState(false)

  const doneCount = uploaded.size
  const photosDone = doneCount === photoAreas.length
  const spaceDone = dimensionSaved || sketchUploaded || selectedLayout !== ''
  const primaryDone = entryMode === 'photo' ? photosDone : spaceDone

  const handleUpload = (areaId: string) => {
    if (uploaded.has(areaId)) return
    setUploaded((prev) => {
      const next = new Set(prev)
      next.add(areaId)
      return next
    })
  }

  const handleDimensionChange = (id: string, value: string) => {
    setDimensionValues((prev) => ({ ...prev, [id]: value }))
    if (dimensionSaved) setDimensionSaved(false)
  }

  const handleSaveDimensions = () => {
    setDimensionSaved(true)
  }

  const handleSketchUpload = () => {
    setSketchUploaded(true)
  }

  const handleSelectLayout = (id: string) => {
    setSelectedLayout(id)
  }

  const getPrimaryLabel = () => {
    if (entryMode === 'photo' && !photoAdviceViewed) return '查看初步风险建议'
    if (entryMode === 'space' && !spaceAdviceViewed) return '查看空间可安装性初判'
    if (entryMode === 'photo') return spaceDone ? '提交完整评估资料' : '提交照片初评'
    return photosDone ? '提交完整评估资料' : '提交空间初评'
  }

  const primaryDisabled =
    (entryMode === 'photo' && !photoAdviceViewed && !photosDone) ||
    (entryMode === 'space' && !spaceAdviceViewed && !spaceDone) ||
    (photoAdviceViewed && spaceAdviceViewed && !primaryDone)

  const handlePrimaryAction = () => {
    if (entryMode === 'photo' && !photoAdviceViewed) {
      if (!photosDone) {
        setActiveStep('photo')
        return
      }
      setPhotoAdviceViewed(true)
      return
    }

    if (entryMode === 'space' && !spaceAdviceViewed) {
      if (!spaceDone) {
        setActiveStep('space')
        return
      }
      setSpaceAdviceViewed(true)
      return
    }

    setStage('self_assessing')
    navigate('/')
  }

  return (
    <div className="screen-frame screen-frame-overlay">
      <PageHeader title="自助评估" onBack={() => navigate(-1)} />

      <div className="subpage-content subpage-content-roomy">
        <div className="self-assessment-lede">
          <h2>{entryMode === 'photo' ? '先拍照片，获取初步风险建议' : '先填空间信息，判断安装条件'}</h2>
          <p>
            {entryMode === 'photo'
              ? '拍完三处现场照片后，可先查看风险建议；空间信息可继续补充。'
              : '填写尺寸、上传草图或选择模板是必要任务；现场照片可稍后补拍。'}
          </p>
        </div>

        <div className="self-step-tabs">
          <button
            type="button"
            className={activeStep === 'photo' ? 'is-active' : ''}
            onClick={() => setActiveStep('photo')}
          >
            {entryMode === 'space' ? '现场照片（可选）' : '拍摄现场照片'}
            <span>{doneCount} / {photoAreas.length}</span>
          </button>
          <button
            type="button"
            className={activeStep === 'space' ? 'is-active' : ''}
            onClick={() => setActiveStep('space')}
          >
            {entryMode === 'space' ? '空间信息（必要）' : '补充空间信息'}
            <span>{spaceDone ? '已完成' : '待补充'}</span>
          </button>
        </div>

        {activeStep === 'photo' ? (
          <div className="self-step-panel">
            <SectionHeader title="拍摄卫生间现场照片" />
            <div className="self-progress">
              <span>已完成 {doneCount} / {photoAreas.length} 个区域</span>
              <div>
                <i style={{ width: `${(doneCount / photoAreas.length) * 100}%` }} />
              </div>
            </div>

            {photoAdviceViewed && <InsightCard type="photo" />}

            <div className="self-photo-list">
              {photoAreas.map((area) => {
                const done = uploaded.has(area.id)
                return (
                  <Card key={area.id} className="self-photo-card">
                    <div className="self-photo-heading">
                      <IconBadge tone="accent">{area.icon}</IconBadge>
                      <div>
                        <div className="self-photo-title">{area.title}</div>
                        <div className="self-photo-desc">{area.description}</div>
                      </div>
                    </div>

                    {done ? (
                      <button
                        type="button"
                        className="self-photo-preview"
                        onClick={() => onOpenImagePreview?.(area.guideImg)}
                      >
                        <img src={area.guideImg} alt={area.title} />
                        <span><CheckCircle size={14} /> 已上传，点击查看大图</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="self-photo-upload"
                        onClick={() => handleUpload(area.id)}
                      >
                        <Camera size={24} />
                        点击拍照上传
                      </button>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="self-step-panel">
            <SectionHeader title={entryMode === 'space' ? '填写空间信息' : '补充空间信息'} />
            <InfoNote icon={<Ruler size={16} />}>
              {entryMode === 'space'
                ? '空间信息是本次入口的必要任务。填写尺寸、上传草图或选择相似布局，任意一种即可提交空间初评。'
                : '不需要画专业图纸。填写尺寸、上传草图或选择相似布局，任意一种即可补充空间信息。'}
            </InfoNote>

            {spaceAdviceViewed && <InsightCard type="space" />}

            <Card className="space-card">
              <div className="space-card-heading">
                <IconBadge tone="accent"><Ruler size={18} /></IconBadge>
                <div>
                  <div className="space-card-title">填写关键尺寸</div>
                  <div className="space-card-desc">适合已经简单测量过卫生间的家庭。</div>
                </div>
                {dimensionSaved && <CheckCircle size={18} className="space-done-icon" />}
              </div>
              <div className="dimension-grid">
                {dimensionFields.map((field) => (
                  <label key={field.id} className="dimension-field">
                    <span>{field.label}</span>
                    <div>
                      <input
                        value={dimensionValues[field.id] ?? ''}
                        onChange={(event) => handleDimensionChange(field.id, event.target.value)}
                        placeholder={field.placeholder}
                      />
                      {field.unit && <em>{field.unit}</em>}
                    </div>
                  </label>
                ))}
              </div>
              <Button type="button" variant="secondary" block onClick={handleSaveDimensions}>
                保存尺寸信息
              </Button>
            </Card>

            <Card className="space-card">
              <div className="space-card-heading">
                <IconBadge tone="info"><FileImage size={18} /></IconBadge>
                <div>
                  <div className="space-card-title">上传手绘草图 / 平面图</div>
                  <div className="space-card-desc">适合已经画过草图，或家里有平面图照片。</div>
                </div>
                {sketchUploaded && <CheckCircle size={18} className="space-done-icon" />}
              </div>
              <button type="button" className="sketch-upload" onClick={handleSketchUpload}>
                <FileImage size={22} />
                {sketchUploaded ? '已上传草图，可重新选择' : '点击上传草图'}
              </button>
            </Card>

            <Card className="space-card">
              <div className="space-card-heading">
                <IconBadge tone="warning"><LayoutTemplate size={18} /></IconBadge>
                <div>
                  <div className="space-card-title">选择相似布局模板</div>
                  <div className="space-card-desc">适合暂时没有尺寸，只能先描述大致空间。</div>
                </div>
              </div>
              <div className="layout-template-list">
                {layoutOptions.map((layout) => (
                  <button
                    type="button"
                    key={layout.id}
                    className={`layout-template-card ${selectedLayout === layout.id ? 'is-active' : ''}`}
                    onClick={() => handleSelectLayout(layout.id)}
                  >
                    <LayoutMini variant={layout.variant} />
                    <span>{layout.title}</span>
                    <em>{layout.desc}</em>
                  </button>
                ))}
              </div>
              {selectedLayout && (
                <div className="layout-template-hint">
                  已选择：{layoutOptions.find((item) => item.id === selectedLayout)?.title}。后续上门会复核真实尺寸。
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      <FixedBottomBar variant="attached">
        <div className="self-submit-summary">
          {entryMode === 'space'
            ? `空间信息 ${spaceDone ? '已完成' : '必要'} · 照片 ${doneCount}/${photoAreas.length} 可选`
            : `照片 ${doneCount}/${photoAreas.length} · 空间信息 ${spaceDone ? '已补充' : '可选'}`}
        </div>
        <Button
          block
          size="lg"
          disabled={primaryDisabled}
          onClick={handlePrimaryAction}
        >
          {getPrimaryLabel()}
        </Button>
      </FixedBottomBar>
    </div>
  )
}
