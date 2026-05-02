import React from 'react'
import { themeMap, themes, type Theme } from '../types/theme'
import { resolveBackground } from '../utils/resolve-background'
import { backgroundComponents } from './theme-backgrounds'

type ThemeCardProps = {
  themeName: Theme
  isSelected: boolean
  onClick: (theme: Theme) => void
}

export const ThemeCard = React.memo(function ThemeCard({
  themeName,
  isSelected,
  onClick,
}: ThemeCardProps) {
  const theme = themes[themeName]
  const bgStyle = resolveBackground(theme.background)
  const BgComponent =
    theme.background.type === 'component'
      ? backgroundComponents[theme.background.value]
      : null

  const cssVars = {
    '--text-primary': theme.textPrimary,
    '--text-secondary': theme.textSecondary,
    '--card-bg': theme.cardBackground,
    '--card-fg': theme.cardForeground,
    '--card-border': theme.cardBorder,
    '--card-shadow': theme.cardShadow,
    '--card-radius': theme.cardRadius,
  } as React.CSSProperties

  const handleClick = () => onClick(themeName)

  return (
    <button
      className="flex flex-col gap-2 items-center max-w-xs cursor-pointer"
      style={{ ...cssVars }}
      onClick={handleClick}
    >
      <div
        className={`relative flex flex-col items-center justify-center gap-2 aspect-video w-full rounded overflow-hidden ${isSelected ? 'ring-offset-2 ring-offset-background ring-2 ring-primary' : ''}`}
        style={{ ...bgStyle }}
      >
        <div className="rounded-full size-10 bg-(--text-primary)/45" />
        <div className="h-1.5 w-[10ch] rounded bg-(--text-primary) opacity-80" />
        <div className="h-1.5 w-[15ch] rounded bg-(--text-secondary) opacity-80" />
        <div
          className="h-7 w-[22ch] bg-(--card-bg)"
          style={{
            border: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: 'var(--card-radius)',
          }}
        />
        <div
          className="h-7 w-[22ch] bg-(--card-bg)"
          style={{
            border: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: 'var(--card-radius)',
          }}
        />
        {BgComponent && (
          <div className="absolute inset-0 -z-10">
            <BgComponent />
          </div>
        )}
      </div>
      <span className="text-base text-center">{themeMap[themeName]}</span>
    </button>
  )
})
