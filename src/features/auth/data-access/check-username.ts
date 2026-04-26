import { supabase } from '@/services/supabse'

export const checkUsernameAvailability = async (username: string) => {
  const { data, error } = await supabase.rpc('is_username_available', {
    p_username: username,
  })

  if (error) return false

  return data as boolean
}
