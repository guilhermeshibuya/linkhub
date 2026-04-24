import { useTranslation } from 'react-i18next'

export function ErrorPage() {
  const { t } = useTranslation()
  return (
    <main className="pt-32 px-8 flex flex-col items-start gap-4">
      <h1 className="text-6xl text-primary">{t('errorPage.title')}</h1>
      <p>{t('errorPage.description')}</p>
    </main>
  )
}
