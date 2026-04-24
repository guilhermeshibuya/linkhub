import { supabase } from '@/services/supabse'

export async function incrementLinkClick(linkId: string) {
  const { error } = await supabase.rpc('increment_link_click', {
    link_id: linkId,
  })

  if (error) throw new Error('Failed to increment link click: ' + error.message)
}
