import { ThemeLogo } from '../components/theme-logo'
import { useTranslation } from 'react-i18next'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
      <main className="container mx-auto px-4 py-8 flex flex-col gap-8 max-w-lg lg:py-16 lg:px-8">
        <ThemeLogo />
        {children}
      </main>
      <aside className="hidden lg:block bg-[url(/linkhub-bg.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col gap-3 justify-end h-full lg:py-32 lg:px-16">
          <h1 className="text-5xl font-bold font-display text-primary max-w-[10ch]">
            {t('auth.banner')}
          </h1>
          <p className="text-xl text-zinc-100">{t('auth.bannerDescription')}</p>
        </div>
      </aside>
    </div>
  )
}
