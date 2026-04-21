import { routes } from '@/routes/routes-paths'
import { supabase } from '@/services/supabse'

export const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}${routes.completeProfile}`,
    },
  })
  if (error) console.error('Error during Google login:', error.message)
}
