import { LinkCard } from '@/features/links/components/link-card'
import { useEffect, useState } from 'react'
import { move } from '@dnd-kit/helpers'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/use-auth'
import { addLink } from '../data-access/add-link'
import { getMyLinks } from '../data-access/get-my-links'
import type { Link } from '../types/link'
import { type CreateLinkSchema } from '../schemas/create-link-schema'
import { updateLink } from '../data-access/update-link'
import { toast } from 'sonner'
import { updateLinkPositions } from '../data-access/update-link-positions'
import { type EditLinkSchema } from '../schemas/edit-link-schema'
import { EditLinkDialog } from '../components/edit-link-dialog'
import { AddLinkDialog } from '../components/add-link-dialog'
import { Button } from '@/components/ui/button'
import { DeleteLinkDialog } from '../components/delete-link-dialog'
import { deleteLink } from '../data-access/delete-link'

export function MyLinksPage() {
  const { t } = useTranslation()
  const { pageId } = useAuth()
  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [deletingLink, setDeletingLink] = useState<Link | null>(null)
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    async function fetchLinks() {
      if (!pageId) {
        console.warn('No pageId found in auth context', pageId)
        return
      }
      const { data, error } = await getMyLinks(pageId)

      if (error) {
        console.error('Error fetching links:', error)
        return
      }

      setLinks(data || [])
    }
    fetchLinks()
  }, [pageId])

  const handleDragEnd = async (event: DragEndEvent) => {
    const previousLinks = links
    const reorderedLinks = move(links, event)

    const hasdChanged = reorderedLinks.some(
      (link, index) => link.id !== links[index].id,
    )

    if (!hasdChanged) return

    const withUpdatedPositions = reorderedLinks.map((link, index) => ({
      ...link,
      position: index,
    }))

    setLinks(withUpdatedPositions)

    const { error } = await updateLinkPositions(
      withUpdatedPositions.map(({ id, position }) => ({ id, position })),
    )

    if (error) {
      setLinks(previousLinks)
      toast.error(t('dashboard.links.updateLinkError'))
    }
  }

  const handleToggleVisibility = async (id: string, isVisible: boolean) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => (link.id === id ? { ...link, isVisible } : link)),
    )

    const { error } = await updateLink(id, { isVisible })

    if (error) {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, isVisible: !isVisible } : link,
        ),
      )
      toast.error(t('dashboard.links.updateLinkError'))
    }
  }

  const onAddLinkSubmit = async (formData: CreateLinkSchema) => {
    if (!pageId) throw new Error('auth.errors.unknown')

    const { data, error } = await addLink({ ...formData, pageId })

    if (error) throw new Error(t('dashboard.links.addLinkError'))

    setLinks((prevLinks) => [...prevLinks, data![0]])
    toast.success(t('dashboard.links.addLinkSuccess'))
  }

  const onEditLinkSubmit = async (formData: EditLinkSchema) => {
    if (!editingLink || !pageId) throw new Error('auth.errors.unknown')

    const previousLinks = links

    setLinks((prev) =>
      prev.map((link) =>
        link.id === editingLink.id ? { ...link, ...formData } : link,
      ),
    )

    const { error } = await updateLink(editingLink.id, formData)

    if (error) {
      setLinks(previousLinks)
      throw new Error(t('dashboard.links.updateLinkError'))
    }

    toast.success(t('dashboard.links.updateLinkSuccess'))
  }

  const onDeleteLinkConfirm = async () => {
    if (!deletingLink) throw new Error('auth.errors.unknown')

    const previousLinks = links
    setLinks((prev) => prev.filter((link) => link.id !== deletingLink.id))

    const { error } = await deleteLink(deletingLink.id)

    if (error) {
      setLinks(previousLinks)
      throw new Error(t('dashboard.links.deleteLinkError'))
    }

    toast.success(t('dashboard.links.deleteLinkSuccess'))
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
