import { supabase } from '@/services/supabse'

export async function sendResetPasswordEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/change-password`,
  })

  return { error }
}
