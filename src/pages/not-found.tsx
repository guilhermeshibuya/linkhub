import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <main className="pt-32 px-8 flex flex-col items-center gap-4">
      <h1 className="text-9xl text-primary">404</h1>
      <p className="text-center">{t('notFoundPage.description')}</p>
    </main>
  )
}
