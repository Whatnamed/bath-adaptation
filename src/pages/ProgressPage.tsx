import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Phone,
  ClipboardCheck,
  ChevronRight,
  Wrench,
} from 'lucide-react'
import { serviceOrder, contacts } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'

/* ── 进度时间线接口 ── */
interface TimelineItem {
  step: string
  status: 'done' | 'current' | 'pending'
  date: string
  desc: string
  person?: string
}

/* ── 服务进度详情页 ── */
export default function ProgressPage() {
  const navigate = useNavigate()
  const { stage, familyDetails } = useAppStage()

  /* ── 1. 根据 stage 动态生成卡片文字 ── */
  let currentStatusTitle = '状态更新中'
  let currentStatusDesc = '正在获取最新服务进度，请稍候...'
  let showConfirmBtnType: 'none' | 'assessment' | 'plan' | 'maintenance' | 'contact_assessor' | 'contact_installer' = 'none'

  if (stage === 'unbound') {
    currentStatusTitle = '未绑定家庭'
    currentStatusDesc = '请先在首页绑定您的家庭信息以开启服务。'
  } else if (stage === 'idle') {
    currentStatusTitle = '等待发起评估'
    currentStatusDesc = '您的家庭档案已建立，请在首页申请专业评估或进行自行拍照评估。'
  } else if (stage === 'assessment_pending') {
    currentStatusTitle = '等待上门评估'
    currentStatusDesc = `评估申请已提交。评估员将联系您并在 6月15日 上门，前往：${familyDetails.provinceCityDistrict}${familyDetails.townStreet}${familyDetails.villageCommunity}${familyDetails.houseNumber}。`
    showConfirmBtnType = 'contact_assessor'
  } else if (stage === 'self_assessing') {
    currentStatusTitle = '自助评估分析中'
    currentStatusDesc = '照片和空间信息已提交，系统正在整理卫浴风险和可安装性判断，请稍候查看评估结果。'
  } else if (stage === 'assessment_complete') {
    currentStatusTitle = '评估结果已生成'
    currentStatusDesc = '卫浴空间风险和布局说明已整理完成。请先查看评估结果，再进入推荐改造方案。'
    showConfirmBtnType = 'assessment'
  } else if (stage === 'plan_pending') {
    currentStatusTitle = '方案待确认'
    currentStatusDesc = '评估已完成，推荐适老化改造方案已生成！请立即查看推荐改造方案并进行在线确认。'
    showConfirmBtnType = 'plan'
  } else if (stage === 'plan_confirmed') {
    currentStatusTitle = '方案已确认 · 待安装'
    currentStatusDesc = '改造方案已确认，物料已准备就绪。安装师傅预计将在 6月12日 上门进行现场设备改造施工。'
    showConfirmBtnType = 'contact_installer'
  } else if (stage === 'installing') {
    currentStatusTitle = '设备安装施工中'
    currentStatusDesc = '安装师傅正在您家进行现场无障碍施工，今日将完成防滑、扶手、夜灯等项目改造，并开展现场使用教学。'
    showConfirmBtnType = 'contact_installer'
  } else if (stage === 'completed') {
    currentStatusTitle = '改造已完工'
    currentStatusDesc = '所有适老化改造设备已安装完毕并完成安全教学。已进入售后日常维护阶段，感谢您的信任！'
    showConfirmBtnType = 'maintenance'
  }

  /* ── 2. 根据 stage 动态生成时间线 ── */
  const timelineData: TimelineItem[] = [
    {
      step: '风险发现',
      status: 'done',
      date: '4月10日',
      desc: '村干部入户走访时发现卫浴安全隐患，建议适老化改造',
    },
  ]

  // 第二步：评估节点
  if (stage === 'assessment_pending') {
    timelineData.push({
      step: '入户评估',
      status: 'current',
      date: '等待中',
      desc: '评估申请已提交，排期6月15日，评估员安排上门中',
      person: '评估员 王建华',
    })
    timelineData.push({
      step: '方案确认',
      status: 'pending',
      date: '待评估',
      desc: '评估完成后生成个性化无障碍改造方案',
    })
    timelineData.push({
      step: '上门安装',
      status: 'pending',
      date: '待预约',
      desc: '确认方案及费用后预约上门安装时间',
    })
    timelineData.push({
      step: '使用教学',
      status: 'pending',
      date: '待完成',
      desc: '安装完成后由专业师傅面对面指导使用',
    })
    timelineData.push({
      step: '完工回访',
      status: 'pending',
      date: '待安排',
      desc: '服务站将在完工后 7 天内上门回访复检',
    })
  } else if (stage === 'self_assessing') {
    timelineData.push({
      step: '自助评估',
      status: 'current',
      date: '分析中',
      desc: '照片和空间信息已提交，正在生成卫浴风险评估结果',
    })
    timelineData.push({
      step: '评估结果',
      status: 'pending',
      date: '待生成',
      desc: '生成后可查看空间风险、照片记录和评估说明',
    })
    timelineData.push({
      step: '方案确认',
      status: 'pending',
      date: '待查看结果',
      desc: '查看评估结果后，再进入推荐改造方案',
    })
    timelineData.push({
      step: '上门安装',
      status: 'pending',
      date: '待预约',
      desc: '确认方案及费用后预约上门安装时间',
    })
    timelineData.push({
      step: '使用教学',
      status: 'pending',
      date: '待完成',
      desc: '安装完成后由专业师傅面对面指导使用',
    })
    timelineData.push({
      step: '完工回访',
      status: 'pending',
      date: '待安排',
      desc: '服务站将在完工后 7 天内上门回访复检',
    })
  } else if (stage === 'assessment_complete') {
    timelineData.push({
      step: '评估结果',
      status: 'current',
      date: '已生成',
      desc: '卫浴风险点和空间说明已生成，待用户查看',
    })
    timelineData.push({
      step: '方案确认',
      status: 'pending',
      date: '待进入',
      desc: '查看评估结果后进入推荐方案，并确认产品与费用',
    })
    timelineData.push({
      step: '上门安装',
      status: 'pending',
      date: '待预约',
      desc: '确认方案及费用后预约上门安装时间',
    })
    timelineData.push({
      step: '使用教学',
      status: 'pending',
      date: '待完成',
      desc: '安装完成后由专业师傅面对面指导使用',
    })
    timelineData.push({
      step: '完工回访',
      status: 'pending',
      date: '待安排',
      desc: '服务站将在完工后 7 天内上门回访复检',
    })
  } else if (stage === 'plan_pending') {
    timelineData.push({
      step: '入户评估',
      status: 'done',
      date: '5月18日',
      desc: '评估员王师傅已完成现场评估，查出3处隐患',
      person: '评估员 王建华',
    })
    timelineData.push({
      step: '方案确认',
      status: 'current',
      date: '进行中',
      desc: '已生成推荐无障碍方案，包含防滑、扶手等，待确认',
    })
    timelineData.push({
      step: '上门安装',
      status: 'pending',
      date: '待确认',
      desc: '确认方案及费用后预约上门安装时间',
    })
    timelineData.push({
      step: '使用教学',
      status: 'pending',
      date: '待完成',
      desc: '安装完成后由专业师傅面对面指导使用',
    })
    timelineData.push({
      step: '完工回访',
      status: 'pending',
      date: '待安排',
      desc: '服务站将在完工后 7 天内上门回访复检',
    })
  } else if (stage === 'plan_confirmed') {
    timelineData.push(
      {
        step: '入户评估',
        status: 'done',
        date: '5月18日',
        desc: '评估员王师傅已完成现场评估，查出3处隐患',
        person: '评估员 王建华',
      },
      {
        step: '方案确认',
        status: 'done',
        date: '6月8日',
        desc: '您已确认定制适老方案，预计总计 ¥930',
      },
      {
        step: '上门安装',
        status: 'current',
        date: '已预约',
        desc: '已预约上门安装施工，排期 6月12日 上午',
        person: '安装师 李志强',
      },
      {
        step: '使用教学',
        status: 'pending',
        date: '待完成',
        desc: '安装完成后由专业师傅面对面指导使用',
      },
      {
        step: '完工回访',
        status: 'pending',
        date: '待安排',
        desc: '服务站将在完工后 7 天内上门回访复检',
      }
    )
  } else if (stage === 'installing') {
    timelineData.push(
      {
        step: '入户评估',
        status: 'done',
        date: '5月18日',
        desc: '评估员王师傅已完成现场评估',
      },
      {
        step: '方案确认',
        status: 'done',
        date: '6月8日',
        desc: '已确认定制适老方案并预约安装',
      },
      {
        step: '上门安装',
        status: 'current',
        date: '施工中',
        desc: '师傅正在您家进行防滑、扶手等设备安装',
        person: '安装师 李志强',
      },
      {
        step: '使用教学',
        status: 'pending',
        date: '待教学',
        desc: '设备安装完毕后，现场指导老人使用规范',
      },
      {
        step: '完工回访',
        status: 'pending',
        date: '待安排',
        desc: '服务站将在完工后 7 天内上门回访复检',
      }
    )
  } else {
    // completed
    timelineData.push(
      {
        step: '入户评估',
        status: 'done',
        date: '5月18日',
        desc: '评估员已完成入户，出具健康适老改造报告',
      },
      {
        step: '方案确认',
        status: 'done',
        date: '6月8日',
        desc: '子女确认定制改造方案与补贴额度',
      },
      {
        step: '上门安装',
        status: 'done',
        date: '6月12日',
        desc: '安装师傅李工完成全部适老设施的无损施工',
      },
      {
        step: '使用教学',
        status: 'done',
        date: '6月12日',
        desc: '现场完成扶手拉力测试与老人紧急呼叫模拟教学',
      },
      {
        step: '完工回访',
        status: 'current',
        date: '进行中',
        desc: '服务站将在7天内电话回访，并在首月上门复检',
      }
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ── 页面头部 ── */}
      <div className="page-header" style={{ flexShrink: 0 }}>
        <button className="page-header-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={22} />
        </button>
        <span className="page-header-title">服务进度</span>
      </div>

      {/* ── 可滚动内容区域 ── */}
      <div className="subpage-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--space-4)' }}>
        {/* ── 当前阶段卡片 ── */}
        <div className="card page-section" style={{ marginTop: 'var(--space-4)' }}>
          <div
            className="flex items-center"
            style={{ justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}
          >
            <span
              style={{
                fontSize: 'var(--text-caption)',
                color: 'var(--text-tertiary)',
              }}
            >
              服务单号：{serviceOrder.id}
            </span>
            <span className="chip chip-accent">
              {stage === 'assessment_pending' ? '等待评估' :
               stage === 'self_assessing' ? '分析中' :
               stage === 'assessment_complete' ? '评估完成' :
               stage === 'plan_pending' ? '方案待确认' :
               stage === 'plan_confirmed' ? '已预约安装' :
               stage === 'installing' ? '施工中' :
               stage === 'completed' ? '已完工' : '流程中'}
            </span>
          </div>
          <div
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            <strong>{currentStatusTitle}</strong>：{currentStatusDesc}
          </div>
        </div>

        {/* ── 时间线 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">进度时间线</span>
          </div>

          <div className="card">
            <div className="timeline">
              {timelineData.map((item, i) => {
                const dotClass =
                  item.status === 'done'
                    ? 'timeline-dot-done'
                    : item.status === 'current'
                    ? 'timeline-dot-current'
                    : 'timeline-dot-pending'

                const titleStyle: React.CSSProperties =
                  item.status === 'pending'
                    ? { color: 'var(--text-tertiary)' }
                    : {}

                return (
                  <div className="timeline-item step-stagger" key={i}>
                    <div className={`timeline-dot ${dotClass}`} />
                    <div className="timeline-header">
                      <span className="timeline-title" style={titleStyle}>
                        {item.step}
                      </span>
                      <span className="timeline-date">{item.date}</span>
                    </div>
                    <div className="timeline-desc">{item.desc}</div>
                    {item.person && (
                      <div
                        className="chip chip-accent"
                        style={{ marginTop: 'var(--space-2)' }}
                      >
                        {item.person}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── 服务协同 ── */}
        <div className="page-section">
          <div className="section-header">
            <span className="section-title">服务协同</span>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {contacts.map((person, i) => (
              <div
                className="list-row"
                key={i}
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  borderBottom:
                    i < contacts.length - 1
                      ? '1px solid var(--border-light)'
                      : 'none',
                }}
              >
                {/* 头像 */}
                <div
                  className="avatar avatar-sm"
                  style={{
                    background: 'var(--accent-soft)',
                    width: 40,
                    height: 40,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-label)',
                      fontWeight: 'var(--weight-semibold)',
                      color: 'var(--accent-deep)',
                    }}
                  >
                    {person.name.slice(-1)}
                  </span>
                </div>

                {/* 信息 */}
                <div className="list-row-content">
                  <div
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 'var(--weight-medium)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {person.name}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-tertiary)',
                      marginTop: 1,
                    }}
                  >
                    {person.role} · {person.phone}
                  </div>
                </div>

                {/* 电话按钮 */}
                <div className="list-row-accessory">
                  <div
                    className="icon-circle icon-circle-md"
                    style={{
                      background: 'var(--accent-soft)',
                      color: 'var(--accent)',
                      cursor: 'pointer',
                    }}
                  >
                    <Phone size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 底部固定 CTA（与可滚动内容同级，决不挡住最后的内容） ── */}
      {showConfirmBtnType !== 'none' && (
        <div className="fixed-bottom" style={{ flexShrink: 0, position: 'relative', background: 'var(--surface-page)', borderTop: '1px solid var(--border-light)', zIndex: 10, padding: 'var(--space-4) var(--space-page)' }}>
          {showConfirmBtnType === 'plan' && (
            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={() => navigate('/plan')}
            >
              <ClipboardCheck size={20} />
              查看推荐方案
              <ChevronRight size={18} />
            </button>
          )}

          {showConfirmBtnType === 'assessment' && (
            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={() => navigate('/assessment')}
            >
              <ClipboardCheck size={20} />
              查看评估结果
              <ChevronRight size={18} />
            </button>
          )}

          {showConfirmBtnType === 'contact_assessor' && (
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-secondary flex-1 btn-lg"
                style={{ display: 'flex', gap: '8px' }}
                onClick={() => alert('拨号给评估员：135****7210')}
              >
                <Phone size={18} />
                联系评估员
              </button>
              <button
                className="btn btn-primary flex-1 btn-lg"
                onClick={() => navigate('/')}
              >
                返回首页
              </button>
            </div>
          )}

          {showConfirmBtnType === 'contact_installer' && (
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-secondary flex-1 btn-lg"
                style={{ display: 'flex', gap: '8px' }}
                onClick={() => alert('拨号给安装师傅：138****9032')}
              >
                <Phone size={18} />
                联系安装师傅
              </button>
              <button
                className="btn btn-primary flex-1 btn-lg"
                onClick={() => navigate('/')}
              >
                返回首页
              </button>
            </div>
          )}

          {showConfirmBtnType === 'maintenance' && (
            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={() => navigate('/maintenance')}
            >
              <Wrench size={20} />
              查看日常维护指引
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
