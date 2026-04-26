import { Spinner } from '@/components/ui/spinner'
import { routes } from '@/routes/routes-paths'
import { supabase } from '@/services/supabse'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        navigate(routes.completeProfile, { replace: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  return <Spinner />
}
