import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useScrollPosition(delay: number = 100) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = useDebouncedCallback(() => {
    setScrollPosition(window.scrollY)
  }, delay)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return scrollPosition
}
