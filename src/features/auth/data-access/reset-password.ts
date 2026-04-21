import { routes } from '@/routes/routes-paths'
import { supabase } from '@/services/supabse'

export async function sendResetPasswordEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${routes.changePassword}`,
  })

  return { error }
}
