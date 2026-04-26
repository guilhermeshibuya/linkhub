import { ThemeCard } from './theme-card'
import { themes, type Theme } from '../types/theme'
import { useDesignStore } from '../store/design-store'

const THEMES = Object.keys(themes) as Theme[]

export function ThemeTab() {
  const { pageInfo, selectedTheme, setSelectedTheme } = useDesignStore()

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {THEMES.map((theme) => (
        <ThemeCard
          key={theme}
          themeName={theme}
          isSelected={
            selectedTheme
              ? selectedTheme === theme
              : pageInfo?.themeName === theme
          }
          onClick={() => setSelectedTheme(theme)}
        />
      ))}
    </section>
  )
}
