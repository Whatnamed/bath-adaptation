import { Maximize2 } from 'lucide-react'
import { Card, InfoNote, SectionHeader } from './primitives'

export interface LayoutPlanPoint {
  id: number
  title: string
  desc: string
}

interface LayoutPlanPreviewProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  points: LayoutPlanPoint[]
  note?: string
  onOpenImagePreview?: (src: string) => void
}

export function LayoutPlanPreview({
  title,
  description,
  imageSrc,
  imageAlt,
  points,
  note,
  onOpenImagePreview,
}: LayoutPlanPreviewProps) {
  const handleOpen = () => {
    onOpenImagePreview?.(imageSrc)
  }

  return (
    <Card className="layout-preview-card">
      <SectionHeader
        title={title}
        action={(
          <button
            type="button"
            className="layout-preview-open"
            onClick={handleOpen}
            disabled={!onOpenImagePreview}
          >
            <Maximize2 size={15} />
            查看大图
          </button>
        )}
      />

      <p className="layout-preview-desc">{description}</p>

      <button
        type="button"
        className="layout-preview-frame"
        onClick={handleOpen}
        disabled={!onOpenImagePreview}
        aria-label={`查看${title}大图`}
      >
        <img src={imageSrc} alt={imageAlt} />
        <span>点击查看完整平面图</span>
      </button>

      <div className="layout-point-list">
        {points.map((point) => (
          <div className="layout-point-row" key={point.id}>
            <span className="layout-point-number">{point.id}</span>
            <div className="layout-point-copy">
              <strong>{point.title}</strong>
              <em>{point.desc}</em>
            </div>
          </div>
        ))}
      </div>

      {note && (
        <InfoNote tone="info" className="layout-preview-note">
          {note}
        </InfoNote>
      )}
    </Card>
  )
}
