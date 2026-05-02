import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { LinkCard } from './link-card'
import type { Link } from '../types/link'
import React from 'react'

type SortableLinkListProps = {
  links: Link[]
  onEdit: (link: Link) => void
  onDelete: (link: Link) => void
  onToggleVisibility: (id: string, isVisible: boolean) => void
  onDragEnd: (event: DragEndEvent) => void
}

export const SortableLinkList = React.memo(function SortableLinkList({
  links,
  onEdit,
  onDelete,
  onToggleVisibility,
  onDragEnd,
}: SortableLinkListProps) {
  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      {links.map((link, index) => (
        <LinkCard
          key={link.id}
          id={link.id}
          index={index}
          title={link.title}
          url={link.url}
          clicks={link.clicks}
          isVisible={link.isVisible}
          onEdit={() => onEdit(link)}
          onDelete={() => onDelete(link)}
          onToggleVisibility={onToggleVisibility}
        />
      ))}
    </DragDropProvider>
  )
})
