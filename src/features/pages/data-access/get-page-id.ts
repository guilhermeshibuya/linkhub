import { supabase } from '@/services/supabse'

export async function getPageId(userId: string) {
  const { data, error } = await supabase
    .from('pages')
    .select('id')
    .eq('profile_id', userId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}
