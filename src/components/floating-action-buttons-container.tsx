import { useDashboardFab } from '@/store/dashboard-fab-store'
import { useLocation } from 'react-router'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

export function FloatingActionButtonsContainer() {
  const { getActiveActions } = useDashboardFab()
  const { pathname } = useLocation()

  const currentRoute = pathname.split('/').pop()

  const actions = getActiveActions(currentRoute)

  if (actions.length === 0) return null

  const isSingle = actions.length === 1

  return (
    <div className="fixed z-40 bottom-4 right-4 flex flex-col-reverse gap-3 pointer-events-auto">
      {actions.map((action) => (
        <Button
          key={action.id}
          onClick={action.onClick}
          disabled={action.disabled}
          className={`
            ${action.mobileOnly ? 'lg:hidden' : ''}
            ${action.desktopOnly ? 'hidden lg:flex' : ''}  
            shadow-lg hover:shadow-xl transition-shadow rounded-full w-12 h-12
          `}
          title={action.label}
        >
          {action.loading ? (
            <>
              <Spinner className="size-4" />
              {isSingle && action.label}
            </>
          ) : (
            <>
              {action.icon}
              {isSingle && action.label}
            </>
          )}
        </Button>
      ))}
    </div>
  )
}
