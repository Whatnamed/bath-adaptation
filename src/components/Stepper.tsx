import { CheckCircle } from 'lucide-react'
import type { ReactNode } from 'react'

export interface StepperStep {
  key: string
  label: string
  status: 'done' | 'current' | 'pending' | string
  date: string
}

interface StepperProps {
  steps: StepperStep[]
  icons?: Record<string, ReactNode>
}

export function Stepper({ steps, icons = {} }: StepperProps) {
  return (
    <div className="stepper">
      {steps.map((step, index) => {
        const nodeClass =
          step.status === 'done'
            ? 'stepper-node-done'
            : step.status === 'current'
              ? 'stepper-node-current'
              : 'stepper-node-pending'

        const statusClass =
          step.status === 'done'
            ? 'stepper-status-done'
            : step.status === 'current'
              ? 'stepper-status-current'
              : 'stepper-status-pending'

        const showLine = index < steps.length - 1
        const nextStep = steps[index + 1]
        const lineClass =
          step.status === 'done' && nextStep?.status !== 'pending'
            ? 'stepper-line-done'
            : 'stepper-line-pending'

        return (
          <div className="stepper-step step-stagger" key={step.key}>
            <div className={`stepper-node ${nodeClass}`}>
              {step.status === 'done' ? <CheckCircle size={18} /> : icons[step.key]}
            </div>
            <span className="stepper-label">{step.label}</span>
            <span className={`stepper-status ${statusClass}`}>{step.date}</span>
            {showLine && <div className={`stepper-line ${lineClass}`} />}
          </div>
        )
      })}
    </div>
  )
}
