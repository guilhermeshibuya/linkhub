import { useUserData } from '@/hooks/use-user-data'
import { routes } from '@/routes/routes-paths'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import { LogoSmall } from './logo-small'
import { Link2, LogOut, Menu, Palette, Settings, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { useDrawer } from '@/hooks/use-drawer'
import { useAuth } from '@/hooks/use-auth'

const dashboardLinks = [
  {
    to: `${routes.admin}/${routes.links}`,
    icon: Link2,
    label: 'dashboard.header.links',
  },
  {
    to: `${routes.admin}/${routes.design}`,
    icon: Palette,
    label: 'dashboard.header.design',
  },
  {
    to: `${routes.admin}/${routes.settings}`,
    icon: Settings,
    label: 'dashboard.header.settings',
  },
]

const DashboardLink = React.memo(function DashboardLink({
  to,
  icon,
  label,
  onClick,
}: {
  to: string
  icon: React.ElementType
  label: string
  onClick?: () => void
}) {
  const { t } = useTranslation()
  const Icon = icon

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
      <Icon /> {t(label)}
    </NavLink>
  )
})

export function Navbar() {
  const { signout } = useAuth()
  const { t } = useTranslation()
  const { profile } = useUserData()
  const { isDrawerOpen, closeDrawer, openDrawer } = useDrawer()

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (window.innerWidth >= 1024 && isDrawerOpen) closeDrawer()
    })
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [closeDrawer, isDrawerOpen])

  return (
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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button>
                  <img
                    src={profile?.profilePictureUrl || '/default-avatar.png'}
                    alt={`${profile?.username} avatar`}
                    referrerPolicy="no-referrer"
                    className="cursor-pointer size-9 rounded-full object-cover"
                  />
                </button>
              }
            />
            <DropdownMenuContent className="rounded">
              <DropdownMenuItem
                variant="destructive"
                onClick={signout}
                className="rounded"
              >
                <LogOut /> {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          onClick={openDrawer}
          size="icon"
          variant="ghost"
          className="lg:hidden"
        >
          <Menu className="size-6" />
        </Button>

        {isDrawerOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={closeDrawer}
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
              ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
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
              onClick={closeDrawer}
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
                <DashboardLink {...link} onClick={closeDrawer} />
              </li>
            ))}
          </ul>

          <Button
            onClick={signout}
            variant="destructive"
            className="mt-auto mb-4 mx-4"
          >
            <LogOut /> {t('logout')}
          </Button>
        </div>
      </nav>
    </header>
  )
}
