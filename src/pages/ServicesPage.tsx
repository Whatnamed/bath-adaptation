import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceHistory } from '../data/mock'
import { useAppStage } from '../context/AppStageContext'
import { BottomNav, Button, EmptyState, ServiceCard } from '../components'

import emptyBinding from '../assets/images/04_empty_states/empty_no_family_binding.png'
import emptyService from '../assets/images/04_empty_states/empty_no_service_records.png'
import emptyHistory from '../assets/images/04_empty_states/empty_no_history.png'

export default function ServicesPage() {
  const navigate = useNavigate()
  const { stage, familyDetails } = useAppStage()
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current')

  const hasActiveService = !['unbound', 'idle'].includes(stage)

  const stageStatusMap: Record<string, { text: string; chipText: string }> = {
    assessment_pending: { text: '等待评估', chipText: '等待中' },
    self_assessing: { text: '自行评估中', chipText: '进行中' },
    plan_pending: { text: '方案待确认', chipText: '进行中' },
    plan_confirmed: { text: '待安装', chipText: '已预约' },
    installing: { text: '安装中', chipText: '进行中' },
    completed: { text: '已完成', chipText: '已完成' },
  }

  const currentStatus = stageStatusMap[stage]

  return (
    <>
      <div className="page-content">
        <div className="page-title-block">
          <h1 className="page-title">服务</h1>
        </div>

        <div className="tab-strip">
          <button
            className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            当前服务
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            历史记录
          </button>
        </div>

        {activeTab === 'current' && (
          <>
            {stage === 'unbound' && (
              <EmptyState
                image={emptyBinding}
                alt="未绑定家庭"
                description="绑定家庭后即可查看服务"
                action={<Button onClick={() => navigate('/bind')}>去绑定家庭</Button>}
              />
            )}

            {stage === 'idle' && (
              <EmptyState
                image={emptyService}
                alt="暂无服务"
                title="暂无服务记录"
                description="开始评估后，服务记录将在此显示"
                action={<Button onClick={() => navigate('/assessment/choose')}>开始评估</Button>}
              />
            )}

            {hasActiveService && (
              <div className="page-section">
                {serviceHistory
                  .filter((service) => service.status === 'in_progress')
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      title={service.title.replace('张奶奶', familyDetails.elderName)}
                      chipText={currentStatus?.chipText ?? '进行中'}
                      items={service.items}
                      date={service.date}
                      onClick={() => navigate('/progress')}
                    />
                  ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <EmptyState
            className="page-enter"
            image={emptyHistory}
            alt="暂无历史记录"
            title="暂无历史服务记录"
            description="完成的服务订单将在这里显示，方便您随时查阅"
          />
        )}
      </div>

      <BottomNav />
    </>
  )
}
