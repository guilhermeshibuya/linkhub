import { supabase } from '@/services/supabse'

export const checkEmailAvailability = async (email: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('email')
    .eq('email', email)
    .maybeSingle()

  return data === null
}
