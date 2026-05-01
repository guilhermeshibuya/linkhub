import { LinkCard } from '@/features/links/components/link-card'
import { useState } from 'react'
import { move } from '@dnd-kit/helpers'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { useTranslation } from 'react-i18next'
import type { Link } from '../types/link'
import { type CreateLinkSchema } from '../schemas/create-link-schema'
import { toast } from 'sonner'
import { type EditLinkSchema } from '../schemas/edit-link-schema'
import { EditLinkDialog } from '../components/edit-link-dialog'
import { AddLinkDialog } from '../components/add-link-dialog'
import { Button } from '@/components/ui/button'
import { DeleteLinkDialog } from '../components/delete-link-dialog'
import { useUserData } from '@/hooks/use-user-data'
import { useLinks } from '../hooks/use-links'

export function MyLinksPage() {
  const { t } = useTranslation()
  const { pageId, username } = useUserData()

  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [deletingLink, setDeletingLink] = useState<Link | null>(null)

  const {
    links,
    addLink,
    editLink,
    reorderLinks,
    toggleLinkVisibility,
    deleteLink,
    isLoading,
  } = useLinks(pageId, username)

  const handleDragEnd = async (event: DragEndEvent) => {
    const reorderedLinks = move(links, event)

    const hasdChanged = reorderedLinks.some(
      (link, index) => link.id !== links[index].id,
    )

    if (!hasdChanged) return

    const payload = reorderedLinks.map((link, index) => ({
      id: link.id,
      position: index,
    }))

    reorderLinks(payload)
  }

  const handleToggleVisibility = async (id: string, isVisible: boolean) =>
    toggleLinkVisibility({ id, isVisible })

  const onAddLinkSubmit = async (formData: CreateLinkSchema) =>
    addLink(formData)

  const onEditLinkSubmit = async (formData: EditLinkSchema) => {
    if (!editingLink || !pageId) {
      toast.error('auth.errors.unknown')
      return
    }

    editLink({ id: editingLink.id, data: formData })
  }

  const onDeleteLinkConfirm = async () => {
    if (!deletingLink) {
      toast.error('auth.errors.unknown')
      return
    }

    deleteLink(deletingLink.id)
  }

  if (isLoading) {
    // Skeleton
    return
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-[3fr_2fr] grid-rows-[auto_1fr]">
      <div className="space-y-4 px-4 pt-8 pb-4 lg:px-8 lg:pt-16 lg:pb-8 border-b border-zinc-300 dark:border-zinc-700 lg:border-r">
        <div className="space-y-2">
          <h1>{t('dashboard.links.sectionTitle')}</h1>
          <p>{t('dashboard.links.sectionDescription')}</p>
        </div>
        {pageId ? (
          <AddLinkDialog
            pageId={pageId}
            nextPosition={links.length}
            onSave={onAddLinkSubmit}
          />
        ) : (
          <Button className="w-full" disabled>
            {t('dashboard.links.addNewLink')}
          </Button>
        )}
      </div>
      <div className="row-start-3 lg:row-span-2">{/* Preview */}</div>
      {editingLink && (
        <EditLinkDialog
          link={editingLink}
          isOpen={!!editingLink}
          onClose={() => setEditingLink(null)}
          onSave={onEditLinkSubmit}
        />
      )}
      <DeleteLinkDialog
        title={deletingLink?.title ?? ''}
        isOpen={!!deletingLink}
        onClose={() => setDeletingLink(null)}
        onConfirm={onDeleteLinkConfirm}
      />
      <div className="flex flex-col px-4 pt-4 pb-8 gap-8 lg:px-8 lg:pt-8 lg:pb-16 lg:border-r">
        {!links ||
          (links && links.length === 0 && (
            <div className="text-center">
              <h2>{t('dashboard.links.noLinksTitle')}</h2>
              <p>{t('dashboard.links.noLinksDescription')}</p>
            </div>
          ))}
        {links && links.length > 0 && (
          <DragDropProvider onDragEnd={handleDragEnd}>
            {links.map((link, index) => (
              <LinkCard
                key={link.id}
                id={link.id}
                index={index}
                title={link.title}
                url={link.url}
                clicks={link.clicks}
                isVisible={link.isVisible}
                onEdit={() => setEditingLink(link)}
                onDelete={() => setDeletingLink(link)}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </DragDropProvider>
        )}
      </div>
    </main>
  )
}
