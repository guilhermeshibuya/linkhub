import { ThemeLogo } from '../components/theme-logo'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
      <main className="container mx-auto px-4 py-8 flex flex-col gap-8">
        <ThemeLogo />
        {children}
      </main>
      <aside className="hidden lg:block bg-[url(/linkhub-bg.jpg)] bg-cover bg-center bg-no-repeat"></aside>
    </div>
  )
}
