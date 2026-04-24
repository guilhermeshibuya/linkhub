import { LogoSmall } from '@/components/logo-small'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { routes } from '@/routes/routes-paths'
import { Link2, Menu, Palette, Settings, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet } from 'react-router'

const dashboardLinks = [
  {
    to: `${routes.admin}/${routes.links}`,
    icon: <Link2 />,
    label: 'dashboard.header.links',
  },
  {
    to: `${routes.admin}/${routes.design}`,
    icon: <Palette />,
    label: 'dashboard.header.design',
  },
  {
    to: `${routes.admin}/${routes.settings}`,
    icon: <Settings />,
    label: 'dashboard.header.settings',
  },
]

const DashboardLink = ({
  to,
  icon,
  label,
  onClick,
}: {
  to: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}) => {
  const { t } = useTranslation()

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `flex items-center gap-3 
        ${
          isActive
            ? 'text-zinc-900 dark:text-zinc-50'
            : 'text-zinc-500 dark:text-zinc-400'
        }`}
    >
      {icon} {t(label)}
    </NavLink>
  )
}

export function DashboardLayout() {
  const { profile } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false)
    })
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="relative w-full p-4 border-b border-zinc-300 dark:border-zinc-700">
        <nav className="flex items-center justify-between">
          <Link to={`${routes.admin}/${routes.links}`}>
            <LogoSmall width={28} height={28} />
          </Link>

          <ul className="hidden lg:flex items-center gap-12">
            {dashboardLinks.map((link) => (
              <li key={link.to}>
                <DashboardLink {...link} />
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <img
              src={profile?.profilePictureUrl || '/default-avatar.png'}
              alt={`${profile?.username} avatar`}
              referrerPolicy="no-referrer"
              className="size-9 rounded-full object-cover"
            />
          </div>

          <Button
            onClick={() => setIsMenuOpen(true)}
            size="icon"
            variant="ghost"
            className="lg:hidden"
          >
            <Menu className="size-6" />
          </Button>

          {isMenuOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          <div
            className={`
              fixed top-0 right-0 z-30 h-dvh w-4/5 max-w-s
              bg-zinc-100 dark:bg-zinc-900
              shadow-xl
              flex flex-col
              transition-transform duration 300 ease-in-out
              lg:hidden
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="p-4 flex justify-between items-start border-b border-zinc-300 dark:border-zinc-700">
              <div className="space-y-2">
                <img
                  src={profile?.profilePictureUrl || '/default-avatar.png'}
                  alt={`${profile?.username} avatar`}
                  referrerPolicy="no-referrer"
                  className="size-16 rounded-full"
                />
                <h1 className="font-bold">{profile?.username}</h1>
              </div>
              <Button
                onClick={() => setIsMenuOpen(false)}
                size="icon"
                variant="ghost"
                className="lg:hidden"
              >
                <X className="size-6" />
              </Button>
            </div>

            <ul className="p-4 flex flex-col gap-8 text-2xl">
              {dashboardLinks.map((link) => (
                <li key={link.to}>
                  <DashboardLink
                    {...link}
                    onClick={() => setIsMenuOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
      <main
        className={`transition-[filter] duration-300 ${isMenuOpen ? 'not-lg:blur-sm' : ''}`}
      >
        <Outlet />
      </main>
    </>
  )
}
