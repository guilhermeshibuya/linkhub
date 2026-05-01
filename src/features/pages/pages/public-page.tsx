import { useParams } from 'react-router'
import { getPublicPageByUsername } from '../data-access/get-public-page'
import { useEffect } from 'react'
import type { PublicPage } from '../types/public-page'
import { PublicLinkCard } from '../components/public-link-card'
import { incrementLinkClick } from '../data-access/increment-link_click'
import { NotFoundPage } from '@/pages/not-found'
import { ErrorPage } from '@/pages/error'
import { Spinner } from '@/components/ui/spinner'
import { themes } from '../types/theme'
import { resolveBackground } from '../utils/resolve-background'
import { useTranslation } from 'react-i18next'
import { backgroundComponents } from '../components/theme-backgrounds'
import { useQuery } from '@tanstack/react-query'

export function PublicPage() {
  const { t } = useTranslation()
  const { username } = useParams()

  const {
    data: publicPage,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['public-page', username],
    queryFn: () => getPublicPageByUsername(username!),
    enabled: !!username,
  })

  useEffect(() => {
    if (isLoading) {
      document.title = t('auth.loading')
    } else if (publicPage?.title) {
      document.title = `${publicPage.title} | LinkHub`
    } else {
      document.title = 'LinkHub'
    }

    return () => {
      document.title = 'LinkHub'
    }
  }, [isLoading, publicPage?.title, t])

  const handleLinkClick = async (linkId: string) => {
    try {
      await incrementLinkClick(linkId)
    } catch (error) {
      console.error('Error incrementing link click:', error)
    }
  }

  if (isLoading) return <Spinner />
  if (isError) return <ErrorPage />
  if (!publicPage) return <NotFoundPage />

  const theme = themes[publicPage?.themeName || 'deep_slate']
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

  return (
    <div
      style={{
        ...cssVars,
      }}
    >
      {!BgComponent && (
        <div
          className="fixed inset-0"
          style={{
            ...bgStyle,
            filter: 'opacity(0.7)',
          }}
        />
      )}

      {BgComponent && (
        <div className="fixed inset-0 -z-10">
          <BgComponent />
        </div>
      )}

      <main
        className="xs:my-8 xs:rounded-4xl relative min-h-dvh px-4 py-8 mx-auto max-w-md shadow-[0_0_30px_15px_rgba(0,0,0,0.15)]"
        style={{ ...bgStyle }}
      >
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src={publicPage?.profilePictureUrl}
            alt={`${publicPage?.title} avatar`}
            referrerPolicy="no-referrer"
            className="w-40 h-40 rounded-full bg-zinc-100"
          />
          <h1 className="text-3xl text-center text-(--text-primary)">
            {publicPage?.title}
          </h1>
          <p className="text-center text-(--text-secondary)">
            {publicPage?.description}
          </p>
        </div>
        <div className="space-y-4 lg:space-y-6">
          {publicPage &&
            publicPage.links.length > 0 &&
            publicPage.links.map((link) => (
              <PublicLinkCard
                key={link.id}
                title={link.title}
                url={link.url}
                onClick={() => handleLinkClick(link.id)}
              />
            ))}
        </div>
      </main>
    </div>
  )
}
