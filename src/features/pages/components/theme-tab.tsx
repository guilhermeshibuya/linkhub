import { ThemeCard } from './theme-card'
import { themes, type Theme } from '../types/theme'
import { useDesignStore } from '../store/design-store'
import { usePageInfo } from '../hooks/use-page-info'
import { useUserData } from '@/hooks/use-user-data'

const THEMES = Object.keys(themes) as Theme[]

export function ThemeTab() {
  const { pageId } = useUserData()
  const { data: pageInfo } = usePageInfo(pageId)
  const { themeDraft, setThemeDraft, resetThemeDraft } = useDesignStore()

  const activeTheme = themeDraft ?? pageInfo?.themeName

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {THEMES.map((theme) => (
        <ThemeCard
          key={theme}
          themeName={theme}
          isSelected={activeTheme === theme}
          onClick={() =>
            theme === pageInfo?.themeName
              ? resetThemeDraft()
              : setThemeDraft(theme)
          }
        />
      ))}
    </section>
  )
}
