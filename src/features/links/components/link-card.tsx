import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useSortable } from '@dnd-kit/react/sortable'
import {
  ChartNoAxesColumnIncreasing,
  GripVertical,
  Pencil,
  Trash,
} from 'lucide-react'
import { useRef } from 'react'

type LinkCardProps = {
  id: string
  index: number
  title: string
  url: string
  clicks: number
  isVisible: boolean
  onEdit: () => void
  onDelete: () => void
  onToggleVisibility: (id: string, isVisible: boolean) => void
}

export function LinkCard({
  id,
  index,
  title,
  url,
  clicks,
  isVisible,
  onEdit,
  onDelete,
  onToggleVisibility,
}: LinkCardProps) {
  const handleRef = useRef<HTMLButtonElement | null>(null)
  const { ref, isDragging } = useSortable({
    id,
    index,
    handle: handleRef,
  })

  return (
    <li
      ref={ref}
      className={`flex items-center gap-3 lg:gap-6 p-3 lg:p-6 rounded bg-zinc-50 dark:bg-zinc-800 shadow-sm ${isDragging ? 'shadow-lg' : ''}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="cursor-grab active:cursor-grabbing"
        ref={handleRef}
      >
        <GripVertical className="text-zinc-500 size-6" />
      </Button>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{title}</h2>
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Pencil className="text-zinc-500 size-5" />
              </Button>
            </div>
            <p className="font-medium text-zinc-600 dark:text-zinc-400">
              {url}
            </p>
          </div>

          <Switch
            checked={isVisible}
            onCheckedChange={(checked) => onToggleVisibility(id, checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChartNoAxesColumnIncreasing className="text-zinc-500 size-5" />
            <span className="text-zinc-600 dark:text-zinc-400">{clicks}</span>
          </div>
          <div>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash className="text-zinc-500 size-5" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}
