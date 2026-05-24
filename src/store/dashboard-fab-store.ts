import { create } from 'zustand'

export interface FloatingAction {
  id: string
  label?: string
  icon?: React.ReactNode
  onClick: () => void
  order?: number
  visible?: boolean
  loading?: boolean
  disabled?: boolean
  mobileOnly?: boolean
  desktopOnly?: boolean
  hideWhenDrawerOpen?: boolean
  routeScope?: 'all' | 'design' | 'links' | 'settings'
}

interface FabAction extends FloatingAction {
  ownerId: string
}

interface DashboardFabState {
  actions: FabAction[]
  drawerOpen: boolean
  register: (ownerId: string, actions: FloatingAction[]) => void
  unregister: (ownerId: string) => void
  setDrawerOpen: (isOpen: boolean) => void
  getActiveActions: (currentRoute?: string) => FloatingAction[]
}

export const useDashboardFab = create<DashboardFabState>((set, get) => ({
  actions: [],
  drawerOpen: false,

  register: (ownerId, actions) =>
    set((state) => {
      const filtered = state.actions.filter(
        (action) => action.ownerId !== ownerId,
      )
      return {
        actions: [
          ...filtered,
          ...actions.map((action) => ({
            ...action,
            ownerId,
            order: action.order ?? 99,
            visible: action.visible !== false,
          })),
        ],
      }
    }),

  unregister: (ownerId) =>
    set((state) => ({
      actions: state.actions.filter((action) => action.ownerId !== ownerId),
    })),

  setDrawerOpen: (isOpen) => set({ drawerOpen: isOpen }),

  getActiveActions: (currentRoute?: string) => {
    const state = get()
    return state.actions
      .filter((action) => {
        if (action.visible === false) return false
        if (state.drawerOpen && action.hideWhenDrawerOpen) return false
        if (action.routeScope && action.routeScope !== 'all') {
          if (currentRoute !== action.routeScope) return false
        }
        return true
      })
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
  },
}))
