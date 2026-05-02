import { useCallback, useState } from 'react'

export function useDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  return { isDrawerOpen, openDrawer, closeDrawer }
}
