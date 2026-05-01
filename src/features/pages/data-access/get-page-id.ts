import { supabase } from '@/services/supabse'

export async function getPageId(userId: string) {
  const { data } = await supabase
    .from('pages')
    .select('id')
    .eq('profile_id', userId)
    .maybeSingle()
    .throwOnError()

  return data?.id
}
