import { Navbar } from '@/components/navbar'
import { useDrawer } from '@/hooks/use-drawer'
import { Outlet } from 'react-router'

export function DashboardLayout() {
  const { isDrawerOpen } = useDrawer()

  return (
    <>
      <Navbar />
      <main
        className={`transition-[filter] duration-300 ${isDrawerOpen ? 'not-lg:blur-sm' : ''}`}
      >
        <Outlet />
      </main>
    </>
  )
}
