import { FloatingActionButtonsContainer } from '@/components/floating-action-buttons-container'
import { Navbar } from '@/components/navbar'
import { AddLinkDialog } from '@/features/links/components/add-link-dialog'
import { useLinks } from '@/features/links/hooks/use-links'
import type { CreateLinkSchema } from '@/features/links/schemas/create-link-schema'
import { PreviewDialog } from '@/features/pages/components/preview-dialog'
import { useDrawer } from '@/hooks/use-drawer'
import { useRegisterFab } from '@/hooks/use-register-fab'
import { useUserData } from '@/hooks/use-user-data'
import {
  useDashboardFab,
  type FloatingAction,
} from '@/store/dashboard-fab-store'
import { Eye, Plus } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router'

export function DashboardLayout() {
  const { isDrawerOpen } = useDrawer()
  const { setDrawerOpen } = useDashboardFab()
  const { pageId, username } = useUserData()
  const { links, addLink, isLoading } = useLinks(pageId, username)

  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [addLinkOpen, setAddLinkOpen] = useState(false)

  const onAddLinkSubmit = useCallback(
    async (formData: CreateLinkSchema) => addLink(formData),
    [addLink],
  )

  const actions: FloatingAction[] = useMemo(
    () => [
      {
        id: 'preview-fab',
        onClick: () => setPreviewDialogOpen(true),
        order: 1,
        icon: <Eye />,
        routeScope: 'all',
      },
      {
        id: 'add-link-fab',
        onClick: () => setAddLinkOpen(true),
        order: 2,
        icon: <Plus />,
        routeScope: 'all',
      },
    ],
    [setPreviewDialogOpen],
  )

  useRegisterFab('dashboard', actions)

  useEffect(() => {
    setDrawerOpen(isDrawerOpen)
  }, [isDrawerOpen, setDrawerOpen])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <main
        className={`transition-[filter] duration-300 ${isDrawerOpen ? 'not-lg:blur-sm' : ''}`}
      >
        <Outlet />
      </main>
      <PreviewDialog
        isOpen={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
      />
      <AddLinkDialog
        pageId={pageId}
        nextPosition={links.length}
        open={addLinkOpen}
        onSave={onAddLinkSubmit}
        onOpenChange={setAddLinkOpen}
      />
      <FloatingActionButtonsContainer />
    </>
  )
}
