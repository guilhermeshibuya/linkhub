import {
  useDashboardFab,
  type FloatingAction,
} from '@/store/dashboard-fab-store'
import { useEffect } from 'react'

export function useRegisterFab(
  ownerId: string,
  actions: FloatingAction[],
  enabled: boolean = true,
) {
  const { register, unregister } = useDashboardFab()

  useEffect(() => {
    if (!enabled) return

    register(ownerId, actions)

    return () => unregister(ownerId)
  }, [ownerId, enabled, actions, register, unregister])
}
