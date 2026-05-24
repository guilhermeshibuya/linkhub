import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { themes } from '../types/theme'
import { resolveBackground } from '../utils/resolve-background'
import { backgroundComponents } from './theme-backgrounds'
import { PublicLinkCard } from './public-link-card'
import { usePreviewData } from '../hooks/use-preview-data'
import { useTranslation } from 'react-i18next'

type PreviewDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function PreviewDialog({ isOpen, onClose }: PreviewDialogProps) {
  const { themeName, profilePictureUrl, title, description, links } =
    usePreviewData()
  const { t } = useTranslation()
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dashboard.preview')}</DialogTitle>
        </DialogHeader>
        <div
          className="relative max-h-[80vh]"
          style={{
            ...cssVars,
          }}
        >
          <div className="absolute inset-0">
            {BgComponent && <BgComponent />}
          </div>

          <div className="relative z-10 h-full overflow-y-auto">
            <main
              className="xs:my-8 xs:rounded-4xl px-4 py-8 mx-auto max-w-md shadow-[0_0_30px_15px_rgba(0,0,0,0.15)]"
              style={{ ...bgStyle }}
            >
              <div className="flex flex-col items-center gap-3 mb-8">
                <img
                  src={profilePictureUrl}
                  alt={`${title} avatar`}
                  referrerPolicy="no-referrer"
                  className="w-40 h-40 rounded-full bg-zinc-100"
                />
                <h1 className="text-3xl text-center text-(--text-primary)">
                  {title}
                </h1>
                <p className="text-center text-(--text-secondary)">
                  {description}
                </p>
              </div>
              <div className="space-y-4 lg:space-y-6">
                {links &&
                  links.length > 0 &&
                  links.map((link) => (
                    <PublicLinkCard
                      key={link.id}
                      title={link.title}
                      url={link.url}
                    />
                  ))}
              </div>
            </main>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
