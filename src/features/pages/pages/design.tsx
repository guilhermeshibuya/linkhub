import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { ThemeTab } from '../components/theme-tab'
import { useAuth } from '@/hooks/use-auth'
import { useDesignStore } from '../store/design-store'
import { updateTheme } from '../data-access/update-theme'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { HeaderTab } from '../components/header-tab'
import { udpateHeader } from '../data-access/update-header'
import { getPageInfo } from '../data-access/get-page-info'
import { toast } from 'sonner'

export function DesignPage() {
  const { pageId } = useAuth()
  const { t } = useTranslation()
  const { setPageInfo, selectedTheme, headerData } = useDesignStore()
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!pageId) return

      try {
        const data = await getPageInfo(pageId)
        setPageInfo(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [pageId, setPageInfo])

  const handleSave = async () => {
    if (!pageId) return

    try {
      setIsSaving(true)
      if (selectedTheme) {
        await updateTheme(pageId, selectedTheme)
      }
      if (headerData) {
        await udpateHeader(pageId, headerData)
      }
      toast.success(t('dashboard.design.saveSuccess'))
    } catch (error) {
      console.error('Error saving theme:', error)
      toast.error(t('dashboard.design.saveError'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-[3fr_2fr] grid-rows-[auto_1fr]">
      <div className="space-y-4 px-4 pt-8 pb-4 lg:px-8 lg:pt-16 lg:pb-8 border-zinc-300 dark:border-zinc-700 lg:border-r">
        <div className="space-y-2">
          <h1>{t('dashboard.design.sectionTitle')}</h1>
          <p>{t('dashboard.design.sectionDescription')}</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Spinner />
              {t('saving')}
            </>
          ) : (
            t('save')
          )}
        </Button>
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
      <div className="flex flex-col px-4 pt-4 pb-8 gap-8 lg:px-8 lg:pt-8 lg:pb-16 lg:border-r"></div>
    </main>
  )
}
