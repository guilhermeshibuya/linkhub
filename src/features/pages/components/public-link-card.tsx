import { ChevronRight, Link } from 'lucide-react'

type PublicLinkCardProps = {
  title: string
  url: string
  onClick: () => void
}

export function PublicLinkCard({ title, url, onClick }: PublicLinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      style={{
        border: 'var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        borderRadius: 'var(--card-radius)',
      }}
      className={`flex items-center justify-between p-6 font-medium bg-(--card-bg) text-(--card-fg)`}
    >
      <div className="flex items-center gap-3">
        <Link />
        <span>{title}</span>
      </div>
      <ChevronRight />
    </a>
  )
}
