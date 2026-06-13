import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ClipboardCheck,
  Clock,
  MapPin,
  PhoneCall,
  Shield,
} from 'lucide-react'
import { useAppStage } from '../context/AppStageContext'
import { Button, Card, FixedBottomBar, IconBadge, InfoNote, PageHeader, SectionHeader } from '../components'

const appointmentDates = [
  { id: 'jun13', label: '今天', date: '6月13日', weekday: '周六' },
  { id: 'jun14', label: '明天', date: '6月14日', weekday: '周日' },
  { id: 'jun15', label: '后天', date: '6月15日', weekday: '周一' },
  { id: 'jun16', label: '可预约', date: '6月16日', weekday: '周二' },
  { id: 'jun17', label: '可预约', date: '6月17日', weekday: '周三' },
]

const periodOptions = [
  { id: 'morning', label: '上午' },
  { id: 'afternoon', label: '下午' },
  { id: 'evening', label: '傍晚' },
]

const appointmentSlots: Record<string, Array<{ id: string; label: string }>> = {
  morning: [
    { id: '09-11', label: '09:00–11:00' },
    { id: '10-12', label: '10:00–12:00' },
  ],
  afternoon: [
    { id: '14-16', label: '14:00–16:00' },
    { id: '15-17', label: '15:00–17:00' },
  ],
  evening: [
    { id: '16-18', label: '16:00–18:00' },
  ],
}

export default function ApplyAssessmentPage() {
  const navigate = useNavigate()
  const { setStage } = useAppStage()

  const [selectedDate, setSelectedDate] = useState('jun14')
  const [selectedPeriod, setSelectedPeriod] = useState('afternoon')
  const [selectedSlot, setSelectedSlot] = useState('14-16')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const availableSlots = appointmentSlots[selectedPeriod]
  const selectedDateOption = appointmentDates.find((item) => item.id === selectedDate)
  const selectedSlotOption = availableSlots.find((item) => item.id === selectedSlot) ?? availableSlots[0]
  const selectedSummary = useMemo(() => {
    if (!selectedDateOption || !selectedSlotOption) return ''
    return `${selectedDateOption.date} ${selectedDateOption.weekday} ${selectedSlotOption.label}`
  }, [selectedDateOption, selectedSlotOption])

  const handlePeriodChange = (periodId: string) => {
    setSelectedPeriod(periodId)
    setSelectedSlot(appointmentSlots[periodId][0].id)
  }

  const handleSubmit = () => {
    if (submitting) return

    setSubmitting(true)
    setTimeout(() => {
      setStage('assessment_pending')
      navigate('/')
    }, 800)
  }

  return (
    <div className="screen-frame screen-frame-overlay">
      <PageHeader title="申请上门评估" onBack={() => navigate(-1)} />

      <div className="subpage-content subpage-content-roomy">
        <Card className="assessment-service-card">
          <div className="assessment-service-heading">
            <IconBadge tone="accent">
              <ClipboardCheck size={20} />
            </IconBadge>
            <div>
              <div className="assessment-service-title">入户评估服务</div>
              <div className="assessment-service-desc">
                工作人员会上门查看卫浴空间，记录安全隐患，并为后续改造方案提供尺寸依据。
              </div>
            </div>
          </div>

          <div className="assessment-service-meta">
            <span><Clock size={15} /> 预计时长 30 分钟</span>
            <span><MapPin size={15} /> 卫浴 + 门槛动线</span>
            <span><Shield size={15} /> 免费评估</span>
          </div>
        </Card>

        <div className="page-section">
          <SectionHeader title="选择期望上门时间" />

          <div className="appointment-picker">
            <div className="appointment-date-row">
              {appointmentDates.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`appointment-date-card ${selectedDate === item.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedDate(item.id)}
                >
                  <span>{item.label}</span>
                  <strong>{item.date}</strong>
                  <em>{item.weekday}</em>
                </button>
              ))}
            </div>

            <div className="appointment-segmented">
              {periodOptions.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={selectedPeriod === item.id ? 'is-active' : ''}
                  onClick={() => handlePeriodChange(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="appointment-slot-grid">
              {availableSlots.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`appointment-slot ${selectedSlot === item.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedSlot(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <InfoNote icon={<PhoneCall size={16} />}>
            已选择：{selectedSummary}。评估员上门前会电话联系，请保持手机畅通。
          </InfoNote>
        </div>

        <div className="page-section">
          <SectionHeader title="补充说明（选填）" />
          <textarea
            className="appointment-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="如老人行动不便、院门位置不好找，或希望先联系子女，可在这里说明。"
          />
        </div>
      </div>

      <FixedBottomBar variant="attached">
        <Button
          block
          size="lg"
          loading={submitting}
          onClick={handleSubmit}
          disabled={submitting}
        >
          提交评估申请
        </Button>
      </FixedBottomBar>
    </div>
  )
}
