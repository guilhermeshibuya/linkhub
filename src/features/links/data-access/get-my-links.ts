import { supabase } from '@/services/supabse'

export async function getMyLinks(pageId: string) {
  const { data } = await supabase
    .from('links')
    .select('id, title, url, clicks, isVisible:is_visible, position')
    .eq('page_id', pageId)
    .order('position', { ascending: true })
    .throwOnError()

  return data
}
