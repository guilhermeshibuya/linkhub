import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { ThemeTab } from '../components/theme-tab'
import { useDesignStore } from '../store/design-store'
import { updateTheme } from '../data-access/update-theme'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { HeaderTab } from '../components/header-tab'
import { udpateHeader } from '../data-access/update-header'
import { toast } from 'sonner'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { useUserData } from '@/hooks/use-user-data'
import { useQueryClient } from '@tanstack/react-query'

export function DesignPage() {
  const { t } = useTranslation()
  const { pageId, username } = useUserData()
  const queryClient = useQueryClient()
  const { themeDraft, headerDraft, resetThemeDraft, resetHeaderDraft } =
    useDesignStore()
  const [isSaving, setIsSaving] = useState(false)
  const scrollPosition = useScrollPosition(50)

  const hasUnsavedChanges =
    Object.keys(headerDraft).length > 0 || themeDraft !== null

  const handleSave = async () => {
    if (!pageId) return

    try {
      setIsSaving(true)

      if (themeDraft) {
        await updateTheme(pageId, themeDraft)
      }

      if (Object.keys(headerDraft).length > 0) {
        await udpateHeader(pageId, headerDraft)
      }
      await queryClient.invalidateQueries({ queryKey: ['page-info', pageId] })
      await queryClient.invalidateQueries({
        queryKey: ['public-page', username],
      })

      resetThemeDraft()
      resetHeaderDraft()

      toast.success(t('dashboard.design.saveSuccess'))
    } catch {
      toast.error(t('dashboard.design.saveError'))
    } finally {
      setIsSaving(false)
    }
  }

  const saveButton = (
    <Button onClick={handleSave} disabled={isSaving || !hasUnsavedChanges}>
      {isSaving ? (
        <>
          <Spinner />
          {t('saving')}
        </>
      ) : (
        t('save')
      )}
    </Button>
  )

  return (
    <main className="grid min-h-dvh lg:grid-cols-[3fr_2fr] grid-rows-[auto_1fr]">
      <div className="space-y-4 px-4 pt-8 pb-4 lg:px-8 lg:pt-16 lg:pb-8 border-zinc-300 dark:border-zinc-700 lg:border-r">
        <div className="space-y-2">
          <h1>{t('dashboard.design.sectionTitle')}</h1>
          <p>{t('dashboard.design.sectionDescription')}</p>
        </div>
        {saveButton}
      </div>
      <div className="row-start-3 lg:row-span-2">{/* Preview */}</div>
      <Tabs
        defaultValue="theme"
        className="border-zinc-300 dark:border-zinc-700 lg:border-r"
      >
        <TabsList
          variant="line"
          className="px-4 lg:px-8 w-full justify-start border-b border-zinc-300 dark:border-zinc-700"
        >
          <TabsTrigger value="theme" className="flex-0">
            {t('dashboard.design.tabs.theme')}
          </TabsTrigger>
          <TabsTrigger value="header" className="flex-0 ">
            {t('dashboard.design.tabs.header.title')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="theme" className="p-4 lg:p-8 ">
          <ThemeTab />
        </TabsContent>
        <TabsContent value="header" className="p-4 lg:p-8">
          <HeaderTab />
        </TabsContent>
      </Tabs>
      <div
        className={`
          fixed bottom-4 right-4 z-50 lg:hidden
          transition-all duration-300 ease-in-out
          ${
            scrollPosition > 400 && hasUnsavedChanges
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-16 opacity-0 pointer-events-none'
          }  
        `}
      >
        {saveButton}
      </div>
    </main>
  )
}
